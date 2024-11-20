import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { ProductsListComponent } from "./list/products-list.component";
import { ProductsCreateComponent } from "./create/products-create.component";
import { ProductsUpdateComponent } from "./update/products-update.component";

export default [
	{
		path: routeNames.empty,
		component: ProductsListComponent,
	},
	{
		path: routeNames.new,
		component: ProductsCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: ProductsUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
