import { booleanAttribute, Component, input } from '@angular/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatFormField, MatLabel, MatSuffix } from "@angular/material/form-field";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { Moment } from "moment/moment";
import moment from "moment";
import { FormDateDirective } from "src/app/shared/directives/form-date.directive";

@Component({
    selector: 'app-datepicker',
	imports: [
		ReactiveFormsModule,
		MatSuffix,
		MatDatepickerToggle,
		MatLabel,
		MatFormField,
		MatDatepicker,
		MatInput,
		MatDatepickerInput,
		FormDateDirective
	],
    templateUrl: './date-picker.component.html',
    styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent {
	control = input.required<FormControl>();
	startView = input<"month" | "year" | "multi-year">("month");
	closeOnYearSelect = input(false, {transform: booleanAttribute})
	closeOnMonthSelect = input(false, {transform: booleanAttribute})

	label = input("");
	dateConfig = {
		mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
	};

	setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
		if(!this.closeOnMonthSelect()) return;

		let value = this.control().value ?? moment();

		if(value instanceof Date)
			value = moment(value);

		value.month(normalizedMonthAndYear.month());
		value.year(normalizedMonthAndYear.year());

		this.control().setValue(value);
		datepicker.close();
	}

	setYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
		if(!this.closeOnYearSelect()) return;

		let value = this.control().value ?? moment();

		if(value instanceof Date)
			value = moment(value);

		value.year(normalizedMonthAndYear.year());

		this.control().setValue(value);
		datepicker.close();
	}
}
