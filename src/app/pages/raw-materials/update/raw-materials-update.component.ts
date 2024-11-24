import { Component, inject, input, signal } from '@angular/core';
import { RawMaterialsFormComponent } from "../form/raw-materials-form.component";
import { RawMaterial } from "../models/raw-material";
import { RawMaterialsService } from "../raw-materials.service";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { RawMaterialsFormValue } from "../models/raw-materials-form-value";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-raw-materials-update',
    imports: [
        RawMaterialsFormComponent,
        WindowLoadingComponent
    ],
    templateUrl: './raw-materials-update.component.html',
    styleUrl: './raw-materials-update.component.scss'
})
export class RawMaterialsUpdateComponent {
	id = input.required<number>();
	data = signal<RawMaterial | null>(null);
	service = inject(RawMaterialsService);
	actions = injectRouterActions();

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: RawMaterialsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
