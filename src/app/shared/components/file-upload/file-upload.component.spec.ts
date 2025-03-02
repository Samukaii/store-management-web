import { FileUploadComponent } from "src/app/shared/components/file-upload/file-upload.component";
import { hasCreatedComponent } from "src/app/testing/utils/has-created-component";
import { setupComponentTesting } from "src/app/testing/setup/setup-component-testing";

interface SetupConfig {

}

const setup = (config?: SetupConfig) => {
	setupComponentTesting(FileUploadComponent, {
		providers: [

		]
	})
}


fdescribe(FileUploadComponent.name, () => {
	it('must create component', () => {
		setup();

		expect(hasCreatedComponent()).toBeTruthy();
	});
});
