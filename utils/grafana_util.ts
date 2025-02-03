import { collectDefaultMetrics } from 'prom-client';

export default class GrafanaUtil {
    static init() {
        collectDefaultMetrics();
    }
}