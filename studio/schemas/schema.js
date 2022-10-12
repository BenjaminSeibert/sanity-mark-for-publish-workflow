import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import animal from './animal'
import publishMetadata from './metadata'

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
		animal,
    publishMetadata
  ]),
});

