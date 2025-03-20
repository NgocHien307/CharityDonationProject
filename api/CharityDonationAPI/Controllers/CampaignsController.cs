using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CharityDonationApi.Data;
using CharityDonationApi.Models;

namespace CharityDonationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignsController : ControllerBase
    {
        private readonly CharityDbContext _context;

        public CampaignsController(CharityDbContext context)
        {
            _context = context;
        }

        // GET: api/Campaigns
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Campaigns>>> GetCampaigns()
        {
            return await _context.Campaigns.ToListAsync();
        }

        // GET: api/Campaigns/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Campaigns>> GetCampaigns(int id)
        {
            var campaigns = await _context.Campaigns.FindAsync(id);

            if (campaigns == null)
            {
                return NotFound();
            }

            return campaigns;
        }

        // PUT: api/Campaigns/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaigns(int id, Campaigns campaigns)
        {
            if (id != campaigns.Id)
            {
                return BadRequest();
            }

            _context.Entry(campaigns).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Campaigns
        [HttpPost]
        public async Task<ActionResult<Campaigns>> PostCampaigns(CampaignCreateDto campaignDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var campaign = new Campaigns
            {
                Title = campaignDto.Title,
                Description = campaignDto.Description,
                GoalAmount = campaignDto.GoalAmount,
                CollectedAmount = campaignDto.CollectedAmount,
                IsActive = campaignDto.IsActive,
                StartDate = campaignDto.StartDate,
                EndDate = campaignDto.EndDate,
                FeaturedImageUrl = campaignDto.FeaturedImageUrl,
                CreatorId = campaignDto.CreatorId,
                CategoryId = campaignDto.CategoryId,
                Status = campaignDto.Status,
                Updates = new List<CampaignUpdate>(),
                Donations = new List<Donation>(),
                Feedbacks = new List<Feedback>(),
                Subscriptions = new List<CampaignSubscription>()
            };

            _context.Campaigns.Add(campaign);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaigns", new { id = campaign.Id }, campaign);
        }

        // DELETE: api/Campaigns/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaigns(int id)
        {
            var campaigns = await _context.Campaigns.FindAsync(id);
            if (campaigns == null)
            {
                return NotFound();
            }

            _context.Campaigns.Remove(campaigns);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampaignsExists(int id)
        {
            return _context.Campaigns.Any(e => e.Id == id);
        }
    }
}
