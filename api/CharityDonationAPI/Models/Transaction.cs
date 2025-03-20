using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class Transaction
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(50)]
		public string PaymentMethod { get; set; } // Phương thức thanh toán ("Credit Card", "Bank Transfer", "E-Wallet", ...)

		[Required]
		[MaxLength(20)]
		public string PaymentStatus { get; set; } 
		[Required]
		public DateTime TransactionDate { get; set; } = DateTime.UtcNow; 
		[Required]
		[Range(1, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
		public decimal Amount { get; set; } 
		// Mã tham chiếu của giao dịch ( cổng thanh toán cung cấp)
		[MaxLength(100)]
		public string TransactionReference { get; set; }

		[Required]
		[MaxLength(10)]
		public string Currency { get; set; } // Đơn vị tièn

		[Required]
		[MaxLength(50)]
		public string PaymentGateway { get; set; } // PayPal, Stripe, VNPay, MoMo
	}
}
