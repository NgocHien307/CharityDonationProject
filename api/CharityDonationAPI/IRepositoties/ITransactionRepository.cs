using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
    public interface ITransactionRepository
    {
        Task ConfirmPayment(int transactionId, ConfirmPaymentVm confirmPaymentVm);
        Task<Transaction> CreateTransaction(TransactionVm transactionVm);
    }
}