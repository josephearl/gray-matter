/*!
 * preliminaries <https://github.com/josephearl/preliminaries.git>
 *
 * Copyright (C) 2017 Joseph Earl.
 * Copyright (C) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

// @flow
"use strict";

import Preliminaries from "../src/Preliminaries";

describe("Preliminaries.test:", () => {
  it("should return `true` if the string has front matter", () => {
    const preliminaries: Preliminaries = new Preliminaries();
    expect(preliminaries.test("---\nabc: xyz\n---")).toBe(true);
    expect(preliminaries.test("---yaml\nabc: xyz\n---")).toBe(true);
    expect(
      preliminaries.test("---yaml\nabc: xyz\n---", { delims: "---" })
    ).toBe(true);
    expect(
      preliminaries.test('{\n"abc": "xyz"\n}', { delims: ["{", "}"] })
    ).toBe(true);
    expect(
      preliminaries.test('{\n"abc": "xyz"\n}', { delims: ["{", ">"] })
    ).toBe(true);
    expect(preliminaries.test('---json\n{\n"abc": "xyz"\n}\n---')).toBe(true);
    expect(preliminaries.test('+++\nabc = "xyz"\n+++', { delims: "+++" })).toBe(
      true
    );
    expect(preliminaries.test('~~~\nabc = "xyz"\n~~~', { delims: "~~~" })).toBe(
      true
    );
    expect(preliminaries.test('---toml\nabc = "xyz"\n---')).toBe(true);
    expect(preliminaries.test("~~~\nabc: xyz\n~~~", { delims: "~~~" })).toBe(
      true
    );
  });

  it("should return `false` if the string does not have valid front matter", () => {
    const preliminaries: Preliminaries = new Preliminaries();
    expect(preliminaries.test("---\nabc: xyz\n---", { delims: "~~~" })).toBe(
      false
    );
    expect(preliminaries.test("\nabc: xyz\n---")).toBe(false);
    expect(preliminaries.test('\n"abc": "xyz"\n}')).toBe(false);
    expect(preliminaries.test('\n"abc": "xyz"\n}\n---')).toBe(false);
    expect(preliminaries.test('\nabc = "xyz"\n+++')).toBe(false);
    expect(preliminaries.test('\nabc = "xyz"\n+++')).toBe(false);
    expect(preliminaries.test("\nabc: xyz\n}", { delims: "}" })).toBe(false);
    expect(preliminaries.test("\nabc: xyz\n~~~", { delims: "~~~" })).toBe(
      false
    );
  });
});
