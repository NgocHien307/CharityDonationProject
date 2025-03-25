import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonationCardComponent } from '../donation-card/donation-card.component';

@Component({
  selector: 'app-donation-list',
  standalone: true,
  imports: [CommonModule, DonationCardComponent],
  templateUrl: './donation-list.component.html',
  styleUrls: ['./donation-list.component.css']
})
export class DonationListComponent {
  donations = [
    { title: "Hỗ trợ trẻ em nghèo", amount: 5000000, goal: 10000000 },
    { title: "Cứu trợ lũ lụt miền Trung", amount: 10000000, goal: 20000000 },
    { title: "Giúp đỡ bệnh nhân ung thư", amount: 7000000, goal: 15000000 }
  ];
}
