import { DebugElement, InjectionToken, ProviderToken, Type } from "@angular/core";

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
	read: <T>(token: ProviderToken<T>) => T | null;
}
