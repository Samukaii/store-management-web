import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { PreparationsListComponent } from "./list/preparations-list.component";
import { PreparationsCreateComponent } from "./create/preparations-create.component";
import { PreparationsUpdateComponent } from "./update/preparations-update.component";

export default [
	{
		path: routeNames.empty,
		component: PreparationsListComponent,
	},
	{
		path: routeNames.new,
		component: PreparationsCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: PreparationsUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
