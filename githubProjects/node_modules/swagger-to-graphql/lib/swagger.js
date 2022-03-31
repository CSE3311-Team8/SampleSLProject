"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_schema_1 = require("./json-schema");
var getRequestOptions_1 = require("./getRequestOptions");
var replaceOddChars = function (str) {
    return str.replace(/[^_a-zA-Z0-9]/g, '_');
};
var getGQLTypeNameFromURL = function (method, url) {
    var fromUrl = replaceOddChars(url.replace(/[{}]+/g, ''));
    return "" + method + fromUrl;
};
exports.getSuccessResponse = function (responses) {
    var successCode = Object.keys(responses).find(function (code) {
        return code[0] === '2';
    });
    if (!successCode) {
        return undefined;
    }
    var successResponse = responses[successCode];
    if (!successResponse) {
        throw new Error("Expected responses[" + successCode + "] to be defined");
    }
    if (successResponse.schema) {
        return successResponse.schema;
    }
    if (successResponse.content) {
        return successResponse.content['application/json'].schema;
    }
    return undefined;
};
exports.isOa3Param = function (param) {
    return !!param.schema;
};
function addTitlesToJsonSchemas(schema) {
    var requestBodies = (schema.components || {}).requestBodies || {};
    Object.keys(requestBodies).forEach(function (requestBodyName) {
        var content = requestBodies[requestBodyName].content;
        Object.keys(content).forEach(function (contentKey) {
            var contentValue = content[contentKey];
            if (contentValue) {
                contentValue.schema.title =
                    contentValue.schema.title || requestBodyName;
            }
        });
    });
    var jsonSchemas = (schema.components || {}).schemas || {};
    Object.keys(jsonSchemas).forEach(function (schemaName) {
        var jsonSchema = jsonSchemas[schemaName];
        jsonSchema.title = jsonSchema.title || schemaName;
    });
    var definitions = schema.definitions || {};
    Object.keys(definitions).forEach(function (definitionName) {
        var jsonSchema = definitions[definitionName];
        jsonSchema.title = jsonSchema.title || definitionName;
    });
    return schema;
}
exports.addTitlesToJsonSchemas = addTitlesToJsonSchemas;
exports.getServerPath = function (schema) {
    var server = schema.servers && Array.isArray(schema.servers)
        ? schema.servers[0]
        : schema.host
            ? [
                (schema.schemes && schema.schemes[0]) || 'http',
                '://',
                schema.host,
                schema.basePath,
            ]
                .filter(Boolean)
                .join('')
            : undefined;
    if (!server) {
        return undefined;
    }
    if (typeof server === 'string') {
        return server;
    }
    var url = server.url, variables = server.variables;
    return variables
        ? Object.keys(server.variables).reduce(function (acc, variableName) {
            var variable = server.variables[variableName];
            var value = typeof variable === 'string'
                ? variable
                : variable.default || variable.enum[0];
            return acc.replace("{" + variableName + "}", value);
        }, url)
        : url;
};
exports.getParamDetails = function (param) {
    var name = replaceOddChars(param.name);
    var swaggerName = param.name;
    if (exports.isOa3Param(param)) {
        var _a = param, schema = _a.schema, required = _a.required, type = _a.in;
        return {
            name: name,
            swaggerName: swaggerName,
            type: type,
            required: !!required,
            jsonSchema: schema,
        };
    }
    return {
        name: name,
        swaggerName: swaggerName,
        type: param.in,
        required: !!param.required,
        jsonSchema: param,
    };
};
var contentTypeFormData = 'application/x-www-form-urlencoded';
exports.getParamDetailsFromRequestBody = function (requestBody) {
    var formData = requestBody.content[contentTypeFormData];
    function getSchemaFromRequestBody() {
        if (requestBody.content['application/json']) {
            return requestBody.content['application/json'].schema;
        }
        throw new Error("Unsupported content type(s) found: " + Object.keys(requestBody.content).join(', '));
    }
    if (formData) {
        var formdataSchema_1 = formData.schema;
        if (!json_schema_1.isObjectType(formdataSchema_1)) {
            throw new Error("RequestBody is formData, expected an object schema, got \"" + JSON.stringify(formdataSchema_1) + "\"");
        }
        return Object.entries(formdataSchema_1.properties).map(function (_a) {
            var name = _a[0], schema = _a[1];
            return ({
                name: replaceOddChars(name),
                swaggerName: name,
                type: 'formData',
                required: formdataSchema_1.required
                    ? formdataSchema_1.required.includes(name)
                    : false,
                jsonSchema: schema,
            });
        });
    }
    return [
        {
            name: 'body',
            swaggerName: 'requestBody',
            type: 'body',
            required: !!requestBody.required,
            jsonSchema: getSchemaFromRequestBody(),
        },
    ];
};
function isFormdataRequest(requestBody) {
    return !!requestBody.content[contentTypeFormData];
}
/**
 * Go through schema and grab routes
 */
exports.getAllEndPoints = function (schema) {
    var allOperations = {};
    var serverPath = exports.getServerPath(schema);
    Object.keys(schema.paths).forEach(function (path) {
        var route = schema.paths[path];
        Object.keys(route).forEach(function (method) {
            if (method === 'parameters' || method === 'servers') {
                return;
            }
            var operationObject = route[method];
            var isMutation = ['post', 'put', 'patch', 'delete'].indexOf(method) !== -1;
            var operationId = operationObject.operationId
                ? replaceOddChars(operationObject.operationId)
                : getGQLTypeNameFromURL(method, path);
            // [FIX] for when parameters is a child of route and not route[method]
            if (route.parameters) {
                if (operationObject.parameters) {
                    operationObject.parameters = route.parameters.concat(operationObject.parameters);
                }
                else {
                    operationObject.parameters = route.parameters;
                }
            }
            var bodyParams = operationObject.requestBody
                ? exports.getParamDetailsFromRequestBody(operationObject.requestBody)
                : [];
            var parameterDetails = (operationObject.parameters
                ? operationObject.parameters.map(function (param) { return exports.getParamDetails(param); })
                : []).concat(bodyParams);
            var endpoint = {
                parameters: parameterDetails,
                description: operationObject.description,
                response: exports.getSuccessResponse(operationObject.responses),
                getRequestOptions: function (parameterValues) {
                    return getRequestOptions_1.getRequestOptions({
                        parameterDetails: parameterDetails,
                        parameterValues: parameterValues,
                        baseUrl: serverPath,
                        path: path,
                        method: method,
                        formData: operationObject.consumes
                            ? !operationObject.consumes.includes('application/json')
                            : operationObject.requestBody
                                ? isFormdataRequest(operationObject.requestBody)
                                : false,
                    });
                },
                mutation: isMutation,
            };
            allOperations[operationId] = endpoint;
        });
    });
    return allOperations;
};
