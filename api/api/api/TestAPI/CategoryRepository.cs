using CharityDonationApi.Data;
using CharityDonationApi.Models;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CharityDonationApi.Tests
{
    [TestFixture]
    public class CategoryRepositoryTests
    {
        private CharityDbContext _dbContext;
        private CategoryRepository _categoryRepository;

        [SetUp]
        public void Setup()
        {
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var options = new DbContextOptionsBuilder<CharityDbContext>()
                .UseSqlServer(config.GetConnectionString("DefaultConnection"))
                .Options;

            _dbContext = new CharityDbContext(options);

            // Xoá sạch dữ liệu trong bảng Categories để tránh lỗi trùng lặp.
            if (_dbContext.Categories.Any())
            {
                _dbContext.Categories.RemoveRange(_dbContext.Categories);
                _dbContext.SaveChanges();
            }

            _categoryRepository = new CategoryRepository(_dbContext);
        }

        [TearDown]
        public void TearDown()
        {
            _dbContext.Dispose();
        }

        [Test]
        public async Task GetAllCategory_ShouldReturnAllCategories()
        {
            // Arrange: Thêm 2 category vào InMemoryDB
            _dbContext.Categories.Add(new Category
            {
                Name = "Category 1",
                Description = "Description 1"
            });
            _dbContext.Categories.Add(new Category
            {
                Name = "Category 2",
                Description = "Description 2"
            });
            await _dbContext.SaveChangesAsync();

            // Act: Gọi phương thức GetAllCategory
            var result = await _categoryRepository.GetAllCategory();

            // Assert: Kiểm tra số lượng và dữ liệu trả về
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count);
            Assert.IsTrue(result.Any(c => c.Name == "Category 1"));
            Assert.IsTrue(result.Any(c => c.Name == "Category 2"));
        }

        [Test]
        public async Task GetCategoryById_ShouldReturnCategoryVm_WhenExists()
        {
            // Arrange: Thêm 1 category vào DB
            var category = new Category
            {
                Name = "Category Test",
                Description = "Test Description"
            };
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            // Act: Lấy category theo Id
            var resultVm = await _categoryRepository.GetCategoryById(category.Id);

            // Assert: Kiểm tra kết quả trả về
            Assert.IsNotNull(resultVm);
            Assert.AreEqual(category.Name, resultVm.Name);
            Assert.AreEqual(category.Description, resultVm.Description);
        }

        [Test]
        public async Task GetCategoryById_ShouldReturnNull_WhenNotFound()
        {
            // Act: Gọi GetCategoryById với ID không tồn tại
            var resultVm = await _categoryRepository.GetCategoryById(999);

            // Assert: Kết quả trả về phải là null
            Assert.IsNull(resultVm);
        }

        [Test]
        public async Task addCategory_ShouldAddCategoryToDatabase()
        {
            // Arrange: Tạo viewmodel cho Category mới
            var categoryVm = new CategoryVm
            {
                Name = "New Category",
                Description = "New Description"
            };

            // Act: Gọi addCategory
            await _categoryRepository.addCategory(categoryVm);

            // Assert: Kiểm tra Category mới đã được thêm vào DB chưa
            var categoryInDb = _dbContext.Categories.FirstOrDefault(c => c.Name == "New Category");
            Assert.IsNotNull(categoryInDb);
            Assert.AreEqual("New Description", categoryInDb.Description);
        }

        [Test]
        public async Task updateCategory_ShouldUpdateExistingCategory()
        {
            // Arrange: Thêm một category vào DB
            var category = new Category
            {
                Name = "Old Category",
                Description = "Old Description"
            };
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            // Tạo viewmodel update
            var updateVm = new CategoryVm
            {
                Name = "Updated Category",
                Description = "Updated Description"
            };

            // Act: Gọi updateCategory
            await _categoryRepository.updateCategory(category.Id, updateVm);

            // Assert: Kiểm tra thông tin category đã được cập nhật
            var updatedCategory = _dbContext.Categories.FirstOrDefault(c => c.Id == category.Id);
            Assert.IsNotNull(updatedCategory);
            Assert.AreEqual("Updated Category", updatedCategory.Name);
            Assert.AreEqual("Updated Description", updatedCategory.Description);
        }

        [Test]
        public void updateCategory_ShouldThrowKeyNotFoundException_WhenCategoryNotFound()
        {
            // Arrange: Tạo viewmodel cho category không tồn tại
            var updateVm = new CategoryVm
            {
                Name = "Nonexistent Category",
                Description = "Does not exist"
            };

            // Act & Assert: Mong đợi ném ra KeyNotFoundException
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _categoryRepository.updateCategory(999, updateVm));
        }

        [Test]
        public async Task deleteCategory_ShouldRemoveCategoryFromDatabase()
        {
            // Arrange: Thêm một category vào DB
            var category = new Category
            {
                Name = "Delete Category",
                Description = "To be deleted"
            };
            _dbContext.Categories.Add(category);
            await _dbContext.SaveChangesAsync();

            // Act: Gọi deleteCategory
            await _categoryRepository.deleteCategory(category.Id);

            // Assert: Kiểm tra category đã bị xoá
            var deletedCategory = _dbContext.Categories.FirstOrDefault(c => c.Id == category.Id);
            Assert.IsNull(deletedCategory);
        }

        [Test]
        public void deleteCategory_ShouldThrowKeyNotFoundException_WhenCategoryNotFound()
        {
            // Act & Assert: Mong đợi ném ra KeyNotFoundException khi không tìm thấy category
            Assert.ThrowsAsync<KeyNotFoundException>(() =>
                _categoryRepository.deleteCategory(999));
        }
    }
}
