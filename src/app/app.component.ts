import { Component, computed, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MenuComponent } from "./core/components/menu/menu.component";
import { TopBarComponent } from "./core/components/top-bar/top-bar.component";
import { injectIsAtBrowser } from "./shared/di/inject-is-at-browser";

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, MenuComponent, TopBarComponent, MatToolbarRow, MatToolbar],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	matIconReg = inject(MatIconRegistry);

	isAtBrowser = injectIsAtBrowser();

	toolbarElement = viewChild(MatToolbar, {read: ElementRef});
	topBarElement = viewChild(TopBarComponent, {read: ElementRef});

	allOccupiedSpaces = computed(() => {
		if(!this.isAtBrowser) return 0;

		const toolbarHeight = this.getHeight(this.toolbarElement());
		const topBarHeight = this.getHeight(this.topBarElement());

		return toolbarHeight + topBarHeight;
	});

	routesHeight = computed(() => {
		return `calc(100vh - ${this.allOccupiedSpaces()}px)`;
	})

	ngOnInit() {
		this.matIconReg.setDefaultFontSetClass('material-symbols-outlined');
	}

	private getHeight(element?: ElementRef<HTMLElement>) {
		return element?.nativeElement?.getBoundingClientRect().height ?? 0;
	}
}
