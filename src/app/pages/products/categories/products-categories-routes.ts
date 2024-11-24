import { Route } from "@angular/router";
import { ProductsCategoriesListComponent } from "./list/products-categories-list.component";
import { ProductsCategoriesCreateComponent } from "./create/products-categories-create.component";
import { ProductsCategoriesUpdateComponent } from "./update/products-categories-update.component";
import { routeNames } from "../../../shared/route-names";

export default [
	{
		path: routeNames.empty,
		component: ProductsCategoriesListComponent,
	},
	{
		path: routeNames.new,
		component: ProductsCategoriesCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: ProductsCategoriesUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
