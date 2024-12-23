import { getByTestId } from "../getters/get-by-test-id";
import { TableColumnFn } from "../../shared/components/table/table-column-fn";
import { DeepPartial } from "../../shared/models/deep-partial";
import { Identifiable } from "../../shared/models/identifiable";
import { TableActionsFn } from "../../shared/components/table/table-actions-fn";
import { NoResults } from "../../shared/components/no-results/models/no-results";

export const testTable = <T extends Identifiable>(selector: string) => {
	const table = getByTestId(selector);
	const columnsFn = table.getProperty<TableColumnFn<DeepPartial<T>>>('columnsFn');
	const actionsFn = table.getProperty<TableActionsFn<DeepPartial<T>>>('actionsFn');
	const data = table.getProperty<DeepPartial<T>[]>('data');

	const getData = () => {
		if(!data) throw new Error("No [data] defined");

		return data;
	}

	return {
		getData,
		getColumn: (position: string, elementId: number) => {
			if(!columnsFn) throw new Error("No [columnsFn] defined");

			const element = getData().find(element => element.id === elementId);

			if(!element) throw new Error(`No element with id "${elementId}" found`);

			const allColumns = columnsFn(element);
			const column = allColumns.find(column => column.position === position);

			if(!column) throw new Error(`No column with position "${position}" found`);

			return column;
		},
		getAction: (actionName: string, elementId: number) => {
			if(!actionsFn) throw new Error("No [actionsFn] defined");

			const element = getData().find(element => element.id === elementId);

			if(!element) throw new Error(`No element with id "${elementId}" found`);

			const allActions = actionsFn(element);
			const action = allActions.find(action => action.name === actionName);

			if(!action) throw new Error(`No action with name "${actionName}" found`);

			return action;
		},
		isLoading: () => table.getProperty<boolean>('loading'),
		noResults: () => table.getProperty<NoResults>('noResults'),
	}
};
