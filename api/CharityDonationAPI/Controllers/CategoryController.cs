using CharityDonationApi.IRepositoties;
using CharityDonationApi.Repositories;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
	[Microsoft.AspNetCore.Components.Route("api/campaign")]
	[ApiController]
	public class CategoryController : ControllerBase
	{
		private readonly ICategoryRepository _categoryRepository;

		public CategoryController(ICategoryRepository categoryRepository)
		{
			_categoryRepository = categoryRepository;
		}

		[HttpGet("Get-all-Category")]
		public async Task<ActionResult<IEnumerable<CategoryVm>>> GetAllCategory()
		{
			try
			{
				var category = await _categoryRepository.GetAllCategory();

				return Ok(category);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpGet("Get-Category-by-Id")]
		public async Task<IActionResult> GetCategoryById(int id)
		{
			try
			{
				var category = await _categoryRepository.GetCategoryById(id);

				if (category == null)
				{
					return NotFound($"Campaign with id {id} not found");
				}
				return Ok(category);

			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpPost("Add-category")]
		public async Task<IActionResult> CreateCategory([FromBody] CategoryVm categoryVm)
		{
			try
			{
				await _categoryRepository.addCategory(categoryVm);
				return Ok();

			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpPut("Update-category/{id}")]
		public async Task<IActionResult> UpdateCategory(int id, [FromBody] CategoryVm categoryVm)
		{
			if (id != categoryVm.Id)
			{
				return BadRequest("Campaign Id isn't match");
			}

			try
			{
				await _categoryRepository.updateCategory(id, categoryVm);

				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error updating post: {ex.Message}");
			}
		}

		[HttpDelete("delete-category/{id}")]
		public async Task<IActionResult> DeleteCategory(int id)
		{
			try
			{
				await _categoryRepository.deleteCategory(id);

				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error deleting post: {ex.Message}");
			}
		}
	}
}
