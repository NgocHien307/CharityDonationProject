using CharityDonationApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Data
{
	public class CharityDbContext : DbContext
	{
		public CharityDbContext(DbContextOptions<CharityDbContext> options) : base(options)
		{
		}

		public DbSet<Campaigns> Campaigns { get; set; }
		public DbSet<Creators> Creators { get; set; }
		public DbSet<Donation> Donations { get; set; }
		public DbSet<Feedback> Feedbacks { get; set; }
		public DbSet<QuickDonation> QuickDonations { get; set; }
		public DbSet<Role> Roles { get; set; }
		public DbSet<Transaction> Transactions { get; set; }
		public DbSet<Users> Users { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<CampaignUpdate> CampaignUpdates { get; set; }
		public DbSet<CampaignSubscription> CampaignSubscriptions { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// Campaign - Creator (Many-to-One)
			modelBuilder.Entity<Campaigns>()
				.HasOne(c => c.Creator)
				.WithMany(cr => cr.Campaigns)
				.HasForeignKey(c => c.CreatorId)
				.OnDelete(DeleteBehavior.Restrict);

			// Campaign - Category (Many-to-One)
			modelBuilder.Entity<Campaigns>()
				.HasOne(c => c.Category)
				.WithMany(cat => cat.Campaigns)
				.HasForeignKey(c => c.CategoryId)
				.OnDelete(DeleteBehavior.SetNull);

			// User - Role (Many-to-One)
			modelBuilder.Entity<Users>()
				.HasOne(u => u.Role)
				.WithMany(r => r.Users)
				.HasForeignKey(u => u.RoleId)
				.OnDelete(DeleteBehavior.Restrict);

			// User - Creator (One-to-One)
			modelBuilder.Entity<Users>()
				.HasOne(u => u.Creator)
				.WithOne(c => c.User)
				.HasForeignKey<Creators>(c => c.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// Donation - Campaign (Many-to-One)
			modelBuilder.Entity<Donation>()
				.HasOne(d => d.Campaign)
				.WithMany(c => c.Donations)
				.HasForeignKey(d => d.CampaignId)
				.OnDelete(DeleteBehavior.Cascade);

			// Donation - User (Many-to-One)
			modelBuilder.Entity<Donation>()
				.HasOne(d => d.User)
				.WithMany(u => u.Donations)
				.HasForeignKey(d => d.UserId)
				.OnDelete(DeleteBehavior.Restrict);

			// Feedback - Campaign (Many-to-One)
			modelBuilder.Entity<Feedback>()
				.HasOne(f => f.Campaign)
				.WithMany(c => c.Feedbacks)
				.HasForeignKey(f => f.CampaignId)
				.OnDelete(DeleteBehavior.Cascade);

			// Feedback - User (Many-to-One)
			modelBuilder.Entity<Feedback>()
				.HasOne(f => f.User)
				.WithMany(u => u.Feedbacks)
				.HasForeignKey(f => f.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// CampaignUpdate - Campaign (Many-to-One)
			modelBuilder.Entity<CampaignUpdate>()
				.HasOne(cu => cu.Campaigns)
				.WithMany(c => c.Updates)
				.HasForeignKey(cu => cu.CampaignId)
				.OnDelete(DeleteBehavior.Cascade);

			// CampaignSubscription - User & Campaign
			modelBuilder.Entity<CampaignSubscription>()
				.HasOne(cs => cs.User)
				.WithMany(u => u.Subscriptions)
				.HasForeignKey(cs => cs.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			modelBuilder.Entity<CampaignSubscription>()
				.HasOne(cs => cs.Campaign)
				.WithMany(c => c.Subscriptions)
				.HasForeignKey(cs => cs.CampaignId)
				.OnDelete(DeleteBehavior.Cascade);

			//Decimal prob
			modelBuilder.Entity<Donation>()
				.Property(d => d.Amount)
				.HasColumnType("decimal(18,2)");

			modelBuilder.Entity<QuickDonation>()
				.Property(q => q.Amount)
				.HasColumnType("decimal(18,2)");

			modelBuilder.Entity<Transaction>()
				.Property(t => t.Amount)
				.HasColumnType("decimal(18,2)");

			// Cấu hình index
			modelBuilder.Entity<Users>()
				.HasIndex(u => u.Email)
				.IsUnique();

			modelBuilder.Entity<Role>()
				.HasIndex(r => r.Name)
				.IsUnique();

			modelBuilder.Entity<Category>()
				.HasIndex(c => c.Name)
				.IsUnique();

			// Seed data
			modelBuilder.Entity<Role>().HasData(
				new Role { Id = 1, Name = "Admin", Description = "Quản trị viên hệ thống" },
				new Role { Id = 2, Name = "User", Description = "Người dùng thông thường" },
				new Role { Id = 3, Name = "Creator", Description = "Người tạo chiến dịch" }
			);

			modelBuilder.Entity<Category>().HasData(
				new Category { Id = 1, Name = "Y tế", Description = "Chiến dịch hỗ trợ y tế, chăm sóc sức khỏe" },
				new Category { Id = 2, Name = "Giáo dục", Description = "Chiến dịch hỗ trợ giáo dục, học bổng" },
				new Category { Id = 3, Name = "Thiên tai", Description = "Hỗ trợ khắc phục hậu quả thiên tai" },
				new Category { Id = 4, Name = "Trẻ em", Description = "Hỗ trợ cho trẻ em có hoàn cảnh khó khăn" },
				new Category { Id = 5, Name = "Người già", Description = "Hỗ trợ người già neo đơn, khó khăn" }
			);
		}
	}
}
