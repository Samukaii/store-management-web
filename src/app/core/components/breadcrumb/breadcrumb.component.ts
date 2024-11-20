import { Component } from '@angular/core';
import { injectBreadcrumbs } from "../../../shared/di/inject-breadcrumbs";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-breadcrumb',
	imports: [
		RouterLink
	],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
	breadcrumbs = injectBreadcrumbs();
}