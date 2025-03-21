namespace CharityDonationApi.ViewModels
{
	public class CampaignsVm
	{
		public int Id { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public decimal GoalAmount { get; set; }

		public decimal CollectedAmount { get; set; }

		public bool IsActive { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime? EndDate { get; set; }

		public string FeaturedImageUrl { get; set; }

		public int CreatorId { get; set; }

		public string CreatorName { get; set; } // Hiển thị tên Creator thay vì đối tượng Creator

		public int? CategoryId { get; set; }

		public string CategoryName { get; set; } // Hiển thị tên danh mục thay vì đối tượng Category

		public string Status { get; set; }
	}
}
