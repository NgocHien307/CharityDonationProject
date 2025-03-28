using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class Donation
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
		public decimal Amount { get; set; }

		[Required]
		public DateTime Date { get; set; } = DateTime.UtcNow;

		[MaxLength(500)]
		public string Message { get; set; } 

		public bool IsAnonymous { get; set; } = false; // Quyên góp ẩn danh

		[ForeignKey("User")]
		public int? UserId { get; set; }
		public Users User { get; set; }

		[Required]
		[ForeignKey("Campaign")]
		public int CampaignId { get; set; }
		public Campaigns Campaign { get; set; }

		// Liên kết với Transaction (có thể null)
		[ForeignKey("Transaction")]
		public int? TransactionId { get; set; }
		public Transaction Transaction { get; set; }
	}
}
