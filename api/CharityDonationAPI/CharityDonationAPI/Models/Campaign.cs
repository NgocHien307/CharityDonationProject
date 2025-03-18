using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Models
{
    public class Campaign
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal GoalAmount { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal CollectedAmount { get; set; }

        public bool IsActive { get; set; }

        // Navigation properties
        public virtual ICollection<Donation> Donations { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
    }
}
