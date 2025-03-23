namespace CharityDonationApi.ViewModels
{
	public class FeedBackVm
	{
		public int Id { get; set; }
		public string Comment { get; set; }
		public int Rating { get; set; }
		public DateTime Date { get; set; }
		public int UserId { get; set; }
		public string UserName { get; set; }  // Lấy từ bảng User
		public int CampaignId { get; set; }
		public string CampaignName { get; set; } // Lấy từ bảng Campaign
	}
}
