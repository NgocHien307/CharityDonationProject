using CharityDonationApi.Data;
using CharityDonationApi.Models;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CharityDonationApi.Tests
{
    [TestFixture]
    public class DonationRepositoryTests
    {
        private CharityDbContext _context;
        private DonationRepository _donationRepository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;
            _context = new CharityDbContext(options);
            _donationRepository = new DonationRepository(_context);

            var user = new Users
            {
                Id = 1, // InMemory cho phép gán Id thủ công
                FullName = "Test User",
                Email = "testuser@example.com",
                PasswordHash = "hash",
                RoleId = 1,
                PhoneNumber = "123456789",
                AvatarUrl = "http://example.com/avatar.jpg",
                RegisterDate = DateTime.UtcNow
            };
            _context.Users.Add(user);

            var campaign = new Campaigns
            {
                Id = 1,
                Title = "Test Campaign",
                Description = "Test Description",
                SubDescription = "Test SubDescription",
                GoalAmount = 1000,
                FeaturedImageUrl = "http://example.com/campaign.jpg",
                CreatorId = 1, // giả định
                Status = "Active"
            };
            _context.Campaigns.Add(campaign);

            _context.SaveChanges();
        }

        [TearDown]
        public void TearDown()
        {
            _context.Dispose();
        }

        [Test]
        public async Task GetAllDonations_ShouldReturnAllDonations()
        {
            // Arrange
            var donation1 = new Donation
            {
                Amount = 50.0m,
                Date = DateTime.UtcNow,
                Message = "Great cause!",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 1
            };

            var donation2 = new Donation
            {
                Amount = 100.0m,
                Date = DateTime.UtcNow,
                Message = "Keep it up!",
                IsAnonymous = true, // anonymous: DonorName sẽ là "Anonymous"
                UserId = null,
                CampaignId = 1
            };

            _context.Donations.AddRange(donation1, donation2);
            await _context.SaveChangesAsync();

            // Act
            var result = await _donationRepository.GetAllDonations();

            // Assert
            Assert.IsNotNull(result);
            var list = result.ToList();
            Assert.AreEqual(2, list.Count);

            var d1 = list.FirstOrDefault(d => d.Amount == 50.0m);
            Assert.IsNotNull(d1);
            Assert.AreEqual("Test User", d1.DonorName);
            Assert.AreEqual("Test Campaign", d1.CampaignName);

            var d2 = list.FirstOrDefault(d => d.Amount == 100.0m);
            Assert.IsNotNull(d2);
            Assert.AreEqual("Anonymous", d2.DonorName);
        }

        [Test]
        public async Task GetDonationById_ShouldReturnDonationVm_WhenExists()
        {
            // Arrange
            var donation = new Donation
            {
                Amount = 75.0m,
                Date = DateTime.UtcNow,
                Message = "Happy to donate",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 1
            };
            _context.Donations.Add(donation);
            await _context.SaveChangesAsync();

            // Act
            var result = await _donationRepository.GetDonationById(donation.Id);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(donation.Amount, result.Amount);
            Assert.AreEqual(donation.Message, result.Message);
            Assert.AreEqual("Test User", result.DonorName);
            Assert.AreEqual("Test Campaign", result.CampaignName);
            Assert.AreEqual(1, result.CampaignId);
        }

        [Test]
        public async Task GetDonationsByCampaign_ShouldReturnDonationsForSpecificCampaign()
        {
            // Arrange
            // Thêm một campaign mới (campaign 2)
            var campaign2 = new Campaigns
            {
                Id = 2,
                Title = "Campaign 2",
                Description = "Desc 2",
                SubDescription = "SubDesc 2",
                GoalAmount = 2000,
                FeaturedImageUrl = "http://example.com/campaign2.jpg",
                CreatorId = 1,
                Status = "Active"
            };
            _context.Campaigns.Add(campaign2);
            await _context.SaveChangesAsync();

            var donation1 = new Donation
            {
                Amount = 30.0m,
                Date = DateTime.UtcNow,
                Message = "For campaign1",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 1
            };

            var donation2 = new Donation
            {
                Amount = 45.0m,
                Date = DateTime.UtcNow,
                Message = "For campaign2",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 2
            };

            _context.Donations.AddRange(donation1, donation2);
            await _context.SaveChangesAsync();

            // Act
            var resultCampaign1 = await _donationRepository.GetDonationsByCampaign(1);
            var resultCampaign2 = await _donationRepository.GetDonationsByCampaign(2);

            // Assert
            Assert.IsNotNull(resultCampaign1);
            Assert.AreEqual(1, resultCampaign1.Count());
            Assert.AreEqual("For campaign1", resultCampaign1.First().Message);

            Assert.IsNotNull(resultCampaign2);
            Assert.AreEqual(1, resultCampaign2.Count());
            Assert.AreEqual("For campaign2", resultCampaign2.First().Message);
        }

        [Test]
        public async Task GetDonationsByUser_ShouldReturnDonationsForSpecificUser()
        {
            // Arrange
            // Thêm user thứ hai
            var user2 = new Users
            {
                Id = 2,
                FullName = "Second User",
                Email = "second@example.com",
                PasswordHash = "hash",
                RoleId = 1,
                PhoneNumber = "987654321",
                AvatarUrl = "http://example.com/avatar2.jpg",
                RegisterDate = DateTime.UtcNow
            };
            _context.Users.Add(user2);
            await _context.SaveChangesAsync();

            var donation1 = new Donation
            {
                Amount = 60.0m,
                Date = DateTime.UtcNow,
                Message = "User 1 donation",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 1
            };

            var donation2 = new Donation
            {
                Amount = 80.0m,
                Date = DateTime.UtcNow,
                Message = "User 2 donation",
                IsAnonymous = false,
                UserId = 2,
                CampaignId = 1
            };

            _context.Donations.AddRange(donation1, donation2);
            await _context.SaveChangesAsync();

            // Act
            var resultUser1 = await _donationRepository.GetDonationsByUser(1);
            var resultUser2 = await _donationRepository.GetDonationsByUser(2);

            // Assert
            Assert.IsNotNull(resultUser1);
            Assert.AreEqual(1, resultUser1.Count());
            Assert.AreEqual("User 1 donation", resultUser1.First().Message);

            Assert.IsNotNull(resultUser2);
            Assert.AreEqual(1, resultUser2.Count());
            Assert.AreEqual("User 2 donation", resultUser2.First().Message);
        }

        [Test]
        public async Task AddDonation_ShouldAddDonationToDatabase()
        {
            // Arrange
            var donation = new Donation
            {
                Amount = 90.0m,
                Date = DateTime.UtcNow,
                Message = "New donation",
                IsAnonymous = false,
                UserId = 1,
                CampaignId = 1
            };

            // Act
            await _donationRepository.AddDonation(donation);

            // Assert
            var donationInDb = _context.Donations.FirstOrDefault(d => d.Message == "New donation");
            Assert.IsNotNull(donationInDb);
            Assert.AreEqual(90.0m, donationInDb.Amount);
        }
    }
}
