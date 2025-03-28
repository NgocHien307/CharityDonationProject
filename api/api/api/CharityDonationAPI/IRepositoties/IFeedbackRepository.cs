using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
	public interface IFeedbackRepository
	{
		Task<IEnumerable<FeedBackVm>> GetAll();
		Task<IEnumerable<FeedBackVm>> GetByCampaignId(int campaignId);
		Task<FeedBackVm> GetById(int id);
		Task AddFeedback(FeedBackVm feedbackVm);
		Task UpdateFeedback(int id, FeedBackVm feedbackVm);
		Task DeleteFeedback(int id);
	}
}
