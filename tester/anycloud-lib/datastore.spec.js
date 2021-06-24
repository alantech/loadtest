"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datastore_1 = require("./datastore");
const key = 'foo';
const strVal = 'hello world';
const numberVal = 123;
const objVal = { bar: 'baz' };
describe('Datastore class local test', () => {
    beforeEach(() => {
        datastore_1.datastore.del(key);
    });
    describe('set', () => {
        test('should set string value', async () => {
            expect(await datastore_1.datastore.set(key, strVal)).toEqual(true);
        });
        test('should set number value', async () => {
            expect(await datastore_1.datastore.set(key, numberVal)).toEqual(true);
        });
        test('should set object value', async () => {
            expect(await datastore_1.datastore.set(key, objVal)).toEqual(true);
        });
    });
    describe('get', () => {
        test('should return undefined if key not found', async () => {
            expect(await datastore_1.datastore.get(key)).toEqual(undefined);
        });
        test('should get string value setted', async () => {
            await datastore_1.datastore.set(key, strVal);
            expect(await datastore_1.datastore.get(key)).toEqual(strVal);
        });
        test('should get number value setted', async () => {
            await datastore_1.datastore.set(key, numberVal);
            expect(await datastore_1.datastore.get(key)).toEqual(numberVal);
        });
        test('should get object value setted', async () => {
            await datastore_1.datastore.set(key, objVal);
            expect(await datastore_1.datastore.get(key)).toEqual(objVal);
        });
    });
    describe('has', () => {
        test('should return false if key not found', async () => {
            expect(await datastore_1.datastore.has(key)).toEqual(false);
        });
        test('should return true if value exist after setted', async () => {
            await datastore_1.datastore.set(key, strVal);
            expect(await datastore_1.datastore.has(key)).toEqual(true);
        });
    });
    describe('del', () => {
        test('should return false if key not found', async () => {
            expect(await datastore_1.datastore.del(key)).toEqual(false);
        });
        test('should return true if value found and deleted', async () => {
            await datastore_1.datastore.set(key, strVal);
            expect(await datastore_1.datastore.del(key)).toEqual(true);
        });
        test('should delete value', async () => {
            await datastore_1.datastore.set(key, strVal);
            await datastore_1.datastore.del(key);
            expect(await datastore_1.datastore.get(key)).toEqual(undefined);
            expect(await datastore_1.datastore.has(key)).toEqual(false);
        });
    });
});
describe('Datastore proxy object local test', () => {
    beforeEach(() => {
        delete datastore_1.ds[key];
    });
    describe('set', () => {
        test('should set string value', () => {
            expect(datastore_1.ds[key] = strVal).toEqual(strVal);
        });
        test('should set number value', () => {
            expect(datastore_1.ds[key] = numberVal).toEqual(numberVal);
        });
        test('should set object value', () => {
            expect(datastore_1.ds[key] = objVal).toEqual(objVal);
        });
    });
    describe('get', () => {
        test('should return undefined if key not found', async () => {
            expect(await datastore_1.ds[key]).toEqual(undefined);
        });
        test('should get string value setted', async () => {
            datastore_1.ds[key] = strVal;
            expect(await datastore_1.ds[key]).toEqual(strVal);
        });
        test('should get number value setted', async () => {
            datastore_1.ds[key] = numberVal;
            expect(await datastore_1.ds[key]).toEqual(numberVal);
        });
        test('should get object value setted', async () => {
            datastore_1.ds[key] = objVal;
            expect(await datastore_1.ds[key]).toEqual(objVal);
        });
    });
    describe('del', () => {
        test('should return true if key not found', () => {
            expect(delete datastore_1.ds[key]).toEqual(true);
        });
        test('should return true if value found and deleted', () => {
            datastore_1.ds[key] = objVal;
            expect(delete datastore_1.ds[key]).toEqual(true);
        });
        test('should delete value', async () => {
            datastore_1.ds[key] = objVal;
            delete datastore_1.ds[key];
            expect(await datastore_1.ds[key]).toEqual(undefined);
        });
    });
});
//# sourceMappingURL=datastore.spec.js.map