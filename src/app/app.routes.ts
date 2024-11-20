import { routeNames } from "./shared/route-names";
import { AppRoutes } from "./shared/models/app-routes";

export const routes: AppRoutes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: routeNames.orders,
	},
	{
		path: routeNames.orders,
		loadChildren: () => import("./pages/orders/orders-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Pedidos"
			}
		}
	},
	{
		path: routeNames.foodInputs,
		data: {
			routeConfiguration: {
				breadcrumb: "Insumos"
			}
		},
		loadChildren: () => import("./pages/food-inputs/food-inputs-routes"),
	},
	{
		path: routeNames.products,
		loadChildren: () => import('./pages/products/products-routes'),
		data: {
			routeConfiguration: {
				breadcrumb: "Produtos"
			}
		},
	},
	{
		path: routeNames.statistics,
		loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
		data: {
			routeConfiguration: {
				breadcrumb: "Estatísticas"
			}
		},
	},
];
