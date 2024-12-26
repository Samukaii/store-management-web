import { InjectionToken, Type } from "@angular/core";
import { TestBed } from "@angular/core/testing";

export const injectDep = <T>(dependency: Type<T> | InjectionToken<T>) => TestBed.inject(dependency);
