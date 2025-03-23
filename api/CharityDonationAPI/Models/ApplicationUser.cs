using Microsoft.AspNetCore.Identity;

namespace CharityDonationApi.Models
{
	public class ApplicationUser : IdentityUser
	{
		public string Custom {  get; set; }
	}
}
