import { Component, contentChild, contentChildren, input, TemplateRef, viewChild } from '@angular/core';
import { LocalActionsComponent } from "../../local-actions/local-actions.component";
import { MatTab, MatTabLabel } from "@angular/material/tabs";
import { ProductsIngredientsComponent } from "../../../../pages/products/ingredients/products-ingredients.component";
import { MatIcon } from "@angular/material/icon";

@Component({
	selector: 'app-tabs-item',
	standalone: true,
	imports: [
		LocalActionsComponent,
		MatTab,
		ProductsIngredientsComponent,
		MatTabLabel,
		MatIcon
	],
	templateUrl: './tabs-item.component.html',
	styleUrl: './tabs-item.component.scss'
})
export class TabsItemComponent {
	label = input("");
	icon = input("");

	template = viewChild('templateRef', {read: TemplateRef});
}
