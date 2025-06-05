import { M } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CardStatic } from 'src/app/interfaces/CardStaticPanel';

@Component({
  selector: 'app-card-static',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './card-static.component.html',
  styleUrl: './card-static.component.scss'
})
export class CardStaticComponent {
  @Input() card_static: CardStatic

  opacityColor(hex: string, amount: number = 0.9): string {
    // El parámetro `amount` indica cuánto aclarar (0.0 a 1.0)

    // Elimina el símbolo #
    hex = hex.replace('#', '');

    // Parsea los componentes R, G y B
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Mezcla con blanco
    const newR = Math.round(r + (255 - r) * amount);
    const newG = Math.round(g + (255 - g) * amount);
    const newB = Math.round(b + (255 - b) * amount);

    // Convierte de nuevo a hex
    const toHex = (c: number) => c.toString(16).padStart(2, '0');
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
  }
}
