using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
	public class CategoryRepository : ICategoryRepository
	{
		private readonly CharityDbContext _context;

		public CategoryRepository(CharityDbContext context)
		{
			_context = context;
		}

		public async Task<List<Category>> GetAllCategory()
		{
			return await _context.Categories.ToListAsync();
		}

		public async Task<CategoryVm> GetCategoryById(int id)
		{
			var category = await _context.Categories
				.FirstOrDefaultAsync(p => p.Id == id);
			if (category == null)
			{
				return null;
			}

			return new CategoryVm
			{
				Id = category.Id,
				Name = category.Name,
				Description = category.Description
			};
		}

		public async Task addCategory(CategoryVm categoryVm)
		{
			var category = new Category
			{
				Name = categoryVm.Name,
				Description = categoryVm.Description
			};

			_context.Categories.Add(category);
			await _context.SaveChangesAsync();
		}

		public async Task updateCategory(int id, CategoryVm categoryVm)
		{
			var category = await _context.Categories.FindAsync(id);

			if (category == null)
			{
				throw new KeyNotFoundException($"Campaign with id {id} not found");
			}

			category.Name = categoryVm.Name;
			category.Description = categoryVm.Description;

			_context.Categories.Update(category);
			await _context.SaveChangesAsync();
		}

		public async Task deleteCategory(int id)
		{
			var category = await _context.Categories.FindAsync(id);

			if (category == null)
			{
				throw new KeyNotFoundException($"Campaign with id {id} not found");
			}

			_context.Categories.Remove(category);
			await _context.SaveChangesAsync();
		}
	}
}
