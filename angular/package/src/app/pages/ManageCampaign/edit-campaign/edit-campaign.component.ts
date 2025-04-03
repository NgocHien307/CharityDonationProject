import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Campaign } from 'src/app/core/models/database/campaign.model';
import { CampaignService } from 'src/app/core/service/campaign.service';
import { MaterialModule } from 'src/app/material.module';
import { CreatorService, Creator } from 'src/app/core/service/creator.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-campaign',
  standalone: true,
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
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss'],
})
export class EditCampaignComponent implements OnInit {
  campaignForm!: FormGroup;
  campaignId!: number;
  creators: Creator[] = [];
  statusList = [
    { value: 'Pending', viewValue: 'Chờ duyệt' },
    { value: 'Active', viewValue: 'Hoạt động' },
    { value: 'Completed', viewValue: 'Hoàn thành' },
    { value: 'Canceled', viewValue: 'Hủy' },
  ];
  categoryList = [
    { value: 'Giáo dục', viewValue: 'Giáo dục' },
    { value: 'Trẻ em', viewValue: 'Trẻ em' },
    { value: 'Y tế', viewValue: 'Y tế' },
    { value: 'Xã hội', viewValue: 'Xã hội' },
  ];
  selectedFile: File | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private campaignService: CampaignService,
    private creatorService: CreatorService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.spinnerService.show();
    this.campaignId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.loadCampaign();
    this.loadCreators();
    setTimeout(() => this.spinnerService.hide(), 1000);
  }

  private buildForm(): void {
    this.campaignForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      goalAmount: [null, [Validators.required, Validators.min(1000)]],
      description: ['', Validators.maxLength(500)],
      featuredImageUrl: [''],
      status: ['Active', Validators.required],
      categoryName: ['', Validators.required],
      creatorId: [null, Validators.required],
      endDate: [null],
    });
  }

  private loadCampaign(): void {
    this.campaignService.getCampaignById(this.campaignId).subscribe({
      next: (campaign: Campaign) => {
        this.campaignForm.patchValue({
          title: campaign.Title,
          goalAmount: campaign.GoalAmount,
          description: campaign.Description,
          featuredImageUrl: campaign.FeaturedImageUrl,
          status: campaign.Status,
          categoryName: campaign.CategoryName,
          creatorId: campaign.CreatorId,
          endDate: campaign.EndDate ? new Date(campaign.EndDate) : null,
        });
        if (campaign.FeaturedImageUrl) {
          this.previewImageUrl = campaign.FeaturedImageUrl;
        }
      },
      error: (err) => {
        this.showErrorMessage('Không thể tải thông tin chiến dịch.');
        console.error(err);
      },
    });
  }

  private loadCreators(): void {
    this.creatorService.getAllCreators().subscribe({
      next: (res) => (this.creators = res),
      error: (err) => {
        this.showErrorMessage('Không thể tải danh sách Creator.');
        console.error(err);
      },
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.showImagePreview(file);
      this.campaignForm.get('featuredImageUrl')?.setValue('');
    }
  }

  showImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewImageUrl = e.target?.result || null;
    };
    reader.readAsDataURL(file);
  }

  onUrlInput(event: any): void {
    const url = event.target.value;
    if (url) {
      this.previewImageUrl = url;
      this.selectedFile = null;
    } else {
      this.previewImageUrl = null;
    }
  }

  uploadImage(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.selectedFile) {
        resolve('');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post<any>(`${environment.apiUrl}/api/campaign/upload-image`, formData).subscribe({
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

  async onSubmit(): Promise<void> {
    if (this.campaignForm.invalid) {
      this.showErrorMessage('Vui lòng điền đầy đủ thông tin hợp lệ.');
      return;
    }

    this.isLoading = true;

    try {
      let imageUrl = this.campaignForm.get('featuredImageUrl')?.value;

      if (!imageUrl && this.selectedFile) {
        imageUrl = await this.uploadImage();
      } else if (!imageUrl && !this.selectedFile) {
        imageUrl = this.campaignForm.get('featuredImageUrl')?.value;
      }

      const formValues = this.campaignForm.value;

      const selectedCreator = this.creators.find(c => c.id === formValues.creatorId);
      const creatorName = selectedCreator ? selectedCreator.name : '';

      const updatedCampaign: Campaign = {
        ...formValues,
        Id: this.campaignId,
        Title: formValues.title,
        GoalAmount: formValues.goalAmount,
        Description: formValues.description,
        FeaturedImageUrl: imageUrl || '',
        Status: formValues.status,
        CategoryName: formValues.categoryName,
        CreatorId: formValues.creatorId,
        CreatorName: creatorName,
        EndDate: formValues.endDate,
      };

      this.campaignService.updateCampaign(this.campaignId, updatedCampaign).subscribe({
        next: () => {
          this.isLoading = false;
          this.showSuccessMessage('Cập nhật chiến dịch thành công!');
          this.router.navigate(['/list-campaign']);
        },
        error: () => {
          this.isLoading = false;
          this.showErrorMessage('Cập nhật chiến dịch thất bại.');
        },
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

  showErrorMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', { duration: 5000 });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Đóng', { duration: 3000 });
  }
}