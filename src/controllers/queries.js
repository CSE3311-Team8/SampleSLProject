 var word;
 var nextToken;
 
 //query and fields requested
 export const listMATCProjects = /* GraphQL */ `
 query listMATCProjects{
   listMATCProjects(limit: 500, filter: {summary: {contains: "${word}"}}) {
     items {
       id
       author_name
       author_uri
       average_rating
       content
       download_link
       downloads
       license
       mathworks_url
       model_files
       no_of_comments
       no_of_ratings
       num_model_files
       published
       summary
       title
       updated
     }
     nextToken
   }
 }
`;
export const listMATCProjectsToken = /* GraphQL */ `
query listMATCProjects{
 listMATCProjects(limit: 500, filter: {summary: {contains: "${word}"}}, nextToken: "${nextToken}") {
   items {
     id
     author_name
     author_uri
     average_rating
     content
     download_link
     downloads
     license
     mathworks_url
     model_files
     no_of_comments
     no_of_ratings
     num_model_files
     published
     summary
     title
     updated
   }
   nextToken
 }
}
`;

 export const gitHubProjects = `
   query ListGitHubProjecst{ 
   listGitHubProjects (limit: 100, filter: {Description: {contains: "${word}"}}) {
     items {
       Description
       created_at
       forks_count
       homepage_url
       id
       language
       license
       model_files
       num_model_file
       open_issues_count
       owner_name
       project_url
       repo_name
       stargazers_count
       updated_at
       watchers_count
     }
     nextToken
   }
 }
 `;
 export const gitHubProjectsToken = `
   query ListGitHubProjecst{ 
   listGitHubProjects (limit: 100, filter: {Description: {contains: "${word}"}}, nextToken: "${nextToken}") {
     items {
       Description
       created_at
       forks_count
       homepage_url
       id
       language
       license
       model_files
       num_model_file
       open_issues_count
       owner_name
       project_url
       repo_name
       stargazers_count
       updated_at
       watchers_count
     }
     nextToken
   }
 }
 `;