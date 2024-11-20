import { ChangeDetectorRef, EmbeddedViewRef, inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call',
  standalone: true
})
export class CallPipe<C> implements PipeTransform {
	private readonly context = (<EmbeddedViewRef<C>>inject(ChangeDetectorRef)).context;

	transform<T, Fn extends (...args: any[]) => T>(fn: Fn, ...params: Parameters<Fn>): T {
		return fn.apply(this.context, [...params]);
	}
}
