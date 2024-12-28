import { FormGroup } from "@angular/forms";

export type FormControlsName<Form extends FormGroup> = Extract<keyof Form['controls'], string>;
