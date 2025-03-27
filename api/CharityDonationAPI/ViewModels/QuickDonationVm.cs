namespace CharityDonationApi.ViewModels
{
    public class QuickDonationVm
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int? UserId { get; set; }
        public int? TransactionId { get; set; }
        public string Status { get; set; }
    }
}
