import { Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
    selector: 'app-tabs-item',
    templateUrl: './tabs-item.component.html',
    styleUrl: './tabs-item.component.scss'
})
export class TabsItemComponent {
	label = input("");
	icon = input("");

	template = viewChild('templateRef', {read: TemplateRef});
}
