using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Comment { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Campaign")]
        public int CampaignId { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual Campaign Campaign { get; set; }
    }
}
