import { ButtonType } from "./button-type";
import { ButtonIconColor } from "./button-icon-color";

export interface Button {
	iconColor?: ButtonIconColor;
	tooltip?: string;
	label?: string;
	icon?: string;
	type?: ButtonType;
	relativeRoute?: string;
	route?: string;
	disabled?: boolean;
	click?: () => void;
}
