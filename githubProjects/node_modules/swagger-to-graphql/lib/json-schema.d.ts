import { GraphQLObjectType } from 'graphql';
export interface RootGraphQLSchema {
    query: GraphQLObjectType;
    mutation?: GraphQLObjectType;
}
interface CommonSchema {
    description?: string;
    title?: string;
}
export interface BodySchema extends CommonSchema {
    in: 'body';
    schema: JSONSchemaType;
    required?: boolean;
}
export interface ObjectSchema extends CommonSchema {
    type: 'object';
    properties: {
        [propertyName: string]: JSONSchemaType;
    };
    required?: string[];
}
export interface ArraySchema extends CommonSchema {
    type: 'array';
    items: JSONSchemaNoBody | JSONSchemaNoBody[];
    required?: boolean;
}
export declare type JSONSchemaTypes = 'string' | 'date' | 'integer' | 'number' | 'boolean' | 'file';
export interface ScalarSchema extends CommonSchema {
    type: JSONSchemaTypes;
    format?: string;
    required?: boolean;
}
export declare type JSONSchemaNoBody = ObjectSchema | ArraySchema | ScalarSchema;
export declare type JSONSchemaType = BodySchema | JSONSchemaNoBody;
export declare const isBodyType: (jsonSchema: JSONSchemaType) => jsonSchema is BodySchema;
export declare const isObjectType: (jsonSchema: JSONSchemaType) => jsonSchema is ObjectSchema;
export declare const isArrayType: (jsonSchema: JSONSchemaType) => jsonSchema is ArraySchema;
export {};
