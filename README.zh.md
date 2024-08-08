# Cloudflare Pages 重定向服务

这个项目是一个使用 Cloudflare Pages 和 Cloudflare KV 实现的简单重定向服务。

[English Version](README.md)

## 部署步骤

1. 将此仓库 Fork 到您的 GitHub 账户。

2. 在您的 Cloudflare 仪表板中：
   a. 创建一个新的 KV 命名空间。
   b. 在这个 KV 命名空间中添加您的重定向规则，例如：

   - 键：`redirect:twitter`，值：`https://twitter.com/your-handle`
   - 键：`redirect:github`，值：`https://github.com/your-username`

3. 在您的 Cloudflare 仪表板中创建一个新的 Pages 项目：
   a. 选择您 Fork 的仓库。
   b. 在构建设置中：

   - 将构建命令设置为：（保留为空）
   - 将构建输出目录设置为：`/`

4. 在 Pages 项目设置中，转到"Functions" > "KV namespace bindings"：
   a. 添加一个新的绑定：

   - 变量名：`REDIRECT_KV`
   - KV 命名空间：选择您在步骤 2 中创建的 KV 命名空间

5. 部署项目。

现在，当您访问 `your-project.pages.dev/twitter` 时，它将重定向到您在 KV 中设置的 Twitter URL。

## 自定义

您可以通过 Cloudflare 仪表板编辑 KV 命名空间中的键值对来添加或修改重定向规则，无需更改任何代码。

## 工作原理

- `functions` 目录中的 `_middleware.js` 文件处理传入的请求。
- 它根据请求的路径检查 KV 命名空间中是否有匹配的重定向规则。
- 如果找到匹配的规则，它会将用户重定向到指定的 URL。
- 如果没有找到匹配的规则，它会提供默认的 `index.html` 页面。

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目是开源的，遵循 [MIT 许可证](LICENSE)。

## 注意

确保不要在您的公共仓库中包含任何敏感信息或私密密钥。
