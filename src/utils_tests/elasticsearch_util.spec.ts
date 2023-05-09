import ElasticSearchUtil from "../../utils/elasticsearch_util";

describe("ElasticSearchUtil", () => {
    const indexName = "test_index_2";
    const message: {[key: string]: string} = { 
        foo: "bar"
    };

    beforeAll(() => {
        process.env.ELASTICSEARCH_NODE = 'http://localhost:9200'
        ElasticSearchUtil.init();
    });
    afterEach(async () => {
        await ElasticSearchUtil.deleteIndex(indexName);
    });

    describe("createIndex", () => {
        it("should create an index", async () => {
            await ElasticSearchUtil.createIndex(indexName);
            
            const indices = await ElasticSearchUtil.listIndices();
            expect(indices).toContain(indexName);
        });
    });

    describe("listIndices", () => {
        it("should list all indices", async () => {
            await ElasticSearchUtil.createIndex(indexName);
            
            const indices = await ElasticSearchUtil.listIndices();
            expect(indices).toContain(indexName);
        });
    });

    describe("deleteIndex", () => {
        it("should delete an index", async () => {
            await ElasticSearchUtil.createIndex(indexName); 
            await ElasticSearchUtil.deleteIndex(indexName);
            
            const indices = await ElasticSearchUtil.listIndices();
            expect(indices).not.toContain(indexName);
        });
    });

    describe("sendMessage", () => {
        it("should send a message to an index", async () => {
            await ElasticSearchUtil.createIndex(indexName);
            await ElasticSearchUtil.sendMessage(indexName, message);
            
            const searchResults = await ElasticSearchUtil.search(indexName, message);
            expect(searchResults.length).toBe(1);
            expect(searchResults[0]).toEqual(message);
        });
    });

    describe("search", () => {
        it("should search for messages in an index", async () => {
            await ElasticSearchUtil.createIndex(indexName);
            await ElasticSearchUtil.sendMessage(indexName, message);
            
            const searchResults = await ElasticSearchUtil.search(indexName, message);
            expect(searchResults.length).toBe(1);
            expect(searchResults[0]).toEqual(message);
        });

        // it("should handle search errors", async () => {
        //     // Mock a search error by passing an invalid query
        //     const invalidQuery = "{invalid:query}";
        //     const searchResults = await ElasticSearchUtil.search(indexName, invalidQuery);
        //     expect(searchResults).toEqual([]);
        // });
    });

    describe("getDocument", () => {
        it("should get a document from an index", async () => {
            const id = 'ThisIsANewId';
            await ElasticSearchUtil.createIndex(indexName);
            await ElasticSearchUtil.sendMessage(indexName, message, id);
            
            const searchResult = await ElasticSearchUtil.getDocument(indexName, id);
            expect(searchResult).toEqual(message);

            const notFoundResult = await ElasticSearchUtil.getDocument(indexName, 'wrongidprovided');
            expect(notFoundResult).toBeNull();
        });
    })
});
