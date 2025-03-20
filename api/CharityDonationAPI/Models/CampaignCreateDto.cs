using System.ComponentModel.DataAnnotations;

namespace CharityDonationApi.Models
{
    public class CampaignCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }

        [Required]
        [MaxLength(1000)]
        public string Description { get; set; }

        [Required]
        public decimal GoalAmount { get; set; }

        public decimal CollectedAmount { get; set; } = 0;

        public bool IsActive { get; set; } = true;

        public DateTime StartDate { get; set; } = DateTime.UtcNow;

        public DateTime? EndDate { get; set; }

        [Required]
        [Url]
        public string FeaturedImageUrl { get; set; }

        [Required]
        public int CreatorId { get; set; }

        public int? CategoryId { get; set; }

        public string Status { get; set; }
    }
}