import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { OrdersListComponent } from "./list/orders-list.component";
import { OrdersUpdateComponent } from "./update/orders-update.component";
import { OrdersCreateComponent } from "src/app/pages/orders/create/orders-create.component";

export default [
	{
		path: routeNames.empty,
		component: OrdersListComponent,
	},
	{
		path: routeNames.new,
		component: OrdersCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
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
