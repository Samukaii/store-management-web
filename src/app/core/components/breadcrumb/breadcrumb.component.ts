import { Component } from '@angular/core';
import { JsonPipe } from "@angular/common";
import { injectBreadcrumbs } from "../../../shared/di/inject-breadcrumbs";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-breadcrumb',
    imports: [
        JsonPipe,
        RouterLink
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
	breadcrumbs = injectBreadcrumbs();
}
