import { Component } from '@angular/core';
import { SlideComponent } from './slide/slide.component';

@Component({
  selector: 'app-home',
  imports: [SlideComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
