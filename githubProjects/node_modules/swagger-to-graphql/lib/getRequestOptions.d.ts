import { JSONSchemaType } from './json-schema';
export interface EndpointParam {
    required: boolean;
    type: 'header' | 'query' | 'formData' | 'path' | 'body';
    name: string;
    swaggerName: string;
    jsonSchema: JSONSchemaType;
}
export interface RequestOptionsInput {
    method: string;
    baseUrl: string | undefined;
    path: string;
    parameterDetails: EndpointParam[];
    parameterValues: {
        [key: string]: any;
    };
    formData?: boolean;
}
export interface RequestOptions {
    baseUrl?: string;
    path: string;
    method: string;
    headers?: {
        [key: string]: string;
    };
    query?: {
        [key: string]: string | string[];
    };
    body?: any;
    bodyType: 'json' | 'formData';
}
export declare function getRequestOptions({ method, baseUrl, path, parameterDetails, parameterValues, formData, }: RequestOptionsInput): RequestOptions;
