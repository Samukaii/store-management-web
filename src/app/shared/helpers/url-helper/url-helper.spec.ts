import { UrlHelper } from './url-helper'; // Ajuste o caminho conforme necessário
import { Generic } from '../../models/generic';

describe('UrlHelper', () => {
	describe('joinParams', () => {
		it('should replace URL params with values from params object', () => {
			const url = '/user/:id/profile/:profileId';
			const params: Generic = { id: 123, profileId: 'abc' };

			const result = UrlHelper.joinParams(url, params);

			expect(result).toBe('/user/123/profile/abc');
		});

		it('should keep the original slice if no matching param is found in params', () => {
			const url = '/user/:id/details/:otherId';
			const params: Generic = { id: 123 };

			const result = UrlHelper.joinParams(url, params);

			expect(result).toBe('/user/123/details/:otherId');
		});

		it('should return the original URL if there are no params to replace', () => {
			const url = '/user/profile';
			const params: Generic = {};

			const result = UrlHelper.joinParams(url, params);

			expect(result).toBe('/user/profile');
		});

		it('should handle empty params correctly', () => {
			const url = '/user/:id/profile/:profileId';
			const params: Generic = {};

			const result = UrlHelper.joinParams(url, params);

			expect(result).toBe('/user/:id/profile/:profileId');
		});
	});
});
