import { Component, computed, input } from '@angular/core';
import {
	MatCell,
	MatCellDef,
	MatColumnDef,
	MatHeaderCell,
	MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow,
	MatRowDef,
	MatTable
} from "@angular/material/table";
import { CallPipe } from "../../pipes/call.pipe";
import { TableColumn } from "./models/table-column";
import { TableColumnFn } from "./table-column-fn";
import { Identifiable } from "../../models/identifiable";
import { TableActionsFn } from "./table-actions-fn";
import { ButtonsListComponent } from "../buttons-list/buttons-list.component";
import { NoResultsComponent } from "../no-results/no-results.component";
import { WindowLoadingComponent } from "../../../core/components/window-loading/window-loading.component";
import { NoResults } from "../no-results/models/no-results";

@Component({
    selector: 'app-table',
    imports: [
        MatCell,
        MatHeaderCell,
        MatColumnDef,
        MatTable,
        MatHeaderRow,
        MatRowDef,
        MatHeaderRowDef,
        MatRow,
        MatCellDef,
        MatHeaderCellDef,
        CallPipe,
        ButtonsListComponent,
        NoResultsComponent,
        WindowLoadingComponent
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T extends Identifiable> {
	data = input<T[]>([]);
	columnsFn = input<TableColumnFn<T>>(() => [])
	actionsFn = input<TableActionsFn<T>>();
	loading = input(false);
	noResults = input<NoResults>({
		icon: "table",
		label: "Nenhuma informação encontrada"
	})

	header = computed(() => {
		const firstItem = this.data()[0];

		return this.columnsFn()(firstItem);
	});

	displayedColumns = computed(() => {
		const headerPositions = this.header().map(header => header.position)

		if(!this.actionsFn()) return headerPositions;

		return [...headerPositions, 'actions']
	})

	private columnsDefinition = computed(() => {
		const columnsDefinition = new Map<string, TableColumn>();

		this.data().forEach(item => {
			const columns = this.columnsFn()(item);

			columns.forEach(column => {
				columnsDefinition.set(`${column.position}:${item.id}`, column);
			})
		})

		return columnsDefinition;
	});

	getActions(element: T) {
		return this.actionsFn()?.(element) ?? [];
	}

	getColumn(position: string, id: number) {
		return this.columnsDefinition().get(`${position}:${id}`);
	}
}
