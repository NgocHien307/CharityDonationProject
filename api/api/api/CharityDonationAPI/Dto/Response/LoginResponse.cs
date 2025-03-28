namespace CharityDonationApi.Dto.Response
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string[] Role { get; set; }
        public bool Status { get; set; }

    }

}
