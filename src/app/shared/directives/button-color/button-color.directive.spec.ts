import { setupComponentTesting } from "../../../testing/setup/setup-component-testing";
import { ButtonColorDirective } from "./button-color.directive";
import { Component, signal } from "@angular/core";
import { AppColor } from "../../components/button/models/app-color";
import { getCurrentComponentFixture } from "../../../testing/core/current-component-fixture";
import { getByTestId } from "../../../testing/getters/get-by-test-id";
import { detectChanges } from "../../../testing/utils/detect-changes";
import { hasCreatedComponent } from "../../../testing/utils/has-created-component";

const setup = () => {
	@Component({
		template: `
			<button
				data-test-id="button"
				appButtonColor
				[color]="$any(color())"
			>

			</button>
		`,
		imports: [ButtonColorDirective],
		selector: "app-root-test",
	})
	class HostComponent {
		color = signal<AppColor>('primary');
	}


	setupComponentTesting(HostComponent, {
		imports: [ButtonColorDirective],
	});

	return {component: getCurrentComponentFixture<HostComponent>().componentInstance}
}

interface TestColorCase {
	color: AppColor;
	expectedClass: string;
}


describe(ButtonColorDirective.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	test.each<TestColorCase>([
		{color: 'red', expectedClass: 'color-red'},
		{color: 'blue', expectedClass: 'color-blue'},
		{color: 'primary', expectedClass: 'color-primary'},
		{color: 'white', expectedClass: 'color-white'},
	])
	(`must add class "$expectedClass" when [color] is $color`, ({color, expectedClass}) => {
		const {component} = setup();

		component.color.set(color);
		detectChanges();

		const button = getByTestId('button');

		expect(button.classes[expectedClass]).toBe(true);
	});
});
