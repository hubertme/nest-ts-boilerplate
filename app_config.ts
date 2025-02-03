import * as path from 'path';
import DBManager from './src/db_manager';
import RedisUtil from './utils/redis_util';
import ElasticSearchUtil from './utils/elasticsearch_util';
import GrafanaUtil from './utils/grafana_util';

export default class AppConfig {
    static readonly ENVS: 'dev' | 'staging' | 'prod' = process.env.NODE_ENV as 'dev' | 'staging' | 'prod' || 'dev';
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
        // RedisUtil.init();
        // ElasticSearchUtil.init();
        // GrafanaUtil.init();

        await DBManager.initialize();
    }
}