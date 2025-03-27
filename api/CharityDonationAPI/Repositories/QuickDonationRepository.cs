using CharityDonationApi.Data;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.Models;
using CharityDonationApi.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace CharityDonationApi.Repositories
{
    public class QuickDonationRepository : IQuickDonationRepository
    {
        private readonly CharityDbContext _context;
        private readonly IUserRepository _userRepository;
        private readonly QRService _qrService;

        public QuickDonationRepository(CharityDbContext context, IUserRepository userRepository, QRService qrService)
        {
            _context = context;
            _userRepository = userRepository;
            _qrService = qrService;
        }

        public async Task<QuickDonation> CreateQuickDonationWithQR(decimal amount, int? userId)
        {
            // Lấy tài khoản admin
            var admin = await _userRepository.GetAdminAccount();
            if (admin == null || string.IsNullOrEmpty(admin.BankAccountNumber) || string.IsNullOrEmpty(admin.BankCode))
            {
                throw new Exception("Không tìm thấy tài khoản admin hoặc thiếu thông tin ngân hàng.");
            }

            // Tạo URL QR code theo chuẩn VietQR
            string qrCodeUrl = _qrService.GenerateVietQR(admin.BankCode, admin.BankAccountNumber, admin.BankAccountName, amount);

            // Tạo bản ghi QuickDonation
            var quickDonation = new QuickDonation
            {
                Amount = amount,
                Date = DateTime.UtcNow,
                UserId = userId,
                Status = "Pending",
                QrCodeUrl = qrCodeUrl
            };

            await _context.QuickDonations.AddAsync(quickDonation);
            await _context.SaveChangesAsync();

            return quickDonation;
        }

    }
}
