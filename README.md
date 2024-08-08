# Cloudflare Pages Redirect Service

This project is a simple redirect service implemented using Cloudflare Pages and Cloudflare KV.

[中文版](README.zh.md)

## Deployment Steps

1. Fork this repository to your GitHub account.

2. In your Cloudflare Dashboard:
   a. Create a new KV namespace.
   b. Add your redirect rules to this KV namespace, for example:

   - Key: `redirect:twitter`, Value: `https://twitter.com/your-handle`
   - Key: `redirect:github`, Value: `https://github.com/your-username`

3. Create a new Pages project in your Cloudflare Dashboard:
   a. Select your forked repository.
   b. In the build settings:

   - Set the build command to: (leave this empty)
   - Set the build output directory to: `/`

4. In the Pages project settings, go to "Functions" > "KV namespace bindings":
   a. Add a new binding:

   - Variable name: `REDIRECT_KV`
   - KV namespace: Select the KV namespace you created in step 2

5. Deploy the project.

Now, when you visit `your-project.pages.dev/twitter`, it will redirect to the Twitter URL you set in the KV.

## Customization

You can add or modify redirect rules by editing the key-value pairs in the KV namespace through the Cloudflare Dashboard, without changing any code.

## How It Works

- The `_middleware.js` file in the `functions` directory handles incoming requests.
- It checks the KV namespace for a matching redirect rule based on the requested path.
- If a matching rule is found, it redirects the user to the specified URL.
- If no matching rule is found, it serves the default `index.html` page.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Note

Ensure you don't include any sensitive information or private keys in your public repository.
