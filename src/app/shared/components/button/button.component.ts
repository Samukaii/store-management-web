import { Component, computed, inject, input } from '@angular/core';
import { ButtonType } from "./models/button-type";
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { AppColor } from "./models/app-color";
import {
	ButtonRequestLoadingDirective
} from "../../directives/button-request-loading/button-request-loading.directive";
import { ButtonExtendedDirective } from "../../directives/button-extended/button-extended.directive";

@Component({
    selector: 'app-button',
	imports: [
		MatButton,
		MatIconButton,
		MatIcon,
		MatFabButton,
		MatMiniFabButton,
		MatTooltip,
		ButtonExtendedDirective
	],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
	hostDirectives: [
		{
			directive: ButtonRequestLoadingDirective,
			outputs: ['finishLoading'],
			inputs: ['identifier']
		}
	],
	host: {
		'ngSkipHydration': "true",
		'[style.pointer-events]': "canClick() ? 'auto' : 'none'"
	}
})
export class ButtonComponent {
	type = input<ButtonType>("raised");
	label = input<string>();
	tooltip = input<string>();
	icon = input<string>();
	color = input<AppColor>('primary');
	disabled = input<boolean>();
	loading = input(false);

	requestLoading = inject(ButtonRequestLoadingDirective);

	canClick = computed(() =>
		!this.disabled() &&
		!this.requestLoading.loading() &&
		!this.loading()
	);
}
