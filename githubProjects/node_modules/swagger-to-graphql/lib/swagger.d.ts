import { JSONSchemaType, JSONSchemaTypes } from './json-schema';
import { EndpointParam, RequestOptions } from './getRequestOptions';
export interface GraphQLParameters {
    [key: string]: any;
}
export interface Responses {
    [key: string]: {
        schema?: JSONSchemaType;
        content?: {
            'application/json': {
                schema: JSONSchemaType;
            };
        };
        type?: 'file';
    };
}
export declare const getSuccessResponse: (responses: Responses) => import("./json-schema").BodySchema | import("./json-schema").ObjectSchema | import("./json-schema").ArraySchema | import("./json-schema").ScalarSchema | undefined;
export interface BodyParam {
    name: string;
    required?: boolean;
    schema: JSONSchemaType;
    in: 'body';
}
export interface Oa2NonBodyParam {
    name: string;
    type: JSONSchemaTypes;
    in: 'header' | 'query' | 'formData' | 'path';
    required?: boolean;
}
export interface Oa3Param {
    name: string;
    in: 'header' | 'query' | 'formData' | 'path';
    required?: boolean;
    schema: JSONSchemaType;
}
export declare type NonBodyParam = Oa2NonBodyParam | Oa3Param;
export declare type Param = BodyParam | NonBodyParam;
export interface OA3BodyParam {
    content: {
        'application/json'?: {
            schema: JSONSchemaType;
        };
        'application/x-www-form-urlencoded'?: {
            schema: JSONSchemaType;
        };
    };
    description?: string;
    required: boolean;
}
export declare const isOa3Param: (param: Param) => param is Oa3Param;
export declare function addTitlesToJsonSchemas(schema: SwaggerSchema): SwaggerSchema;
export declare const getServerPath: (schema: SwaggerSchema) => string | undefined;
export declare const getParamDetails: (param: Param) => EndpointParam;
export declare const getParamDetailsFromRequestBody: (requestBody: OA3BodyParam) => EndpointParam[];
export interface Endpoint {
    parameters: EndpointParam[];
    description?: string;
    response: JSONSchemaType | undefined;
    getRequestOptions: (args: GraphQLParameters) => RequestOptions;
    mutation: boolean;
}
export interface Endpoints {
    [operationId: string]: Endpoint;
}
export interface OperationObject {
    requestBody?: OA3BodyParam;
    description?: string;
    operationId?: string;
    parameters?: Param[];
    responses: Responses;
    consumes?: string[];
}
export declare type PathObject = {
    parameters?: Param[];
} & {
    [operation: string]: OperationObject;
};
export interface Variable {
    default?: string;
    enum: string[];
}
export interface ServerObject {
    url: string;
    description?: string;
    variables: {
        [key: string]: string | Variable;
    };
}
export interface SwaggerSchema {
    host?: string;
    basePath?: string;
    schemes?: [string];
    servers?: ServerObject[];
    paths: {
        [pathUrl: string]: PathObject;
    };
    components?: {
        requestBodies?: {
            [name: string]: OA3BodyParam;
        };
        schemas?: {
            [name: string]: JSONSchemaType;
        };
    };
    definitions?: {
        [name: string]: JSONSchemaType;
    };
}
/**
 * Go through schema and grab routes
 */
export declare const getAllEndPoints: (schema: SwaggerSchema) => Endpoints;
