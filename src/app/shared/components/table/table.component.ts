import { booleanAttribute, Component, computed, inject, input } from '@angular/core';
import {
	MatCell, MatCellDef,
	MatColumnDef,
	MatHeaderCell, MatHeaderCellDef,
	MatHeaderRow,
	MatHeaderRowDef,
	MatRow, MatRowDef,
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
import { ActivatedRoute, Router } from "@angular/router";
import { RowClickFn } from "./models/row-click-fn";
import { MatRippleModule } from "@angular/material/core";

@Component({
    selector: 'app-table',
	imports: [
		MatCell,
		MatHeaderCell,
		MatColumnDef,
		MatTable,
		MatHeaderRow,
		MatRow,
		CallPipe,
		ButtonsListComponent,
		NoResultsComponent,
		WindowLoadingComponent,
		MatRippleModule,
		MatHeaderRowDef,
		MatRowDef,
		MatCellDef,
		MatHeaderCellDef
	],
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss'
})
export class TableComponent<T extends Identifiable> {
	router = inject(Router);
	activatedRoute = inject(ActivatedRoute);

	data = input<T[]>([]);
	columnsFn = input<TableColumnFn<T>>(() => [])
	actionsFn = input<TableActionsFn<T>>();
	loading = input(false);
	disableRowClick = input(false, {transform: booleanAttribute});

	noResults = input<NoResults>({
		icon: "table",
		label: "Nenhuma informação encontrada"
	});

	rowClick = input<RowClickFn>((element: Identifiable) => {
		this.router.navigate([element.id], {
			relativeTo: this.activatedRoute,
		});
	});

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

	onRowClick(element: T) {
		if(this.disableRowClick()) return;

		this.rowClick()(element);
	}

	getActions(element: T) {
		return this.actionsFn()?.(element) ?? [];
	}

	getColumn(position: string, id: number) {
		return this.columnsDefinition().get(`${position}:${id}`);
	}
}
