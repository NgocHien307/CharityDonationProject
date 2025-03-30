using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.IRepositories
{
    public interface ICreatorRepository
    {
        Task<List<Creators>> GetAllCreators();
        Task<Creators> GetCreatorById(int id);
        Task AddCreator(CreatorsVm vm);
        Task UpdateCreator(int id, CreatorsVm vm);
        Task DeleteCreator(int id);
    }
}
