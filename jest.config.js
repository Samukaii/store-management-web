/** @type {import('jest').Config} */
module.exports = {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
	collectCoverageFrom: [
		'./src/app/shared/**/*.{ts,html}',
		'./src/app/core/**/*.{ts,html}',
		'./src/app/pages/**/*.{ts,html}',
		'./src/app/app.component.{ts,html}',
	],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	}
};
