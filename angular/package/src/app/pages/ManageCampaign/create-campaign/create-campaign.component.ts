import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignService } from '../../../core/service/campaign.service';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Creator, CreatorService } from 'src/app/core/service/creator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService, Category } from 'src/app/core/service/category.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-create-campaign',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    NgxSpinnerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss']
})
export class CreateCampaignComponent implements OnInit {
  campaignForm!: FormGroup;
  creators: Creator[] = [];
  categories: Category[] = [];
  isLoading = false;
  formSubmitted = false;
  validationErrors: { [key: string]: string } = {};
  selectedFile: File | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;
  readonly Object = Object;

  constructor(
    private fb: FormBuilder,
    private campaignService: CampaignService,
    private router: Router,
    private creatorService: CreatorService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadCreators();
    this.loadCategories();
  }

  private buildForm(): void {
    this.campaignForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(200)]
      ],
      subDescription: ['', [Validators.maxLength(10000)]],
      description: ['', [Validators.maxLength(10000)]],
      goalAmount: [
        null,
        [Validators.required, Validators.min(1000)]
      ],
      featuredImageUrl: [''], // Trường để nhập URL ảnh
      creatorId: [null, Validators.required],
      status: ['Active', Validators.required],
      categoryId: [null, Validators.required],
      endDate: [null]
    });

    this.campaignForm.valueChanges.subscribe(() => {
      if (this.formSubmitted) {
        this.validateForm();
      }
    });
  }

  private loadCreators(): void {
    this.isLoading = true;
    this.creatorService.getAllCreators().subscribe({
      next: (res) => {
        this.creators = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi load danh sách Creator:', err);
        this.isLoading = false;
        this.showErrorMessage('Không thể tải danh sách Creator. Vui lòng thử lại sau.');
      },
    });
  }

  private loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Lỗi khi load danh sách Category:', err);
        this.isLoading = false;
        this.showErrorMessage('Không thể tải danh sách Category. Vui lòng thử lại sau.');
      },
    });
  }

  // Xử lý khi người dùng chọn file
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.showImagePreview(file);
      // Xóa URL nhập tay nếu có
      this.campaignForm.get('featuredImageUrl')?.setValue('');
    }
  }

  // Hiển thị preview ảnh từ file
  showImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewImageUrl = e.target?.result || null;
    };
    reader.readAsDataURL(file);
  }

  // Xử lý khi người dùng nhập URL
  onUrlInput(event: any): void {
    const url = event.target.value;
    if (url) {
      this.previewImageUrl = url; // Hiển thị preview từ URL
      this.selectedFile = null; // Xóa file đã chọn nếu có
    } else {
      this.previewImageUrl = null;
    }
  }

  // Xử lý upload ảnh
  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        resolve(''); // Không có file, trả về chuỗi rỗng
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>(`${environment.apiUrl}/api/campaign/upload-image`, formData)
        .subscribe({
          next: (response) => {
            resolve(response.imageUrl);
          },
          error: (error) => {
            console.error('Lỗi khi upload ảnh:', error);
            this.showErrorMessage('Không thể upload ảnh. Vui lòng thử lại sau.');
            reject(error);
          }
        });
    });
  }

  validateForm(): boolean {
    this.validationErrors = {};
    let isValid = true;

    Object.keys(this.f).forEach(key => {
      const control = this.f[key];
      if (control.invalid && control.touched) {
        isValid = false;

        if (control.errors?.['required']) {
          this.validationErrors[key] = `Trường "${this.getFieldLabel(key)}" là bắt buộc`;
        } else if (control.errors?.['minlength']) {
          this.validationErrors[key] = `"${this.getFieldLabel(key)}" phải có ít nhất ${control.errors?.['minlength'].requiredLength} ký tự`;
        } else if (control.errors?.['maxlength']) {
          this.validationErrors[key] = `"${this.getFieldLabel(key)}" không được vượt quá ${control.errors?.['maxlength'].requiredLength} ký tự`;
        } else if (control.errors?.['min']) {
          this.validationErrors[key] = `"${this.getFieldLabel(key)}" phải lớn hơn hoặc bằng ${control.errors?.['min'].min} VNĐ`;
        }
      }
    });

    return isValid;
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'title': 'Tên Chiến Dịch',
      'subDescription': 'Câu chuyện ngắn gọn',
      'description': 'Mô tả',
      'goalAmount': 'Mục Tiêu',
      'featuredImageUrl': 'Ảnh',
      'creatorId': 'Người/Tổ chức Tạo',
      'status': 'Trạng thái',
      'categoryId': 'Danh mục'
    };
    return labels[fieldName] || fieldName;
  }

  scrollToFirstError(): void {
    const firstErrorField = Object.keys(this.validationErrors)[0];
    if (firstErrorField) {
      const errorElement = document.querySelector(`[formControlName="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorElement as HTMLElement).focus();
      }
    }
  }

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['success-snackbar']
    });
  }

  async onSubmit(): Promise<void> {
    this.formSubmitted = true;
    this.campaignForm.markAllAsTouched();

    if (!this.validateForm()) {
      const errorCount = Object.keys(this.validationErrors).length;
      this.showErrorMessage(`Có ${errorCount} lỗi trong biểu mẫu. Vui lòng sửa trước khi gửi.`);
      console.log('Lỗi validation form:', this.validationErrors);
      this.scrollToFirstError();
      return;
    }

    this.isLoading = true;

    try {
      let imageUrl = this.campaignForm.get('featuredImageUrl')?.value;

      // Nếu không có URL nhập tay nhưng có file, upload file và lấy URL
      if (!imageUrl && this.selectedFile) {
        imageUrl = await this.uploadImage();
      }

      const formValues = this.campaignForm.value;
      const selectedCreator = this.creators.find(c => c.id === formValues.creatorId);
      const selectedCategory = this.categories.find(c => c.id === formValues.categoryId);

      const newCampaign: Campaign = {
        ...formValues,
        featuredImageUrl: imageUrl || '', // Sử dụng URL nhập tay hoặc từ upload, nếu không có thì để trống
        creatorName: selectedCreator?.name || '',
        categoryName: selectedCategory?.name || ''
      };

      console.log('Sending campaign data:', newCampaign);

      this.campaignService.createCampaign(newCampaign).subscribe({
        next: () => {
          this.isLoading = false;
          this.showSuccessMessage('Tạo chiến dịch thành công!');
          this.router.navigate(['/list-campaign']);
        },
        error: (err) => {
          this.isLoading = false;
          if (err.error && err.error.errors) {
            const serverErrors = err.error.errors;
            const errorMessage = Object.keys(serverErrors)
              .map(key => `${key}: ${serverErrors[key].join(', ')}`)
              .join('\n');
            this.showErrorMessage(`Lỗi từ server: ${errorMessage}`);
          } else {
            this.showErrorMessage('Đã có lỗi xảy ra khi tạo chiến dịch!');
          }
          console.error('Chi tiết lỗi:', err);
        }
      });
    } catch (error) {
      this.isLoading = false;
      this.showErrorMessage('Đã có lỗi xảy ra khi xử lý ảnh!');
      console.error('Lỗi xử lý ảnh:', error);
    }
  }

  onCancel(): void {
    this.router.navigate(['/list-campaign']);
  }

  get f() {
    return this.campaignForm.controls;
  }
}