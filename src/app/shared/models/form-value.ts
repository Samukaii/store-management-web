import { FormGroup } from "@angular/forms";

export type FormValue<Form extends FormGroup> = ReturnType<Form["getRawValue"]>;
