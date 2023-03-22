import {escapeRegExp, backslashSpec}  from './../scripts/utils/backslashRegex';

describe('escapeRegExp()', () => {
    it('should escape special characters', () => {
        const input = '.special* chars';
        const output = '\\.special\\* chars';
        const escapedStr = escapeRegExp(input);
        expect(escapedStr).toEqual(output);
    });
});

describe('backslashSpec() returns string of joined words ', () => {
    it('string should be with escaped special characters for regex OR pattern', () => {
        const words: string[] = ['hello', '.world', 'goodbye'];
        const spec = backslashSpec(words);
        expect(spec).toEqual('(hello|\\.world|goodbye)');
    });

    it('should return empty string if given an empty array', () => {
        const words: string[] = [];
        const spec = backslashSpec(words);
        expect(spec).toEqual('()');
    });
});