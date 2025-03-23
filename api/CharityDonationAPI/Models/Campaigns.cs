using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityDonationApi.Models
{
	public class Campaigns
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Title { get; set; }

		[Required]
		[MaxLength(1000)]
		public string Description { get; set; }

		[Required]
		[Column(TypeName = "decimal(18,2)")]
		public decimal GoalAmount { get; set; }

		[Column(TypeName = "decimal(18,2)")]
		public decimal CollectedAmount { get; set; } = 0;
		public bool IsActive { get; set; } = true;
		public DateTime StartDate { get; set; } = DateTime.UtcNow;

		public DateTime? EndDate { get; set; }

		[Required]
		[Url]
		public string FeaturedImageUrl { get; set; }

		public ICollection<CampaignUpdate> Updates { get; set; } = new List<CampaignUpdate>();


		public int CreatorId { get; set; }
		public Creators Creator { get; set; }

		public ICollection<Donation> Donations { get; set; }

		public ICollection<Feedback> Feedbacks { get; set; }
			
		public ICollection<CampaignSubscription> Subscriptions { get; set; } = new List<CampaignSubscription>(); // Thêm dòng này


		public int? CategoryId { get; set; }
		public Category Category { get; set; }

		public string Status { get; set; } // Pending, Active, Completed, Canceled
	}
}
