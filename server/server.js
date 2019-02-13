const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const path = require('path');
const koaStatic = require('koa-static');
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');
const resolve = file => path.resolve(__dirname, file);

let router;
if (process.env.NODE_ENV === 'production') {
  // create createBundleRenderer
  const template = fs.readFileSync(resolve('../public/index.template.html'), 'utf-8');
  const clientManifest = require('../dist/vue-ssr-client-manifest.json');
  const bundle = require('../dist/vue-ssr-server-bundle.json');
  const renderer = createBundleRenderer(bundle, {
    runInNewContext: false,
    template,
    clientManifest,
  });

  function renderToString(context) {
    return new Promise((res, reject) => {
      renderer.renderToString(context, (err, html) => {
        if (err) {
          reject(err);
        } else {
          res(html);
        }
      });
    });
  }

  // handle renderToString
  router = require('koa-router')();
  router.get('*', async ctx => {
    const context = {
      url: ctx.url,
    };
    // 渲染 HTML
    const html = await renderToString(context);
    ctx.body = html;
  });
} else {
  router = require('./setup-dev-server');
}

app.use(koaStatic(resolve('../dist')));
app.use(koaStatic(resolve("../public")));
app.use(bodyParser());

app.use(router.routes());

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server started at localhost: ${port}`);
});

module.exports = app;

