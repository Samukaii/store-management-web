import { Component, input } from '@angular/core';

@Component({
    selector: 'app-title',
    imports: [],
    templateUrl: './title.component.html',
    styleUrl: './title.component.scss'
})
export class TitleComponent {
	value = input.required<string>()
	size = input<"medium" | "large" | "small">("medium")
}
