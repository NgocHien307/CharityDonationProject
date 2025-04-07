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
using Microsoft.EntityFrameworkCore.InMemory;

namespace CharityDonationApi.Tests
{
    [TestFixture]
    public class UserRepositoryTests
    {
        private CharityDbContext _dbContext;
        private UserRepository _userRepository;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _dbContext = new CharityDbContext(options);
            _userRepository = new UserRepository(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetAll_ShouldReturnAllUsers()
        {
            // Arrange
            _dbContext.Users.Add(new Users
            {
                FullName = "User 1",
                Email = "user1@test.com",
                PasswordHash = "abc",
                RoleId = 1,
                PhoneNumber = "000111222",
                AvatarUrl = "http://example.com/1"
            });
            _dbContext.Users.Add(new Users
            {
                FullName = "User 2",
                Email = "user2@test.com",
                PasswordHash = "abc",
                RoleId = 2,
                PhoneNumber = "111222333",
                AvatarUrl = "http://example.com/2"
            });
            await _dbContext.SaveChangesAsync();

            // Act
            var result = await _userRepository.GetAll();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
        }

        [Test]
        public async Task GetById_ShouldReturnCorrectUserVm_WhenUserExists()
        {
            // Arrange
            var user = new Users
            {
                FullName = "User Test",
                Email = "testuser@test.com",
                PasswordHash = "hash",
                RoleId = 1,
                PhoneNumber = "0123456789",
                AvatarUrl = "http://example.com/avatar.jpg"
            };
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Act
            var result = await _userRepository.GetById(user.Id);

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(user.FullName, result.FullName);
            Assert.AreEqual(user.Email, result.Email);
            Assert.AreEqual(user.PasswordHash, result.PasswordHash);
            Assert.AreEqual(user.RoleId, result.RoleId);
        }

        [Test]
        public async Task GetById_ShouldReturnNull_WhenUserNotFound()
        {
            // Act
            var result = await _userRepository.GetById(999); // ID không tồn tại

            // Assert
            Assert.IsNull(result);
        }

        [Test]
        public async Task AddUser_ShouldAddUserToDatabase()
        {
            // Arrange
            var newUser = new UserVm
            {
                FullName = "New User",
                Email = "newuser@test.com",
                PasswordHash = "abc123",
                RoleId = 1,
                PhoneNumber = "0123456789",
                AvatarUrl = "http://example.com/avatar.jpg"
            };

            // Act
            await _userRepository.AddUser(newUser);

            // Assert
            var userInDb = _dbContext.Users.FirstOrDefault(u => u.Email == "newuser@test.com");
            Assert.IsNotNull(userInDb);
            Assert.AreEqual("New User", userInDb.FullName);
            Assert.AreEqual("0123456789", userInDb.PhoneNumber);
            Assert.AreEqual("http://example.com/avatar.jpg", userInDb.AvatarUrl);
        }

        [Test]
        public async Task UpdateUser_ShouldUpdateExistingUser()
        {
            // Arrange
            var existingUser = new Users
            {
                FullName = "Old Name",
                Email = "old@test.com",
                PasswordHash = "oldhash",
                RoleId = 1,
                PhoneNumber = "0000000000",
                AvatarUrl = "http://example.com/old_avatar.jpg"
            };
            _dbContext.Users.Add(existingUser);
            await _dbContext.SaveChangesAsync();

            var updateVm = new UserVm
            {
                FullName = "New Name",
                Email = "new@test.com",
                PasswordHash = "newhash",
                IsActive = false,
                PhoneNumber = "123456789",
                AvatarUrl = "http://example.com/new_avatar.jpg"
            };

            // Act
            await _userRepository.UpdateUser(existingUser.Id, updateVm);

            // Assert
            var updatedUser = _dbContext.Users.FirstOrDefault(u => u.Id == existingUser.Id);
            Assert.IsNotNull(updatedUser);
            Assert.AreEqual("New Name", updatedUser.FullName);
            Assert.AreEqual("new@test.com", updatedUser.Email);
            Assert.AreEqual("newhash", updatedUser.PasswordHash);
            Assert.IsFalse(updatedUser.IsActive);
            Assert.AreEqual("123456789", updatedUser.PhoneNumber);
            Assert.AreEqual("http://example.com/new_avatar.jpg", updatedUser.AvatarUrl);
        }

        [Test]
        public void UpdateUser_ShouldThrowKeyNotFoundException_WhenUserNotFound()
        {
            // Arrange
            var updateVm = new UserVm
            {
                FullName = "Fake",
                Email = "fake@test.com",
                PasswordHash = "hash",
                PhoneNumber = "123456789",
                AvatarUrl = "http://example.com/avatar.jpg"
            };

            // Act & Assert
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _userRepository.UpdateUser(999, updateVm));
        }

        [Test]
        public async Task DeleteUser_ShouldRemoveUserFromDatabase()
        {
            // Arrange
            var user = new Users
            {
                FullName = "To Delete",
                Email = "delete@test.com",
                PasswordHash = "delhash",
                RoleId = 1,
                PhoneNumber = "987654321",
                AvatarUrl = "http://example.com/delete_avatar.jpg"
            };
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Act
            await _userRepository.DeleteUser(user.Id);

            // Assert
            var deletedUser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.IsNull(deletedUser);
        }

        [Test]
        public async Task SearchUsers_ShouldReturnMatchingUsers()
        {
            // Arrange
            _dbContext.Users.Add(new Users
            {
                FullName = "User 1",
                Email = "user1@test.com",
                PhoneNumber = "123456",
                PasswordHash = "hash",
                RoleId = 1,
                AvatarUrl = "http://example.com/avatar1"
            });
            _dbContext.Users.Add(new Users
            {
                FullName = "User 2",
                Email = "other@test.com",
                PhoneNumber = "999999",
                PasswordHash = "hash",
                RoleId = 1,
                AvatarUrl = "http://example.com/avatar2"
            });
            await _dbContext.SaveChangesAsync();

            // Act
            var result1 = await _userRepository.SearchUsers("user1");   // tìm theo email
            var result2 = await _userRepository.SearchUsers("999999");  // tìm theo phone

            // Assert
            Assert.AreEqual(1, result1.Count);
            Assert.AreEqual("user1@test.com", result1.First().Email);

            Assert.AreEqual(1, result2.Count);
            Assert.AreEqual("other@test.com", result2.First().Email);
        }

        [Test]
        public async Task AssignRole_ShouldUpdateUserRole()
        {
            // Arrange
            var user = new Users
            {
                FullName = "User",
                Email = "test@test.com",
                PasswordHash = "hash",
                RoleId = 1,
                PhoneNumber = "0123456789",
                AvatarUrl = "http://example.com/avatar.jpg"
            };
            var role2 = new Role { Id = 2, Name = "Admin" };

            // Thêm user + 1 số role
            _dbContext.Users.Add(user);
            _dbContext.Roles.Add(new Role { Id = 1, Name = "UserRole" });
            _dbContext.Roles.Add(role2);
            await _dbContext.SaveChangesAsync();

            // Act
            await _userRepository.AssignRole(user.Id, role2.Id);

            // Assert
            var updatedUser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.IsNotNull(updatedUser);
            Assert.AreEqual(2, updatedUser.RoleId);
        }

        [Test]
        public async Task ControlUserAccess_ShouldSetIsActive()
        {
            // Arrange
            var user = new Users
            {
                FullName = "TestUser",
                Email = "test@test.com",
                PasswordHash = "hash",
                RoleId = 1,
                IsActive = true,
                PhoneNumber = "000111222",
                AvatarUrl = "http://example.com/test_avatar.jpg"
            };
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            // Act
            await _userRepository.ControlUserAccess(user.Id, false);

            // Assert
            var updatedUser = _dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.IsNotNull(updatedUser);
            Assert.IsFalse(updatedUser.IsActive);
        }

        [Test]
        public async Task GetPaginatedUsers_ShouldReturnCorrectPagination()
        {
            // Arrange
            for (int i = 1; i <= 15; i++)
            {
                _dbContext.Users.Add(new Users
                {
                    FullName = "User " + i,
                    Email = $"user{i}@test.com",
                    PasswordHash = "hash",
                    RoleId = 1,
                    PhoneNumber = $"0000000{i}",
                    AvatarUrl = $"http://example.com/avatar{i}"
                });
            }
            await _dbContext.SaveChangesAsync();

            // Act
            var (users, totalCount, totalPages) = await _userRepository.GetPaginatedUsers(2, 5);

            // Assert
            Assert.AreEqual(5, users.Count); // 5 user trong trang 2
            Assert.AreEqual(15, totalCount); // tổng cộng 15 user
            Assert.AreEqual(3, totalPages);  // 15/5 = 3 trang
            Assert.IsTrue(users.Any(u => u.Email == "user6@test.com"));
        }
    }
}
