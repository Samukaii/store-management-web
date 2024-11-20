import { Component, inject, input, signal } from '@angular/core';
import { ProductsFormComponent } from "../form/products-form.component";
import { Product } from "../models/product";
import { ProductsService } from "../products.service";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { ProductsFormValue } from "../models/products-form-value";
import { Router } from "@angular/router";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { ProductsIngredientsComponent } from "../ingredients/products-ingredients.component";
import { TabsComponent } from "../../../shared/components/tabs/tabs.component";
import { TabsItemComponent } from "../../../shared/components/tabs/item/tabs-item.component";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-products-update',
	imports: [
		ProductsFormComponent,
		WindowLoadingComponent,
		ProductsIngredientsComponent,
		TabsComponent,
		TabsItemComponent
	],
    templateUrl: './products-update.component.html',
    styleUrl: './products-update.component.scss'
})
export class ProductsUpdateComponent {
	id = input.required<number>();
	data = signal<Product | null>(null);
	service = inject(ProductsService);
	actions = injectRouterActions();
	router = inject(Router);

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: ProductsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
