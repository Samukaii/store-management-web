import { Route } from "@angular/router";
import { RawMaterialsCategoriesListComponent } from "./list/raw-materials-categories-list.component";
import { RawMaterialsCategoriesCreateComponent } from "./create/raw-materials-categories-create.component";
import { RawMaterialsCategoriesUpdateComponent } from "./update/raw-materials-categories-update.component";
import { routeNames } from "src/app/shared/route-names";

export default [
	{
		path: routeNames.empty,
		component: RawMaterialsCategoriesListComponent,
	},
	{
		path: routeNames.new,
		component: RawMaterialsCategoriesCreateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Adicionar"
			}
		},
	},
	{
		path: routeNames.single,
		component: RawMaterialsCategoriesUpdateComponent,
		data: {
			routeConfiguration: {
				breadcrumb: "Editar"
			}
		},
	},
] as Route[];
