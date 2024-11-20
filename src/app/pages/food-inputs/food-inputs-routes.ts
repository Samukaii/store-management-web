import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { FoodInputsListComponent } from "./list/food-inputs-list.component";
import { FoodInputsCreateComponent } from "./create/food-inputs-create.component";
import { FoodInputsUpdateComponent } from "./update/food-inputs-update.component";

export default [
	{
		path: routeNames.empty,
		component: FoodInputsListComponent,
	},
	{
		path: routeNames.new,
		component: FoodInputsCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: FoodInputsUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
