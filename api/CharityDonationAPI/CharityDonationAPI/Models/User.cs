using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Models
{
    ublic class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(150)]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        public bool IsActive { get; set; }

        [ForeignKey("Role")]
        public int RoleId { get; set; }

        // Navigation properties
        public virtual Role Role { get; set; }
        public virtual ICollection<Donation> Donations { get; set; }
        public virtual ICollection<Feedback> Feedbacks { get; set; }
        public virtual ICollection<QuickDonation> QuickDonations { get; set; }
    }
}
