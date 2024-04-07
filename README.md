# vue-quick-start-template

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### Solving Guide

```
Could not open SomeComponent.vue in the editor.
The editor process exited with an error: spawn code ENOENT.
```

[Launching from the command line](https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line)

[Echarts import code generator](https://vue-echarts.dev/?renderer=svg#codegen)

### TDesign

`MessagePlugin`, `NotifyPlugin`, `LoadingPlugin`, `DialogPlugin`

```bash
hint: The '.husky/commit-msg' hook was ignored because it's not set as executable.
hint: You can disable this warning with git config advice.ignoredHook false.
```

解决方案：

可能是 Mac OS 下某个 Git 钩子脚本没有设置为可执行文件
运行以下命令，将.husky/commit-msg 脚本设置为可执行文件：

```bash
chmod +x .husky/commit-msg
```

运行以下命令来验证脚本是否已设置为可执行文件：

```bash
ls -l .husky/commit-msg
```

如果你仍然收到相同的警告信息，你可以根据提示禁用该警告，运行以下命令：

```bash
git config advice.ignoredHook false
```
