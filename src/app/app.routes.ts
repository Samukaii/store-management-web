import { routeNames } from "./shared/route-names";
import { AppRoutes } from "./shared/models/app-routes";

export const routes: AppRoutes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: routeNames.rawMaterials,
	},
	{
		path: routeNames.rawMaterials,
		data: {
			routeConfiguration: {
				breadcrumb: "Insumos",
				menu: {
					parent: "Ingredientes",
					name: "Insumos",
					icon: "restaurant"
				}
			}
		},
		loadChildren: () => import("./pages/raw-materials/raw-materials-routes"),
	},
	{
		path: routeNames.rawMaterialsCategories,
		loadChildren: () => import("./pages/raw-materials/categories/raw-materials-categories-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Categorias",
				menu: {
					parent: "Ingredientes",
					name: "Categorias",
					icon: "category"
				}
			}
		}
	},
	{
		path: routeNames.preparations,
		data: {
			routeConfiguration: {
				breadcrumb: "Preparos",
				menu: {
					parent: "Ingredientes",
					name: "Preparos",
					icon: "blender"
				}
			}
		},
		loadChildren: () => import("./pages/preparations/preparations-routes"),
	},
	{
		path: routeNames.products,
		loadChildren: () => import('./pages/products/products/products-routes'),
		data: {
			routeConfiguration: {
				breadcrumb: "Produtos",
				menu: {
					parent: "Vendas",
					name: "Produtos",
					icon: "lunch_dining"
				}
			}
		},
	},
	{
		path: routeNames.productsCategories,
		loadChildren: () => import("./pages/products/categories/products-categories-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Categorias",
				menu: {
					parent: "Vendas",
					name: "Categorias",
					icon: "category"
				}
			}
		}
	},
	{
		path: routeNames.orders,
		loadChildren: () => import("./pages/orders/orders-routes"),
		data: {
			routeConfiguration: {
				breadcrumb: "Pedidos",
				menu: {
					parent: "Vendas",
					name: "Pedidos",
					icon: "menu_book"
				}
			}
		}
	},
	{
		path: routeNames.statistics,
		loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent),
		data: {
			routeConfiguration: {
				breadcrumb: "Estatísticas",
				menu: {
					parent: "Análises",
					name: "Estatísticas",
					icon: "monitoring"
				}
			}
		},
	},
];
