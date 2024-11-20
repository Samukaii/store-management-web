import { Component, inject, input, signal } from '@angular/core';
import { FoodInputsFormComponent } from "../form/food-inputs-form.component";
import { FoodInput } from "../models/food-input";
import { FoodInputsService } from "../food-inputs.service";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { FoodInputsFormValue } from "../models/food-inputs-form-value";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-food-inputs-update',
    imports: [
        FoodInputsFormComponent,
        WindowLoadingComponent
    ],
    templateUrl: './food-inputs-update.component.html',
    styleUrl: './food-inputs-update.component.scss'
})
export class FoodInputsUpdateComponent {
	id = input.required<number>();
	data = signal<FoodInput | null>(null);
	service = inject(FoodInputsService);
	actions = injectRouterActions();

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: FoodInputsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
