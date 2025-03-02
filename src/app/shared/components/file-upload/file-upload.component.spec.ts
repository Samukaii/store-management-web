import { Component, computed, inject, input, signal } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FlexRowComponent } from "../flex-row/flex-row.component";
import { NoResultsComponent } from "../no-results/no-results.component";
import { DOCUMENT } from "@angular/common";
import { FormControl, FormGroup } from "@angular/forms";
import { MatChip, MatChipSet } from "@angular/material/chips";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-file-upload',
	imports: [
		ButtonComponent,
		FlexRowComponent,
		NoResultsComponent,
		MatIcon,
		MatChipSet,
		MatChip
	],
    templateUrl: './file-upload.component.html',
    styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
	control = input.required<FormControl>();
	accept = input("*");
	multiple = input(false);

	document = inject(DOCUMENT);

	currentFiles = signal<File[]>([]);

	label = computed(() => {
		if(this.multiple()) return "Adicionar arquivo";

		return this.currentFiles().length ? "Escolher outro arquivo" : "Adicionar arquivo";
	});

	addFile() {
		const input = this.document.createElement('input');
		input.type = 'file';

		input.accept = this.accept();

		if(this.multiple())
			input.multiple = true;

		input.addEventListener('change', () => {
			const newFiles = Array.from(input.files ?? []);

			if(this.multiple())
				this.currentFiles.update(current => {
					return [
						...current,
						...newFiles
					]
				})
			else this.currentFiles.set(newFiles);

			this.saveChanges();
		});

		input.click();
	}

	removeFile(file: File) {
		this.currentFiles.update(currentFiles => currentFiles.filter(currentFile => currentFile !== file));
		this.saveChanges();
	}

	saveChanges() {
		this.control().setValue(this.multiple() ? this.currentFiles() : this.currentFiles()[0])
	}
}
