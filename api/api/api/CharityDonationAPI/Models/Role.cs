using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
	public class Role
	{
		[Key]
		public int Id { get; set; }

		[Required]
		[MaxLength(50)] 
		public string Name { get; set; }

		[MaxLength(255)]
		public string Description { get; set; }

		public ICollection<Users> Users { get; set; } = new HashSet<Users>();
	}
}
