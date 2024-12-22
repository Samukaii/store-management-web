import { ComponentFixture } from "@angular/core/testing";

let currentComponentFixture: ComponentFixture<any> | null = null;

export const setCurrentComponentFixture = (fixture: ComponentFixture<any>) => {
	currentComponentFixture = fixture;
}

export const getCurrentComponentFixture = <T>() => {
	if(!currentComponentFixture)
		throw new Error("No component fixture found. Please call your setup function.");

	return currentComponentFixture as ComponentFixture<T>;
}

export const clearCurrentComponentFixture = <T>() => {
	currentComponentFixture = null;
}
