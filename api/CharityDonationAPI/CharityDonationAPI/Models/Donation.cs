using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace DB_Charity_G3.Models
{
    public class Donation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [ForeignKey("Campaign")]
        public int CampaignId { get; set; }

        [ForeignKey("Transaction")]
        public int? TransactionId { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual Campaign Campaign { get; set; }
        public virtual Transaction Transaction { get; set; }
    }

}
