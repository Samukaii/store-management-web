import { Component, inject } from '@angular/core';
import { PreparationsService } from "../preparations.service";
import { PreparationsFormValue } from "../models/preparations-form-value";
import { injectRouterActions } from "../../../shared/di/inject-router-actions";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductsFormComponent } from "../form/preparations-form.component";

@Component({
	selector: 'app-preparations-create',
	imports: [
		ProductsFormComponent
	],
	templateUrl: './preparations-create.component.html',
	styleUrl: './preparations-create.component.scss'
})
export class PreparationsCreateComponent {
	service = inject(PreparationsService);
	actions = injectRouterActions();
	router = inject(Router);
	route = inject(ActivatedRoute);

	create(value: PreparationsFormValue) {
		this.service.create(value).subscribe(response => {
			this.router.navigate(['..', response.id], {
				queryParams: {
					tab: 1
				},
				relativeTo: this.route
			});
		});
	}
}
