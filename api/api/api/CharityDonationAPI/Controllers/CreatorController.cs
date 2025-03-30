using CharityDonationApi.IRepositories;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreatorController : ControllerBase
    {
        private readonly ICreatorRepository _creatorRepository;

        public CreatorController(ICreatorRepository creatorRepository)
        {
            _creatorRepository = creatorRepository;
        }

        // GET: api/creator/get-all-creators
        [HttpGet("get-all-creators")]
        public async Task<ActionResult<IEnumerable<CreatorsVm>>> GetAllCreators()
        {
            try
            {
                // Lấy danh sách entity
                var list = await _creatorRepository.GetAllCreators();

                // Chuyển sang ViewModel, tuỳ cách
                var result = list.Select(c => new CreatorsVm
                {
                    Id = c.Id,
                    Name = c.Name,
                    Description = c.Description,
                    LogoUrl = c.LogoUrl,
                    Email = c.Email,
                    PhoneNumber = c.PhoneNumber,
                    Address = c.Address,
                    IsVerified = c.IsVerified,
                    Type = c.Type,
                    UserId = c.UserId,
                    VerificationDocumentUrl = c.VerificationDocumentUrl,
                    VerificationDate = c.VerificationDate
                }).ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving creators: {ex.Message}");
            }
        }

        // GET: api/creator/get-creator-by-id/{id}
        [HttpGet("get-creator-by-id/{id}")]
        public async Task<ActionResult<CreatorsVm>> GetCreatorById(int id)
        {
            try
            {
                var creator = await _creatorRepository.GetCreatorById(id);
                if (creator == null)
                    return NotFound($"Creator with id {id} not found");

                var vm = new CreatorsVm
                {
                    Id = creator.Id,
                    Name = creator.Name,
                    Description = creator.Description,
                    LogoUrl = creator.LogoUrl,
                    Email = creator.Email,
                    PhoneNumber = creator.PhoneNumber,
                    Address = creator.Address,
                    IsVerified = creator.IsVerified,
                    Type = creator.Type,
                    UserId = creator.UserId,
                    VerificationDocumentUrl = creator.VerificationDocumentUrl,
                    VerificationDate = creator.VerificationDate
                };
                return Ok(vm);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving creator: {ex.Message}");
            }
        }

        // POST: api/creator/add-creator
        [HttpPost("add-creator")]
        public async Task<IActionResult> AddCreator([FromBody] CreatorsVm vm)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid data");

                await _creatorRepository.AddCreator(vm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error adding creator: {ex.Message}");
            }
        }

        // PUT: api/creator/update-creator/{id}
        [HttpPut("update-creator/{id}")]
        public async Task<IActionResult> UpdateCreator(int id, [FromBody] CreatorsVm vm)
        {
            try
            {
                if (id != vm.Id)
                    return BadRequest("Creator ID mismatch");

                await _creatorRepository.UpdateCreator(id, vm);
                return Ok();
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating creator: {ex.Message}");
            }
        }

        // DELETE: api/creator/delete-creator/{id}
        [HttpDelete("delete-creator/{id}")]
        public async Task<IActionResult> DeleteCreator(int id)
        {
            try
            {
                await _creatorRepository.DeleteCreator(id);
                return Ok();
            }
            catch (KeyNotFoundException knfEx)
            {
                return NotFound(knfEx.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting creator: {ex.Message}");
            }
        }
    }
}
