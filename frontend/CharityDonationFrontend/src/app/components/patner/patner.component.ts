import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-patner',
  standalone:true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './patner.component.html',
  styleUrl: './patner.component.css'
})
export class PatnerComponent {

}
