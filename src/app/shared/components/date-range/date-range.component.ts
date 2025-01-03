import { Component, input } from '@angular/core';
import {
	MatDatepickerToggle,
	MatDateRangeInput,
	MatDateRangePicker,
	MatEndDate,
	MatStartDate
} from "@angular/material/datepicker";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

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
	startControl = input.required<FormControl>();
	endControl = input.required<FormControl>();

	label = input("");
}
