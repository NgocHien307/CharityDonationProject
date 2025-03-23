using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.ViewModels
{
	public class DonationVm
	{
		public int Id { get; set; }
		public decimal Amount { get; set; }
		public DateTime Date { get; set; }
		public string Message { get; set; }
		public bool IsAnonymous { get; set; }
		public string DonorName { get; set; }  // Ẩn danh hoặc hiển thị tên thật
		public string CampaignName { get; set; }
		public int? UserId { get; set; }

		[Required]
		public int CampaignId { get; set; }
		
	}
}
