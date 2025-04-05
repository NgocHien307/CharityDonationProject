import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Campaign {
  id: number;
  title: string;
  collectedAmount: number;
  goalAmount: number;
  featuredImageUrl: String;
}

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss']
})
export class DonationCardComponent {
  @Input() data: Campaign | undefined;
  campaigns : Campaign[] = [];
  isLoading = true;
  currentPage = 1;

  get formattedGoal(): string {
    if (!this.data) return '';
    return `${this.data.collectedAmount.toLocaleString()} / ${this.data.goalAmount.toLocaleString()} VNĐ`;
  }

  getProgressPercentage(collectedAmount: number, goalAmount: number): number {
    return goalAmount > 0 ? Math.min((collectedAmount / goalAmount) * 100, 100) : 0;
  }

  getDaysLeft(endDate: Date | null): number {
    if (!endDate) return 0;
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }
}
