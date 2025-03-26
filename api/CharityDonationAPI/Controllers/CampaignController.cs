using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using CharityDonationApi.Repositories;

namespace CharityDonationApi.Controllers
{

	[Route("api/campaign")]
	[ApiController]
	public class CampaignController : ControllerBase
	{
		private readonly ICampaignRepository _campaignRepository;

		public CampaignController(ICampaignRepository campaignRepository)
		{
			_campaignRepository = campaignRepository;
		}

		[HttpGet("Get-all-campaigns")]
		public async Task<ActionResult<IEnumerable<CampaignsVm>>> getCampaigns()
		{
			try
			{
				var campaigns = await _campaignRepository.GetAllCampaigns();

				return Ok(campaigns);	
			}
			catch(Exception ex) 
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpGet("Get-Campaign-by-Id")]
		public async Task<IActionResult> GetCampaignById(int id)
		{
			try
			{
				var campaign = await _campaignRepository.GetCampaignById(id);

				if(campaign == null)
				{
					return NotFound($"Campaign with id {id} not found");
				}
				return Ok(campaign);

			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpPost("Add-campaign")]
		public async Task<IActionResult> CreateCampaign([FromBody] CampaignsVm campaignsVm)
		{
			try
			{
				await _campaignRepository.addCampaign(campaignsVm);
				return Ok();

			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpPut("Update-campaign/{id}")]
		public async Task<IActionResult> UpdateCampaign(int id,[FromBody] CampaignsVm campaignsVm)
		{
			if(id != campaignsVm.Id)
			{
				return BadRequest("Campaign Id isn't match");
			}

			try
			{
				await _campaignRepository.updateCampaign(id, campaignsVm);

				return Ok();
			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error updating post: {ex.Message}");
			}
		}

		[HttpDelete("delete-campaign/{id}")]
		public async Task<IActionResult> DeleteCampaign(int id)
		{
			try
			{
				await _campaignRepository.deleteCampaign(id);

				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error deleting post: {ex.Message}");
			}
		}

        [HttpGet("search")]
        public async Task<IActionResult> SearchCampaigns([FromQuery] string title)
        {
            var campaigns = await _campaignRepository.SearchCampaigns(title);

            if (!campaigns.Any())
            {
                return NotFound($"Không tìm thấy chiến dịch nào với từ khóa: {title}");
            }

            return Ok(campaigns);
        }




    }
}
