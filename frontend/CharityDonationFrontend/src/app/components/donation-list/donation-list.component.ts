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
    { title: "Hỗ trợ trẻ em nghèo", amount: 50000000 },
    { title: "Cứu trợ lũ lụt miền Trung", amount: 100000000 },
    { title: "Giúp đỡ bệnh nhân ung thư", amount: 70000000 }
  ];
}
