import { booleanAttribute, Component, input } from '@angular/core';
import { FlexAlignment } from "./models/flex-alignment";

@Component({
    selector: 'app-flex-row',
    templateUrl: './flex-row.component.html',
    styleUrl: './flex-row.component.scss',
    host: {
        '[style.justify-content]': 'column() ? horizontalAlignment() : verticalAlignment()',
        '[style.align-items]': '!column() ? horizontalAlignment() : verticalAlignment()',
        '[style.flex-direction]': 'column() ? "column" : "row"',
        '[style.gap]': 'gap()',
        '[class.fill]': 'fill()',
    }
})
export class FlexRowComponent {
	verticalAlignment = input<FlexAlignment>("flex-start");
	horizontalAlignment = input<FlexAlignment>("flex-start");
	gap = input("1rem");
	fill = input(false, {transform: booleanAttribute});
	column = input(false, {transform: booleanAttribute});
}
