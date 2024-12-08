import { Observable } from "rxjs";
import { Identifiable } from "../../../models/identifiable";
import { Generic } from "../../../models/generic";

export interface NoResultsAutoCreationOptions {
	key: string;
	noResultsIcon: string;
	method: (value: Generic) => Observable<Identifiable>
}
