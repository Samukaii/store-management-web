import { FormGroup } from "@angular/forms";

export type FormControlNames<T extends FormGroup> = Extract<keyof T["controls"], string>
