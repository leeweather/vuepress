# 常用webpack命令

## vue-cli2多环境打包

Package.json

```json
"build--dev": "cross-env NODE_ENV=dev ENV_CONFIG=dev node build/build.js",
"build--staging": "cross-env NODE_ENV=staging ENV_CONFIG=staging node build/build.js",
"build--prod": "cross-env NODE_ENV=production ENV_CONFIG=prod node build/build.js"
```

**config/staging.env.js**

```javascript
'use strict'
module.exports = {
  NODE_ENV: '"staging"',
  ENV_CONFIG: '"staging"',
  API_HOST:"'http://47.102.136.114:10010/api'",
}
```

**config/index.js**

```javascript
module.exports = {
  build: {
    prodEnv: require('./prod.env'),
    stagingEnv: require('./staging.env'),
    devEnv: require('./dev.env'),
  }
}
```

**build/build.js**

此处可输出环境变量

```javascript
// const spinner = ora('building for production...')
const spinner = ora('正在打包... ' + process.env.ENV_CONFIG + '环境')
```

**build/webpack.prod.conf.js**

替换原生产环境配置信息，根据环境变量动态读取配置

此处读取配置在config/index.js中的变量配置

```javascript
// const env = require('../config/prod.env')
const env = config.build[process.env.ENV_CONFIG+'Env']
console.log(env, process.env.ENV_CONFIG, '环境变量')
```

## Vue-cli3/4多环境打包

package.json

根据--mode [**]动态匹配env文件

```json
"build:staging": "vue-cli-service build --mode staging",
```

