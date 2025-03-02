import { TabsComponent } from "src/app/shared/components/tabs/tabs.component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { mockRouter } from "src/app/testing/mocks/mock-router";
import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { TabsItemComponent } from "src/app/shared/components/tabs/item/tabs-item.component";
import { TestBed } from "@angular/core/testing";
import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { testRouter } from "src/app/testing/utils/test-router";
import { detectChanges } from "src/app/testing/utils/detect-changes";
import { spyDependency } from "src/app/testing/spies/spy-dependency";
import { Router } from "@angular/router";
import { getAllByTestId } from "src/app/testing/getters/get-all-by-test-id";
import { NgTemplateOutlet } from "@angular/common";
import { MatTabLabel } from "@angular/material/tabs";


const setup = () => {
	@Component({
		selector: "app-root",
		template: `
			<app-tabs>
				<app-tabs-item icon="first-tab-icon" label="First tab">
					<div data-test-id="content">
						First tab content
					</div>
				</app-tabs-item>

				<app-tabs-item icon="second-tab-icon" label="Second tab">
					<div data-test-id="content">
						Second tab content
					</div>
				</app-tabs-item>

				<app-tabs-item icon="third-tab-icon" label="Third tab">
					<div data-test-id="content">
						Third tab content
					</div>
				</app-tabs-item>
			</app-tabs>
		`,
		imports: [
			TabsComponent,
			TabsItemComponent,
		]
	})
	class HostComponent {
	}

	TestBed.overrideComponent(TabsComponent, {
		set: {
			schemas: [NO_ERRORS_SCHEMA],
			imports: [
				NgTemplateOutlet,
				MatTabLabel
			]
		}
	});

	return setupComponentTesting(HostComponent, {
		overrideImports: false,
		providers: [
			mockRouter(),
		]
	})
}


describe(TabsComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('Tab group', () => {
		it('must has ngSkipHydration attribute', () => {
			setup();

			const group = getByTestId('group');

			expect(group.getProperty("ngSkipHydration")).toBe("");
		});

		it('must has dynamicHeight attribute', () => {
			setup();

			const group = getByTestId('group');

			expect(group.getProperty("dynamicHeight")).toBe("");
		});

		it('must has [preserveContent] false', () => {
			setup();

			const group = getByTestId('group');

			expect(group.getProperty("preserveContent")).toBe(false);
		});

		it('must has [selectedIndex] must be equal to "tab" queryParam', () => {
			setup();

			const group = getByTestId('group');
			const router = testRouter();

			expect(group.getProperty("selectedIndex")).toBe(0);

			router.updateQueryParams({tab: 23});
			detectChanges();

			expect(group.getProperty("selectedIndex")).toBe(23);

			router.updateQueryParams({tab: 456});
			detectChanges();

			expect(group.getProperty("selectedIndex")).toBe(456);

			router.updateQueryParams({tab: 625});
			detectChanges();

			expect(group.getProperty("selectedIndex")).toBe(625);
		});

		it('must call navigate with selected tab in order to update tab queryParam', () => {
			setup();

			const group = getByTestId('group');

			const navigate = spyDependency(Router, 'navigate');

			group.triggerEventHandler('selectedIndexChange', 15);
			group.triggerEventHandler('selectedIndexChange', 54);
			group.triggerEventHandler('selectedIndexChange', 33);

			expect(navigate).toHaveBeenNthCalledWith(1, [], {queryParams: {tab: 15}});
			expect(navigate).toHaveBeenNthCalledWith(2, [], {queryParams: {tab: 54}});
			expect(navigate).toHaveBeenNthCalledWith(3, [], {queryParams: {tab: 33}});
			expect(navigate).toHaveBeenCalledTimes(3);
		});
	});

	describe('Tabs', () => {
		it('must render all tab contents', () => {
			setup();

			const expectedContents = [
				'First tab content',
				'Second tab content',
				'Third tab content'
			];

			const tabs = getAllByTestId('tab');

			expectedContents.forEach((expectedContent, index) => {
				const tab = tabs[index];

				expect(tab.getByTestId('content').text()).toBe(expectedContent);
			});
		});

		it('must render all local-actions with where equal to "tab-" + tab index', () => {
			setup();

			const expectedLocalActionsWhere = [
				'tab-0',
				'tab-1',
				'tab-2',
			];

			const tabs = getAllByTestId('tab');

			expectedLocalActionsWhere.forEach((where, index) => {
				const tab = tabs[index];

				const actions = tab.getByTestId('local-actions');

				expect(actions.getProperty("where")).toBe(where);
			});
		});
	});
});
