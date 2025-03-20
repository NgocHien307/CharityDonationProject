using CharityDonationApi.Data;
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
				throw new KeyNotFoundException($"Post with id {id} not found");
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
				throw new KeyNotFoundException($"Post with id {id} not found");
			}
			_context.Users.Remove(user);
			await _context.SaveChangesAsync();
		}


	}
}
