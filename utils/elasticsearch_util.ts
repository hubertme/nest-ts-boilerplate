import { Client } from "@elastic/elasticsearch";
import RandomUtil from "./random_util";

export default class ElasticSearchUtil {
    private static _client: Client;

    static init() {
        if (!this._client) {
            this._client = new Client({
                node: process.env.ELASTICSEARCH_NODE,
                // auth: {
                //     apiKey: process.env.ELASTICSEARCH_API_KEY,
                // },
                // auth: {
                //     username: process.env.ELASTICSEARCH_USERNAME,
                //     password: process.env.ELASTICSEARCH_PASSWORD,
                // },
            });
        }
    }

    static async createIndex(indexName: string) {
        await this._client.indices.create({
            index: indexName,
        });
    }

    static async listIndices(): Promise<string[]> {
        const body = await this._client.cat.indices({ 
            format: "json" 
        });
        return body.map((index) => index.index);
    }

    static async deleteIndex(indexName: string) {
        try {
            await this._client.indices.delete({
                index: indexName,
            });
        } catch (e) {

        }
    }

    static async sendMessage(indexName: string, message: {[key: string]: string}, id?: string) {
        await this._client.index({
            index: indexName,
            refresh: true,
            id: id ?? RandomUtil.uuid(),
            document: message,
        });
    }

    static async search(indexName: string, query: {[key: string]: string}): Promise<any[]> {
        const resp = await this._client.search({
            index: indexName,
            query: {
                match: query,
            }
        });
        
        const result = resp.hits.hits.map((e) => {
            // Change array to map with key _index and value ._source
            return e._source;
        });
        return result;
    }

    static async getDocument(indexName: string, id: string): Promise<any> {
        try {
            const document = await this._client.get({
                index: indexName,
                id,
            });
            return document._source;
        } catch (e) {
            // console.log('Error in getDocument: ', e);
            return null;
        }
    }
}