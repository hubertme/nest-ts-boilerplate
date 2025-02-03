import RedisUtil from "../../utils/redis_util";

describe('RedisUtil', () => {
    // Initialize the Redis connection before running the tests
    beforeAll(() => {
        // Init the Redis connection config
        process.env.REDIS_HOST = "localhost";
        process.env.REDIS_PORT = "6379";

        RedisUtil.init();
    });

    // Clear the Redis keys used in the tests after each test
    afterEach(async () => {
        await RedisUtil.deleteKey('test:key1');
        await RedisUtil.deleteKey('test:key2');
    });

    describe('setValue', () => {
        it('should set a value for a key', async () => {
            const key = 'test:key1';
            const value = 'hello';
            await RedisUtil.setValue(key, value);
            const result = await RedisUtil.getValue(key);
            expect(result).toBe(value);
        });
    });

    describe('getValue', () => {
        it('should return null for a non-existent key', async () => {
            const key = 'test:key1';
            const result = await RedisUtil.getValue(key);
            expect(result).toBeNull();
        });

        it('should return the value for an existing key', async () => {
            const key = 'test:key1';
            const value = 'hello';
            await RedisUtil.setValue(key, value);
            const result = await RedisUtil.getValue(key);
            expect(result).toBe(value);
        });
    });

    describe('deleteKey', () => {
        it('should delete a key', async () => {
            const key = 'test:key1';
            const value = 'hello';
            await RedisUtil.setValue(key, value);
            await RedisUtil.deleteKey(key);
            const result = await RedisUtil.getValue(key);
            expect(result).toBeNull();
        });
    });

    describe('incrementValue', () => {
        it('should increment the value of a key', async () => {
            const key = 'test:key1';
            await RedisUtil.setValue(key, '1');
            const result = await RedisUtil.incrementValue(key);
            expect(result).toBe(2);
        });
    });

    describe('decrementValue', () => {
        it('should decrement the value of a key', async () => {
            const key = 'test:key1';
            await RedisUtil.setValue(key, '2');
            const result = await RedisUtil.decrementValue(key);
            expect(result).toBe(1);
        });
    });
});
