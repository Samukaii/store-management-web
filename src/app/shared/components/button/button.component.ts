import { Component, input } from '@angular/core';
import { ButtonType } from "./models/button-type";
import { MatButton, MatFabButton, MatIconButton, MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { NgClass } from "@angular/common";
import { ButtonIconColor } from "./models/button-icon-color";

@Component({
    selector: 'app-button',
	imports: [
		MatButton,
		MatIconButton,
		MatIcon,
		MatFabButton,
		MatMiniFabButton,
		MatTooltip,
		NgClass
	],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
	type = input<ButtonType>("raised");
	label = input<string>();
	tooltip = input<string>();
	icon = input<string>();
	iconColor = input<ButtonIconColor>('primary');
	disabled = input<boolean>();
}
