using CharityDonationApi.Models;

namespace CharityDonationApi.IRepositoties
{
    public interface IQuickDonationRepository
    {

        Task<QuickDonation> CreateQuickDonationWithQR(decimal amount, int? userId);
    }
}
