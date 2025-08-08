import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Generic } from "src/app/shared/models/generic";

// @ts-ignore
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask';

@Directive({
  selector: '[appFormDate]'
})
export class FormDateDirective implements OnInit, OnDestroy {
	maskedInputController: any;

	private textMask: Generic = {
		mask: [],
		showMask: false,
		guide: false,
	};

	constructor(private element: ElementRef){}

	@Input('appFormDate')
	set setTextMask(mask: any){
		if(mask) this.textMask = {...this.textMask, ...mask};
	}

	ngOnInit(): void {
		this.maskedInputController = textMask.maskInput({ inputElement: this.element.nativeElement, ...this.textMask });
	}

	ngOnDestroy() {
		this.maskedInputController?.destroy?.();
	}

}
