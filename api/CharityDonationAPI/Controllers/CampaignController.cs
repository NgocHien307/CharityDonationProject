using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.Controllers
{

	[Microsoft.AspNetCore.Components.Route("api/campaign")]
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
		public async Task<IActionResult> GetCampaign(int id)
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

		[HttpPost("Add-user")]
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


		
	}
}
