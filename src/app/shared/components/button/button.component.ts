import { Component, input } from '@angular/core';
import { ButtonType } from "./models/button-type";
import { MatDivider } from "@angular/material/divider";
import {
	MatAnchor,
	MatButton,
	MatFabAnchor,
	MatFabButton,
	MatIconButton,
	MatMiniFabButton
} from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: 'app-button',
    imports: [
        MatDivider,
        MatButton,
        MatAnchor,
        MatIconButton,
        MatIcon,
        MatFabButton,
        MatMiniFabButton,
        MatFabAnchor,
        RouterLink,
        MatTooltip
    ],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {
	type = input<ButtonType>("raised");
	label = input<string>();
	tooltip = input<string>();
	icon = input<string>();
	disabled = input<boolean>();
}
