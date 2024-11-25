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
		path: routeNames.productsCategories,
		loadChildren: () => import("./pages/products/categories/products-categories-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Categorias"
			}
		}
	},
	{
		path: routeNames.rawMaterialsCategories,
		loadChildren: () => import("./pages/raw-materials/categories/raw-materials-categories-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Categorias"
			}
		}
	},
	{
		path: routeNames.rawMaterials,
		data: {
			routeConfiguration: {
				breadcrumb: "Insumos"
			}
		},
		loadChildren: () => import("./pages/raw-materials/raw-materials-routes"),
	},
	{
		path: routeNames.preparations,
		data: {
			routeConfiguration: {
				breadcrumb: "Preparos"
			}
		},
		loadChildren: () => import("./pages/preparations/preparations-routes"),
	},
	{
		path: routeNames.products,
		loadChildren: () => import('./pages/products/products/products-routes'),
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
