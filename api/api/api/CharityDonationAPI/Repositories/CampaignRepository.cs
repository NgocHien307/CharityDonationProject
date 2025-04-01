using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace CharityDonationApi.Repositories
{
	public class CampaignRepository : ICampaignRepository
	{
		private readonly CharityDbContext _context;

		public CampaignRepository(CharityDbContext context)
		{
			_context = context;
		}

		public async Task<List<Campaigns>> GetAllCampaigns()
		{
			return await _context.Campaigns.ToListAsync();
		}

		public async Task<CampaignsVm> GetCampaignById(int id)
		{
			var campaign = await _context.Campaigns
				.Include(c => c.Category)
				.Include(c => c.Creator)
				.FirstOrDefaultAsync(p => p.Id == id);
			if(campaign == null)
			{
				return null;
			}

			return new CampaignsVm
			{
				Id = campaign.Id,
				Title = campaign.Title,
				Description = campaign.Description,
				GoalAmount = campaign.GoalAmount,
				CollectedAmount = campaign.CollectedAmount,
				IsActive = campaign.IsActive,
				StartDate = DateTime.UtcNow,
				EndDate = campaign.EndDate,
				FeaturedImageUrl = campaign.FeaturedImageUrl,
				CreatorId = campaign.CreatorId,
                CreatorName = campaign.Creator != null ? campaign.Creator.Name : "N/A",
                CategoryId = campaign.CategoryId,
				Status = campaign.Status
			};
		}
		public async Task addCampaign(CampaignsVm campaignVm)
		{
			var campaign = new Campaigns
			{
				Title = campaignVm.Title,
				Description = campaignVm.Description,
				GoalAmount = campaignVm.GoalAmount,
				CollectedAmount = campaignVm.CollectedAmount,
				IsActive = campaignVm.IsActive,
				StartDate = DateTime.UtcNow,
				EndDate = campaignVm.EndDate,
				FeaturedImageUrl = campaignVm.FeaturedImageUrl,
				CreatorId = campaignVm.CreatorId,
				CategoryId = campaignVm.CategoryId,
				Status = campaignVm.Status

            };

			_context.Campaigns.Add(campaign);
			await _context.SaveChangesAsync();
		}

		public async Task updateCampaign(int id, CampaignsVm campaignVm)
		{
			var campaign = await _context.Campaigns.FindAsync(id);

			if(campaign == null)
			{
				throw new KeyNotFoundException($"Campaign with id {id} not found");
			}

			campaign.Title = campaignVm.Title;
			campaign.Description = campaignVm.Description;
			campaign.GoalAmount = campaignVm.GoalAmount;
			campaign.CollectedAmount = campaignVm.CollectedAmount;
			campaign.IsActive = campaignVm.IsActive;
			campaign.EndDate = campaignVm.EndDate;
			campaign.FeaturedImageUrl = campaignVm.FeaturedImageUrl;
			campaign.CreatorId = campaignVm.CreatorId;
			campaign.CategoryId = campaignVm.CategoryId;
			campaign.Status = campaignVm.Status;

			_context.Campaigns.Update(campaign);
			await _context.SaveChangesAsync();
		}

		public async Task deleteCampaign(int id)
		{
			var campaign = await _context.Campaigns.FindAsync(id);

			if(campaign == null)
			{
				throw new KeyNotFoundException($"Campaign with id {id} not found");
			}

			_context.Campaigns.Remove(campaign);
			await _context.SaveChangesAsync();
		}

        public async Task<List<CampaignsVm>> SearchCampaignsByTitle(string title)
        {
            var campaigns = await _context.Campaigns
                .Where(c => c.Title.Contains(title)) 
                .Select(c => new CampaignsVm
                {
                    Id = c.Id,
                    Title = c.Title,
                    Description = c.Description,
                    GoalAmount = c.GoalAmount,
                    CollectedAmount = c.CollectedAmount,
                    IsActive = c.IsActive,
                    StartDate = c.StartDate,
                    EndDate = c.EndDate,
                    FeaturedImageUrl = c.FeaturedImageUrl,
                    CreatorId = c.CreatorId,
                    CreatorName = c.Creator.Name,
                    CategoryId = c.CategoryId,
                    Status = c.Status
                })
                .ToListAsync();
            return campaigns;
        }


    }
}
	