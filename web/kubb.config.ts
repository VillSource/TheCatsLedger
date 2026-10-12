import { defineConfig } from 'kubb'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginAxios } from '@kubb/plugin-axios'
import { pluginReactQuery } from '@kubb/plugin-react-query'

export default defineConfig({
  root: '.',
  input: '../Villsource.TheCatsLedger/api.json',
  output: {
    path: './src/api/generated',
    clean: true,
  },
  plugins: [
    pluginOas({}),
    pluginTs({}),
    pluginAxios({}),
    pluginReactQuery({}),
  ],
})
