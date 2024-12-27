import { Component, inject, Injectable } from "@angular/core";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { CallPipe } from "src/app/shared/pipes/call.pipe";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { getCurrentComponentFixture } from "src/app/testing/core/current-component-fixture";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { spyDependencyBeforeCreation } from "src/app/testing/spies/spy-dependency-before-creation";

@Injectable()
class TestHelper {
	someCall() {}
}

const setup = () => {
	@Component({
		template: `
			<div data-test-id="upper-case">{{ upperCase | call: text }}</div>
			<div data-test-id="sum">{{ sum | call: sumFirstNumber: sumSecondNumber: sumThirdNumber }}</div>
			<div data-test-id="no-args">{{ noArgsCall | call }}</div>
			<div data-test-id="is-even">{{ isEven | call: object }}</div>
			<div data-test-id="is-selected">{{ isSelected | call: selectedId: list }}</div>
		`,
		imports: [
			CallPipe
		],
	})
	class HostComponent {
		helper = inject(TestHelper);
		text = "";
		sumFirstNumber = 0;
		sumSecondNumber = 0;
		sumThirdNumber = 0;

		object = {
			isEvenNumber: 0,
		}

		selectedId?: number;

		list: { id: number }[] = []

		upperCase(text: string) {
			return text.toUpperCase();
		}

		sum(firstNumber: number, secondNumber: number, thirdNumber: number) {
			return firstNumber + secondNumber + thirdNumber;
		}

		isEven(object: { isEvenNumber: number }) {
			return object.isEvenNumber % 2 === 0;
		}

		isSelected(selectedId: number | undefined, list: { id: number }[]) {
			return !!list.find(item => item.id === selectedId);
		}

		noArgsCall() {
			this.helper.someCall();
			return "No args"
		}
	}

	setupComponentTesting(HostComponent, {
		overrideImports: false,
		providers: [TestHelper],
	});

	return {
		component: getCurrentComponentFixture<HostComponent>().componentInstance,
	}
}


describe(CallPipe.name, () => {
	describe('When calling with one arg', () => {
		it('must apply correct operation and call only one time per change', () => {
			const {component} = setup();

			const element = getByTestId('upper-case');
			const upperCase = jest.spyOn(component, 'upperCase');

			component.text = "John";
			detectChanges();

			expect(element.text()).toBe("JOHN");
			expect(upperCase).toHaveBeenCalledTimes(1);

			component.text = "Mary";
			detectChanges();

			expect(element.text()).toBe("MARY");
			expect(upperCase).toHaveBeenCalledTimes(2);
		});
	});

	describe('When calling with multiple args', () => {
		it('must apply correct operation and call only one time per change', () => {
			const {component} = setup();

			const element = getByTestId('sum');
			const sum = jest.spyOn(component, 'sum');

			component.sumFirstNumber = 1;
			detectChanges();

			component.text = "Joseph";
			detectChanges();

			expect(element.text()).toBe("1");
			expect(sum).toHaveBeenCalledTimes(1);

			component.sumSecondNumber = 32;
			detectChanges();

			expect(element.text()).toBe("33");
			expect(sum).toHaveBeenCalledTimes(2);

			component.sumThirdNumber = 7;
			detectChanges();

			expect(element.text()).toBe("40");
			expect(sum).toHaveBeenCalledTimes(3);
		});
	});

	describe('When calling with no args', () => {
		it('must return correct value and call only one time', () => {
			const {resolve} = spyDependencyBeforeCreation(TestHelper, 'someCall');

			const {component} = setup();

			const element = getByTestId('no-args');
			const someCall = resolve();

			expect(someCall).toHaveBeenCalledTimes(1);
			expect(element.text()).toBe("No args");

			component.text = "Some value";
			detectChanges();

			component.sumFirstNumber = 123;
			detectChanges();

			expect(someCall).toHaveBeenCalledTimes(1);
			expect(element.text()).toBe("No args");
		});
	});

	describe('Receiving objects', () => {
		it('must not update value if object is just mutated', () => {
			const {component} = setup();

			const isEven = jest.spyOn(component, 'isEven');
			detectChanges();
			isEven.mockClear();

			const element = getByTestId('is-even');

			component.object.isEvenNumber = 3;
			detectChanges();

			component.object.isEvenNumber = 5;
			detectChanges();

			expect(element.text()).toBe("true");
			expect(isEven).toHaveBeenCalledTimes(0);
		});

		it('must update value if object reference is replaced and call only one time per change', () => {
			const {component} = setup();

			const element = getByTestId('is-even');
			const isEven = jest.spyOn(component, 'isEven');
			detectChanges();
			isEven.mockClear();

			component.object = {isEvenNumber: 1};
			detectChanges();

			expect(element.text()).toBe("false");
			expect(isEven).toHaveBeenCalledTimes(1);

			component.object = {isEvenNumber: 2};
			detectChanges();

			expect(element.text()).toBe("true");
			expect(isEven).toHaveBeenCalledTimes(2);

			component.object = {isEvenNumber: 3};
			detectChanges();

			expect(element.text()).toBe("false");
			expect(isEven).toHaveBeenCalledTimes(3);
		});
	});

	describe('Receiving arrays and other params', () => {
		it('must not update value if list is just mutated', () => {
			const {component} = setup();

			const isSelected = jest.spyOn(component, 'isSelected');
			component.selectedId = 5;
			detectChanges();
			isSelected.mockClear();

			const element = getByTestId('is-selected');

			component.list.push({id: 5});
			detectChanges();

			expect(element.text()).toBe("false");

			expect(isSelected).toHaveBeenCalledTimes(0);
		});

		it('must update value if array reference is replaced and call only one time per change', () => {
			const {component} = setup();

			const element = getByTestId('is-selected');
			const isSelected = jest.spyOn(component, 'isSelected');

			component.list = [{id: 5}]
			component.selectedId = 5;
			detectChanges();

			expect(element.text()).toBe("true");
			expect(isSelected).toHaveBeenCalledTimes(1);

			component.list = [{id: 6}]
			component.selectedId = 5;
			detectChanges();

			expect(element.text()).toBe("false");
			expect(isSelected).toHaveBeenCalledTimes(2);

			component.list = [{id: 6}]
			component.selectedId = 6;
			detectChanges();

			expect(element.text()).toBe("true");
			expect(isSelected).toHaveBeenCalledTimes(3);
		});
	});
});
