using QRCoder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace CharityDonationApi.Services
{
    public class QRService
    {
        private readonly string _qrCodeFolder;

        public QRService()
        {
            _qrCodeFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "qrcodes");

            if (!Directory.Exists(_qrCodeFolder))
            {
                Directory.CreateDirectory(_qrCodeFolder);
            }
        }

        private static readonly Dictionary<string, string> VietQRBankCodes = new()
        {
            { "BIDV", "970418" }, { "VCB", "970436" }, { "TCB", "970407" },
            { "ACB", "970416" }, { "MBB", "970422" }, { "VPB", "970432" }
        };

        public string GenerateVietQR(string bankCode, string accountNumber, string accountName, decimal amount)
        {
            if (!VietQRBankCodes.TryGetValue(bankCode, out var napasCode))
            {
                throw new Exception("Mã ngân hàng không hợp lệ.");
            }

            if (accountNumber.Length < 9 || accountNumber.Length > 12)
            {
                throw new Exception("Số tài khoản phải có từ 9-12 số.");
            }

            // Chuyển số tiền sang chuỗi nguyên
            string amountStr = ((int)amount).ToString();

            // Tạo nội dung QR theo đúng chuẩn VietQR
            string qrContent = $"000201" +                         // Định dạng EMVCo
                               $"010212" +                         // Phiên bản VietQR
                               $"0216A00000072701{napasCode}" +    // Mã VietQR
                               $"030{accountNumber.Length}{accountNumber}" +  // Số tài khoản
                               $"04{accountName.Length}{accountName}" +      // Tên chủ tài khoản
                               $"5204{amountStr}" +                 // Số tiền
                               $"5303708";                          // Loại tiền tệ (VND)

            // Tính CRC-16 chính xác với UTF-8
            string crc = CalculateCRC16(qrContent + "6304");
            qrContent += "6304" + crc;

            Console.WriteLine($"[DEBUG] QR Data: {qrContent}"); // Debug

            // Tạo mã QR
            using QRCodeGenerator qrGenerator = new();
            using QRCodeData qrCodeData = qrGenerator.CreateQrCode(qrContent, QRCodeGenerator.ECCLevel.Q);
            using PngByteQRCode qrCode = new(qrCodeData);

            byte[] qrCodeImage = qrCode.GetGraphic(20);
            string fileName = $"{Guid.NewGuid()}.png";
            string filePath = Path.Combine(_qrCodeFolder, fileName);

            File.WriteAllBytes(filePath, qrCodeImage);
            return $"/qrcodes/{fileName}";
        }

        private string CalculateCRC16(string input)
        {
            ushort crc = 0xFFFF;
            byte[] bytes = Encoding.UTF8.GetBytes(input);  // **Dùng UTF-8 thay vì ASCII**

            foreach (byte b in bytes)
            {
                crc ^= (ushort)(b << 8);
                for (int i = 0; i < 8; i++)
                {
                    if ((crc & 0x8000) != 0)
                        crc = (ushort)((crc << 1) ^ 0x1021);
                    else
                        crc <<= 1;
                }
            }
            return crc.ToString("X4");
        }
    }
}
