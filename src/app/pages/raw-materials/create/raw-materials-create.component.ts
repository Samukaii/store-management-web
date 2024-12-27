import { Component, inject } from '@angular/core';
import { RawMaterialsFormComponent } from "../form/raw-materials-form.component";
import { RawMaterialsService } from "../raw-materials.service";
import { RawMaterialsFormValue } from "../models/raw-materials-form-value";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";


@Component({
	selector: 'app-raw-materials-create',
	imports: [
		RawMaterialsFormComponent
	],
	templateUrl: './raw-materials-create.component.html',
	styleUrl: './raw-materials-create.component.scss'
})
export class RawMaterialsCreateComponent {
	service = inject(RawMaterialsService);
	actions = injectRouterActions();

	create(value: RawMaterialsFormValue) {
		this.service.create(value).subscribe(() => {
			this.actions.goBack();
		});
	}
}
