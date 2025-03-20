using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityDonationApi.Models
{
	public class CampaignSubscription
	{
		[Key]
		public  int Id { get; set; }

		[Required]
		[ForeignKey("User")]
		public int UserId { get; set; }
		public Users User { get; set; }

		[Required]
		[ForeignKey("Campaign")]
		public int CampaignId { get; set; }
		public Campaigns Campaign { get; set; }
		[Required]
		public DateTime SubscriptionDate { get; set; } = DateTime.UtcNow;

		public bool IsActive { get; set; } = true;
	}
}
