using CharityDonationApi.Data;
using CharityDonationApi.Dto.Request;
using CharityDonationApi.Dto.Response;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CharityDonationApi.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly CharityDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthRepository(CharityDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<LoginResponse> Login(LoginRequest loginRequest)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == loginRequest.Email);

            if (user == null)
            {
                return null;
            }

            bool isValidPassword = VerifyPassword(loginRequest.Password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            user.LastLoginDate = DateTime.UtcNow;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            string roleName = user.Role?.Name ?? "User";
            string token = await CreateToken(MapToUserVm(user), roleName);
            bool status = user.IsActive;
            double expirationHours = 24;
            if (!double.TryParse(_configuration["Jwt:ExpirationHours"], out expirationHours))
            {
                expirationHours = 24;
            }
            return new LoginResponse
            {
                Token = token,
                Role = new string[] { roleName },
                Status = status
            };
        }

        public async Task<bool> ValidateUser(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return false;
            }

            return VerifyPassword(password, user.PasswordHash);
        }

        public async Task<string> CreateToken(UserVm user, string roleName)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, roleName)
            };

            var tokenOptions = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(double.Parse(_configuration["Jwt:ExpirationHours"])),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            return storedHash == password;
        }
        private UserVm MapToUserVm(Users user)
        {
            return new UserVm
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                IsActive = user.IsActive,
                PhoneNumber = user.PhoneNumber,
                AvatarUrl = user.AvatarUrl,
                RegisterDate = user.RegisterDate,
                LastLoginDate = user.LastLoginDate,
                RoleId = user.RoleId
            };
        }
    }
}