import { Component, inject, input, signal } from '@angular/core';
import { ProductsCategoriesFormComponent } from "../form/products-categories-form.component";
import { ProductCategory } from "../models/product-category";
import { ProductsCategoriesService } from "../products-categories.service";
import { WindowLoadingComponent } from "src/app/core/components/window-loading/window-loading.component";
import { ProductsCategoriesFormValue } from "../models/products-categories-form-value";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";
import { rxResource } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-products-categories-update',
    imports: [
        ProductsCategoriesFormComponent,
        WindowLoadingComponent
    ],
    templateUrl: './products-categories-update.component.html',
    styleUrl: './products-categories-update.component.scss'
})
export class ProductsCategoriesUpdateComponent {
	id = input.required<number>();
	data = signal<ProductCategory | null>(null);
	service = inject(ProductsCategoriesService);
	actions = injectRouterActions();

	resource = rxResource({
		request: this.id,
		loader: ({request: id}) => this.service.single(id)
	});

	update(form: ProductsCategoriesFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
