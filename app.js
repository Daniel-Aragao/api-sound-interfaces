
const node_env = process.env.NODE_API;

if (node_env === 'rest') {
  require('./apis/rest/app.rest');
} else if (node_env === 'graphql') {
  require('./apis/graphql/app.graphql');
} else {
  require('./apis/soap/app.soap');
}