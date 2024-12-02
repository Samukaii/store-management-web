import { Directive, input } from '@angular/core';
import { ButtonIconColor } from "../../components/button/models/button-icon-color";

@Directive({
	selector: '[appButtonColor]',
	host: {
		'[class]': '"color-" + color()'
	}
})
export class ButtonColorDirective {
	color = input<ButtonIconColor>('primary');
}
