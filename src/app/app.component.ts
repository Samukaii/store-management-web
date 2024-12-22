import { Component, computed, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { MenuComponent } from "./core/components/menu/menu.component";
import { TopBarComponent } from "./core/components/top-bar/top-bar.component";
import { injectIsAtBrowser } from "./shared/di/inject-is-at-browser";
import { NavigationContextComponent } from "./core/components/navigation-context/navigation-context.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, TopBarComponent, NavigationContextComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	matIconReg = inject(MatIconRegistry);

	isAtBrowser = injectIsAtBrowser();

	topBarElement = viewChild(TopBarComponent);

	allOccupiedSpaces = computed(() => {
		if(!this.isAtBrowser) return 0;

		return this.getHeight(this.topBarElement()?.elementRef);
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
