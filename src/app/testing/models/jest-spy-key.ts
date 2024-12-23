import FunctionPropertyNames = jest.FunctionPropertyNames;

export type JestSpyKey<T> = FunctionPropertyNames<Required<T>>;
