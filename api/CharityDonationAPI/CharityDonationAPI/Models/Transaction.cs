using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentMethod { get; set; }

        [Required]
        [StringLength(50)]
        public string PaymentStatus { get; set; }

        public DateTime TransactionDate { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        // Navigation properties
        public virtual ICollection<Donation> Donations { get; set; }
        public virtual ICollection<QuickDonation> QuickDonations { get; set; }
    }

}
