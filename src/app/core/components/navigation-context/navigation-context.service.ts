import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from "@angular/router";
import { NavigationContext } from "./models/navigation-context";

@Injectable({
	providedIn: 'root'
})
export class NavigationContextService {
	private internalContexts = signal<NavigationContext[]>([]);

	lastContext = computed(() => {
		return this.internalContexts().at(0) ?? null;
	});

	contexts = this.internalContexts.asReadonly();

	private router = inject(Router);

	registerContext(context: NavigationContext) {
		const contexts = this.internalContexts();

		this.internalContexts.set([
			context,
			...contexts
		]);
	}

	finishContext(contextToFinish: NavigationContext) {
		let contexts = this.internalContexts();

		contexts = contexts.filter(context => context !== contextToFinish);

		this.router.navigateByUrl(contextToFinish.url);

		this.internalContexts.set(contexts);
	}

	clearAllContexts() {
		this.internalContexts.set([]);
	}
}
