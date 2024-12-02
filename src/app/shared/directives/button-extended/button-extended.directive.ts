import { Directive } from '@angular/core';
import { ButtonRequestLoadingDirective } from "../button-request-loading/button-request-loading.directive";
import { ButtonLoadingDirective } from "../button-loading/button-loading.directive";
import { ButtonColorDirective } from "../button-color/button-color.directive";

@Directive({
	selector: '[appButtonExtended]',
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
