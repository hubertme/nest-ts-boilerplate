import RandomUtil from "../../utils/random_util";

describe('RandomUtil', () => {
    describe('randomInt', () => {
        it('should generate a random integer within the specified range', () => {
            const min = 1;
            const max = 10;
            const randomInt = RandomUtil.randomInt(min, max);
            expect(randomInt).toBeGreaterThanOrEqual(min);
            expect(randomInt).toBeLessThanOrEqual(max);
        });
    });

    describe('randomBoolean', () => {
        it('should generate a random boolean', () => {
            const randomBoolean = RandomUtil.randomBoolean();
            expect(typeof randomBoolean).toBe('boolean');
        });
    });

    describe('randomElement', () => {
        it('should generate a random element from the array', () => {
            const array = [1, 2, 3, 4, 5];
            const randomElement = RandomUtil.randomElement(array);
            expect(array).toContain(randomElement);
        });

        it('should throw an error if the array is empty', () => {
            const array: number[] = [];
            expect(() => {
                RandomUtil.randomElement(array);
            }).toThrow('Cannot get a random element from an empty array.');
        });
    });

    describe('shuffle', () => {
        it('should shuffle the elements of the array randomly', () => {
            const array = [1, 2, 3, 4, 5];
            const shuffledArray = RandomUtil.shuffle(array);
            expect(shuffledArray).not.toEqual(array);
            expect(shuffledArray).toHaveLength(array.length);
            expect(shuffledArray).toContain(1);
            expect(shuffledArray).toContain(2);
            expect(shuffledArray).toContain(3);
            expect(shuffledArray).toContain(4);
            expect(shuffledArray).toContain(5);
        });
    });

    describe('uuid', () => {
        it('should generate a random UUID', () => {
            const uuid = RandomUtil.uuid();
            expect(uuid).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
        });
    });

    describe('generateRandomStringWithPrefix', () => {
        it('should generate a random string with the specified prefix', () => {
            const prefix = 'test';
            const length = 10;
            const randomString = RandomUtil.generateRandomStringWithPrefix(prefix, length);
            expect(randomString.startsWith(prefix)).toBe(true);
            expect(randomString.length).toBe(length);
        });

        it('should throw an error if the length is less than the length of the prefix', () => {
            const prefix = 'test';
            const length = 3;
            expect(() => {
                RandomUtil.generateRandomStringWithPrefix(prefix, length);
            }).toThrow('Length must be greater than prefix length');
        });
    });
});