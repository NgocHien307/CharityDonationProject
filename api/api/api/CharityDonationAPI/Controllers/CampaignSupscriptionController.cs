using CharityDonationApi.IRepositoties;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{

	[Route("api/campaigns")]
	[ApiController]
	public class CampaignSupscriptionController : ControllerBase
	{
		private readonly ICampaignSubscriptionRepository _subscriptionRepo;

		public CampaignSupscriptionController(ICampaignSubscriptionRepository subscriptionRepo)
		{
			_subscriptionRepo = subscriptionRepo;
		}

		[HttpPost("{campaignId}/subscribe")]
		public async Task<IActionResult> Subscribe(int campaignId, [FromBody] int userId)
		{
			var success = await _subscriptionRepo.Subscribe(userId, campaignId);
			if (!success)
				return BadRequest("User is already subscribed to this campaign.");
			return Ok("Subscription successful.");
		}

		[HttpDelete("{campaignId}/unsubscribe")]
		public async Task<IActionResult> Unsubscribe(int campaignId, [FromBody] int userId)
		{
			var success = await _subscriptionRepo.Unsubscribe(userId, campaignId);
			if (!success)
				return BadRequest("User is not subscribed to this campaign.");
			return Ok("Unsubscription successful.");
		}

		[HttpGet("{campaignId}/subscribers")]
		public async Task<IActionResult> GetSubscribers(int campaignId)
		{
			var subscribers = await _subscriptionRepo.GetSubscribers(campaignId);
			return Ok(subscribers);
		}
	}
}
