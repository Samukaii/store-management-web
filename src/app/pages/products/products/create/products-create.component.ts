import { Component, inject } from '@angular/core';
import { ProductsFormComponent } from "../form/products-form.component";
import { ProductsService } from "../products.service";
import { ProductsFormValue } from "../models/products-form-value";
import { injectRouterActions } from "src/app/shared/di/inject-router-actions";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-products-create',
    imports: [
        ProductsFormComponent
    ],
    templateUrl: './products-create.component.html',
    styleUrl: './products-create.component.scss'
})
export class ProductsCreateComponent {
	service = inject(ProductsService);
	actions = injectRouterActions();
	router = inject(Router);
	route = inject(ActivatedRoute);

	create(value: ProductsFormValue) {
		this.service.create(value).subscribe(response => {
			this.router.navigate(['..', response.id], {
				queryParams: {
					tab: 1
				},
				relativeTo: this.route
			});
		});
	}
}
