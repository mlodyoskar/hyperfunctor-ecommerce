// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
// 	overwrite: true,
// 	schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9xeq43u0onx01tbf4j774ch/master',
// 	documents: 'graphql/*.graphql',
// 	generates: {
// 		'generated/': {
// 			preset: 'client',
// 			plugins: ['typescript-react-apollo', 'typescript', 'typescript-operations'],
// 		},
// 		'./graphql.schema.json': {
// 			plugins: ['introspection'],
// 		},
// 	},
// };

// export default config;

import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/cl9xeq43u0onx01tbf4j774ch/master',
	documents: ['graphql/*.graphql'],
	ignoreNoDocuments: true, // for better experience with the watcher
	generates: {
		'./generated/graphql.tsx': {
			// preset: 'client',
			plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
		},
	},
	overwrite: true,
};

export default config;
