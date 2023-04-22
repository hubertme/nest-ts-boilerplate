import { v4 as uuidv4 } from 'uuid';

export default class RandomUtil {
    /**
     * Generates a random integer between `min` and `max` (inclusive).
     *
     * @param min The minimum value that the generated integer can be.
     * @param max The maximum value that the generated integer can be.
     * @returns A random integer between `min` and `max`.
     */
    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generates a random boolean value.
     *
     * @returns Either `true` or `false` with equal probability.
     */
    static randomBoolean(): boolean {
        return Math.random() < 0.5;
    }

    /**
     * Generates a random element from an array.
     *
     * @param array An array of elements to choose from.
     * @returns A random element from the array.
     * @throws An error if the array is empty.
     */
    static randomElement<T>(array: T[]): T {
        if (array.length === 0) {
            throw new Error('Cannot get a random element from an empty array.');
        }
        const index = RandomUtil.randomInt(0, array.length - 1);
        return array[index];
    }

    /**
     * Shuffles the elements of an array randomly.
     * Uses the Fisher-Yates shuffle algorithm.
     *
     * @param array The array to shuffle.
     * @returns A new array with the same elements in a random order.
     */
    static shuffle<T>(array: T[]): T[] {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Creates a random UUID.
     * 
     * @returns A random UUID
     */
    static uuid(): string {
        return uuidv4();
    }

    /**
     * Generates a random string with a given prefix.
     * 
     * @param prefix The prefix to add to the random string.
     * @param length The length of the random string.
     * @returns A random string with the given prefix.
     * @throws An error if the length is less than the length of the prefix.
     * 
     */
    static generateRandomStringWithPrefix(prefix: string, length: number): string {
        if (prefix && length <= prefix.length) {
            throw new Error("Length must be greater than prefix length");
        }

        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const prefixLength = prefix ? prefix.length : 0;
        let result = prefix || "";

        for (let i = prefixLength; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    }
}
