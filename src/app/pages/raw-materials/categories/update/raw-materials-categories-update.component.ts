import { Component, inject, input, signal } from '@angular/core';
import { RawMaterialsCategoriesFormComponent } from "../form/raw-materials-categories-form.component";
import { RawMaterialCategory } from "../models/raw-material-category";
import { RawMaterialsCategoriesService } from "../raw-materials-categories.service";
import { WindowLoadingComponent } from "../../../../core/components/window-loading/window-loading.component";
import { RawMaterialsCategoriesFormValue } from "../models/raw-materials-categories-form-value";
import { injectRouterActions } from "../../../../shared/di/inject-router-actions";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-raw-materials-categories-update',
    imports: [
        RawMaterialsCategoriesFormComponent,
        WindowLoadingComponent
    ],
    templateUrl: './raw-materials-categories-update.component.html',
    styleUrl: './raw-materials-categories-update.component.scss'
})
export class RawMaterialsCategoriesUpdateComponent {
	id = input.required<number>();
	data = signal<RawMaterialCategory | null>(null);
	service = inject(RawMaterialsCategoriesService);
	actions = injectRouterActions();

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: RawMaterialsCategoriesFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
