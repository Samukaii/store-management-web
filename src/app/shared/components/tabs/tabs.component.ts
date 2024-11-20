import { Component, contentChildren, effect, inject, input, OnInit, ViewContainerRef } from '@angular/core';
import { LocalActionsComponent } from "../local-actions/local-actions.component";
import { MatTab, MatTabContent, MatTabGroup, MatTabLabel } from "@angular/material/tabs";
import { ProductsIngredientsComponent } from "../../../pages/products/ingredients/products-ingredients.component";
import { ProductsFormComponent } from "../../../pages/products/form/products-form.component";
import { ProductsFormValue } from "../../../pages/products/models/products-form-value";
import { ActivatedRoute, Router } from "@angular/router";
import { injectQueryParams } from "../../di/inject-query-params";
import { injectSpecificQueryParam } from "../../di/inject-specific-query-param";
import { TabsItemComponent } from "./item/tabs-item.component";
import { NgTemplateOutlet } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { LocalActionsService } from "../local-actions/local-actions.service";

@Component({
    selector: 'app-tabs',
    imports: [
        LocalActionsComponent,
        MatTab,
        MatTabGroup,
        ProductsIngredientsComponent,
        ProductsFormComponent,
        NgTemplateOutlet,
        MatIcon,
        MatTabLabel,
        MatTabContent
    ],
    templateUrl: './tabs.component.html',
    styleUrl: './tabs.component.scss'
})
export class TabsComponent {
	router = inject(Router);
	route = inject(ActivatedRoute);
	localActions = inject(LocalActionsService);

	tabChildren = contentChildren(TabsItemComponent);

	selectedTab = injectSpecificQueryParam('tab');

	onChangeTab(tabIndex: number) {
		this.router.navigate([], {
			queryParams: {
				tab: tabIndex
			}
		});

		this.localActions.deleteActions('tabs')
	}
}
