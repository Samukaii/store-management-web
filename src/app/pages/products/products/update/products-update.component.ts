import { Component, inject, input, signal } from '@angular/core';
import { ProductsFormComponent } from "../form/products-form.component";
import { Product } from "../models/product";
import { ProductsService } from "../products.service";
import { ProductsFormValue } from "../models/products-form-value";
import { Router } from "@angular/router";
import { injectRouterActions } from "../src/app/shared/di/inject-router-actions";
import { ProductsIngredientsComponent } from "../ingredients/products-ingredients.component";
import { TabsComponent } from "../src/app/shared/components/tabs/tabs.component";
import { TabsItemComponent } from "../src/app/shared/components/tabs/item/tabs-item.component";
import { rxResource } from "@angular/core/rxjs-interop";
import { WindowLoadingComponent } from "../src/app/core/components/window-loading/window-loading.component";

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
	data = signal<Product | null>(null);
	service = inject(ProductsService);
	actions = injectRouterActions();
	router = inject(Router);
	id = input.required<number>();

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
