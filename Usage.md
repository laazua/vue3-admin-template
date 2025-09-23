# vue3-admin-template

- **创建项目**
```bash
npm create vue@latest
cd vue3-admin-template/
npm install
npm install vue-router@4
npm install pinia
npm install pinia-plugin-persistedstate
npm install element-plus --save
npm install @element-plus/icons-vue
npm install axios
cat README.md 
npm install mockjs vite-plugin-mock --save-dev
```

- **配置本地mock**
```js
## 参考 vite.config.js
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 配置本地mock
    viteMockServe({
      mockPath: 'src/mock', // 指向 mock 目录
      localEnabled: true,   // 开发模式启用
      prodEnabled: false,   // 生产模式禁用
      supportTs: false
    })
  ]
})
```

- **配置.env.xxx**
```json
## 替换 package.json 中
{
  "scripts": {
    "dev": "vite --mode development",
    "build:prod": "vite build --mode production"
    }
}
## .env .env.development  .env.production 中变量命名以 VITE_ 开头 
```