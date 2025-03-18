using DB_Charity_G3.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB_Charity_G3.Data
{
	public class CharityDbContext : DbContext
	{
		public CharityDbContext(DbContextOptions<CharityDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Donation> Donations { get; set; }
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<QuickDonation> QuickDonations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure relationships
            modelBuilder.Entity<User>()
                .HasOne(u => u.Role)
                .WithMany(r => r.Users)
                .HasForeignKey(u => u.RoleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Donation>()
                .HasOne(d => d.User)
                .WithMany(u => u.Donations)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Donation>()
                .HasOne(d => d.Campaign)
                .WithMany(c => c.Donations)
                .HasForeignKey(d => d.CampaignId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Donation>()
                .HasOne(d => d.Transaction)
                .WithMany(t => t.Donations)
                .HasForeignKey(d => d.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.User)
                .WithMany(u => u.Feedbacks)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Feedback>()
                .HasOne(f => f.Campaign)
                .WithMany(c => c.Feedbacks)
                .HasForeignKey(f => f.CampaignId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<QuickDonation>()
                .HasOne(qd => qd.User)
                .WithMany(u => u.QuickDonations)
                .HasForeignKey(qd => qd.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<QuickDonation>()
                .HasOne(qd => qd.Transaction)
                .WithMany(t => t.QuickDonations)
                .HasForeignKey(qd => qd.TransactionId)
                .OnDelete(DeleteBehavior.Restrict);

            // Set default values and constraints
            modelBuilder.Entity<User>()
                .Property(u => u.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Campaign>()
                .Property(c => c.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Campaign>()
                .Property(c => c.CollectedAmount)
                .HasDefaultValue(0.00m);

            // thêm từng role tương ứng
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "User" },
                //new Role { Id = 3, Name = "CampaignManager" }
            );

            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Campaign>()
                .HasIndex(c => c.Title);

            modelBuilder.Entity<Donation>()
                .HasIndex(d => d.Date);

            modelBuilder.Entity<Transaction>()
                .HasIndex(t => t.TransactionDate);
        }
    }
}
          protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseSqlServer("Server=localhost\\SQLEXPRESS;Database=ApiQuiz;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");
		}
	}
}
