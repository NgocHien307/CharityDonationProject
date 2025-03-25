namespace CharityDonationApi.ViewModels
{
    public class TransactionVm
    {
        public string PaymentMethod { get; set; }
        public string PaymentStatus { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string PaymentGateway { get; set; }
    }
}