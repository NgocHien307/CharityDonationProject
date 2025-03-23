using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace CharityDonationApi.Repositories
{
	public class CampaignSubscriptionRepository : ICampaignSubscriptionRepository
	{
		private readonly CharityDbContext _context;

		public CampaignSubscriptionRepository(CharityDbContext context)
		{
			_context = context;
		}

		public async Task<bool> Subscribe(int userId, int campaignId)
		{
			var existingSub = await _context.CampaignSubscriptions
				.FirstOrDefaultAsync(s => s.UserId == userId && s.CampaignId == campaignId);

			if (existingSub != null)
			{
				if (existingSub.IsActive)
					return false;
				else
				{
					existingSub.IsActive = true;
					existingSub.SubscriptionDate = DateTime.UtcNow;
					await _context.SaveChangesAsync();
					return true;
				}
			}

			var newSub = new CampaignSubscription
			{
				UserId = userId,
				CampaignId = campaignId
			};

			_context.CampaignSubscriptions.Add(newSub);
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<bool> Unsubscribe(int userId, int campaignId)
		{
			var sub = await _context.CampaignSubscriptions
				.FirstOrDefaultAsync(s => s.UserId == userId && s.CampaignId == campaignId);

			if (sub == null || !sub.IsActive)
				return false; 

			sub.IsActive = false;
			await _context.SaveChangesAsync();
			return true;
		}

		public async Task<List<Users>> GetSubscribers(int campaignId)
		{
			return await _context.CampaignSubscriptions
				.Where(s => s.CampaignId == campaignId && s.IsActive)
				.Select(s => s.User)
				.ToListAsync();
		}
	}
}
