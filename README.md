# extension

movie-web extension, allows providers to work without proxy

## Components

1. Messaging
  - `makeRequest` message. Make requests that ignore CORS and can set forbidden headers. Replies with request results.
  - `prepareStream` message. For a list of domains, set required or preferred headers.
  - `hello` message. Gives details on the extension, like the version. If not allowed, simply respond with an error describing it.

2. Popout
  - The popout should have a simple interface for trusting or untrusting the current site. Only trusted sites should be able to communicate with the extension.

3. Storage
  - The extension will need to store active rules for setting headers. And which sites (origins) are trusted.

## How will the client work
1. When creating providers, first send a hello message to identify if there is an extension installed at all and if its correct version.
2. If no extension (or not suitable) fallback on standard providers.
3. Else, make new provider controls, target set to BROWSER_EXTENSION, with custom fetcher that uses the extension to send requests instead.
4. If any message to the extension fail. Fallback to standard providers again.
5. When a stream will be played, communicate to extension through a `prepareStream`

# Plasmo

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
