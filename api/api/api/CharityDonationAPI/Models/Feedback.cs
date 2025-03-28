using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CharityDonationApi.Models
{
	public class Feedback
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(1000)] 
		public string Comment { get; set; }

		[Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
		public int Rating { get; set; } 

		[Required]
		public DateTime Date { get; set; } = DateTime.UtcNow;

		[Required]
		[ForeignKey("User")]
		public int UserId { get; set; }
		public Users User { get; set; }

		[Required]
		[ForeignKey("Campaign")]
		public int CampaignId { get; set; }
		public Campaigns Campaign { get; set; }

	}
}
