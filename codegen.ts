import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8000/graphql',
  documents: ['src/**/*.graphql'],
  generates: {
    './src/graphql/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typed-document-node'
      ],
      config: {
        useTypeImports: true,
        exportFragmentSpreadSubTypes: true,
        operationResultSuffix: 'Result',
      },
    },
  },
};
export default config;