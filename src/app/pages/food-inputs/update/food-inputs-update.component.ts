import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FoodInputsFormComponent } from "../form/food-inputs-form.component";
import { FoodInput } from "../models/food-input";
import { FoodInputsService } from "../food-inputs.service";
import { resource } from '../../../shared/signals/resource';
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { FoodInputsFormValue } from "../models/food-inputs-form-value";
import { ActivatedRoute, Router } from "@angular/router";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";

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

	resource = resource({
		request: this.id,
		loader: (id) => this.service.single(id)
	});

	update(form: FoodInputsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
