import { Directive } from '@angular/core';
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";

@Directive({
	selector: '[appYearFormat]',
	providers: [
		provideMomentDateAdapter({
			parse: {
				dateInput: 'YYYY',
			},
			display: {
				dateInput: 'YYYY',
				monthYearLabel: 'MMM YYYY',
				dateA11yLabel: 'LL',
				monthYearA11yLabel: 'MMMM YYYY',
			},
		}),
	]
})
export class YearFormatDirective {
}
