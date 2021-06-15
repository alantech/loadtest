declare class Datastore {
    private localDS;
    private clusterSecret?;
    private isLocal;
    private headers?;
    private ctrlPortUrl;
    private ctrlPortAgent;
    constructor();
    static isInvalidKey(key: string): boolean;
    private request;
    get(dsKey: string): Promise<string | undefined | Error>;
    set(dsKey: string, dsValue: any): Promise<boolean | Error>;
    del(dsKey: string): Promise<boolean | Error>;
    has(dsKey: string): Promise<boolean | Error>;
}
export declare const ds: any;
export declare const datastore: Datastore;
export {};
