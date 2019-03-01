/**
 *  Copyright (c) 2018, Cloudflare, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import ReactDOMServer from "react-dom/server";
import MarkdownPage from "./Components/MarkdownPage";
import { createRenderer, StyleProvider } from "@cloudflare/style-provider";
import { renderToMarkup } from "fela-dom";
// const navigator = {
//   userAgent: "Cloudflare Docs v0.0.0-beta"
// };
// self.navigator = navigator;
// global.navigator = navigator;
// import Octokit from "@octokit/rest";

const header = `<!DOCTYPE html>
<head>
<title>Cloudflare Shoutouts</title>
<link rel="icon" type="image/x-icon" href="https://www.cloudflare.com/favicon.ico"/>
<link rel="apple-touch-icon-precomposed" sizes="57x57" href="https://www.cloudflare.com/apple-touch-icon-57x57.png" />
<link rel="apple-touch-icon-precomposed" sizes="114x114" href="https://www.cloudflare.com/apple-touch-icon-114x114.png" />
<link rel="apple-touch-icon-precomposed" sizes="72x72" href="https://www.cloudflare.com/apple-touch-icon-72x72.png" />
<link rel="apple-touch-icon-precomposed" sizes="144x144" href="https://www.cloudflare.com/apple-touch-icon-144x144.png" />
<link rel="apple-touch-icon-precomposed" sizes="60x60" href="https://www.cloudflare.com/apple-touch-icon-60x60.png" />
<link rel="apple-touch-icon-precomposed" sizes="120x120" href="https://www.cloudflare.com/apple-touch-icon-120x120.png" />
<link rel="apple-touch-icon-precomposed" sizes="76x76" href="https://www.cloudflare.com/apple-touch-icon-76x76.png" />
<link rel="apple-touch-icon-precomposed" sizes="152x152" href="https://www.cloudflare.com/apple-touch-icon-152x152.png" />
<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-196x196.png" sizes="196x196" />
<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-32x32.png" sizes="32x32" />
<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-16x16.png" sizes="16x16" />
<link rel="icon" type="image/png" href="https://www.cloudflare.com/favicon-128.png" sizes="128x128" />
<meta name="application-name" content="Cloudflare"/>
<meta name="msapplication-TileColor" content="#FFFFFF" />
<meta name="msapplication-TileImage" content="https://www.cloudflare.com/mstile-144x144.png" />
<meta name="msapplication-square70x70logo" content="https://www.cloudflare.com/mstile-70x70.png" />
<meta name="msapplication-square150x150logo" content="https://www.cloudflare.com/mstile-150x150.png" />
<meta name="msapplication-wide310x150logo" content="https://www.cloudflare.com/mstile-310x150.png" />
<meta name="msapplication-square310x310logo" content="https://www.cloudflare.com/mstile-310x310.png" />
<style>
body{
  margin: 0px;
  font-family: -apple-system, "BlinkMacSystemFont", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"
}
.navigation-link:hover{ background-color: rgb(247, 247, 248);}
.navigation-link{
    display: flex;
    padding-left: 10;
    height: 100%;
    align-items: center;
    padding-right: 10;
}
</style>`;
const mid = `</head>
    <body>
    <div id="app">`;
const footer = `</div>
<style src="/worker.js"></script>
</body>
</html>`;

let routes = {
  "/": <MarkdownPage />
};

const renderer = createRenderer();

export default function getPage(u) {
  const route = routes[u.pathname];
  return <StyleProvider renderer={renderer}>{route}</StyleProvider>;
}

async function handleRequest(event) {
  const u = new URL(event.request.url);

  // let octokit = new Octokit({
  //   headers: {
  //     accept: "application/vnd.github.v3+json",
  //     "user-agent": "Cloudflare Docs v0.0.1"
  //   }
  // });

  let cache = await caches.open("docs");
  let response = await cache.match(event.request);

  if (!response) {
    // const result = await octokit.repos.getContents({
    //   owner: "sevki",
    //   repo: "docs",
    //   path: "/docs" + u.pathname,
    //   ref: "master"
    // });

    let rendered = ReactDOMServer.renderToString(
      <StyleProvider renderer={renderer}>
        <MarkdownPage input={`# hello! I am here`} />
      </StyleProvider>
    );

    response = new Response(
      header + renderToMarkup(renderer) + mid + rendered + footer,
      {
        headers: {
          "Content-Type": "text/html"
        }
      }
    );
    event.waitUntil(cache.put(event.request, response.clone()));
  }

  return response;
}

self.addEventListener("fetch", event => {
  event.respondWith(handleRequest(event));
});
