import { compareUrls } from "src/app/shared/helpers/compare-urls/compare-urls";

fdescribe(compareUrls.name, () => {
	it('must receive a url schema and match correct params', () => {
		const schema = "some-url/:someParam/other-url/:otherParam/new-url/:newParam";
		let url = "some-url/123/other-url/test/new-url/false";

		expect(compareUrls(schema, url)).toEqual({
			someParam: "123",
			otherParam: "test",
			newParam: "false",
		});
	});

	it('must return undefined if schema does not match with url', () => {
		const schema = "some-url/:someParam/other-url/:otherParam/new-url/:newParam";
		let url = "some-url/123/other-url/test/unexpected-url/false";

		expect(compareUrls(schema, url)).toBeUndefined();
	});

	it('must return undefined if url split length is less than schema', () => {
		const schema = "some-url/:someParam/other-url/:otherParam/new-url/:newParam";
		let url = "some-url/123/other-url/test/false";

		expect(compareUrls(schema, url)).toBeUndefined();
	});
});
