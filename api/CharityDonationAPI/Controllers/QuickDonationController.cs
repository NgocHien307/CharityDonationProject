using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CharityDonationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuickDonationController : ControllerBase
    {
        private readonly IQuickDonationRepository _quickDonationRepository;

        public QuickDonationController(IQuickDonationRepository quickDonationRepository)
        {
            _quickDonationRepository = quickDonationRepository;
        }

        [HttpPost("quick-donate")]
        public async Task<IActionResult> QuickDonate([FromBody] QuickDonationVm donationVm)
        {
            if (donationVm.Amount < 1000)
            {
                return BadRequest("Số tiền tối thiểu là 1000 VND.");
            }

            var quickDonation = await _quickDonationRepository.CreateQuickDonationWithQR(donationVm.Amount, donationVm.UserId);

            return Ok(new
            {
                message = "Quyên góp nhanh thành công!",
                qrCodeUrl = quickDonation.QrCodeUrl
            });
        }
    }
}
