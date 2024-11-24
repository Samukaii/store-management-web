import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIcon } from "@angular/material/icon";
import { MatListItem, MatNavList } from "@angular/material/list";
import { routeNames } from "../../../shared/route-names";

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
	items = [
		{
			name: "Ingredientes",
			items: [
				{
					name: "Insumos",
					route: routeNames.rawMaterials,
					icon: "restaurant"
				},
				{
					name: "Preparos",
					route: routeNames.preparations,
					icon: "blender"
				},

			]
		},
		{
			name: "Vendas",
			items: [
				{
					name: "Produtos",
					route: routeNames.products,
					icon: "lunch_dining"
				},
				{
					name: "Categorias",
					route: routeNames.categories,
					icon: "category"
				},
				{
					name: "Pedidos",
					route: routeNames.orders,
					icon: "menu_book"
				},
			]
		},
		{
			name: "Análises",
			items: [
				{
					name: "Estatísticas",
					route: routeNames.statistics,
					icon: "monitoring"
				},
			]
		}
	]
}
