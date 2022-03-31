!function(e,r){for(var t in r)e[t]=r[t];r.__esModule&&Object.defineProperty(e,"__esModule",{value:!0})}(exports,(()=>{"use strict";var e={900:(e,r,t)=>{t.r(r),t.d(r,{handler:()=>b});const a=require("express");var n=t.n(a);const o=require("serverless-http");var s=t.n(o);const i=require("json-serverless-lib"),p=require("fs");var u=t.n(p);const c=require("aws-sdk");c.config.update({region:process.env.region});const l=n()(),g=s()(l),d=new i.AppConfig,w=JSON.parse(u().readFileSync("./config/appconfig.json","UTF-8")),y=i.AppConfig.merge(d,w),S=new i.CloudEnvironment,f=new i.Swagger(l,new i.SwaggerConfig(y.readOnly,y.enableApiKeyAuth),S.basePath,y.routes.apiRoutePath,"./package.json",y.routes.swaggerSpecRoutePath);let v;const h=(async()=>{const e=y.enableApiKeyAuth?new i.ApiKeyStrategy(l,await(async e=>{try{const r=new c.SSM;return(await r.getParameter({Name:e,WithDecryption:!0}).promise()).$response.data.Parameter.Value}catch(e){throw new Error("Cannot request SSM Parameter Value for "+process.env.authPath+" - please ensure that key is available in AWS SSM - further details: "+e.message)}})(process.env.authPath)):new i.PublicStrategy;v=process.env.IS_OFFLINE?new i.CoreApp(y,l,new i.FileStorageAdapter("db.json"),f,S,e):new i.CoreApp(y,l,new i.S3StorageAdapter(S.s3Bucket,S.s3File),f,S,e),await v.setup()})(),b=async(e,r)=>(await h,await g(e,r))}},r={};function t(a){if(r[a])return r[a].exports;var n=r[a]={exports:{}};return e[a](n,n.exports,t),n.exports}return t.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return t.d(r,{a:r}),r},t.d=(e,r)=>{for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})},t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t(900)})());