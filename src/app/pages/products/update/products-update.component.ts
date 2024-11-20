import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { ProductsFormComponent } from "../form/products-form.component";
import { Product } from "../models/product";
import { ProductsService } from "../products.service";
import { resource } from '../../../shared/signals/resource';
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { ProductsFormValue } from "../models/products-form-value";
import { ActivatedRoute, Router } from "@angular/router";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { ProductsIngredientsComponent } from "../ingredients/products-ingredients.component";
import { LocalActionsComponent } from "../../../shared/components/local-actions/local-actions.component";
import { TabsComponent } from "../../../shared/components/tabs/tabs.component";
import { TabsItemComponent } from "../../../shared/components/tabs/item/tabs-item.component";
import { JsonPipe } from "@angular/common";

@Component({
  selector: 'app-products-update',
  standalone: true,
	imports: [
		ProductsFormComponent,
		WindowLoadingComponent,
		MatTabGroup,
		MatTab,
		ProductsIngredientsComponent,
		LocalActionsComponent,
		TabsComponent,
		TabsItemComponent,
		JsonPipe
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

	resource = resource({
		request: this.id,
		loader: (id) => this.service.single(id)
	});

	a = effect(() => {
		console.log(this.resource.data());
	})

	update(form: ProductsFormValue) {
		this.service.update(this.id(), form).subscribe(() => {
			this.actions.goBack();
		});
	}
}
