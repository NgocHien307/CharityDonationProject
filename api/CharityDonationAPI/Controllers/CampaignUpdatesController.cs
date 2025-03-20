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
    public class CampaignUpdatesController : ControllerBase
    {
        private readonly CharityDbContext _context;

        public CampaignUpdatesController(CharityDbContext context)
        {
            _context = context;
        }

        // GET: api/CampaignUpdates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignUpdate>>> GetCampaignUpdates()
        {
            return await _context.CampaignUpdates.ToListAsync();
        }

        // GET: api/CampaignUpdates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CampaignUpdate>> GetCampaignUpdate(int id)
        {
            var campaignUpdate = await _context.CampaignUpdates.FindAsync(id);

            if (campaignUpdate == null)
            {
                return NotFound();
            }

            return campaignUpdate;
        }

        // PUT: api/CampaignUpdates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCampaignUpdate(int id, CampaignUpdate campaignUpdate)
        {
            if (id != campaignUpdate.Id)
            {
                return BadRequest();
            }

            _context.Entry(campaignUpdate).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CampaignUpdateExists(id))
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

        // POST: api/CampaignUpdates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CampaignUpdate>> PostCampaignUpdate(CampaignUpdate campaignUpdate)
        {
            _context.CampaignUpdates.Add(campaignUpdate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCampaignUpdate", new { id = campaignUpdate.Id }, campaignUpdate);
        }

        // DELETE: api/CampaignUpdates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCampaignUpdate(int id)
        {
            var campaignUpdate = await _context.CampaignUpdates.FindAsync(id);
            if (campaignUpdate == null)
            {
                return NotFound();
            }

            _context.CampaignUpdates.Remove(campaignUpdate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CampaignUpdateExists(int id)
        {
            return _context.CampaignUpdates.Any(e => e.Id == id);
        }
    }
}
