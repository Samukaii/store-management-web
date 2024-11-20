import { Component, input } from '@angular/core';
import { FlexAlignment } from "./models/flex-alignment";
import { FlexDirection } from "./models/flex-direction";

@Component({
    selector: 'app-flex-row',
    imports: [],
    templateUrl: './flex-row.component.html',
    styleUrl: './flex-row.component.scss',
    host: {
        '[style.justify-content]': 'direction() === "column" ? horizontalAlignment() : verticalAlignment()',
        '[style.align-items]': 'direction() === "row" ? horizontalAlignment() : verticalAlignment()',
        '[style.flex-direction]': 'direction()',
        '[style.gap]': 'gap()',
        '[class.fill]': 'fill()',
    }
})
export class FlexRowComponent {
	verticalAlignment = input<FlexAlignment>("flex-start");
	horizontalAlignment = input<FlexAlignment>("flex-start");
	direction = input<FlexDirection>("row");
	gap = input("1rem");
	fill = input(false);
}
