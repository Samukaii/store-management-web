import { ComponentRef, inject, Injectable, OutputEmitterRef, OutputRefSubscription, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MatDialogState } from "@angular/material/dialog";
import { ComponentDialogData } from "../models/component-dialog-data";
import { DialogOptions } from "../models/dialog-options";
import { Generic } from "../../models/generic";
import { componentInputExists } from "../../helpers/component-input-exists/component-input-exists";
import { componentOutputExists } from "../../helpers/component-output-exists/component-output-exists";


@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private dialog = inject(MatDialog);
	private openedDialogs: MatDialogRef<any>[] = [];
	private defaultOptions: MatDialogConfig = {
		height: "fit-content",
		minWidth: "800px",
		width: "fit-content",
		maxHeight: "90vh",
		closeOnNavigation: true
	}

	open<T, D extends ComponentDialogData<T>>(options: DialogOptions<T, D>) {
		const dialogRef = this.dialog.open(options.component, this.getOptions(options));

		this.openedDialogs.push(dialogRef);

		this.setComponentData(dialogRef, options);
	}

	close(component: Type<any>) {
		this.removeClosedDialogs();
		this.getDialog(component)?.close();
		this.removeClosedDialogs();
	}

	closeAll() {
		this.dialog.closeAll();
		this.removeClosedDialogs();
	}

	private getDialog(component: Type<any>) {
		return this.openedDialogs.find(dialog =>
			dialog.componentRef?.componentType === component
		);
	}

	private removeClosedDialogs() {
		this.openedDialogs = this.openedDialogs.filter(dialog =>
			dialog.getState() !== MatDialogState.CLOSED
		);
	}

	private setComponentData(dialogRef: MatDialogRef<any>, options: DialogOptions<any, any>) {
		const {componentRef} = dialogRef;

		if (!options.data || !componentRef) return;

		this.setInputs(componentRef, options.data);
		this.watchOutputs(componentRef, options.data);
	}

	private setInputs(componentRef: ComponentRef<any>, data: Generic) {
		const component = componentRef.componentType;

		Object.entries(data).forEach(([key, value]) => {
			if (componentInputExists(component, key)) componentRef?.setInput(key, value);
		});
	}

	private watchOutputs(componentRef: ComponentRef<any>, data: Generic) {
		const instance = componentRef.instance as Generic;
		const component = componentRef.componentType;

		const outputSubscriptions: OutputRefSubscription[] = [];

		Object.entries(data).forEach(([key, value]) => {
			if (componentOutputExists(component, key)) {
				const output = instance[key] as OutputEmitterRef<any>;
				const callBack = value as () => void;

				outputSubscriptions.push(output.subscribe(callBack));
			}
		});

		componentRef?.onDestroy(() => {
			outputSubscriptions.forEach(subscription => {
				subscription.unsubscribe();
			});
		})
	}

	private getOptions(options: DialogOptions<any, any>) {
		return {
			...this.defaultOptions,
			...options.config,
			data: options?.data ?? {},
		} as MatDialogConfig;
	}
}
