import { Generic } from "../../shared/models/generic";
import SpyInstance = jest.SpyInstance;
import FunctionProperties = jest.FunctionProperties;
import ArgsType = jest.ArgsType;
import Func = jest.Func;
import { JestSpyKey } from "./jest-spy-key";

export type JestSpy<T extends Generic, K extends JestSpyKey<T>> = FunctionProperties<Required<T>>[K] extends Func
	? SpyInstance<ReturnType<FunctionProperties<Required<T>>[K]>, ArgsType<FunctionProperties<Required<T>>[K]>>
	:never;
