import { ChangeDetectorRef, EmbeddedViewRef, inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'call',
  standalone: true
})
export class CallPipe<C> implements PipeTransform {
	private readonly context = (<EmbeddedViewRef<C>>inject(ChangeDetectorRef)).context;

	transform<Fn extends (...args: any[]) => any>(fn: Fn, ...params: Parameters<Fn>): ReturnType<Fn> {
		return fn.apply(this.context, [...params]);
	}
}
