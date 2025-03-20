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
    public class QuickDonationsController : ControllerBase
    {
        private readonly CharityDbContext _context;

        public QuickDonationsController(CharityDbContext context)
        {
            _context = context;
        }

        // GET: api/QuickDonations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<QuickDonation>>> GetQuickDonations()
        {
            return await _context.QuickDonations.ToListAsync();
        }

        // GET: api/QuickDonations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<QuickDonation>> GetQuickDonation(int id)
        {
            var quickDonation = await _context.QuickDonations.FindAsync(id);

            if (quickDonation == null)
            {
                return NotFound();
            }

            return quickDonation;
        }

        // PUT: api/QuickDonations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuickDonation(int id, QuickDonation quickDonation)
        {
            if (id != quickDonation.Id)
            {
                return BadRequest();
            }

            _context.Entry(quickDonation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuickDonationExists(id))
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

        // POST: api/QuickDonations
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<QuickDonation>> PostQuickDonation(QuickDonation quickDonation)
        {
            _context.QuickDonations.Add(quickDonation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuickDonation", new { id = quickDonation.Id }, quickDonation);
        }

        // DELETE: api/QuickDonations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuickDonation(int id)
        {
            var quickDonation = await _context.QuickDonations.FindAsync(id);
            if (quickDonation == null)
            {
                return NotFound();
            }

            _context.QuickDonations.Remove(quickDonation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuickDonationExists(int id)
        {
            return _context.QuickDonations.Any(e => e.Id == id);
        }
    }
}
