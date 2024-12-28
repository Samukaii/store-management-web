import { DebugElement, ProviderToken, Type } from "@angular/core";
import { ControlValueAccessor } from "@angular/forms";

export interface ExtendedDebugElement<T = any> extends DebugElement {
	nativeElement: HTMLElement;
	componentInstance: T;
	text: () => string;
	getByTestId: (selector: string) => ExtendedDebugElement;
	getByDirective: <Directive>(directive: Type<Directive>) => ExtendedDebugElement<Directive>;
	getAllByTestId: (selector: string) => ExtendedDebugElement[];
	findByTestId: (selector: string) => ExtendedDebugElement | undefined;
	findByDirective: <Directive>(directive: Type<Directive>) => ExtendedDebugElement<Directive> | undefined;
	findAllByTestId: (selector: string) => ExtendedDebugElement[] | undefined;
	getProperty: <T = any>(property: string) => T | null;
	click: (event?: any) => void;
	read: <T>(token: ProviderToken<T>) => T | null;
	valueAccessor: () => ControlValueAccessor | undefined;
}
