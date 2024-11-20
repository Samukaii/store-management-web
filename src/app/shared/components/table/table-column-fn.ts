import { TableColumn } from "./models/table-column";

export type TableColumnFn<T> = (element: T) => TableColumn[];
