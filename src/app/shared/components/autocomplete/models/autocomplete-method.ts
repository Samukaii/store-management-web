import { Observable } from "rxjs";
import { AutocompleteOption } from "./autocomplete-option";
import { Generic } from "../../../models/generic";

export type AutocompleteMethod = (params: Generic) => Observable<AutocompleteOption[]>;
