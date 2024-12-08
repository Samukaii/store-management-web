import { NoResultsAction } from "./no-results-action";
import { FormControl } from "@angular/forms";

export type NoResultsActionsFn = (options: {
	searchValue: string;
	control: FormControl;
	reload: () => void;
}) => NoResultsAction;
