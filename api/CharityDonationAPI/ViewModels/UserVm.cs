using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.ViewModels
{
	public class UserVm
	{
		public int Id { get; set; }
		public string FullName { get; set; }
		public string Email { get; set; }
		public string PasswordHash { get; set; }

		public bool IsActive { get; set; } = true;
		public string PhoneNumber { get; set; }
		public string AvatarUrl { get; set; }
		public DateTime RegisterDate { get; set; } = DateTime.UtcNow;

		public DateTime? LastLoginDate { get; set; }
		public int RoleId { get; set; }
	}
}
