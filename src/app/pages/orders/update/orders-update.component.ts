import { Component, inject, input, signal } from '@angular/core';
import { OrdersFormComponent } from "../form/orders-form.component";
import { Order } from "../models/order";
import { OrdersService } from "../orders.service";
import { resource } from '../../../shared/signals/resource';
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { Router } from "@angular/router";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { MatTab, MatTabGroup } from "@angular/material/tabs";
import { OrdersItemsComponent } from "../items/orders-items.component";
import { LocalActionsComponent } from "../../../shared/components/local-actions/local-actions.component";
import { TabsComponent } from "../../../shared/components/tabs/tabs.component";
import { TabsItemComponent } from "../../../shared/components/tabs/item/tabs-item.component";
import { CurrencyPipe, DatePipe, JsonPipe } from "@angular/common";

@Component({
    selector: 'app-orders-update',
    imports: [
        OrdersFormComponent,
        WindowLoadingComponent,
        MatTabGroup,
        MatTab,
        OrdersItemsComponent,
        LocalActionsComponent,
        TabsComponent,
        TabsItemComponent,
        JsonPipe,
        DatePipe,
        CurrencyPipe
    ],
    templateUrl: './orders-update.component.html',
    styleUrl: './orders-update.component.scss'
})
export class OrdersUpdateComponent {
	id = input.required<number>();
	data = signal<Order | null>(null);
	service = inject(OrdersService);
	actions = injectRouterActions();
	router = inject(Router);

	resource = resource({
		request: this.id,
		loader: (id) => this.service.single(id)
	});
}
