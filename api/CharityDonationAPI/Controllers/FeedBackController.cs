using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
	public class FeedBackController : ControllerBase
	{
		private readonly IFeedbackRepository _feedbackRepository;

		public FeedBackController(IFeedbackRepository feedbackRepository)
		{
			_feedbackRepository = feedbackRepository;
		}

		[HttpGet("get-all")]
		public async Task<IActionResult> GetAllFeedbacks()
		{
			var feedbacks = await _feedbackRepository.GetAll();
			return Ok(feedbacks);
		}

		[HttpGet("get-by-campaign/{campaignId}")]
		public async Task<IActionResult> GetByCampaignId(int campaignId)
		{
			var feedbacks = await _feedbackRepository.GetByCampaignId(campaignId);
			return Ok(feedbacks);
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> GetFeedback(int id)
		{
			var feedback = await _feedbackRepository.GetById(id);
			if (feedback == null) return NotFound("Feedback not found");
			return Ok(feedback);
		}

		[HttpPost("add")]
		public async Task<IActionResult> AddFeedback([FromBody] FeedBackVm feedbackVm)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);

			await _feedbackRepository.AddFeedback(feedbackVm);
			return Ok(new { message = "Feedback added successfully!" });
		}

		[HttpPut("update/{id}")]
		public async Task<IActionResult> UpdateFeedback(int id, [FromBody] FeedBackVm feedbackVm)
		{
			try
			{
				await _feedbackRepository.UpdateFeedback(id, feedbackVm);
				return Ok("Feedback updated successfully");
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Error updating feedback: {ex.Message}");
			}
		}

		[HttpDelete("delete/{id}")]
		public async Task<IActionResult> DeleteFeedback(int id)
		{
			await _feedbackRepository.DeleteFeedback(id);
			return Ok(new { message = "Feedback deleted successfully!" });
		}
	}
}
