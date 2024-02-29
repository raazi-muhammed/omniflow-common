export type IResponse = {
    message?: string;
    statusCode: number;
    headers?: Object;
    data?: Object | string;
};

class ReposeCreator {
    data?: Object | string;
    statusCode: number;
    headers?: Object;
    message?: string;

    constructor() {
        this.statusCode = 200;
    }
    setData(data: Object | string) {
        return this;
    }
    setHeaders(headers: Object) {
        return this;
    }
    setMessage(message: string) {
        return this;
    }
    setStatusCode(code: number) {
        return this;
    }
    getResponse() {
        return this as IResponse;
    }
}

export type IResponseCreator = typeof ReposeCreator;
