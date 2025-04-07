using CharityDonationApi.Data;
using CharityDonationApi.Models;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CharityDonationApi.Tests
{
    [TestFixture]
    public class CreatorRepositoryTests
    {
        private CharityDbContext _dbContext;
        private CreatorRepository _creatorRepository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString())
                .Options;

            _dbContext = new CharityDbContext(options);
            _creatorRepository = new CreatorRepository(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetAllCreators_ShouldReturnAllCreators()
        {
            // Arrange
            _dbContext.Creators.Add(new Creators
            {
                Name = "Creator 1",
                Description = "Description 1",
                LogoUrl = "http://example.com/logo1.jpg",
                Email = "creator1@test.com",
                PhoneNumber = "0123456789",
                Address = "Address 1",
                IsVerified = true,
                Type = "Individual",
                VerificationDocumentUrl = "http://example.com/doc1.pdf",
                VerificationDate = DateTime.UtcNow,
                UserId = null
            });
            _dbContext.Creators.Add(new Creators
            {
                Name = "Creator 2",
                Description = "Description 2",
                LogoUrl = "http://example.com/logo2.jpg",
                Email = "creator2@test.com",
                PhoneNumber = "0987654321",
                Address = "Address 2",
                IsVerified = false,
                Type = "Organization",
                VerificationDocumentUrl = "http://example.com/doc2.pdf",
                VerificationDate = DateTime.UtcNow,
                UserId = 1
            });
            await _dbContext.SaveChangesAsync();

            // Act
            var creators = await _creatorRepository.GetAllCreators();

            // Assert
            Assert.IsNotNull(creators);
            Assert.AreEqual(2, creators.Count);
            Assert.IsTrue(creators.Any(c => c.Name == "Creator 1"));
            Assert.IsTrue(creators.Any(c => c.Name == "Creator 2"));
        }

        [Test]
        public async Task GetCreatorById_ShouldReturnCreator_WhenExists()
        {
            // Arrange
            var creator = new Creators
            {
                Name = "Test Creator",
                Description = "Test Description",
                LogoUrl = "http://example.com/logo.jpg",
                Email = "testcreator@test.com",
                PhoneNumber = "0123456789",
                Address = "Test Address",
                IsVerified = true,
                Type = "Foundation",
                VerificationDocumentUrl = "http://example.com/doc.pdf",
                VerificationDate = DateTime.UtcNow,
                UserId = 2
            };
            _dbContext.Creators.Add(creator);
            await _dbContext.SaveChangesAsync();

            // Act
            var result = await _creatorRepository.GetCreatorById(creator.Id);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(creator.Name, result.Name);
            Assert.AreEqual(creator.Email, result.Email);
            Assert.AreEqual(creator.Type, result.Type);
        }

        [Test]
        public async Task GetCreatorById_ShouldReturnNull_WhenNotFound()
        {
            // Act
            var result = await _creatorRepository.GetCreatorById(999);

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task AddCreator_ShouldAddCreatorToDatabase()
        {
            // Arrange
            var creatorVm = new CreatorsVm
            {
                Name = "New Creator",
                Description = "New Description",
                LogoUrl = "http://example.com/newlogo.jpg",
                Email = "newcreator@test.com",
                PhoneNumber = "0987654321",
                Address = "New Address",
                IsVerified = false,
                Type = "Individual",
                UserId = null,
                VerificationDocumentUrl = "http://example.com/newdoc.pdf",
                VerificationDate = DateTime.UtcNow
            };

            // Act
            await _creatorRepository.AddCreator(creatorVm);

            // Assert
            var creatorInDb = _dbContext.Creators.FirstOrDefault(c => c.Email == "newcreator@test.com");
            Assert.IsNotNull(creatorInDb);
            Assert.AreEqual("New Creator", creatorInDb.Name);
            Assert.AreEqual("Individual", creatorInDb.Type);
        }

        [Test]
        public async Task UpdateCreator_ShouldUpdateExistingCreator()
        {
            // Arrange
            var creator = new Creators
            {
                Name = "Old Creator",
                Description = "Old Description",
                LogoUrl = "http://example.com/oldlogo.jpg",
                Email = "oldcreator@test.com",
                PhoneNumber = "0123456789",
                Address = "Old Address",
                IsVerified = false,
                Type = "Organization",
                VerificationDocumentUrl = "http://example.com/olddoc.pdf",
                VerificationDate = DateTime.UtcNow,
                UserId = 3
            };
            _dbContext.Creators.Add(creator);
            await _dbContext.SaveChangesAsync();

            var updateVm = new CreatorsVm
            {
                Name = "Updated Creator",
                Description = "Updated Description",
                LogoUrl = "http://example.com/updatedlogo.jpg",
                Email = "updatedcreator@test.com",
                PhoneNumber = "0987654321",
                Address = "Updated Address",
                IsVerified = true,
                Type = "Foundation",
                UserId = null,
                VerificationDocumentUrl = "http://example.com/updateddoc.pdf",
                VerificationDate = DateTime.UtcNow
            };

            // Act
            await _creatorRepository.UpdateCreator(creator.Id, updateVm);

            // Assert
            var updatedCreator = _dbContext.Creators.FirstOrDefault(c => c.Id == creator.Id);
            Assert.IsNotNull(updatedCreator);
            Assert.AreEqual("Updated Creator", updatedCreator.Name);
            Assert.AreEqual("updatedcreator@test.com", updatedCreator.Email);
            Assert.AreEqual("Foundation", updatedCreator.Type);
        }

        [Test]
        public void UpdateCreator_ShouldThrowKeyNotFoundException_WhenCreatorNotFound()
        {
            // Arrange
            var updateVm = new CreatorsVm
            {
                Name = "Nonexistent Creator",
                Description = "No Description",
                LogoUrl = "http://example.com/nonexistent.jpg",
                Email = "nonexistent@test.com",
                PhoneNumber = "0000000000",
                Address = "No Address",
                IsVerified = false,
                Type = "Individual",
                UserId = null,
                VerificationDocumentUrl = "http://example.com/nodoc.pdf",
                VerificationDate = DateTime.UtcNow
            };

            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _creatorRepository.UpdateCreator(999, updateVm));
        }

        [Test]
        public async Task DeleteCreator_ShouldRemoveCreatorFromDatabase()
        {
            // Arrange
            var creator = new Creators
            {
                Name = "Delete Creator",
                Description = "To be deleted",
                LogoUrl = "http://example.com/deletelogo.jpg",
                Email = "delete@test.com",
                PhoneNumber = "0123456789",
                Address = "Delete Address",
                IsVerified = false,
                Type = "Organization",
                VerificationDocumentUrl = "http://example.com/deletedoc.pdf",
                VerificationDate = DateTime.UtcNow,
                UserId = 5
            };
            _dbContext.Creators.Add(creator);
            await _dbContext.SaveChangesAsync();

            // Act
            await _creatorRepository.DeleteCreator(creator.Id);

            // Assert
            var deleted = _dbContext.Creators.FirstOrDefault(c => c.Id == creator.Id);
            Assert.IsNull(deleted);
        }

        [Test]
        public void DeleteCreator_ShouldThrowKeyNotFoundException_WhenCreatorNotFound()
        {
            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _creatorRepository.DeleteCreator(999));
        }
    }
}
