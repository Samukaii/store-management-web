import { Component, inject } from '@angular/core';
import { FoodInputsFormComponent } from "../form/food-inputs-form.component";
import { FoodInputsService } from "../food-inputs.service";
import { FoodInputsFormValue } from "../models/food-inputs-form-value";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";

@Component({
    selector: 'app-food-inputs-create',
    imports: [
        FoodInputsFormComponent
    ],
    templateUrl: './food-inputs-create.component.html',
    styleUrl: './food-inputs-create.component.scss'
})
export class FoodInputsCreateComponent {
	service = inject(FoodInputsService);
	actions = injectRouterActions();

	create(value: FoodInputsFormValue) {
		this.service.create(value).subscribe(() => {
			this.actions.goBack();
		});
	}
}
