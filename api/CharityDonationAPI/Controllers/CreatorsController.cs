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
    public class CreatorsController : ControllerBase
    {
        private readonly CharityDbContext _context;

        public CreatorsController(CharityDbContext context)
        {
            _context = context;
        }

        // GET: api/Creators
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Creators>>> GetCreators()
        {
            return await _context.Creators.ToListAsync();
        }

        // GET: api/Creators/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Creators>> GetCreators(int id)
        {
            var creators = await _context.Creators.FindAsync(id);

            if (creators == null)
            {
                return NotFound();
            }

            return creators;
        }

        // PUT: api/Creators/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCreators(int id, Creators creators)
        {
            if (id != creators.Id)
            {
                return BadRequest();
            }

            _context.Entry(creators).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CreatorsExists(id))
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

        // POST: api/Creators
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Creators>> PostCreators(Creators creators)
        {
            _context.Creators.Add(creators);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCreators", new { id = creators.Id }, creators);
        }

        // DELETE: api/Creators/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCreators(int id)
        {
            var creators = await _context.Creators.FindAsync(id);
            if (creators == null)
            {
                return NotFound();
            }

            _context.Creators.Remove(creators);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CreatorsExists(int id)
        {
            return _context.Creators.Any(e => e.Id == id);
        }
    }
}
