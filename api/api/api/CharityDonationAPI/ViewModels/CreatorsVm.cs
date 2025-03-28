namespace CharityDonationApi.ViewModels
{
    public class CreatorsVm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string LogoUrl { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public bool IsVerified { get; set; }
        public string Type { get; set; } // "Individual", "Organization", "Foundation"
        public int? UserId { get; set; }
        public string VerificationDocumentUrl { get; set; }
        public DateTime? VerificationDate { get; set; }
    }
}
