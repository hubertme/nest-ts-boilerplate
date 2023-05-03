import * as path from 'path';
import DBManager from './src/db_manager';
import RedisUtil from './utils/redis_util';

export default class AppConfig {
    static readonly ENVS: 'dev' | 'staging' | 'prod' = 'dev';
    static get isProduction(): boolean {
        return this.ENVS === 'prod';
    }

    public static async init() {
        await this.initDependencies();
    }

    static get envFilePath(): string {
        const envPath = path.resolve(__dirname, `../envs/.${this.ENVS}.env`);
        // console.log('Path:', envPath);
        return envPath;
    }

    private static async initDependencies() {
        await DBManager.initialize();
        RedisUtil.init();
    }
}