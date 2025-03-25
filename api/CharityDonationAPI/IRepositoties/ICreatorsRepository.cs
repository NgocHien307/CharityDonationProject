using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CharityDonationApi.IRepositories
{
    public interface ICreatorsRepository
    {
        Task<IEnumerable<CreatorsVm>> GetAllCreators();
        Task<CreatorsVm> GetCreatorById(int id);
        Task AddCreator(CreatorsVm creator);
        Task UpdateCreator(int id, CreatorsVm creator);
        Task DeleteCreator(int id);
    }
}