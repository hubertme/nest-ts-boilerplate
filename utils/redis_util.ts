import { Redis } from "ioredis";

export default class RedisUtil {
    private static _redis: Redis;

    static init() {
        if (!this._redis) {
            this._redis = new Redis({
                host: process.env.REDIS_HOST,
                port: parseInt(process.env.REDIS_PORT),
                // password: process.env.REDIS_PASSWORD,
                // db: Number(process.env.REDIS_DB),
            });
        }
    }

    static async setValue(key: string, value: string): Promise<void> {
        await this._redis.set(key, value);
    }

    static async getValue(key: string): Promise<string | null> {
        const value = await this._redis.get(key);
        return value;
    }

    static async deleteKey(key: string): Promise<void> {
        await this._redis.del(key);
    }

    static async incrementValue(key: string): Promise<number> {
        const value = await this._redis.incr(key);
        return value;
    }

    static async decrementValue(key: string): Promise<number> {
        const value = await this._redis.decr(key);
        return value;
    }
}