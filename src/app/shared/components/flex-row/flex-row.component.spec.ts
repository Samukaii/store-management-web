import { FlexRowComponent } from "src/app/shared/components/flex-row/flex-row.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { fixtureUtils } from "src/app/testing/utils/fixture-utils";
import { Component, input } from "@angular/core";
import { FlexAlignment } from "src/app/shared/components/flex-row/models/flex-alignment";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { getByDirective } from "src/app/testing/getters/get-by-directive";


const setup = () => {
	@Component({
		selector: "app-root",
		imports: [
			FlexRowComponent
		],
		template: `
			<app-flex-row
				[verticalAlignment]="verticalAlignment()"
				[horizontalAlignment]="horizontalAlignment()"
				[gap]="gap()"
				[fill]="fill()"
				[column]="column()"
			>
				<div data-test-id="projected-content">Projected content</div>
			</app-flex-row>
		`
	})
	class HostComponent {
		verticalAlignment = input<FlexAlignment>("flex-start");
		horizontalAlignment = input<FlexAlignment>("flex-start");
		gap = input("1rem");
		fill = input<unknown>(false);
		column = input<unknown>(false);
	}

	setupComponentTesting(HostComponent, {overrideImports: false});

	return fixtureUtils<HostComponent>();
}

fdescribe(FlexRowComponent.name, () => {
	const alignmentsTestCase: FlexAlignment[] = [
		'center',
		'flex-end',
		'flex-start',
		'space-between'
	];

	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('must show projected content', () => {
		setup();

		expect(getByTestId('projected-content')).toBeTruthy();
	});

	describe('[verticalAlignment] input', () => {
		describe('When column is true', () => {
			alignmentsTestCase.forEach(alignment => {
				it(`must add style align-items with "${alignment}" when value is "${alignment}"`, () => {
					const {changeInput} = setup();

					changeInput('column', true);
					changeInput('verticalAlignment', alignment);

					const host = getByDirective(FlexRowComponent);

					expect(host.getStyle('alignItems')).toBe(alignment);
				});
			})
		});

		describe('When column is false', () => {
			alignmentsTestCase.forEach(alignment => {
				it(`must add style justify-content with "${alignment}" when value is "${alignment}"`, () => {
					const {changeInput} = setup();

					changeInput('column', false);
					changeInput('verticalAlignment', alignment);

					const host = getByDirective(FlexRowComponent);

					expect(host.getStyle('justifyContent')).toBe(alignment);
				});
			})
		});
	});

	describe('[horizontalAlignment] input', () => {
		describe('When column is true', () => {
			alignmentsTestCase.forEach(alignment => {
				it(`must add style justify-content with "${alignment}" when value is "${alignment}"`, () => {
					const {changeInput} = setup();

					changeInput('column', true);
					changeInput('horizontalAlignment', alignment);

					const host = getByDirective(FlexRowComponent);

					expect(host.getStyle('justifyContent')).toBe(alignment);
				});
			})
		});

		describe('When column is false', () => {
			alignmentsTestCase.forEach(alignment => {
				it(`must add style align-items with "${alignment}" when value is "${alignment}"`, () => {
					const {changeInput} = setup();

					changeInput('column', false);
					changeInput('horizontalAlignment', alignment);

					const host = getByDirective(FlexRowComponent);

					expect(host.getStyle('alignItems')).toBe(alignment);
				});
			})
		});
	});

	describe('[gap] input', () => {
		it('must add style gap with value provided by input', () => {
			const {changeInput} = setup();

			const host = getByDirective(FlexRowComponent);

			changeInput('gap', '2324px');
			expect(host.getStyle('gap')).toBe('2324px');

			changeInput('gap', '2rem');
			expect(host.getStyle('gap')).toBe('2rem');

			changeInput('gap', '5em');
			expect(host.getStyle('gap')).toBe('5em');
		});
	});

	describe('[fill] input', () => {
		it('must add class "fill" when is true and remove when is false, coercing boolean attribute', () => {
			const {changeInput} = setup();

			const host = getByDirective(FlexRowComponent);

			changeInput('fill', true);
			expect(host.classes['fill']).toBe(true);

			changeInput('fill', false);
			expect(host.classes['fill']).toBe(undefined);

			changeInput('fill', '');
			expect(host.classes['fill']).toBe(true);

			changeInput('fill', 'some-random-string');
			expect(host.classes['fill']).toBe(true);

			changeInput('fill', 'false');
			expect(host.classes['fill']).toBe(undefined);
		});
	});

	describe('[column] input', () => {
		it('must add style "flex-direction" as "column" when is true and "row" when is false, coercing boolean attribute', () => {
			const {changeInput} = setup();

			const host = getByDirective(FlexRowComponent);

			changeInput('column', true);
			expect(host.getStyle('flexDirection')).toBe("column");

			changeInput('column', false);
			expect(host.getStyle('flexDirection')).toBe("row");

			changeInput('column', '');
			expect(host.getStyle('flexDirection')).toBe("column");

			changeInput('column', 'some-random-string');
			expect(host.getStyle('flexDirection')).toBe("column");

			changeInput('column', 'false');
			expect(host.getStyle('flexDirection')).toBe("row");
		});
	});
});
