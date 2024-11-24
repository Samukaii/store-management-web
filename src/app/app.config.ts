import { ApplicationConfig, provideExperimentalZonelessChangeDetection, } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideEnvironmentNgxCurrency } from "ngx-currency";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from "@angular/material/form-field";
import { provideMomentDateAdapter } from "@angular/material-moment-adapter";
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from "@angular/common";
import 'moment/locale/pt-br';
import { MAT_DATE_LOCALE } from "@angular/material/core";

registerLocaleData(localePT);

export const appConfig: ApplicationConfig = {
  providers: [
	  provideExperimentalZonelessChangeDetection(),
	  provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
	  provideClientHydration(),
	  provideAnimationsAsync(),
	  provideHttpClient(withFetch()),
	  provideMomentDateAdapter({
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
	  },
	  {
		  provide: MAT_DATE_LOCALE,
		  useValue: 'pt-br'
	  }
  ]
};
