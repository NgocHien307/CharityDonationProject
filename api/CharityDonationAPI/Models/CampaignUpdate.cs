using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class CampaignUpdate
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[ForeignKey("Campaign")]
		public int CampaignId { get; set; }
		public Campaigns Campaigns { get; set; }

		[Required]
		[MaxLength(200)]
		public string Title { get; set; }

		[Required]
		[MaxLength(5000)]
		public string Content { get; set; }

		[Required]
		public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

		[MaxLength(500)]
		public string MediaUrl { get; set; } // URL hình ảnh hoặc video
	}
}
