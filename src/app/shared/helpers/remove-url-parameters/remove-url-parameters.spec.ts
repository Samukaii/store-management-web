import { removeUrlParameters } from "src/app/shared/helpers/remove-url-parameters/remove-url-parameters";

describe(removeUrlParameters.name, () => {
	describe('URL without parameters', () => {
		it('must return the same URL if there are no parameters', () => {
			const url = 'https://example.com/path';
			expect(removeUrlParameters(url)).toBe(url);
		});

		it('must return the same URL for a root URL without parameters', () => {
			const url = 'https://example.com';
			expect(removeUrlParameters(url)).toBe(url);
		});
	});

	describe('URL with parameters', () => {
		it('must remove a single parameter from the URL', () => {
			const url = 'https://example.com/path?param=value';
			expect(removeUrlParameters(url)).toBe('https://example.com/path');
		});

		it('must remove multiple parameters from the URL', () => {
			const url = 'https://example.com/path?param1=value1&param2=value2';
			expect(removeUrlParameters(url)).toBe('https://example.com/path');
		});

		it('must remove parameters even if they contain special characters', () => {
			const url = 'https://example.com/path?param=value&another=@!$';
			expect(removeUrlParameters(url)).toBe('https://example.com/path');
		});
	});

	describe('Edge cases', () => {
		it('must handle URLs that contain a "?" but no parameters', () => {
			const url = 'https://example.com/path?';
			expect(removeUrlParameters(url)).toBe('https://example.com/path');
		});

		it('must handle URLs with a hash fragment after parameters', () => {
			const url = 'https://example.com/path?param=value#section';
			expect(removeUrlParameters(url)).toBe('https://example.com/path');
		});

		it('must handle URLs with a hash fragment but no parameters', () => {
			const url = 'https://example.com/path#section';
			expect(removeUrlParameters(url)).toBe(url);
		});
	});

	describe('Invalid inputs', () => {
		it('must handle an empty string as input', () => {
			const url = '';
			expect(removeUrlParameters(url)).toBe('');
		});

		it('must handle a string without a valid URL format', () => {
			const url = 'not-a-url';
			expect(removeUrlParameters(url)).toBe('not-a-url');
		});

		it('must handle a string containing only parameters', () => {
			const url = '?param=value';
			expect(removeUrlParameters(url)).toBe('');
		});
	});
});
