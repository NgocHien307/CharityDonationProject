using CharityDonationApi.Data;
using CharityDonationApi.Models;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace CharityDonationApi.Tests
{
    [TestFixture]
    public class CampaignRepositoryTests
    {
        private CharityDbContext _dbContext;
        private CampaignRepository _campaignRepository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new CharityDbContext(options);
            _campaignRepository = new CampaignRepository(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetAllCampaigns_ShouldReturnAllCampaigns()
        {
            // Arrange
            _dbContext.Campaigns.Add(new Campaigns
            {
                Title = "Campaign 1",
                Description = "Desc 1",
                SubDescription = "SubDesc 1",
                GoalAmount = 1000,
                FeaturedImageUrl = "http://example.com/img1.jpg",
                CreatorId = 1,
                Status = "Active"  // Đã thêm thuộc tính bắt buộc
            });
            _dbContext.Campaigns.Add(new Campaigns
            {
                Title = "Campaign 2",
                Description = "Desc 2",
                SubDescription = "SubDesc 2",
                GoalAmount = 2000,
                FeaturedImageUrl = "http://example.com/img2.jpg",
                CreatorId = 1,
                Status = "Pending"  // Đã thêm thuộc tính bắt buộc
            });
            await _dbContext.SaveChangesAsync();

            // Act
            var result = await _campaignRepository.GetAllCampaigns();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.IsTrue(result.Any(c => c.Title == "Campaign 1"));
            Assert.IsTrue(result.Any(c => c.Title == "Campaign 2"));
        }

        [Test]
        public async Task GetCampaignById_ShouldReturnCampaignVm_WhenExists()
        {
            // Arrange
            var campaign = new Campaigns
            {
                Title = "Campaign Test",
                Description = "Desc",
                SubDescription = "SubDesc",
                GoalAmount = 500,
                FeaturedImageUrl = "http://example.com/test.jpg",
                CreatorId = 1,
                CategoryId = 2,
                Status = "Active" // Đã thêm
            };
            _dbContext.Campaigns.Add(campaign);
            await _dbContext.SaveChangesAsync();

            // Act
            var resultVm = await _campaignRepository.GetCampaignById(campaign.Id);

            // Assert
            Assert.IsNotNull(resultVm);
            Assert.AreEqual(campaign.Title, resultVm.Title);
            Assert.AreEqual(campaign.Description, resultVm.Description);
            Assert.AreEqual(campaign.SubDescription, resultVm.SubDescription);
            Assert.AreEqual(campaign.GoalAmount, resultVm.GoalAmount);
            Assert.AreEqual(campaign.FeaturedImageUrl, resultVm.FeaturedImageUrl);
            Assert.AreEqual(campaign.CreatorId, resultVm.CreatorId);
            Assert.AreEqual(campaign.Status, resultVm.Status);
        }

        [Test]
        public async Task GetCampaignById_ShouldReturnNull_WhenNotFound()
        {
            // Act
            var result = await _campaignRepository.GetCampaignById(999);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task addCampaign_ShouldAddCampaignToDatabase()
        {
            // Arrange
            var campaignVm = new CampaignsVm
            {
                Title = "New Campaign",
                Description = "New Description",
                SubDescription = "New SubDesc",
                GoalAmount = 3000,
                CollectedAmount = 0,
                IsActive = true,
                EndDate = null,
                FeaturedImageUrl = "http://example.com/new.jpg",
                CreatorId = 2,
                CategoryId = 1,
                Status = "Pending" // Đã thêm
            };

            // Act
            await _campaignRepository.addCampaign(campaignVm);

            // Assert
            var campaignInDb = _dbContext.Campaigns.FirstOrDefault(c => c.Title == "New Campaign");
            Assert.IsNotNull(campaignInDb);
            Assert.AreEqual("New SubDesc", campaignInDb.SubDescription);
            Assert.AreEqual(2, campaignInDb.CreatorId);
            Assert.AreEqual(1, campaignInDb.CategoryId);
            Assert.AreEqual("Pending", campaignInDb.Status);
        }

        [Test]
        public async Task updateCampaign_ShouldUpdateExistingCampaign()
        {
            // Arrange
            var existing = new Campaigns
            {
                Title = "Old Campaign",
                Description = "Old Desc",
                SubDescription = "Old SubDesc",
                GoalAmount = 1000,
                FeaturedImageUrl = "http://example.com/old.jpg",
                CreatorId = 1,
                Status = "Active" // Đã thêm
            };
            _dbContext.Campaigns.Add(existing);
            await _dbContext.SaveChangesAsync();

            var updateVm = new CampaignsVm
            {
                Title = "Updated Campaign",
                Description = "Updated Desc",
                SubDescription = "Updated SubDesc",
                GoalAmount = 5000,
                CollectedAmount = 500,
                IsActive = false,
                FeaturedImageUrl = "http://example.com/updated.jpg",
                CreatorId = 2,
                CategoryId = 3,
                Status = "Completed" // Đã thêm
            };

            // Act
            await _campaignRepository.updateCampaign(existing.Id, updateVm);

            // Assert
            var updated = _dbContext.Campaigns.FirstOrDefault(c => c.Id == existing.Id);
            Assert.IsNotNull(updated);
            Assert.AreEqual("Updated Campaign", updated.Title);
            Assert.AreEqual("Updated Desc", updated.Description);
            Assert.AreEqual("Updated SubDesc", updated.SubDescription);
            Assert.AreEqual(5000, updated.GoalAmount);
            Assert.AreEqual(500, updated.CollectedAmount);
            Assert.IsFalse(updated.IsActive);
            Assert.AreEqual("http://example.com/updated.jpg", updated.FeaturedImageUrl);
            Assert.AreEqual(2, updated.CreatorId);
            Assert.AreEqual(3, updated.CategoryId);
            Assert.AreEqual("Completed", updated.Status);
        }

        [Test]
        public void updateCampaign_ShouldThrowKeyNotFoundException_WhenCampaignNotFound()
        {
            // Arrange
            var updateVm = new CampaignsVm
            {
                Title = "Nonexistent",
                Description = "Does not exist",
                SubDescription = "No sub",
                GoalAmount = 100,
                FeaturedImageUrl = "http://example.com/fake.jpg",
                CreatorId = 1,
                Status = "Canceled" // Đã thêm
            };

            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _campaignRepository.updateCampaign(999, updateVm));
        }

        [Test]
        public async Task deleteCampaign_ShouldRemoveCampaignFromDatabase()
        {
            // Arrange
            var campaign = new Campaigns
            {
                Title = "Delete Me",
                Description = "Delete Desc",
                SubDescription = "Delete SubDesc",
                GoalAmount = 100,
                FeaturedImageUrl = "http://example.com/del.jpg",
                CreatorId = 1,
                Status = "Active" // Đã thêm
            };
            _dbContext.Campaigns.Add(campaign);
            await _dbContext.SaveChangesAsync();

            // Act
            await _campaignRepository.deleteCampaign(campaign.Id);

            // Assert
            var deleted = _dbContext.Campaigns.FirstOrDefault(c => c.Id == campaign.Id);
            Assert.IsNull(deleted);
        }

        [Test]
        public void deleteCampaign_ShouldThrowKeyNotFoundException_WhenCampaignNotFound()
        {
            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _campaignRepository.deleteCampaign(999));
        }

        [Test]
        public async Task SearchCampaignsByTitle_ShouldReturnMatchingCampaigns()
        {
            // Arrange
            _dbContext.Campaigns.Add(new Campaigns
            {
                Title = "Food Aid",
                Description = "Food for those in need",
                SubDescription = "Help the hungry",
                GoalAmount = 5000,
                FeaturedImageUrl = "http://example.com/food.jpg",
                CreatorId = 1,
                Status = "Active" // Đã thêm
            });
            _dbContext.Campaigns.Add(new Campaigns
            {
                Title = "School Building",
                Description = "Build a new school",
                SubDescription = "Help kids learn",
                GoalAmount = 20000,
                FeaturedImageUrl = "http://example.com/school.jpg",
                CreatorId = 2,
                Status = "Pending" // Đã thêm
            });
            await _dbContext.SaveChangesAsync();

            // Act
            var result1 = await _campaignRepository.SearchCampaignsByTitle("Food");
            var result2 = await _campaignRepository.SearchCampaignsByTitle("School");
            var result3 = await _campaignRepository.SearchCampaignsByTitle("XYZ");  // Không có

            // Assert
            Assert.AreEqual(1, result1.Count);
            Assert.AreEqual("Food Aid", result1.First().Title);

            Assert.AreEqual(1, result2.Count);
            Assert.AreEqual("School Building", result2.First().Title);

            // Không có "XYZ", trả về 0
            Assert.AreEqual(0, result3.Count);
        }
    }
}
