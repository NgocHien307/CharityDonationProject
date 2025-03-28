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
                    $"Error retrieving users: {ex.Message}");
            }
        }

        [HttpGet("get-user-by-id/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _userRepository.GetById(id);

                if (user == null)
                {
                    return NotFound($"User with ID {id} not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving user: {ex.Message}");
            }
        }

        [HttpPost("add-user")]
        public async Task<IActionResult> CreateUser([FromBody] UserVm userVm)
        {
            try
            {
                await _userRepository.AddUser(userVm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error creating user: {ex.Message}");
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
                    $"Error updating user: {ex.Message}");
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
                    $"Error deleting user: {ex.Message}");
            }
        }


        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                {
                    return BadRequest("Search term is required");
                }

                var users = await _userRepository.SearchUsers(searchTerm);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error searching users: {ex.Message}");
            }
        }

        [HttpPut("assign-role/{userId}")]
        public async Task<IActionResult> AssignRole(int userId, [FromBody] int roleId)
        {
            try
            {
                await _userRepository.AssignRole(userId, roleId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error assigning role: {ex.Message}");
            }
        }

        [HttpPut("control-access/{userId}")]
        public async Task<IActionResult> ControlUserAccess(int userId, [FromBody] bool isActive)
        {
            try
            {
                await _userRepository.ControlUserAccess(userId, isActive);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error controlling user access: {ex.Message}");
            }
        }


        [HttpGet("paginated")]
        public async Task<IActionResult> GetPaginatedUsers([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var result = await _userRepository.GetPaginatedUsers(pageNumber, pageSize);

                var response = new PaginatedResponse<UserVm>
                {
                    Items = result.Users,
                    TotalCount = result.TotalCount,
                    TotalPages = result.TotalPages,
                    CurrentPage = pageNumber,
                    PageSize = pageSize
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving paginated users: {ex.Message}");
            }
        }
    }
}