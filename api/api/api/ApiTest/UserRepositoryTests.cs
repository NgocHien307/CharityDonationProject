using CharityDonationApi.Data;
using CharityDonationApi.Models;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CharityDonationApi.UnitTests
{
    public class UserRepositoryTests
    {
        private CharityDbContext GetInMemoryDbContext(string dbName)
        {
            // Tạo tùy chọn cho DbContext InMemory
            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            // Tạo instance CharityDbContext để test
            var dbContext = new CharityDbContext(options);
            return dbContext;
        }

        [Fact]
        public async Task GetAll_ShouldReturnAllUsers()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            // Thêm một vài user vào database InMemory
            dbContext.Users.Add(new Users { FullName = "User 1", Email = "user1@test.com", PasswordHash = "abc", RoleId = 1 });
            dbContext.Users.Add(new Users { FullName = "User 2", Email = "user2@test.com", PasswordHash = "abc", RoleId = 2 });
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            var result = await repo.GetAll();

            // Assert
            Assert.NotNull(result);
            Assert.Equal(2, result.Count);
            Assert.Contains(result, r => r.FullName == "User 1");
            Assert.Contains(result, r => r.FullName == "User 2");
        }

        [Fact]
        public async Task GetById_ShouldReturnCorrectUserVm_WhenUserExists()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var user = new Users
            {
                FullName = "User Test",
                Email = "testuser@test.com",
                PasswordHash = "hash",
                RoleId = 1
            };
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            var result = await repo.GetById(user.Id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(user.FullName, result.FullName);
            Assert.Equal(user.Email, result.Email);
            Assert.Equal(user.PasswordHash, result.PasswordHash);
            Assert.Equal(user.RoleId, result.RoleId);
        }

        [Fact]
        public async Task GetById_ShouldReturnNull_WhenUserNotFound()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var repo = new UserRepository(dbContext);

            // Act
            var result = await repo.GetById(999); // id không tồn tại

            // Assert
            Assert.Null(result);
        }

        [Fact]
        public async Task AddUser_ShouldAddUserToDatabase()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var repo = new UserRepository(dbContext);

            var newUser = new UserVm
            {
                FullName = "New User",
                Email = "newuser@test.com",
                PasswordHash = "abc123",
                RoleId = 1
            };

            // Act
            await repo.AddUser(newUser);

            // Assert
            var userInDb = dbContext.Users.FirstOrDefault(u => u.Email == "newuser@test.com");
            Assert.NotNull(userInDb);
            Assert.Equal("New User", userInDb.FullName);
        }

        [Fact]
        public async Task UpdateUser_ShouldUpdateExistingUser()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var existingUser = new Users
            {
                FullName = "Old Name",
                Email = "old@test.com",
                PasswordHash = "oldhash",
                RoleId = 1
            };
            dbContext.Users.Add(existingUser);
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            var updateVm = new UserVm
            {
                FullName = "New Name",
                Email = "new@test.com",
                PasswordHash = "newhash",
                IsActive = false,
                PhoneNumber = "123456789"
            };

            // Act
            await repo.UpdateUser(existingUser.Id, updateVm);

            // Assert
            var updatedUser = dbContext.Users.FirstOrDefault(u => u.Id == existingUser.Id);
            Assert.NotNull(updatedUser);
            Assert.Equal("New Name", updatedUser.FullName);
            Assert.Equal("new@test.com", updatedUser.Email);
            Assert.Equal("newhash", updatedUser.PasswordHash);
            Assert.False(updatedUser.IsActive);
            Assert.Equal("123456789", updatedUser.PhoneNumber);
        }

        [Fact]
        public async Task UpdateUser_ShouldThrowKeyNotFoundException_WhenUserNotFound()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var repo = new UserRepository(dbContext);
            var updateVm = new UserVm
            {
                FullName = "Fake",
                Email = "fake@test.com",
                PasswordHash = "hash"
            };

            // Act & Assert
            await Assert.ThrowsAsync<KeyNotFoundException>(() => repo.UpdateUser(999, updateVm));
        }

        [Fact]
        public async Task DeleteUser_ShouldRemoveUserFromDatabase()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var user = new Users
            {
                FullName = "To Delete",
                Email = "delete@test.com",
                PasswordHash = "delhash",
                RoleId = 1
            };
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            await repo.DeleteUser(user.Id);

            // Assert
            var deletedUser = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.Null(deletedUser);
        }

        [Fact]
        public async Task SearchUsers_ShouldReturnMatchingUsers()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            dbContext.Users.Add(new Users { FullName = "User 1", Email = "user1@test.com", PhoneNumber = "123456", PasswordHash = "hash", RoleId = 1 });
            dbContext.Users.Add(new Users { FullName = "User 2", Email = "other@test.com", PhoneNumber = "999999", PasswordHash = "hash", RoleId = 1 });
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            var result = await repo.SearchUsers("user1");

            // Assert
            Assert.Single(result);
            Assert.Equal("user1@test.com", result.First().Email);

            // Tìm theo số điện thoại
            var result2 = await repo.SearchUsers("999999");
            Assert.Single(result2);
            Assert.Equal("other@test.com", result2.First().Email);
        }

        [Fact]
        public async Task AssignRole_ShouldUpdateUserRole()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());

            // Thêm user và role
            var user = new Users
            {
                FullName = "User",
                Email = "test@test.com",
                PasswordHash = "hash",
                RoleId = 1
            };
            var role2 = new Role { Id = 2, RoleName = "Admin" };
            dbContext.Users.Add(user);
            dbContext.Roles.Add(new Role { Id = 1, RoleName = "UserRole" });
            dbContext.Roles.Add(role2);
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            await repo.AssignRole(user.Id, role2.Id);

            // Assert
            var updatedUser = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.NotNull(updatedUser);
            Assert.Equal(2, updatedUser.RoleId);
        }

        [Fact]
        public async Task ControlUserAccess_ShouldSetIsActive()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            var user = new Users
            {
                FullName = "TestUser",
                Email = "test@test.com",
                PasswordHash = "hash",
                RoleId = 1,
                IsActive = true
            };
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            await repo.ControlUserAccess(user.Id, false);

            // Assert
            var updatedUser = dbContext.Users.FirstOrDefault(u => u.Id == user.Id);
            Assert.NotNull(updatedUser);
            Assert.False(updatedUser.IsActive);
        }

        [Fact]
        public async Task GetPaginatedUsers_ShouldReturnCorrectPagination()
        {
            // Arrange
            var dbContext = GetInMemoryDbContext(Guid.NewGuid().ToString());
            for (int i = 1; i <= 15; i++)
            {
                dbContext.Users.Add(new Users
                {
                    FullName = "User " + i,
                    Email = $"user{i}@test.com",
                    PasswordHash = "hash",
                    RoleId = 1
                });
            }
            await dbContext.SaveChangesAsync();

            var repo = new UserRepository(dbContext);

            // Act
            // Yêu cầu trang 2, mỗi trang 5
            var (users, totalCount, totalPages) = await repo.GetPaginatedUsers(2, 5);

            // Assert
            Assert.Equal(5, users.Count);        // Lấy 5 User ở trang 2
            Assert.Equal(15, totalCount);        // Có tổng cộng 15 user
            Assert.Equal(3, totalPages);         // 15 / 5 = 3 trang
            // Kiểm tra tên user đầu tiên của trang 2 (lần lượt 1..5 là trang 1, 6..10 là trang 2)
            Assert.Contains(users, u => u.Email == "user6@test.com");
        }
    }
}
