import { Component, inject } from '@angular/core';
import { LocalActionsComponent } from "../../../shared/components/local-actions/local-actions.component";
import { BreadcrumbComponent } from "../breadcrumb/breadcrumb.component";
import { MatProgressBar } from "@angular/material/progress-bar";
import { FlexRowComponent } from "../../../shared/components/flex-row/flex-row.component";
import { TopBarLoadingService } from "./top-bar-loading.service";

@Component({
    selector: 'app-top-bar',
	imports: [
		LocalActionsComponent,
		BreadcrumbComponent,
		MatProgressBar,
		FlexRowComponent
	],
    templateUrl: './top-bar.component.html',
    styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
	protected service = inject(TopBarLoadingService);
}
