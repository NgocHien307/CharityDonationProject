using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
	public interface IDonationRepository
	{
		Task<IEnumerable<DonationVm>> GetAllDonations();
		Task<DonationVm> GetDonationById(int id);
		Task<IEnumerable<DonationVm>> GetDonationsByCampaign(int campaignId);
		Task<IEnumerable<DonationVm>> GetDonationsByUser(int userId);
		Task AddDonation(Donation donation);
	}
}
