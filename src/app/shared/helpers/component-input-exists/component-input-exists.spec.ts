import { componentInputExists } from "src/app/shared/helpers/component-input-exists/component-input-exists";
import { Component, input } from '@angular/core'


@Component({
	template: '',
	selector: 'component-test'
})
class ComponentTest {
	name = input("");
	cpf = input("", {alias: "cpfAlias"});
	document = input("", {alias: "documentAlias"});
}

describe(componentInputExists.name, () => {
	it('must return true if component input exists considering template alias', () => {
		expect(componentInputExists(ComponentTest, 'name')).toBe(true);
		expect(componentInputExists(ComponentTest, 'documentAlias')).toBe(true);
		expect(componentInputExists(ComponentTest, 'cpfAlias')).toBe(true);
	});

	it('must return false if component input does not exists or is aliased with other name', () => {
		expect(componentInputExists(ComponentTest, 'nonExistentInput')).toBe(false);
		expect(componentInputExists(ComponentTest, 'cpf')).toBe(false);
		expect(componentInputExists(ComponentTest, 'document')).toBe(false);
	});
});
