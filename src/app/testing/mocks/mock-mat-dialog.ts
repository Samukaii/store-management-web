import { MockProvider } from "ng-mocks";
import { MatDialog } from "@angular/material/dialog";
import { mockDialogRef } from "src/app/testing/mocks/mock-dialog-ref";
import { ComponentType } from "@angular/cdk/portal";

export const mockMatDialog = () => {
	return MockProvider(MatDialog, {
		open: (component) => mockDialogRef(component as ComponentType<any>)
	})
}
