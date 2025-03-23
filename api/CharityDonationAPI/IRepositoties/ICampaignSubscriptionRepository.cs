using CharityDonationApi.Models;

namespace CharityDonationApi.IRepositoties
{
	public interface ICampaignSubscriptionRepository
	{
		Task<bool> Subscribe(int userId, int campaignId);
		Task<bool> Unsubscribe(int userId, int campaignId);
		Task<List<Users>> GetSubscribers(int campaignId);
	}
}
