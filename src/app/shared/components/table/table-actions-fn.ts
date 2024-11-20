import { Button } from "../button/models/button";

export type TableActionsFn<T> = (element: T) => Button[];
