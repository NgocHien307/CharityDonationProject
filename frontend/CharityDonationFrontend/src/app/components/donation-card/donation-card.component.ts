import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-donation-card',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './donation-card.component.html',
  styleUrls: ['./donation-card.component.css']
})
export class DonationCardComponent {
  @Input() data: { title: string; amount: number; goal?: number } | undefined;

  get formattedGoal(): string {
    if (!this.data) return '';
    const goal = this.data.goal ?? 0; 
    return `${this.data.amount.toLocaleString()} / ${goal.toLocaleString()} VNĐ`;
  }
}
