using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace CharityDonationApi.Controllers
{
	[Route("api/campaign")]
	[ApiController]
	public class DonationController : ControllerBase
	{
		private readonly IDonationRepository _donationRepository;

		public DonationController(IDonationRepository donationRepository)
		{
			_donationRepository = donationRepository;
		}

		[HttpGet("Get-all-Donation")]
		public async Task<IActionResult> GetAll()
		{
			var donations = await _donationRepository.GetAllDonations();
			return Ok(donations);
		}

		// Lấy một donation theo ID
		[HttpGet("Get-Campaign/Id/{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var donation = await _donationRepository.GetDonationById(id);
			if (donation == null) return NotFound();
			return Ok(donation);
		}

		// Lấy donation theo Campaign
		[HttpGet("Get-Donation/campaign/{campaignId}")]
		public async Task<IActionResult> GetByCampaign(int campaignId)
		{
			var donations = await _donationRepository.GetDonationsByCampaign(campaignId);
			return Ok(donations);
		}

		// Tạo mới donation
		[HttpPost("Create-Donation")]
		public async Task<IActionResult> Create([FromBody] DonationVm model)
		{
			if (!ModelState.IsValid) return BadRequest(ModelState);

			var donation = new Donation
			{
				Amount = model.Amount,
				Message = model.Message,
				IsAnonymous = model.IsAnonymous,
				CampaignId = model.CampaignId,
				UserId = model.UserId,
				Date = DateTime.UtcNow
			};

			await _donationRepository.AddDonation(donation);

			return CreatedAtAction(nameof(GetById), new { id = donation.Id }, donation);
		}


	}
}
