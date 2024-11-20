import { Component } from '@angular/core';
import { LocalActionsComponent } from "../../../shared/components/local-actions/local-actions.component";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";

@Component({
	selector: 'app-top-bar',
	standalone: true,
	imports: [
		LocalActionsComponent,
		BreadcrumbComponent
	],
	templateUrl: './top-bar.component.html',
	styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
