using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using CharityDonationApi.IRepositoties; 
using CharityDonationApi.ViewModels;

namespace CharityDonationApi.Controllers
{
    [Route("api/campaign")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly ICampaignRepository _campaignRepository;

        public CampaignController(ICampaignRepository campaignRepository)
        {
            _campaignRepository = campaignRepository;
        }

        // GET: api/campaign/Get-all-campaigns
        [HttpGet("Get-all-campaigns")]
        [AllowAnonymous]

        public async Task<ActionResult<IEnumerable<CampaignsVm>>> GetAllCampaigns()
        {
            try
            {
                var campaigns = await _campaignRepository.GetAllCampaigns();
                return Ok(campaigns);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving campaigns: {ex.Message}");
            }
        }

        // GET: api/campaign/Get-Campaign-by-Id?id=XX
        [HttpGet("Get-Campaign-by-Id")]
        [AllowAnonymous]

        public async Task<IActionResult> GetCampaignById(int id)
        {
            try
            {
                var campaign = await _campaignRepository.GetCampaignById(id);
                if (campaign == null)
                {
                    return NotFound($"Campaign with id {id} not found");
                }
                return Ok(campaign);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error retrieving campaign: {ex.Message}");
            }
        }

        // POST: api/campaign/Add-campaign
        [HttpPost("Add-campaign")]
        //[Authorize]
        [AllowAnonymous]

        public async Task<IActionResult> CreateCampaign([FromBody] CampaignsVm campaignVm)
        {
            if (campaignVm == null)
            {
                return BadRequest("Invalid campaign data.");
            }
            try
            {
                await _campaignRepository.addCampaign(campaignVm);
                return Ok(new { message = "Campaign updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error creating campaign: {ex.Message}");
            }
        }

        // PUT: api/campaign/Update-campaign/{id}
        [HttpPut("Update-campaign/{id}")]
        //[Authorize]
        [AllowAnonymous]

        public async Task<IActionResult> UpdateCampaign(int id, [FromBody] CampaignsVm campaignVm)
        {
            if (campaignVm == null || id != campaignVm.Id)
            {
                return BadRequest("Campaign ID mismatch or invalid data.");
            }
            try
            {
                await _campaignRepository.updateCampaign(id, campaignVm);
                
                return Ok(new { message = "Campaign updated successfully." });

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error updating campaign: {ex.Message}");
            }
        }

        // DELETE: api/campaign/delete-campaign/{id}
        [HttpDelete("delete-campaign/{id}")]
        //[Authorize]
        [AllowAnonymous]
        public async Task<IActionResult> DeleteCampaign(int id)
        {
            try
            {
                await _campaignRepository.deleteCampaign(id);
                return Ok(new { message = "Campaign updated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error deleting campaign: {ex.Message}");
            }
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            // Đường dẫn thư mục lưu file (trong thư mục gốc của ứng dụng)
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
            if (!Directory.Exists(uploadFolder))
            {
                Directory.CreateDirectory(uploadFolder);
            }

            // Tạo tên file duy nhất để tránh trùng lặp
            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
            var filePath = Path.Combine(uploadFolder, fileName);

            // Lưu file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Xây dựng URL file trả về dựa trên scheme và host của request
            var baseUrl = $"{Request.Scheme}://{Request.Host}";
            var fileUrl = $"{baseUrl}/uploads/{fileName}";

            return Ok(new { fileUrl });
        }

    }
}
