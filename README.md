# vue-quick-start-template

这个模板应该可以帮助你快速开始使用 Vue 3 和 Vite 进行开发。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (并禁用 Vetur)。

## TS 中 `.vue` 导入的类型支持

默认情况下，TypeScript 无法处理 `.vue` 导入的类型信息，因此我们用 [`vue-tsc`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22path%22%3A%22%2FUsers%2Fchaijin%2FGit%2Fvue-quick-start-template%2FREADME.md%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A0%2C%22character%22%3A0%7D%5D 'README.md') 替换 `tsc` CLI 进行类型检查。在编辑器中，我们需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 使 TypeScript 语言服务了解 `.vue` 类型。

## 自定义配置

参见 [Vite 配置参考](https://vitejs.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 编译并为开发热重载

```sh
pnpm dev
```

### 类型检查，编译并为生产环境压缩

```sh
pnpm build
```

### 使用 [Vitest](https://vitest.dev/) 运行单元测试

```sh
pnpm test:unit
```

### 使用 [ESLint](https://eslint.org/) 进行 lint

```sh
pnpm lint
```

## 常见问题及解决方案

1. 问题1: `Could not open xxxxxxx.vue in the editor.The editor process exited with an error: spawn code ENOENT.`
   [Launching from the command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)

2. 问题2: '.husky/commit-msg' hook was ignored because it's not set as executable:

   1. 设置脚本为可执行文件：

   ```bash
   chmod +x .husky/commit-msg
   ```

   2. 验证脚本是否已设置为可执行文件：

   ```bash
   ls -l .husky/commit-msg
   ```

   3. 如果你仍然收到相同的警告信息，你可以根据提示禁用该警告，运行以下命令：

   ```bash
   git config advice.ignoredHook false
   ```

## 工具推荐

- [Echarts import code generator](https://vue-echarts.dev/?renderer=svg#codegen)
