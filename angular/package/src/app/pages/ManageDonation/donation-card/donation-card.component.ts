import { Component, Input } from '@angular/core';
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
  selector: 'app-donation-card',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.scss']
})
export class DonationCardComponent {
  @Input() data: Campaign | undefined;

  get formattedGoal(): string {
    if (!this.data) return '';
    return `${this.data.collectedAmount.toLocaleString()} / ${this.data.goalAmount.toLocaleString()} VNĐ`;
  }
}
