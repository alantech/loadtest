"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datastore = exports.ds = void 0;
const node_fetch_1 = require("node-fetch");
const https = require('https');
class Datastore {
    constructor() {
        this.localDS = {};
        this.clusterSecret = process.env.CLUSTER_SECRET;
        this.isLocal = !this.clusterSecret;
        this.headers = this.clusterSecret ? { [this.clusterSecret]: 'true' } : null;
        this.ctrlPortUrl = 'https://localhost:4142/app/';
        // To avoid failure due to self signed certs
        this.ctrlPortAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }
    static isInvalidKey(key) {
        return !key || typeof (key) !== 'string';
    }
    async request(method, url, body) {
        const response = await node_fetch_1.default(url, {
            agent: this.ctrlPortAgent,
            method: method,
            headers: this.headers,
            body,
        });
        return await response.text();
    }
    async get(dsKey) {
        if (Datastore.isInvalidKey(dsKey))
            return new Error('Invalid key');
        let dsValue;
        if (this.isLocal) {
            if (dsKey in this.localDS) {
                dsValue = this.localDS[dsKey];
            }
            else {
                return undefined;
            }
        }
        else {
            try {
                dsValue = await this.request('GET', `${this.ctrlPortUrl}get/${dsKey}`);
            }
            catch (e) {
                return e;
            }
        }
        try {
            return JSON.parse(dsValue);
        }
        catch (_) {
            return dsValue === '<key not found>' ? undefined : dsValue;
        }
    }
    async set(dsKey, dsValue) {
        if (Datastore.isInvalidKey(dsKey))
            return new Error('Invalid key');
        const maybeStringifiedValue = (function () {
            try {
                return JSON.stringify(dsValue);
            }
            catch (_) {
                return dsValue;
            }
        })();
        if (this.isLocal) {
            this.localDS[dsKey] = maybeStringifiedValue;
            return true;
        }
        try {
            await this.request('POST', `${this.ctrlPortUrl}set/${dsKey}`, maybeStringifiedValue);
            return true;
        }
        catch (e) {
            return e;
        }
    }
    async del(dsKey) {
        if (Datastore.isInvalidKey(dsKey))
            return new Error('Invalid key');
        if (this.isLocal) {
            return dsKey in this.localDS ? delete this.localDS[dsKey] : false;
        }
        try {
            return await this.request('GET', `${this.ctrlPortUrl}del/${dsKey}`) === 'true';
        }
        catch (e) {
            return e;
        }
    }
    async has(dsKey) {
        if (Datastore.isInvalidKey(dsKey))
            return new Error('Invalid key');
        if (this.isLocal) {
            return dsKey in this.localDS;
        }
        try {
            return await this.request('GET', `${this.ctrlPortUrl}has/${dsKey}`) === 'true';
        }
        catch (e) {
            return e;
        }
    }
}
const dsHandler = () => {
    const ds = new Datastore();
    return {
        get: async (_, dsKey) => {
            if (Datastore.isInvalidKey(dsKey)) {
                return undefined;
            }
            const response = await ds.get(dsKey);
            return response instanceof Error ? undefined : response;
        },
        set: (_, dsKey, dsValue) => {
            if (Datastore.isInvalidKey(dsKey)) {
                return false;
            }
            ds.set(dsKey, dsValue);
            return true;
        },
        deleteProperty: (_, dsKey) => {
            if (Datastore.isInvalidKey(dsKey)) {
                return false;
            }
            ds.del(dsKey);
            return true;
        }
    };
};
exports.ds = new Proxy({}, dsHandler());
exports.datastore = new Datastore();
//# sourceMappingURL=datastore.js.map