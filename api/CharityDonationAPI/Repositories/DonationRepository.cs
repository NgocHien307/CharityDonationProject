
using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
	public class DonationRepository : IDonationRepository
	{
		private readonly CharityDbContext _context;

		public DonationRepository(CharityDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<DonationVm>> GetAllDonations()
		{
			return await _context.Donations
				.Include(d => d.User)
				.Include(d => d.Campaign)
				.Select(d => new DonationVm
				{
					Id = d.Id,
					Amount = d.Amount,
					Date = d.Date,
					Message = d.Message,
					IsAnonymous = d.IsAnonymous,
					DonorName = d.IsAnonymous ? "Anonymous" : d.User.Creator.Name,
					CampaignName = d.Campaign.Title
				})
				.ToListAsync();
		}

		public async Task<DonationVm> GetDonationById(int id)
		{
			return await _context.Donations
				.Include(d => d.User)
				.Include(d => d.Campaign)
				.Where(d => d.Id == id)
				.Select(d => new DonationVm
				{
					Id = d.Id,
					Amount = d.Amount,
					Date = d.Date,
					Message = d.Message,
					IsAnonymous = d.IsAnonymous,
					DonorName = d.IsAnonymous ? "Anonymous" : d.User.Creator.Name,
					CampaignName = d.Campaign.Title
				})
				.FirstOrDefaultAsync();
		}

		public async Task<IEnumerable<DonationVm>> GetDonationsByCampaign(int campaignId)
		{
			return await _context.Donations
				.Where(d => d.CampaignId == campaignId)
				.Select(d => new DonationVm
				{
					Id = d.Id,
					Amount = d.Amount,
					Date = d.Date,
					Message = d.Message,
					IsAnonymous = d.IsAnonymous,
					DonorName = d.IsAnonymous ? "Anonymous" : d.User.Creator.Name,
					CampaignName = d.Campaign.Title
				})
				.ToListAsync();
		}

		public async Task<IEnumerable<DonationVm>> GetDonationsByUser(int userId)
		{
			return await _context.Donations
				.Where(d => d.UserId == userId)
				.Select(d => new DonationVm
				{
					Id = d.Id,
					Amount = d.Amount,
					Date = d.Date,
					Message = d.Message,
					IsAnonymous = d.IsAnonymous,
					DonorName = d.IsAnonymous ? "Anonymous" : d.User.Creator.Name,
					CampaignName = d.Campaign.Title
				})
				.ToListAsync();
		}

		public async Task AddDonation(Donation donation)
		{
			_context.Donations.Add(donation);
			await _context.SaveChangesAsync();
		}

	}
}
