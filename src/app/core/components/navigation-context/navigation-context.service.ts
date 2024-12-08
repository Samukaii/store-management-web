import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationContext } from "./models/navigation-context";

@Injectable({
	providedIn: 'root'
})
export class NavigationContextService {
	contexts = signal<NavigationContext[]>([]);
	lastContext = computed(() => {
		return this.contexts().at(0) ?? null;
	});

	private router = inject(Router);

	registerContext(context: NavigationContext) {
		const contexts = this.contexts();

		this.contexts.set([
			context,
			...contexts
		]);
	}

	finishContext(contextToFinish: NavigationContext) {
		let contexts = this.contexts();

		contexts = contexts.filter(context => context !== contextToFinish);

		this.router.navigateByUrl(contextToFinish.url);

		this.contexts.set(contexts);
	}

	clearAllContexts() {
		this.contexts.set([]);
	}
}
