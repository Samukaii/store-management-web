import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideEnvironmentNgxCurrency } from "ngx-currency";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";

export const appConfig: ApplicationConfig = {
  providers: [
	  provideZoneChangeDetection({ eventCoalescing: true }),
	  provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
	  provideClientHydration(),
	  provideAnimationsAsync(),
	  provideHttpClient(withFetch()),
	  provideNativeDateAdapter({
		  parse: {
			  dateInput: 'DD/MM/YYYY',
		  },
		  display: {
			  dateInput: 'DD/MM/YYYY',
			  monthYearLabel: 'MMM YYYY',
			  dateA11yLabel: 'LL',
			  monthYearA11yLabel: 'MMMM YYYY',
		  },
	  }),
	  provideEnvironmentNgxCurrency({
		  align: "left",
		  prefix: "R$",
		  min: 0,
		  decimal: ",",
		  thousands: "."
	  }),
	  {
		  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
		  useValue: {
			  appearance: "outline"
		  } as MatFormFieldDefaultOptions
	  }
  ]
};
