import { ComponentRef, inject, Injectable, OutputEmitterRef, OutputRefSubscription, Type } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { Generic } from "../models/generic";
import { componentInputExists } from "../helpers/component-input-exists";
import { componentOutputExists } from "../helpers/component-output-exists";
import { DialogOptions } from "./models/dialog-options";
import { ComponentDialogData } from "./models/component-dialog-data";


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
		maxHeight: "90vh"
	}

	open<T, D extends ComponentDialogData<T>>(options: DialogOptions<T, D>) {
		const dialogRef = this.dialog.open(options.component, this.getOptions(options));

		this.openedDialogs.push(dialogRef);

		this.setComponentData(dialogRef, options);
	}

	close(component: Type<any>) {
		this.getDialog(component)?.close();
		this.removeDialog(component);
	}

	closeAll() {
		this.dialog.closeAll();
	}

	private getDialog(component: Type<any>) {
		return this.openedDialogs.find(dialog =>
			dialog.componentRef?.componentType === component
		);
	}

	private removeDialog(component: Type<any>) {
		this.openedDialogs = this.openedDialogs.filter(dialog =>
			dialog.componentRef?.componentType !== component
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
