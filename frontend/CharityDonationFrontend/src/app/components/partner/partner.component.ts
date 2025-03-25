import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.css'
})
export class PartnerComponent {
  partners = [
    {
      title: 'Đối tác 1',
      description: 'Mô tả ngắn về đối tác 1.',
      logo: 'assets/images/partner-logo1.jpg',
      link: '/partner-details'
    },
    {
      title: 'Đối tác 2',
      description: 'Mô tả ngắn về đối tác 2.',
      logo: 'assets/images/partner-logo2.jpg',
      link: '/partner-details'
    },
    {
      title: 'Đối tác 3',
      description: 'Mô tả ngắn về đối tác 3.',
      logo: 'assets/images/partner-logo3.jpg',
      link: '/partner-details'
    },{
      title: 'Đối tác 4',
      description: 'Mô tả ngắn về đối tác 4.',
      logo: 'assets/images/partner-logo4.jpg',
      link: '/partner-details'
    }
  ];
}
