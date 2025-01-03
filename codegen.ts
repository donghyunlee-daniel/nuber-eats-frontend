import type {CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite:true,
    schema: 'http://localhost:4000/graphql',
    documents: ['src/**/*.{tsx,ts}'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/' : {
            preset:'client',
            presetConfig:{
                fragmentMasking: false,
            }
        }
    }
}

export default config;

