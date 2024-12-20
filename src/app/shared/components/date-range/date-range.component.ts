import { Component, input } from '@angular/core';
import {
	MatDatepickerToggle,
	MatDateRangeInput,
	MatDateRangePicker,
	MatEndDate,
	MatStartDate
} from "@angular/material/datepicker";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { provideNativeDateAdapter } from "@angular/material/core";

@Component({
    selector: 'app-date-range',
    imports: [
        MatEndDate,
        MatStartDate,
        MatDateRangeInput,
        ReactiveFormsModule,
        MatSuffix,
        MatDatepickerToggle,
        MatDateRangePicker,
        MatLabel,
        MatFormField
    ],
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.scss'
})
export class DateRangeComponent {
	form = input.required<FormGroup>();
	startName = input.required<string>();
	endName = input.required<string>();

	label = input("");
}
