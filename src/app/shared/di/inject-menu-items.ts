import { inject } from "@angular/core";
import { ALL_ROUTE_CONFIGURATION } from "./tokens/all-route-configuration";

export interface MenuItem {
	name: string;
	items: {
		name: string;
		route: string;
		icon: string
	}[];
}

export const injectMenuItems = () => {
	const routes = inject(ALL_ROUTE_CONFIGURATION);

	const items: MenuItem[] = [];

	routes.forEach(route => {
		const data = route.data?.routeConfiguration?.menu;
		const path = route.path;

		if (!data || !path) return;

		const parent = data.parent ?? "";

		const existent = items.find(item => item.name===parent);

		if (existent) {
			existent.items.push({
				icon: data.icon,
				name: data.name,
				route: path,
			});

			return;
		}

		items.push({
			name: parent,
			items: [
				{
					icon: data.icon,
					name: data.name,
					route: path,
				}
			]
		});
	});

	return items;
};
