const instance = {
	destroy: jest.fn(),
}

const classMock = jest.fn().mockImplementation(() => instance);

export const getMockedChartJs = () => {
	return {classMock, instance};
};
