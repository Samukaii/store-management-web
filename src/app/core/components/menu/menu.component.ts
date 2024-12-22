import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { routeNames } from "../../../shared/route-names";
import { injectMenuItems } from "../../../shared/di/inject-menu-items";

@Component({
	selector: 'app-menu',
	imports: [
		RouterLink,
		MatIcon,
		MatNavList,
		MatListItem,
		RouterLinkActive
	],
	templateUrl: './menu.component.html',
	styleUrl: './menu.component.scss'
})
export class MenuComponent {
	items = injectMenuItems();
}
