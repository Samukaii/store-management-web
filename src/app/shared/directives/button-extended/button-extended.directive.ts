import { Directive } from '@angular/core';
import { ButtonRequestLoadingDirective } from "../button-request-loading/button-request-loading.directive";
import { ButtonLoadingDirective } from "../button-loading/button-loading.directive";
import { ButtonColorDirective } from "../button-color/button-color.directive";

@Directive({
	selector: `
		button[mat-button][appButtonExtended],
		button[mat-raised-button][appButtonExtended],
		button[mat-stroked-button][appButtonExtended],
		button[mat-flat-button][appButtonExtended],
		button[mat-icon-button][appButtonExtended],
		button[mat-fab][appButtonExtended],
		button[mat-mini-fab][appButtonExtended],
	`,
	hostDirectives: [
		{
			directive: ButtonLoadingDirective,
			inputs: ['loading']
		},
		{
			directive: ButtonColorDirective,
			inputs: ['color']
		},
		{
			directive: ButtonRequestLoadingDirective,
		},
	],
})
export class ButtonExtendedDirective {
}
