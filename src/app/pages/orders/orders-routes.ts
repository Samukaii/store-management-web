import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { OrdersListComponent } from "./list/orders-list.component";
import { OrdersUpdateComponent } from "./update/orders-update.component";

export default [
	{
		path: routeNames.empty,
		component: OrdersListComponent,
	},
	{
		path: routeNames.single,
		component: OrdersUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
