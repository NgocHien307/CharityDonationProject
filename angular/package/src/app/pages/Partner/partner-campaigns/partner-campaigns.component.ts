import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Campaign {
  id: number;
  title: string;
  collectedAmount: number;
  goalAmount: number;
}

@Component({
  selector: 'app-partner-campaigns',
  imports: [CommonModule, RouterModule],
  templateUrl: './partner-campaigns.component.html',
  styleUrl: './partner-campaigns.component.scss'
})
export class PartnerCampaignsComponent {
@Input() data: Campaign | undefined;
  campaigns : Campaign[] = [];
  isLoading = true;
  currentPage = 1;

  get formattedGoal(): string {
    if (!this.data) return '';
    return `${this.data.collectedAmount.toLocaleString()} / ${this.data.goalAmount.toLocaleString()} VNĐ`;
  }
}
