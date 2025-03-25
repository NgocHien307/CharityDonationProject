using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly CharityDbContext _context;

        public TransactionRepository(CharityDbContext context)
        {
            _context = context;
        }

        public async Task ConfirmPayment(int transactionId, ConfirmPaymentVm confirmPaymentVm)
        {
            var transaction = await _context.Transactions.FindAsync(transactionId);
            if (transaction == null)
            {
                throw new Exception("Transaction not found");
            }

            transaction.PaymentStatus = confirmPaymentVm.PaymentStatus;
            transaction.TransactionReference = confirmPaymentVm.TransactionReference;

            await _context.SaveChangesAsync();
        }
        public async Task<Transaction> CreateTransaction(TransactionVm transactionVm)
        {
            var transaction = new Transaction
            {
                PaymentMethod = transactionVm.PaymentMethod,
                PaymentStatus = transactionVm.PaymentStatus ?? "Pending",
                TransactionDate = DateTime.UtcNow,
                Amount = transactionVm.Amount,
                Currency = transactionVm.Currency,
                PaymentGateway = transactionVm.PaymentGateway,
                TransactionReference = "TXN-" + Guid.NewGuid().ToString().Substring(0, 8)
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }

    }
}