import StringUtil from "../../utils/string_util";

describe('StringUtil', () => {
    describe('isBlank', () => {
        it('should return true if the string is null', () => {
            const str = null;
            expect(StringUtil.isBlank(str)).toBe(true);
        });

        it('should return true if the string is undefined', () => {
            const str = undefined;
            expect(StringUtil.isBlank(str)).toBe(true);
        });

        it('should return true if the string is empty', () => {
            const str = '';
            expect(StringUtil.isBlank(str)).toBe(true);
        });

        it('should return true if the string is only whitespace', () => {
            const str = ' ';
            expect(StringUtil.isBlank(str)).toBe(true);
        });

        it('should return false if the string is not empty', () => {
            const str = 'test';
            expect(StringUtil.isBlank(str)).toBe(false);
        });
    });

    describe('isNotBlank', () => {
        it('should return false if the string is null', () => {
            const str = null;
            expect(StringUtil.isNotBlank(str)).toBe(false);
        });

        it('should return false if the string is undefined', () => {
            const str = undefined;
            expect(StringUtil.isNotBlank(str)).toBe(false);
        });

        it('should return false if the string is empty', () => {
            const str = '';
            expect(StringUtil.isNotBlank(str)).toBe(false);
        });

        it('should return false if the string is only whitespace', () => {
            const str = ' ';
            expect(StringUtil.isNotBlank(str)).toBe(false);
        });

        it('should return true if the string is not empty', () => {
            const str = 'test';
            expect(StringUtil.isNotBlank(str)).toBe(true);
        });
    });

    describe('capitaliseFirstLetter', () => {
        it('should capitalise the first letter of the string', () => {
            const str = 'test';
            expect(StringUtil.capitaliseFirstLetter(str)).toBe('Test');
        });

        it('should return the string unchanged if it is already capitalised', () => {
            const str = 'Test';
            expect(StringUtil.capitaliseFirstLetter(str)).toBe('Test');
        });
    });

    describe('truncate', () => {
        it('should truncate the string to the specified length', () => {
            const str = 'test';
            expect(StringUtil.truncate(str, 2)).toBe('te...');
        });

        it('should return the string unchanged if it is shorter than the specified length', () => {
            const str = 'test';
            expect(StringUtil.truncate(str, 4)).toBe('test');
        });

        it('should use the specified suffix', () => {
            const str = 'test';
            expect(StringUtil.truncate(str, 2, '...')).toBe('te...');
        });
    });

    describe('toCamelCaseFromSnake', () => {
        it('should convert the string to camel case from snake case', () => {
            const str = 'test_string';
            expect(StringUtil.toCamelCaseFromSnake(str)).toBe('testString');
        });

        it('should return the string unchanged if it is already in camel case', () => {
            const str = 'testString';
            expect(StringUtil.toCamelCaseFromSnake(str)).toBe('testString');
        });
    });

    describe('toCamelCaseFromKebab', () => {
        it('should convert the string to camel case from kebab case', () => {
            const str = 'test-string';
            expect(StringUtil.toCamelCaseFromKebab(str)).toBe('testString');
        });

        it('should return the string unchanged if it is already in camel case', () => {
            const str = 'testString';
            expect(StringUtil.toCamelCaseFromKebab(str)).toBe('testString');
        });
    });

    describe('toSnakeCaseFromCamel', () => {
        it('should convert the string to snake case from camel case', () => {
            const str = 'testString';
            expect(StringUtil.toSnakeCaseFromCamel(str)).toBe('test_string');
        });

        it('should return the string unchanged if it is already in snake case', () => {
            const str = 'test_string';
            expect(StringUtil.toSnakeCaseFromCamel(str)).toBe('test_string');
        });
    });

    describe('toKebabCaseFromCamel', () => {
        it('should convert the string to kebab case from camel case', () => {
            const str = 'testString';
            expect(StringUtil.toKebabCaseFromCamel(str)).toBe('test-string');
        });

        it('should return the string unchanged if it is already in kebab case', () => {
            const str = 'test-string';
            expect(StringUtil.toKebabCaseFromCamel(str)).toBe('test-string');
        });
    });

    describe('startsWith', () => {
        it('should return true if the string starts with the specified prefix', () => {
            const str = 'test';
            expect(StringUtil.startsWith(str, 'te')).toBe(true);
        });

        it('should return false if the string does not start with the specified prefix', () => {
            const str = 'test';
            expect(StringUtil.startsWith(str, 'es')).toBe(false);
        });

        it('should return false if the string is empty', () => {
            const str = '';
            expect(StringUtil.startsWith(str, 'te')).toBe(false);
        });

        it('should return false if the prefix is null', () => {
            const str = 'test';
            expect(StringUtil.startsWith(str, null)).toBe(false);
        });

        it('should return true if the prefix is empty', () => {
            const str = 'test';
            expect(StringUtil.startsWith(str, '')).toBe(true);
        });
    });

    describe('endsWith', () => {
        it('should return true if the string ends with the specified suffix', () => {
            const str = 'test';
            expect(StringUtil.endsWith(str, 'st')).toBe(true);
        });

        it('should return false if the string does not end with the specified suffix', () => {
            const str = 'test';
            expect(StringUtil.endsWith(str, 'es')).toBe(false);
        });

        it('should return false if the string is empty', () => {
            const str = '';
            expect(StringUtil.endsWith(str, 'st')).toBe(false);
        });

        it('should return false if the suffix is null', () => {
            const str = 'test';
            expect(StringUtil.endsWith(str, null)).toBe(false);
        });

        it('should return true if the suffix is empty', () => {
            const str = 'test';
            expect(StringUtil.endsWith(str, '')).toBe(true);
        });
    });

    describe('contains', () => {
        it('should return true if the string contains the specified substring', () => {
            const str = 'test';
            expect(StringUtil.contains(str, 'es')).toBe(true);
        });

        it('should return false if the string does not contain the specified substring', () => {
            const str = 'test';
            expect(StringUtil.contains(str, 'es')).toBe(true);
        });

        it('should return false if the string is empty', () => {
            const str = '';
            expect(StringUtil.contains(str, 'es')).toBe(false);
        });

        it('should return false if the substring is null', () => {
            const str = 'test';
            expect(StringUtil.contains(str, null)).toBe(false);
        });
    });

    describe('replaceAll', () => {
        it('should replace all occurrences of the specified substring', () => {
            const str = 'test';
            expect(StringUtil.replaceAll(str, 't', 'a')).toBe('aesa');
        });

        it('should return the string unchanged if the substring is not found', () => {
            const str = 'test';
            expect(StringUtil.replaceAll(str, 'a', 'b')).toBe('test');
        });

        it('should return the string unchanged if the substring is null', () => {
            const str = 'test';
            expect(StringUtil.replaceAll(str, null, 'b')).toBe('test');
        });

        it('should return the string unchanged if the replacement is null', () => {
            const str = 'test';
            expect(StringUtil.replaceAll(str, 't', null)).toBe('test');
        });
    });

    describe('removeSubstring', () => {
        it('should remove the specified substring', () => {
            const str = 'test';
            expect(StringUtil.removeSubstring(str, 'es')).toBe('tt');
        });

        it('should return the string unchanged if the substring is not found', () => {
            const str = 'test';
            expect(StringUtil.removeSubstring(str, 'a')).toBe('test');
            expect(StringUtil.removeSubstring(str, 'esta')).toBe('test');
        });

        it('should return the string unchanged if the substring is null', () => {
            const str = 'test';
            expect(StringUtil.removeSubstring(str, null)).toBe('test');
        });
    });

    describe('addPrefix', () => {
        it('should add the specified prefix', () => {
            const str = 'test';
            expect(StringUtil.addPrefix(str, 'pre')).toBe('pretest');
        });

        it('should return the string unchanged if the prefix is null', () => {
            const str = 'test';
            expect(StringUtil.addPrefix(str, null)).toBe('test');
        });

        it('should return the string unchanged if the prefix is empty', () => {
            const str = 'test';
            expect(StringUtil.addPrefix(str, '')).toBe('test');
        });

        it('should retrun the string unchanged if the prefix is already there', () => {
            const str = 'test';
            expect(StringUtil.addPrefix(str, 'te')).toBe('test');
        });
    });

    describe('addSuffix', () => {
        it('should add the specified suffix', () => {
            const str = 'test';
            expect(StringUtil.addSuffix(str, 'suf')).toBe('testsuf');
        });

        it('should return the string unchanged if the suffix is null', () => {
            const str = 'test';
            expect(StringUtil.addSuffix(str, null)).toBe('test');
        });

        it('should return the string unchanged if the suffix is empty', () => {
            const str = 'test';
            expect(StringUtil.addSuffix(str, '')).toBe('test');
        });

        it('should retrun the string unchanged if the suffix is already there', () => {
            const str = 'test';
            expect(StringUtil.addSuffix(str, 'st')).toBe('test');
        });
    });

    describe('reverse', () => {
        it('should reverse the string', () => {
            const str = 'test';
            expect(StringUtil.reverse(str)).toBe('tset');
        });

        it('should return the string unchanged if it is null', () => {
            const str = null;
            expect(StringUtil.reverse(str)).toBeNull();
        });

        it('should return the string unchanged if it is undefined', () => {
            const str = undefined;
            expect(StringUtil.reverse(str)).toBeUndefined();
        });

        it('should return the string unchanged if it is empty', () => {
            const str = '';
            expect(StringUtil.reverse(str)).toBe('');
        });
    });

    describe('removeWhitespaces', () => {
        it('should remove all whitespace characters', () => {
            const str = 't e s t';
            expect(StringUtil.removeWhitespaces(str)).toBe('test');
        });

        it('should return the string unchanged if it is null', () => {
            const str = null;
            expect(StringUtil.removeWhitespaces(str)).toBeNull();
        });

        it('should return the string unchanged if it is undefined', () => {
            const str = undefined;
            expect(StringUtil.removeWhitespaces(str)).toBeUndefined();
        });

        it('should return the string unchanged if it is empty', () => {
            const str = '';
            expect(StringUtil.removeWhitespaces(str)).toBe('');
        });
    });
})