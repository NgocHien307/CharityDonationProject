using CharityDonationApi.Dto.Request;
using CharityDonationApi.Dto.Response;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
    public interface IAuthRepository
    {
        Task<LoginResponse> Login(LoginRequest loginRequest);
        Task<bool> ValidateUser(string email, string password);
        Task<string> CreateToken(UserVm user, string roleName);
    }
}
