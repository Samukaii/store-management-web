import { getByTestId } from "src/app/testing/getters/get-by-test-id";
import { detectChanges } from "src/app/testing/utils/detect-changes";

export const testInputElement = (testId: string) => {
	const element = getByTestId(testId);
	const nativeElement = () => element.nativeElement as HTMLInputElement;

	return {
		write: (value: string) => {
			nativeElement().value = value;
			element.triggerEventHandler('input', {
				target: {
					value,
				}
			});

			detectChanges();
		}
	}
}
