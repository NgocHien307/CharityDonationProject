using CharityDonationApi.IRepositories;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace CharityDonationApi.Controllers
{
    [Route("api/creators")]
    [ApiController]
    public class CreatorsController : ControllerBase
    {
        private readonly ICreatorsRepository _creatorsRepository;

        public CreatorsController(ICreatorsRepository creatorsRepository)
        {
            _creatorsRepository = creatorsRepository;
        }

        [HttpGet("Get-all-creators")]
        public async Task<ActionResult<IEnumerable<CreatorsVm>>> GetAllCreators()
        {
            try
            {
                var creators = await _creatorsRepository.GetAllCreators();
                return Ok(creators);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving creators: {ex.Message}");
            }
        }

        [HttpGet("Get-creator-by-Id")]
        public async Task<IActionResult> GetCreatorById(int id)
        {
            try
            {
                var creator = await _creatorsRepository.GetCreatorById(id);
                if (creator == null)
                {
                    return NotFound($"Creator with id {id} not found");
                }
                return Ok(creator);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving creator: {ex.Message}");
            }
        }

        [HttpPost("Add-creator")]
        public async Task<IActionResult> AddCreator([FromBody] CreatorsVm creatorVm)
        {
            try
            {
                await _creatorsRepository.AddCreator(creatorVm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error adding creator: {ex.Message}");
            }
        }

        [HttpPut("Update-creator/{id}")]
        public async Task<IActionResult> UpdateCreator(int id, [FromBody] CreatorsVm creatorVm)
        {
            if (id != creatorVm.Id)
            {
                return BadRequest("Creator Id isn't match");
            }

            try
            {
                await _creatorsRepository.UpdateCreator(id, creatorVm);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating creator: {ex.Message}");
            }
        }

        [HttpDelete("Delete-creator/{id}")]
        public async Task<IActionResult> DeleteCreator(int id)
        {
            try
            {
                await _creatorsRepository.DeleteCreator(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting creator: {ex.Message}");
            }
        }
    }
}