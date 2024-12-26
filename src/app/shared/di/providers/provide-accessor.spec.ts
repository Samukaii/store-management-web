import { provideAccessor } from "src/app/shared/di/providers/provide-accessor";
import { Component } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TestBed } from "@angular/core/testing";
import { injectDep } from "src/app/testing/utils/inject-dep";

const setup = () => {
	@Component({
		template: ``,
		providers: [
			provideAccessor(HostComponent)
		]
	})
	class HostComponent implements ControlValueAccessor {
        writeValue = jest.fn();
        registerOnChange = jest.fn();
        registerOnTouched = jest.fn();
        setDisabledState = jest.fn();
	}

	const fixture = TestBed.createComponent(HostComponent);

	return {
		component: fixture.componentInstance,
		accessor: fixture.debugElement.injector.get(NG_VALUE_ACCESSOR)[0],
	}
}

describe(provideAccessor.name, () => {
	it('must call all component methods bound with accessor methods', () => {
		const {accessor, component} = setup();
		const onChangeFn = () => {};
		const onTouchedFn = () => {};

		accessor.writeValue("Some text");
		expect(component.writeValue).toHaveBeenCalledExactlyOnceWith("Some text");

		accessor.registerOnChange(onChangeFn);
		expect(component.registerOnChange).toHaveBeenCalledExactlyOnceWith(onChangeFn);

		accessor.registerOnTouched(onTouchedFn);
		expect(component.registerOnTouched).toHaveBeenCalledExactlyOnceWith(onTouchedFn);

		accessor.setDisabledState?.(true);
		expect(component.setDisabledState).toHaveBeenCalledExactlyOnceWith(true);
	});
});
