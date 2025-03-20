using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class Category
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(100)]
		public string Name { get; set; }

		[MaxLength(500)]
		public string Description { get; set; }

		public ICollection<Campaigns> Campaigns { get; set; } = new List<Campaigns>();
	}
}
