import { Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-buttons-header',
  imports: [
     MaterialModule
  ],
  templateUrl: './buttons-header.component.html',
  styleUrl: './buttons-header.component.scss'
})
export class ButtonsHeaderComponent {
  @Output() addEvent = new EventEmitter<void>();
}
