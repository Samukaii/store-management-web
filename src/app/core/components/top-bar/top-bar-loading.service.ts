import { Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TopBarLoadingService {
	private loading = signal(false);
	isLoading = this.loading.asReadonly();

	setLoading(enabled: boolean) {
		this.loading.set(enabled);
	}
}
