using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class QuickDonation
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[Range(1000, double.MaxValue, ErrorMessage = "Amount must be at least 1000 VND.")]
		public decimal Amount { get; set; }

		[Required]
		public DateTime Date { get; set; } = DateTime.UtcNow;

		[ForeignKey("User")]
		public int? UserId { get; set; }
		public Users User { get; set; }

		[ForeignKey("Transaction")]
		public int? TransactionId { get; set; }
		public Transaction Transaction { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Pending";

        [MaxLength(255)]
        public string QrCodeUrl { get; set; }
    }
}
