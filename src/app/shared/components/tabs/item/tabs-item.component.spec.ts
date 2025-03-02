import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { Component, input } from "@angular/core";
import { TabsItemComponent } from "src/app/shared/components/tabs/item/tabs-item.component";
import { getByDirective } from "src/app/testing/getters/get-by-directive";


const setup = () => {
	@Component({
		selector: "app-root",
		template: `
			<app-tabs-item [icon]="icon()" [label]="label()">
				<div data-test-id="content">
					Tab content
				</div>
			</app-tabs-item>
		`,
		imports: [
			TabsItemComponent,
		]
	})
	class HostComponent {
		label = input("");
		icon = input("");
	}

	return setupComponentTesting(HostComponent, {
		overrideImports: false,
	})
}

describe(TabsItemComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	it('templateRef property must render content inside ng-content', () => {
		setup();

		const {componentInstance} = getByDirective(TabsItemComponent);
		const view = componentInstance.template()?.createEmbeddedView({});
		const nativeElement = view?.rootNodes[0] as HTMLDivElement;

		expect(nativeElement.textContent?.trim()).toBe("Tab content");
	});

	it('[label] and [icon] must be updated when input changes', () => {
		const {changeInput} = setup();

		const {componentInstance} = getByDirective(TabsItemComponent);

		changeInput("label", "Some label");
		expect(componentInstance.label()).toBe("Some label");

		changeInput("label", "Other label");
		expect(componentInstance.label()).toBe("Other label");

		changeInput("icon", "some-icon");
		expect(componentInstance.icon()).toBe("some-icon");

		changeInput("icon", "other-icon");
		expect(componentInstance.icon()).toBe("other-icon");
	});
});
