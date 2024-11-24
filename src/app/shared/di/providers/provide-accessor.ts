import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { forwardRef, Type } from "@angular/core";

export const provideAccessor = (component: Type<ControlValueAccessor>) => {
	return [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => component),
			multi: true,
		},
	]
};
