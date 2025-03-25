using CharityDonationApi.Data;
using CharityDonationApi.IRepositories;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CharityDonationApi.Repositories
{
    public class CreatorsRepository : ICreatorsRepository
    {
        private readonly CharityDbContext _context;

        public CreatorsRepository(CharityDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CreatorsVm>> GetAllCreators()
        {
            return await _context.Creators
                .Select(c => new CreatorsVm
                {
                    Id = c.Id,
                    Name = c.Name,
                    Email = c.Email
                })
                .ToListAsync();
        }

        public async Task<CreatorsVm> GetCreatorById(int id)
        {
            var creator = await _context.Creators.FindAsync(id);
            return creator == null ? null : new CreatorsVm
            {
                Id = creator.Id,
                Name = creator.Name,
                Email = creator.Email
            };
        }

        public async Task AddCreator(CreatorsVm creatorVm)
        {
            var creator = new Creators
            {
                Name = creatorVm.Name,
                Email = creatorVm.Email
            };
            _context.Creators.Add(creator);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCreator(int id, CreatorsVm creatorVm)
        {
            var creator = await _context.Creators.FindAsync(id);
            if (creator != null)
            {
                creator.Name = creatorVm.Name;
                creator.Email = creatorVm.Email;
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteCreator(int id)
        {
            var creator = await _context.Creators.FindAsync(id);
            if (creator != null)
            {
                _context.Creators.Remove(creator);
                await _context.SaveChangesAsync();
            }
        }
    }
}