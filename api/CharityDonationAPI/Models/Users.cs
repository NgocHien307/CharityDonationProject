using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace CharityDonationApi.Models
{
	public class Users
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string FullName { get; set; }

		[Required]
		[MaxLength(50)]
		[EmailAddress]
		public string Email { get; set; }

		[Required]
		[MaxLength(100)]
		public string PasswordHash { get; set; }

		public bool IsActive { get; set; } = true;

		[MaxLength(15)]
		[Phone]
		public string PhoneNumber { get; set; }

		[Url]
		public string AvatarUrl { get; set; }

		[Required]
		public DateTime RegisterDate { get; set; } = DateTime.UtcNow;

		public DateTime? LastLoginDate { get; set; }

		[Required]
		public int RoleId { get; set; }

		[ForeignKey("RoleId")]
		public virtual Role Role { get; set; }

		public ICollection<Donation> Donations { get; set; }
		public ICollection<Feedback> Feedbacks { get; set; }
		public ICollection<QuickDonation> QuickDonations { get; set; }
		public ICollection<CampaignSubscription> Subscriptions { get; set; } = new List<CampaignSubscription>(); 


		// Liên kết với Creator nếu User là người tạo chiến dịch
		public Creators Creator { get; set; }
	}
}
