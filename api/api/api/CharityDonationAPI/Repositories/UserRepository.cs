using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CharityDbContext _context;

        public UserRepository(CharityDbContext context)
        {
            _context = context;
        }

        public async Task<List<Users>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<UserVm> GetById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(p => p.Id == id);
            if (user == null)
            {
                return null;
            }

            return MapToUserVm(user);
        }

        public async Task AddUser(UserVm userVm)
        {
            var user = new Users
            {
                FullName = userVm.FullName,
                Email = userVm.Email,
                PasswordHash = userVm.PasswordHash,
                IsActive = userVm.IsActive,
                PhoneNumber = userVm.PhoneNumber,
                AvatarUrl = userVm.AvatarUrl,
                RegisterDate = userVm.RegisterDate,
                RoleId = userVm.RoleId
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(int id, UserVm userVm)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }

            user.FullName = userVm.FullName;
            user.Email = userVm.Email;
            user.PasswordHash = userVm.PasswordHash;
            user.IsActive = userVm.IsActive;
            user.PhoneNumber = userVm.PhoneNumber;
            user.AvatarUrl = userVm.AvatarUrl;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }


        public async Task<List<UserVm>> SearchUsers(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return new List<UserVm>();

            var users = await _context.Users
                .Where(u => u.Email.Contains(searchTerm) || u.PhoneNumber.Contains(searchTerm))
                .ToListAsync();

            return users.Select(MapToUserVm).ToList();
        }

        public async Task AssignRole(int userId, int roleId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {userId} not found");
            }

            var roleExists = await _context.Roles.AnyAsync(r => r.Id == roleId);
            if (!roleExists)
            {
                throw new KeyNotFoundException($"Role with id {roleId} not found");
            }

            user.RoleId = roleId;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task ControlUserAccess(int userId, bool isActive)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException($"User with id {userId} not found");
            }

            user.IsActive = isActive;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task<(List<UserVm> Users, int TotalCount, int TotalPages)> GetPaginatedUsers(int pageNumber, int pageSize)
        {
            if (pageNumber < 1)
                pageNumber = 1;

            if (pageSize < 1)
                pageSize = 10;

            var totalCount = await _context.Users.CountAsync();
            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var users = await _context.Users
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return (users.Select(MapToUserVm).ToList(), totalCount, totalPages);
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