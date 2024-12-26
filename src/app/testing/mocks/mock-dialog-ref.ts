import { ComponentType } from "@angular/cdk/portal";
import { TestBed } from "@angular/core/testing";
import { ComponentRef } from "@angular/core";
import { MatDialogRef, MatDialogState } from "@angular/material/dialog";

export const mockDialogRef = <T>(component: ComponentType<T>) => {
	const destroyCallBacks: (() => void)[] = [];

	const componentRef = {
		componentType: component,
		instance: TestBed.createComponent(component).componentInstance,
		setInput: (_name, _value) => {
		},
		destroy: () => {
			destroyCallBacks.forEach(callback => callback())
		},
		onDestroy: (callback: () => void) => {
			destroyCallBacks.push(callback)
		}
	} as ComponentRef<any>;

	let state = MatDialogState.OPEN;

	return {
		componentRef,
		getState: () => state,
		close: () => {
			state = MatDialogState.CLOSED;
		}
	} as MatDialogRef<T>;
};
