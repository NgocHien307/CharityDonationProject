using CharityDonationApi.Models;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.ViewModels
{
	public class CategoryVm
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }

	}
}
