using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Models
{
    public class QuickDonation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        public DateTime Date { get; set; }

        [ForeignKey("User")]
        public int? UserId { get; set; }  

        [ForeignKey("Transaction")]
        public int TransactionId { get; set; }

        // Navigation properties
        public virtual User User { get; set; }
        public virtual Transaction Transaction { get; set; }
    }

}
