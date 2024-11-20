import { Component } from '@angular/core';
import { MatMenuItem } from "@angular/material/menu";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { routeNames } from "../../../shared/route-names";

@Component({
  selector: 'app-menu',
  standalone: true,
	imports: [
		MatMenuItem,
		RouterLink,
		MatRipple,
		MatIcon,
		MatNavList,
		MatListItem,
		RouterLinkActive
	],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
	items = [
		{
			name: "Insumos",
			route: routeNames.foodInputs,
			icon: "restaurant"
		},
		{
			name: "Produtos",
			route: routeNames.products,
			icon: "lunch_dining"
		},
		{
			name: "Pedidos",
			route: routeNames.orders,
			icon: "menu_book"
		},
		{
			name: "Estatísticas",
			route: routeNames.statistics,
			icon: "monitoring"
		},
	]
}
