import { FormGroup } from "@angular/forms";
import { FormControlNames } from "./form-control-names";

export type FormControlValue<Form extends FormGroup, Key extends FormControlNames<Form>> = Form["controls"][Key]["value"];
