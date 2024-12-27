import { Component, inject } from '@angular/core';
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { ButtonComponent } from "src/app/shared/components/button/button.component";
import { FlexRowComponent } from "src/app/shared/components/flex-row/flex-row.component";
import { NavigationContextService } from "./navigation-context.service";

@Component({
	selector: 'app-navigation-context',
	imports: [
		MatRipple,
		MatIcon,
		FlexRowComponent,
		ButtonComponent,
	],
	templateUrl: './navigation-context.component.html',
	styleUrl: './navigation-context.component.scss',
	host: {
		'class': 'mat-elevation-z3'
	}
})
export class NavigationContextComponent {
	service = inject(NavigationContextService);
}
