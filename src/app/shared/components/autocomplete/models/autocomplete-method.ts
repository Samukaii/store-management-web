import { Observable } from "rxjs";
import { AutocompleteOption } from "./autocomplete-option";

export type AutocompleteMethod = <Params extends { search: string }>(params: Params) => Observable<AutocompleteOption[]>;
