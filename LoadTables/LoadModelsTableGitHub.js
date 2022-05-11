
/*DELETE ALL KEYS IN THESE FILES AFTER CREATING TABLES, YOUR SECRET KEYS WILL BE EXPOSED IF YOU PUSH THEM TO GitHub*/
import pkg from 'aws-sdk';
const { config, DynamoDB } = pkg;
import { readFileSync } from 'fs';

config.update({
  accessKeyId: 'KEY' ,
  secretAccessKey: 'KEY' ,
  region: "us-east-1",
  endpoint: "dynamodb.us-east-1.amazonaws.com"
});

var docClient = new DynamoDB.DocumentClient();

console.log("Importing GitHub Models into DynamoDB. Please wait.");

var GitHubModels = JSON.parse(readFileSync( '../data/GitHub_Models.json', 'utf8'));
GitHubModels.forEach(function(model) {
    var params = {
        TableName: "Table Name Here",
        Item : {
            "ID": model.ID,
            "FILE_ID": model.FILE_ID,
            "Model_Name": model.Model_Name,
            "file_path": model.file_path,
            "is_test": model.is_test,
            "is_Lib": model.is_Lib,
            "SCHK_Block_count": model.SCHK_Block_count,
            "SLDiag_Block_count": model.SLDiag_Block_count,
            "C_corpus_blk_conn": model.C_corpus_blk_conn,
            "C_corpus_hidden_conn": model.C_corpus_hidden_conn,
            "C_corpus_conn": model.C_corpus_conn,
            "C_corpus_hierar_depth": model.C_corpus_hierar_depth,
            "SubSystem_count_Top": model.SubSystem_count_Top,
            "Agg_SubSystem_count": model.Agg_SubSystem_count,
            "Hierarchy_depth": model.Hierarchy_depth,
            "LibraryLinked_Count": model.LibraryLinked_Count,
            "compiles": model.compiles,
            "CComplexity": model.CComplexity,
            "Sim_time": model.Sim_time,
            "Alge_loop_Cnt": model.Alge_loop_Cnt,
            "target_hw": model.target_hw,
            "solver_type": model.solver_type,
            "sim_mode": model.sim_mode,
            "total_ConnH_cnt": model.total_ConnH_cnt,
            "total_desc_cnt": model.total_desc_cnt,
            "ncs_cnt": model.ncs_cnt,
            "scc_cnt": model.scc_cnt,
            "unique_sfun_count": model.unique_sfun_count, 
            "sfun_nam_count": model.sfun_nam_count,
            "mdlref_nam_count": model.mdlref_nam_count,
            "unique_mdl_ref_count": model.unique_mdl_ref_count,
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add project", model.Model_Name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", model.Model_Name);
       }
    });
});