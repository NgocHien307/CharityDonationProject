using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
	public interface ICampaignRepository
	{
		Task<List<Campaigns>> GetAllCampaigns();

		Task<CampaignsVm> GetCampaignById(int id);
		Task addCampaign(CampaignsVm campaignVm);
		Task updateCampaign(int id, CampaignsVm campaignVm);
		Task deleteCampaign(int id);

		Task<List<CampaignsVm>> SearchCampaignsByTitle(string title);




	}
}
