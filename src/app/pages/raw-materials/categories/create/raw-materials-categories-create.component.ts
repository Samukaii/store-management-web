import { Component, inject } from '@angular/core';
import { RawMaterialsCategoriesFormComponent } from "../form/raw-materials-categories-form.component";
import { RawMaterialsCategoriesService } from "../raw-materials-categories.service";
import { RawMaterialsCategoriesFormValue } from "../models/raw-materials-categories-form-value";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";


@Component({
	selector: 'app-raw-materials-categories-create',
	imports: [
		RawMaterialsCategoriesFormComponent
	],
	templateUrl: './raw-materials-categories-create.component.html',
	styleUrl: './raw-materials-categories-create.component.scss'
})
export class RawMaterialsCategoriesCreateComponent {
	service = inject(RawMaterialsCategoriesService);
	actions = injectRouterActions();

	create(value: RawMaterialsCategoriesFormValue) {
		this.service.create(value).subscribe(() => {
			this.actions.goBack();
		});
	}
}
