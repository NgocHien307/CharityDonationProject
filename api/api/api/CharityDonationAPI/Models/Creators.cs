using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class Creators
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(200)]
		public string Name { get; set; }

		[MaxLength(1000)]
		public string Description { get; set; }

		[MaxLength(500)]
		public string LogoUrl { get; set; }

		[Required]
		[EmailAddress]
		[MaxLength(100)]
		public string Email { get; set; }

		[Phone]
		[MaxLength(20)]
		public string PhoneNumber { get; set; }

		[MaxLength(500)]
		public string Address { get; set; }

		public bool IsVerified { get; set; } = false;

		[Required]
		[MaxLength(50)]
		public string Type { get; set; } // "Individual", "Organization", "Foundation"

		[ForeignKey("User")]
		public int? UserId { get; set; }
		public Users User { get; set; }

		public ICollection<Campaigns> Campaigns { get; set; } = new List<Campaigns>();

		[MaxLength(500)]
		public string VerificationDocumentUrl { get; set; }

		public DateTime? VerificationDate { get; set; }
    }
}
