const instance = {
	destroy: jest.fn(),
}

const dataLabel = {
	plugin: "data-label",
}

const classMock = jest.fn().mockImplementation(() => instance);

export const getMockedChartJs = () => {
	return {classMock, instance, plugins: {dataLabel}};
};
