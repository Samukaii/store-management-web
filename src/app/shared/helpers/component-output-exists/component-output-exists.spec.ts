import { componentInputExists } from "src/app/shared/helpers/component-input-exists/component-input-exists";
import { Component, input, output } from '@angular/core'
import { componentOutputExists } from "src/app/shared/helpers/component-output-exists/component-output-exists";


@Component({
	template: '',
	selector: 'component-test'
})
class ComponentTest {
	name = output();
	cpf = output({alias: "cpfAlias"});
	document = output({alias: "documentAlias"});
}

describe(componentOutputExists.name, () => {
	it('must return true if component output exists considering template alias', () => {
		expect(componentOutputExists(ComponentTest, 'name')).toBe(true);
		expect(componentOutputExists(ComponentTest, 'documentAlias')).toBe(true);
		expect(componentOutputExists(ComponentTest, 'cpfAlias')).toBe(true);
	});

	it('must return false if component output does not exists or is aliased with other name', () => {
		expect(componentOutputExists(ComponentTest, 'nonExistentInput')).toBe(false);
		expect(componentOutputExists(ComponentTest, 'cpf')).toBe(false);
		expect(componentOutputExists(ComponentTest, 'document')).toBe(false);
	});
});
