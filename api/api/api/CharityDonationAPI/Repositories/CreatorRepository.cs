using CharityDonationApi.Data;
using CharityDonationApi.IRepositories;
using CharityDonationApi.Models;
using CharityDonationApi.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace CharityDonationApi.Repositories
{
    public class CreatorRepository : ICreatorRepository
    {
        private readonly CharityDbContext _context;

        public CreatorRepository(CharityDbContext context)
        {
            _context = context;
        }

        // Lấy tất cả creator
        public async Task<List<Creators>> GetAllCreators()
        {
            return await _context.Creators.ToListAsync();
        }

        // Lấy 1 creator theo id
        public async Task<Creators> GetCreatorById(int id)
        {
            var creator = await _context.Creators.FindAsync(id);
            return creator;
        }

        // Thêm mới creator
        public async Task AddCreator(CreatorsVm vm)
        {
            var entity = new Creators
            {
                Name = vm.Name,
                Description = vm.Description,
                LogoUrl = vm.LogoUrl,
                Email = vm.Email,
                PhoneNumber = vm.PhoneNumber,
                Address = vm.Address,
                IsVerified = vm.IsVerified,
                Type = vm.Type,
                UserId = vm.UserId,
                VerificationDocumentUrl = vm.VerificationDocumentUrl,
                VerificationDate = vm.VerificationDate
            };

            _context.Creators.Add(entity);
            await _context.SaveChangesAsync();
        }

        // Cập nhật creator
        public async Task UpdateCreator(int id, CreatorsVm vm)
        {
            var creator = await _context.Creators.FindAsync(id);
            if (creator == null) throw new KeyNotFoundException("Creator not found");

            creator.Name = vm.Name;
            creator.Description = vm.Description;
            creator.LogoUrl = vm.LogoUrl;
            creator.Email = vm.Email;
            creator.PhoneNumber = vm.PhoneNumber;
            creator.Address = vm.Address;
            creator.IsVerified = vm.IsVerified;
            creator.Type = vm.Type;
            creator.UserId = vm.UserId;
            creator.VerificationDocumentUrl = vm.VerificationDocumentUrl;
            creator.VerificationDate = vm.VerificationDate;

            _context.Creators.Update(creator);
            await _context.SaveChangesAsync();
        }

        // Xoá creator
        public async Task DeleteCreator(int id)
        {
            var creator = await _context.Creators.FindAsync(id);
            if (creator == null)
            {
                throw new KeyNotFoundException("Creator not found");
            }
            _context.Creators.Remove(creator);
            await _context.SaveChangesAsync();
        }
    }
}
