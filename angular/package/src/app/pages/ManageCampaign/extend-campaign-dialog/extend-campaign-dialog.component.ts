import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-extend-campaign-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  template: `
    <h2 mat-dialog-title>Gia hạn chiến dịch</h2>
    <mat-dialog-content>
      <form [formGroup]="extendForm">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Ngày kết thúc mới</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="endDate" />
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="extendForm.get('endDate')?.hasError('required')">
            Vui lòng chọn ngày kết thúc
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Hủy</button>
      <button mat-flat-button color="primary" (click)="onSubmit()" [disabled]="extendForm.invalid">Gia hạn</button>
    </mat-dialog-actions>
  `,
})
export class ExtendCampaignDialogComponent {
  extendForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExtendCampaignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentEndDate: Date | null }
  ) {
    this.extendForm = this.fb.group({
      endDate: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.extendForm.valid) {
      this.dialogRef.close(this.extendForm.value.endDate);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}