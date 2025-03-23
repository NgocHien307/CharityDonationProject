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
  @Input() data: { title: string; amount: number } | undefined;
}
