const { GraphQLScalarType, Kind } = require("graphql");

module.exports = new GraphQLScalarType({
  name: "GraphQLDate",
  description: "Custom Date scalar type",
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return value ? new Date(value) : null;
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING ? new Date(ast.value) : null;
  },
});
