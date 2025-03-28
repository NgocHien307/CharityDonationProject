using CharityDonationApi.Dto.Request;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;

        public AuthController(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var loginResponse = await _authRepository.Login(loginRequest);

                if (loginResponse == null)
                {
                    return Unauthorized("Invalid email or password");
                }

                return Ok(new
                {
                    token = loginResponse.Token,
                    role = loginResponse.Role,
                    status = loginResponse.Status,

                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error during login: {ex.Message}");
            }
        }


    }
}