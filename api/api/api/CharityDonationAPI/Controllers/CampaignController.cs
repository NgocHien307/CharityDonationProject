using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using CharityDonationApi.Repositories;

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

        [HttpGet("Get-all-campaigns")]
        public async Task<ActionResult<IEnumerable<CampaignsVm>>> getCampaigns()
        {
			try
			{
				var campaigns = await _campaignRepository.GetAllCampaigns();

				return Ok(campaigns);	
			}
			catch(Exception ex) 
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

        [HttpGet("Get-Campaign-by-Id")]
        public async Task<IActionResult> GetCampaignById(int id)
        {
			try
			{
				var campaign = await _campaignRepository.GetCampaignById(id);

				if(campaign == null)
				{
					return NotFound($"Campaign with id {id} not found");
				}
				return Ok(campaign);

			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

        [HttpPost("Add-campaign")]
        public async Task<IActionResult> CreateCampaign([FromBody] CampaignsVm campaignsVm)
        {
            try
			{
				await _campaignRepository.addCampaign(campaignsVm);
				return Ok();

			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error retrieving posts: {ex.Message}");
			}
		}

		[HttpPut("Update-campaign/{id}")]
		public async Task<IActionResult> UpdateCampaign(int id,[FromBody] CampaignsVm campaignsVm)
		{
			if(id != campaignsVm.Id)
			{
				return BadRequest("Campaign Id isn't match");
			}

			try
			{
				await _campaignRepository.updateCampaign(id, campaignsVm);

				return Ok();
			} catch(Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error updating post: {ex.Message}");
			}
		}

		[HttpDelete("delete-campaign/{id}")]
		public async Task<IActionResult> DeleteCampaign(int id)
		{
			try
			{
				await _campaignRepository.deleteCampaign(id);

				return Ok();
			}
			catch (Exception ex)
			{
				return StatusCode(StatusCodes.Status500InternalServerError,
					$"Error deleting post: {ex.Message}");
			}
		}

        [HttpGet("search")]
        public async Task<IActionResult> SearchCampaigns([FromQuery] string title)
        {
            if (string.IsNullOrEmpty(title))
            {
                return BadRequest("Title parameter is required.");
            }

            var campaigns = await _campaignRepository.SearchCampaignsByTitle(title);

            return Ok(campaigns);
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is empty or not provided");
            }

            try
            {
                // Tạo đường dẫn đến thư mục lưu ảnh
                var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads", "campaigns");

                // Tạo thư mục nếu chưa tồn tại
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                // Tạo tên file duy nhất
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Lưu file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Trả về URL để truy cập ảnh
                var imageUrl = $"/uploads/campaigns/{uniqueFileName}";

                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error uploading image: {ex.Message}");
            }
        }
    }
}
