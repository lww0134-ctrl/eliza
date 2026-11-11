/**
 * `sanitizeSpeechText` must keep a vulgar fraction as one quantity. NFKC
 * renders `½` as digits around U+2044 FRACTION SLASH; the speech whitelist only
 * knows the ASCII solidus, so dropping the slash spoke "1 2 cup" for `½ cup`.
 */

import { describe, expect, it } from "vitest";
import { sanitizeSpeechText } from "../src/spoken-text";

describe("sanitizeSpeechText vulgar fractions", () => {
	it("keeps a fraction as one spoken quantity", () => {
		expect(sanitizeSpeechText("Add ½ cup of sugar.")).toBe(
			"Add 1/2 cup of sugar.",
		);
		expect(sanitizeSpeechText("Use ⅓ of the budget.")).toBe(
			"Use 1/3 of the budget.",
		);
		expect(sanitizeSpeechText("Mix ¼ teaspoon of salt.")).toBe(
			"Mix 1/4 teaspoon of salt.",
		);
	});

	it("leaves a typed solidus fraction unchanged", () => {
		expect(sanitizeSpeechText("Use 1/3 of the budget.")).toBe(
			"Use 1/3 of the budget.",
		);
	});
});
