using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
	public class FeedBackRepository : IFeedbackRepository
	{ 
		private readonly CharityDbContext _context;

		public FeedBackRepository(CharityDbContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<FeedBackVm>> GetAll()
		{
			return await _context.Feedbacks
				.Include(f => f.User)
				.Include(f => f.Campaign)
				.Select(f => new FeedBackVm
				{
					Id = f.Id,
					Comment = f.Comment,
					Rating = f.Rating,
					Date = f.Date,
					UserId = f.UserId,
					UserName = f.User.FullName,
					CampaignId = f.CampaignId,
					CampaignName = f.Campaign.Title
				})
				.ToListAsync();
		}

		public async Task<IEnumerable<FeedBackVm>> GetByCampaignId(int campaignId)
		{
			return await _context.Feedbacks
			.Include(f => f.User)
				.Include(f => f.Campaign)
				.Where(f => f.CampaignId == campaignId)
				.Select(f => new FeedBackVm
				{
					Id = f.Id,
					Comment = f.Comment,
					Rating = f.Rating,
					Date = f.Date,
					UserId = f.UserId,
					UserName = f.User.FullName,
					CampaignId = f.CampaignId,
					CampaignName = f.Campaign.Title
				})
				.ToListAsync();
		}

		public async Task<FeedBackVm> GetById(int id)
		{
			var feedback = await _context.Feedbacks
				.Include(f => f.User)
				.Include(f => f.Campaign)
				.FirstOrDefaultAsync(f => f.Id == id);

			if (feedback == null) return null;

			return new FeedBackVm
			{
				Id = feedback.Id,
				Comment = feedback.Comment,
				Rating = feedback.Rating,
				Date = feedback.Date,
				UserId = feedback.UserId,
				UserName = feedback.User.FullName,
				CampaignId = feedback.CampaignId,
				CampaignName = feedback.Campaign.Title
			};
		}

		public async Task AddFeedback(FeedBackVm feedbackVm)
		{
			var feedback = new Feedback
			{
				Comment = feedbackVm.Comment,
				Rating = feedbackVm.Rating,
				Date = DateTime.UtcNow,
				UserId = feedbackVm.UserId,
				CampaignId = feedbackVm.CampaignId
			};

			_context.Feedbacks.Add(feedback);
			await _context.SaveChangesAsync();
		}

		public async Task UpdateFeedback(int id, FeedBackVm feedbackVm)
		{
			var feedback = await _context.Feedbacks.FindAsync(id);
			if (feedback == null)
			{
				throw new Exception("Feedback not found");
			}

			feedback.Comment = feedbackVm.Comment;
			feedback.Rating = feedbackVm.Rating;
			feedback.Date = DateTime.UtcNow; 

			await _context.SaveChangesAsync();
		}
		public async Task DeleteFeedback(int id)
		{
			var feedback = await _context.Feedbacks.FindAsync(id);
			if (feedback != null)
			{
				_context.Feedbacks.Remove(feedback);
				await _context.SaveChangesAsync();
			}
		}
	}
}
