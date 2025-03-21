using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
    //[Authorize]
    [Route("api/user")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IUserRepository _userRepository;

		public UserController(IUserRepository userRepository)
		{
			_userRepository = userRepository;
		}

		[HttpGet("get-all-user")]
		public async Task<ActionResult<IEnumerable<UserVm>>> GetUsers()
		{
			try
			{
				var users = await _userRepository.GetAll();

				return Ok(users);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpGet("get-user-by-id/{id}")]
		public async Task<IActionResult> GetUser(int id)
		{
			try
			{
				var user = await _userRepository.GetById(id);

				if(user == null)
				{
					return NotFound($"Post with ID {id} not found");
				}
				return Ok(user);
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving post: {ex.Message}");
			}
		}

		[HttpPost("add-user")]
		public async Task<IActionResult> CreateUser([FromBody]UserVm userVm)
		{
			try
			{
				await _userRepository.AddUser(userVm);
				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error creating post: {ex.Message}");
			}
		}

		[HttpPut("update-user/{id}")]
		public async Task<IActionResult> UpdateUser(int id, [FromBody] UserVm userVm)
		{
			if (id != userVm.Id)
			{
				return BadRequest("User ID isn't match");
			}

			try
			{
				await _userRepository.UpdateUser(id, userVm);

				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error updating post: {ex.Message}");
			}
		}

		[HttpDelete("delete-user/{id}")]
		public async Task<IActionResult> DeleteUser(int id)
		{
			try
			{
				await _userRepository.DeleteUser(id);

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
