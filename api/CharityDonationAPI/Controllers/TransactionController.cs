using Microsoft.AspNetCore.Mvc;
using CharityDonationApi.IRepositoties;
using CharityDonationApi.ViewModels;
using CharityDonationApi.IRepositories;

namespace CharityDonationApi.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionController(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        [HttpPost("confirm/{id}")]
        public async Task<IActionResult> ConfirmPayment(int id, [FromBody] ConfirmPaymentVm confirmPaymentVm)
        {
            try
            {
                await _transactionRepository.ConfirmPayment(id, confirmPaymentVm);
                return Ok(new { message = "Payment confirmed successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error confirming payment: {ex.Message}");
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateTransaction([FromBody] TransactionVm transactionVm)
        {
            try
            {
                var transaction = await _transactionRepository.CreateTransaction(transactionVm);
                return Ok(new { id = transaction.Id, message = "Transaction created successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Error creating transaction: {ex.Message}");
            }
        }
    }
}