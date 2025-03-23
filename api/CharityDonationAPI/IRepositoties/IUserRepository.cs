using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositoties
{
    public interface IUserRepository
    {
        Task<List<Users>> GetAll();
        Task<UserVm> GetById(int id);
        Task AddUser(UserVm userVm);
        Task UpdateUser(int id, UserVm userVm);
        Task DeleteUser(int id);
    }
}
