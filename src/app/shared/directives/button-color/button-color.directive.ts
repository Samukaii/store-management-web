import { Directive, input } from '@angular/core';
import { AppColor } from "../../components/button/models/app-color";

@Directive({
	selector: '[appButtonColor]',
	host: {
		'[class]': '"color-" + color()'
	}
})
export class ButtonColorDirective {
	color = input<AppColor>('primary');
}
