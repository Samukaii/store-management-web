import { setupComponentTesting } from "../src/app/testing/setup/setup-component-testing";
import { ProductsListComponent } from "./products-list.component";
import { hasCreatedComponent } from "../src/app/testing/utils/has-created-component";
import { ProductsService } from "../products.service";
import { of } from "rxjs";
import { DeepPartial } from "../src/app/shared/models/deep-partial";
import { Product } from "../models/product";
import {
	LocalActionsUpdaterComponent
} from "../src/app/shared/components/local-actions/updater/local-actions-updater.component";
import { getByDirective } from "../src/app/testing/getters/get-by-directive";
import { Button } from "../src/app/shared/components/button/models/button";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { ProductCategory } from "../../categories/models/product-category";
import { AutocompleteOption } from "../src/app/shared/components/autocomplete/models/autocomplete-option";
import { ChipsSelectorComponent } from "../src/app/shared/components/chips-selector/chips-selector.component";
import { fakeAsync, flush } from "@angular/core/testing";
import { detectChanges } from "../src/app/testing/utils/detect-changes";
import { TableComponent } from "../src/app/shared/components/table/table.component";
import { testTable } from "../src/app/testing/utils/test-table";
import { testConfirmAction } from "../src/app/testing/utils/test-confirm-action";
import { spyDependency } from "../src/app/testing/spies/spy-dependency";
import { ConfirmActionService } from "../src/app/shared/components/confirm-action/confirm-action.service";
import { getByTestId } from "../src/app/testing/getters/get-by-test-id";
import { FormControl } from "@angular/forms";
import { MockProvider } from "ng-mocks";
import { mockComponent } from "../src/app/testing/mocks/mock-component";
import { EntityWithParams } from "../src/app/testing/models/entity-with-params";
import { applyParams } from "../src/app/testing/filtering/apply-params";
import { applyToAllObjects } from "../src/app/testing/utils/apply-to-all-objects";


interface SetupConfig {
	products?: EntityWithParams<Product>[];
	categories?: EntityWithParams<ProductCategory>[];
}

const setup = (config?: SetupConfig) => {
	const products = applyToAllObjects(config?.products ?? [], {
		price: 0,
		profit: 0,
		profitMargin: 0,
	});

	setupComponentTesting(ProductsListComponent, {
		imports: [
			mockComponent(LocalActionsUpdaterComponent),
			mockComponent(ChipsSelectorComponent),
			mockComponent(TableComponent),
		],
		providers: [
			MockProvider(ConfirmActionService),
			MockProvider(ProductsService, {
				getAll: params => {
					return of(applyParams(products, params) as any)
				},
			}),
			MockProvider(ProductsCategoriesService, {
				autocomplete: params => {
					return of(applyParams(config?.categories ?? [], params) as any)
				},
			}),
		]
	});
}


describe(ProductsListComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});

	describe('Local actions', () => {
		it('must render actions with where = "top-bar"', () => {
			setup();

			const element = getByDirective(LocalActionsUpdaterComponent);

			expect(element.getProperty('where')).toBe("top-bar");
		});

		describe('Add product', () => {
			it('relative route must be "products/new"', () => {
				setup();

				const element = getByDirective(LocalActionsUpdaterComponent);
				const actions = element.getProperty<Button[]>('actions');

				const action = actions?.find(action => action.name==="add");

				expect(action?.relativeRoute).toBe("products/new");
			});
		});
	});

	describe('Categories list', () => {
		it('must receive options from categories autocomplete for only categories with product association and custom filter options', fakeAsync(() => {
			setup({
				categories: [
					{
						id: 1,
						name: "Fruits",
						params: {
							'products:hasAssociation': true,
						}
					},
					{
						id: 2,
						name: "Meat & Poultry",
						params: {
							'products:hasAssociation': false,
						}
					},
					{
						id: 3,
						name: "Seafood",
						params: {
							'products:hasAssociation': true,
						}
					},
					{
						id: 4,
						name: "Bakery & Pastries",
						params: {
							'products:hasAssociation': true,
						}
					},
				]
			});

			flush();
			detectChanges();

			const element = getByDirective(ChipsSelectorComponent);
			const options = element.getProperty<AutocompleteOption[]>("options");

			expect(options).toEqual([
				{
					id: 'all',
					name: "Todos os produtos"
				},
				{
					id: 'no-category',
					name: "Sem categoria"
				},
				{
					id: 'no-costs',
					name: "Sem custos"
				},
				{
					id: 4,
					name: "Bakery & Pastries"
				},
				{
					id: 1,
					name: "Fruits"
				},
				{
					id: 3,
					name: "Seafood"
				},
			]);
		}));
	});

	describe('Table', () => {
		describe('When no filter applied', () => {
			it('must receive data from service get method ordered by name asc', fakeAsync(() => {
				const products: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger"
					},
					{
						id: 2,
						name: "French Fries"
					},
					{
						id: 3,
						name: "Milkshake"
					},
					{
						id: 4,
						name: "Chicken Nuggets"
					},
					{
						id: 5,
						name: "Hot Dog"
					}
				];

				const expectedProducts: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger"
					},
					{
						id: 4,
						name: "Chicken Nuggets"
					},
					{
						id: 2,
						name: "French Fries"
					},
					{
						id: 5,
						name: "Hot Dog"
					},
					{
						id: 3,
						name: "Milkshake"
					}
				]

				setup({products});

				flush();
				detectChanges();

				const table = testTable('table');

				expect(table.getData()).toEqual(applyToAllObjects(expectedProducts, {
					price: 0,
					profit: 0,
					profitMargin: 0,
				}));
			}));
		});

		describe('When some specific category is selected', () => {
			it('must receive data from service get method ordered by name asc for only products with this category', fakeAsync(() => {
				const products: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger",
						params: {
							'category.id:equal': 5
						}
					},
					{
						id: 2,
						name: "French Fries",
						params: {
							'category.id:equal': 2
						}
					},
					{
						id: 3,
						name: "Milkshake",
						params: {
							'category.id:equal': 3
						}
					},
					{
						id: 4,
						name: "Chicken Nuggets",
						params: {
							'category.id:equal': 5
						}
					},
					{
						id: 5,
						name: "Hot Dog",
						params: {
							'category.id:equal': 5
						}
					}
				];

				const expectedProducts: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger"
					},
					{
						id: 4,
						name: "Chicken Nuggets"
					},
					{
						id: 5,
						name: "Hot Dog"
					},
				]

				setup({products});

				const categorySelector = getByTestId('categories');
				const control = categorySelector.getProperty<FormControl>('formControl');

				control?.setValue(5);

				detectChanges();
				flush();
				detectChanges();

				const table = testTable('table');

				expect(table.getData()).toEqual(applyToAllObjects(expectedProducts, {
					price: 0,
					profit: 0,
					profitMargin: 0,
				}));
			}));
		});

		describe('When select "no-category" filter', () => {
			it('must receive data from service get method ordered by name asc for only products without category', fakeAsync(() => {
				const products: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger",
						params: {
							'category:isNull': null
						}
					},
					{
						id: 2,
						name: "French Fries",
						params: {
							'category.id:equal': 2
						}
					},
					{
						id: 3,
						name: "Milkshake",
						params: {
							'category:isNull': null,
						}
					},
					{
						id: 4,
						name: "Chicken Nuggets",
						params: {
							'category.id:equal': 5
						}
					},
					{
						id: 5,
						name: "Hot Dog",
						params: {
							'category.id:equal': 5
						}
					}
				];

				const expectedProducts: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger"
					},
					{
						id: 3,
						name: "Milkshake"
					},
				]

				setup({products});

				const categorySelector = getByTestId('categories');
				const control = categorySelector.getProperty<FormControl>('formControl');

				control?.setValue('no-category');

				detectChanges();
				flush();
				detectChanges();

				const table = testTable('table');

				expect(table.getData()).toEqual(applyToAllObjects(expectedProducts, {
					price: 0,
					profit: 0,
					profitMargin: 0,
				}));
			}));
		});

		describe('When select "no-costs" filter', () => {
			it('must receive data from service get method ordered by name asc for only products without cost', fakeAsync(() => {
				const products: EntityWithParams<Product>[] = [
					{
						id: 1,
						name: "Cheeseburger",
						params: {
							'category:isNull': null
						}
					},
					{
						id: 2,
						name: "French Fries",
						params: {
							'ingredients:hasAssociation': false
						}
					},
					{
						id: 3,
						name: "Milkshake",
						params: {
							'category.id:equal': 3
						}
					},
					{
						id: 4,
						name: "Chicken Nuggets",
						params: {
							'ingredients:hasAssociation': false
						}
					},
					{
						id: 5,
						name: "Hot Dog",
						params: {
							'category.id:equal': 5
						}
					}
				];

				const expectedProducts: EntityWithParams<Product>[] = [
					{
						id: 4,
						name: "Chicken Nuggets",
					},
					{
						id: 2,
						name: "French Fries",
					},
				]

				setup({products});

				const categorySelector = getByTestId('categories');
				const control = categorySelector.getProperty<FormControl>('formControl');

				control?.setValue('no-costs');

				detectChanges();
				flush();
				detectChanges();

				const table = testTable('table');

				expect(table.getData()).toEqual(applyToAllObjects(expectedProducts, {
					price: 0,
					profit: 0,
					profitMargin: 0,
				}));
			}));
		});

		describe('Loading', () => {
			it('must [loading] be true while resource is loading and false after that', fakeAsync(() => {
				setup();

				const table = testTable('table');

				expect(table.isLoading()).toBe(true);

				flush();
				detectChanges();

				expect(table.isLoading()).toBe(false);
			}));
		});

		it('no results must receive correct options', () => {
			setup();

			const table = testTable('table');

			expect(table.noResults()).toEqual({
				label: "Nenhum produto adicionado",
				description: "Quando algum for adicionado ele aparecerá aqui",
				icon: "lunch_dining"
			});
		});

		describe('Actions', () => {
			describe('Edit', () => {
				it('must has a relative route pointing to element single', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 546,
							name: "Product 1"
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const action = table.getAction('edit', 546);

					expect(action?.relativeRoute).toBe("546");
				}));
			});

			describe('Delete', () => {
				it('must open a confirmation to delete element', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 546,
							name: "Product 1"
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const action = table.getAction('delete', 546);
					const confirm = testConfirmAction();

					action.click?.();

					expect(confirm.options().title).toBe("Excluir produto");
					expect(confirm.options().description).toBe("Você tem certeza de que deseja excluir este produto?");
				}));

				it('must call delete method and call service getAll again on confirmation', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 546,
							name: "Product 1"
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const action = table.getAction('delete', 546);
					const confirm = testConfirmAction();

					const deleteMethod = spyDependency(ProductsService, 'delete').asObservableOf();
					const getAll = spyDependency(ProductsService, 'getAll').asObservableOf([]);

					action.click?.();

					confirm.primaryClick();

					expect(deleteMethod).toHaveBeenCalledWith(546);

					detectChanges();

					expect(getAll).toHaveBeenCalledTimes(1);
				}));
			});
		});

		describe('Columns', () => {
			describe('Id', () => {
				it('must value to be product id', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1"
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('id', 740);

					expect(column.value).toBe(740);
				}));
			});

			describe('Name', () => {
				it('must value to be product name', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1"
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('name', 740);

					expect(column.value).toBe("Product 1");
				}));
			});

			describe('Price', () => {
				it('must value to be product price formatted as currency if greater than 0', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1",
							price: 123
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('price', 740);

					expect(column.value).toBe("R$ 123.00");
				}));

				it('must value to be "Sem preço" if price equal to 0', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1",
							price: 0
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('price', 740);

					expect(column.value).toBe("Sem preço");
				}));
			});

			describe('Profit', () => {
				it('must value to be product profit formatted as currency', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1",
							profit: 20.122311
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('profit', 740);

					expect(column.value).toBe("R$ 20.12");
				}));
			});

			describe('Profit margin', () => {
				it('must value to be product profit formatted as percentage', fakeAsync(() => {
					const products: DeepPartial<Product>[] = [
						{
							id: 740,
							name: "Product 1",
							profitMargin: 12.53123
						},
					];

					setup({products});

					flush();
					detectChanges();

					const table = testTable('table');
					const column = table.getColumn('profitMargin', 740);

					expect(column.value).toBe("12.53%");
				}));
			});
		});
	});
});
