import { Component, contentChildren, inject } from '@angular/core';
import { LocalActionsComponent } from "../local-actions/local-actions.component";
import { MatTab, MatTabGroup, MatTabLabel } from "@angular/material/tabs";
import { ActivatedRoute, Router } from "@angular/router";
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
		NgTemplateOutlet,
		MatIcon,
		MatTabLabel
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
