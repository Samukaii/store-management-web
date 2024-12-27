import { Component, inject, input, signal } from '@angular/core';
import { Preparation } from "../models/preparation";
import { PreparationsService } from "../preparations.service";
import { WindowLoadingComponent } from "src/app/core/components/window-loading/window-loading.component";
import { PreparationsFormValue } from "../models/preparations-form-value";
import { Router } from "@angular/router";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";
import { TabsComponent } from "src/app/shared/components/tabs/tabs.component";
import { TabsItemComponent } from "src/app/shared/components/tabs/item/tabs-item.component";
import { rxResource } from "@angular/core/rxjs-interop";
import { ProductsFormComponent } from "../form/preparations-form.component";
import { ProductsIngredientsComponent } from "../ingredients/preparations-ingredients.component";

@Component({
    selector: 'app-preparations-update',
	imports: [
		WindowLoadingComponent,
		TabsComponent,
		TabsItemComponent,
		ProductsFormComponent,
		ProductsIngredientsComponent
	],
    templateUrl: './preparations-update.component.html',
    styleUrl: './preparations-update.component.scss'
})
export class PreparationsUpdateComponent {
	data = signal<Preparation | null>(null);
	service = inject(PreparationsService);
	actions = injectRouterActions();
	router = inject(Router);
	id = input.required<number>();

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: PreparationsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
