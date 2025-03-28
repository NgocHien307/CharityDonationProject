using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
	public interface ICategoryRepository
	{
		Task<List<Category>> GetAllCategory();

		Task<CategoryVm> GetCategoryById(int id);

		Task addCategory(CategoryVm categoryVm);
		Task updateCategory(int id, CategoryVm categoryVm);

		Task deleteCategory(int id);
	}
}
