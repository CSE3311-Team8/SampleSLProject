import { GraphQLOutputType, GraphQLSchema } from 'graphql';
import { JSONSchema } from 'json-schema-ref-parser';
import { RequestOptions } from './getRequestOptions';
export declare function parseResponse(response: any, returnType: GraphQLOutputType): any;
export { RequestOptions, JSONSchema };
export interface CallBackendArguments<TContext> {
    context: TContext;
    requestOptions: RequestOptions;
}
export interface Options<TContext> {
    swaggerSchema: string | JSONSchema;
    callBackend: (args: CallBackendArguments<TContext>) => Promise<any>;
}
export declare const createSchema: <TContext>(options: Options<TContext>) => Promise<GraphQLSchema>;
export default createSchema;
