import { Route } from "@angular/router";
import { routeNames } from "../../shared/route-names";
import { RawMaterialsListComponent } from "./list/raw-materials-list.component";
import { RawMaterialsCreateComponent } from "./create/raw-materials-create.component";
import { RawMaterialsUpdateComponent } from "./update/raw-materials-update.component";

export default [
	{
		path: routeNames.empty,
		component: RawMaterialsListComponent,
	},
	{
		path: routeNames.new,
		component: RawMaterialsCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: RawMaterialsUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
