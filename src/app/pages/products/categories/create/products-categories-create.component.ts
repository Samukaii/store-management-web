import { Component, inject } from '@angular/core';
import { ProductsCategoriesFormComponent } from "../form/products-categories-form.component";
import { ProductsCategoriesService } from "../products-categories.service";
import { ProductsCategoriesFormValue } from "../models/products-categories-form-value";
import { injectRouterActions } from "../../../../shared/di/inject-router-actions";


@Component({
	selector: 'app-products-categories-create',
	imports: [
		ProductsCategoriesFormComponent
	],
	templateUrl: './products-categories-create.component.html',
	styleUrl: './products-categories-create.component.scss'
})
export class ProductsCategoriesCreateComponent {
	service = inject(ProductsCategoriesService);
	actions = injectRouterActions();

	create(value: ProductsCategoriesFormValue) {
		this.service.create(value).subscribe(() => {
			this.actions.goBack();
		});
	}
}
