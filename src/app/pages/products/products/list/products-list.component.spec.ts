import { setupComponentTesting } from "../../../../testing/setup-component-testing";
import { ProductsListComponent } from "./products-list.component";
import { hasCreatedComponent } from "../../../../testing/has-created-component";
import { ProductsService } from "../products.service";
import { BehaviorSubject } from "rxjs";
import { DeepPartial } from "../../../../shared/models/deep-partial";
import { Product } from "../models/product";
import {
	LocalActionsUpdaterComponent
} from "../../../../shared/components/local-actions/updater/local-actions-updater.component";
import { getByDirective } from "../../../../testing/getters/get-by-directive";
import { Button } from "../../../../shared/components/button/models/button";
import { ProductsCategoriesService } from "../../categories/products-categories.service";
import { ProductCategory } from "../../categories/models/product-category";
import { AutocompleteOption } from "../../../../shared/components/autocomplete/models/autocomplete-option";
import { ChipsSelectorComponent } from "../../../../shared/components/chips-selector/chips-selector.component";
import { fakeAsync, flush } from "@angular/core/testing";
import { detectChanges } from "../../../../testing/detect-changes";
import { spyDependencyBeforeCreation } from "../../../../testing/spy-dependency-before-creation";
import { TableComponent } from "../../../../shared/components/table/table.component";
import { testTable } from "../../../../testing/test-table";
import { testConfirmAction } from "../../../../testing/test-confirm-action";
import { spyDependency } from "../../../../testing/spy-dependency";
import { ConfirmActionService } from "../../../../shared/components/confirm-action/confirm-action.service";
import { Generic } from "../../../../shared/models/generic";
import { getByTestId } from "../../../../testing/getters/get-by-test-id";
import { FormControl } from "@angular/forms";
import { AsyncPipe } from "@angular/common";
import { beforeComponentCreate } from "../../../../testing/before-component-create";
import { MockComponent, MockProvider } from "ng-mocks";


interface ExtendedProduct extends DeepPartial<Product> {
	params?: Generic;
}

interface SetupConfig {
	products?: ExtendedProduct[];
	categories?: DeepPartial<ProductCategory>[];
}

export const applyToAllObjects = <T>(list: T[], changes: DeepPartial<T>) => {
	return list.map(item => {
		return {
			...changes,
			...item
		}
	});
}

const setup = (config?: SetupConfig) => {
	const products = applyToAllObjects(config?.products ?? [], {
		price: 0,
		profit: 0,
		profitMargin: 0,
	});

	const products$ = new BehaviorSubject(products as any as Product[]);

	setupComponentTesting(ProductsListComponent, {
		imports: [
			AsyncPipe,
			MockComponent(LocalActionsUpdaterComponent),
			MockComponent(ChipsSelectorComponent),
			MockComponent(TableComponent),
		],
		providers: [
			MockProvider(ConfirmActionService),
			// mockProvider(ProductsService, {
			// 	getAll: params => {
			// 		let filtered = products;
			//
			// 		filtered = products.filter(item => {
			// 			const conditions: boolean[] = [];
			//
			// 			if (item.params?.['category.id:equal']) {
			// 				conditions.push(item.params['category.id:equal']===params?.['category.id:equal']);
			// 			}
			//
			// 			if (item.params?.['category:isNull']) {
			// 				conditions.push(item.params['category:isNull']===params?.['category:isNull']);
			// 			}
			//
			// 			if (item.params?.['ingredients:hasAssociation']) {
			// 				conditions.push(item.params['ingredients:hasAssociation']===params?.['ingredients:hasAssociation']);
			// 			}
			//
			//
			// 			return conditions.every(condition => condition);
			// 		});
			//
			// 		if (params?.['sortProperty'] && params?.['sortDirection']) {
			// 			filtered = filtered.sort((prev, curr) => {
			// 				const direction = params['sortDirection'] as 'asc' | 'desc';
			// 				const sortProperty = params['sortProperty'] as string;
			// 				const previous = prev as Generic;
			// 				const current = curr as Generic;
			//
			// 				if(previous[sortProperty] === current[sortProperty])
			// 					return 0;
			//
			// 				if (direction==='asc')
			// 					return previous[sortProperty] > current[sortProperty] ? 1 : -1;
			//
			// 				if (direction==='desc')
			// 					return previous[sortProperty] < current[sortProperty] ? 1 : -1;
			//
			// 				return 0;
			// 			});
			// 		}
			//
			// 		products$.next(filtered as any);
			// 		//
			// 		// console.log(filtered);
			//
			// 		return of(filtered.map(item => {
			// 			const copy = {...item};
			//
			// 			delete copy.params;
			//
			// 			return copy as Product;
			// 		}))
			// 	},
			// }),
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
		it('must call autocomplete with correct params', fakeAsync(() => {
			const unresolvedAutocomplete = spyDependencyBeforeCreation(ProductsCategoriesService, 'autocomplete');

			setup({
				categories: [
					{
						id: 1,
						name: "Category 1"
					},
					{
						id: 2,
						name: "Category 2"
					},
					{
						id: 3,
						name: "Category 3"
					},
				]
			});

			flush();

			const autocomplete = unresolvedAutocomplete.resolve();

			expect(autocomplete).toHaveBeenCalledTimes(1);
			expect(autocomplete).toHaveBeenCalledWith({
				sortProperty: "name",
				sortDirection: "asc",
				'products:hasAssociation': true
			});
		}));
		it('must receive options from categories autocomplete and custom filter options', fakeAsync(() => {
			setup({
				categories: [
					{
						id: 1,
						name: "Category 1"
					},
					{
						id: 2,
						name: "Category 2"
					},
					{
						id: 3,
						name: "Category 3"
					},
					{
						id: 4,
						name: "Category 4"
					},
					{
						id: 5,
						name: "Category 5"
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
					id: 1,
					name: "Category 1"
				},
				{
					id: 2,
					name: "Category 2"
				},
				{
					id: 3,
					name: "Category 3"
				},
				{
					id: 4,
					name: "Category 4"
				},
				{
					id: 5,
					name: "Category 5"
				},
			]);
		}));
	});

	describe('Table', () => {
		describe('When no filter applied', () => {
			it('must receive data from service get method ordered by name asc', fakeAsync(() => {
				const products: ExtendedProduct[] = [
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

				const expectedProducts: ExtendedProduct[] = [
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
				beforeComponentCreate(() => {

				});


				const products: ExtendedProduct[] = [
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

				const expectedProducts: ExtendedProduct[] = [
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

				flush();
				detectChanges();

				const table = getByTestId('table');
				const data = table.getProperty<ExtendedProduct[]>('data');

				expect(data).toEqual(applyToAllObjects(expectedProducts, {
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

			describe('Edit', () => {
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

					action.click?.();

					confirm.primaryClick();

					expect(deleteMethod).toHaveBeenCalledWith(546);
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
