# 初始化项目
```
mkdir my-component \
&& cd my-component \
&& npm init -y
```
安装依赖
```
npm i --save-dev \
webpack \
webpack-cli \
webpack-dev-server \
clean-webpack-plugin \
html-webpack-plugin \
style-loader \
css-loader \
babel-loader \
@babel/core \
@babel/preset-env @babel/preset-react \
react \
react-dom
```
配置webpack
```javascript
const path = require('path');
const merge = require('webpack-merge');

const prodConfig = {
  mode: 'production', // 生产模式
  entry: path.join(__dirname, '../main.js'),
  output: {
    path: path.join(__dirname, '../lib/'),
    filename: 'rbac.js',
    library: 'CUI',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
};

module.exports = prodConfig; // 将baseConfig和prodConfig合并为一个配置

```

修改package.json文件
```json
{
  "name": "kreakin-rbac",
  "version": "0.0.7",
  "description": "kreakin compony privary rbac modules",
  "main": "lib/rbac.js", //修改入口文件
  "author": "webb <webb.li@kreakin.com> (http://www.kreakin.com)",
  "scripts": { //去除无用script
    "analyze": "cross-env ANALYZE=1 umi build",
    "build": "umi build",
    "build:npm": "webpack --config config/webpack.prod.js",
    "deploy": "npm run site && npm run gh-pages",
    "dev": "npm run start:dev",
    "start": "cross-env UMI_ENV=dev umi dev",
    "start:dev": "cross-env REACT_APP_ENV=dev MOCK=none UMI_ENV=dev umi dev",
    "start:test": "cross-env REACT_APP_ENV=test MOCK=none UMI_ENV=dev umi dev"
  },
  "lint-staged": {
    "**/*.less": "stylelint --syntax less",
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": [
      "prettier --write"
    ]
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 10"
  ],
  "dependencies": {
    "@ant-design/icons": "^4.0.0",
    "@ant-design/pro-descriptions": "^1.2.0",
    "@ant-design/pro-form": "^1.3.0",
    "@ant-design/pro-layout": "^6.9.0",
    "@ant-design/pro-table": "^2.17.0",
    "@umijs/route-utils": "^1.0.33",
    "antd": "^4.12.0",
    "axios": "^0.21.1",
    "classnames": "^2.2.6",
    "less": "^4.1.2",
    "lodash": "^4.17.11",
    "moment": "^2.25.3",
    "omit.js": "^2.0.2",
    "react": "^16.14.0",
    "react-dev-inspector": "^1.1.1",
    "react-dom": "^17.0.0",
    "react-helmet-async": "^1.0.4",
    "umi": "^3.4.1",
    "umi-request": "^1.0.8"
  },
  "devDependencies": {
    "@ant-design/pro-cli": "^1.0.28",
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.8",
    "@babel/preset-env": "^7.15.8",
    "@babel/preset-react": "^7.14.5",
    "@types/classnames": "^2.2.7",
    "@types/express": "^4.17.0",
    "@types/history": "^4.7.2",
    "@types/jest": "^26.0.0",
    "@types/lodash": "^4.14.144",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@types/react-helmet": "^6.1.0",
    "@umijs/fabric": "^2.5.1",
    "@umijs/plugin-blocks": "^2.0.5",
    "@umijs/plugin-esbuild": "^1.0.1",
    "@umijs/preset-ant-design-pro": "^1.2.0",
    "@umijs/preset-react": "^1.4.8",
    "@umijs/yorkie": "^2.0.3",
    "babel-loader": "^8.2.3",
    "carlo": "^0.9.46",
    "chalk": "^4.0.0",
    "clean-webpack-plugin": "^4.0.0",
    "cross-env": "^7.0.0",
    "cross-port-killer": "^1.1.1",
    "css-loader": "^6.4.0",
    "detect-installer": "^1.0.1",
    "enzyme": "^3.11.0",
    "eslint": "^7.1.0",
    "express": "^4.17.1",
    "gh-pages": "^3.0.0",
    "html-webpack-plugin": "^5.4.0",
    "jsdom-global": "^3.0.2",
    "less-loader": "^10.2.0",
    "lint-staged": "^10.0.0",
    "mockjs": "^1.0.1-beta3",
    "postcss-loader": "^6.2.0",
    "prettier": "^2.0.1",
    "puppeteer-core": "^8.0.0",
    "react": "^16.14.0",
    "react-dom": "^17.0.2",
    "style-loader": "^3.3.0",
    "stylelint": "^13.0.0",
    "ts-loader": "^9.2.6",
    "typescript": "^4.0.3",
    "webpack": "^5.59.1",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.3.1",
    "webpack-merge": "^5.8.0"
  },
  "peerDependencies": { //防止循环依赖，产生两个react实例
    "react": "^16.8.4",
    "react-dom": "^16.8.4"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "checkFiles": [
    "src/**/*.js*",
    "src/**/*.ts*",
    "src/**/*.less",
    "config/**/*.js*",
    "scripts/**/*.js"
  ]
}

```

参考资料：
- [搭建自己的npm包](https://juejin.cn/post/6844903928316821517)
- [搭建自己的npm包](https://blog.sjfkai.com/2019/03/13/%E6%9E%84%E5%BB%BA-React-%E7%BB%84%E4%BB%B6%E5%B9%B6%E5%8F%91%E5%B8%83%E5%88%B0-NPM/)
- [搭建自己的npm包](https://juejin.cn/post/6844903928316821517)