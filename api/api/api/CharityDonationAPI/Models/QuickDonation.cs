using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class QuickDonation
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[Range(1, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
		public decimal Amount { get; set; } 

		[Required]
		public DateTime Date { get; set; } = DateTime.UtcNow; 

		[ForeignKey("User")]
		public int? UserId { get; set; }
		public Users User { get; set; }

		[Required]
		[ForeignKey("Transaction")]
		public int TransactionId { get; set; }
		public Transaction Transaction { get; set; }
	}
}
