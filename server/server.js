const Koa = require('koa');

const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static');
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');

const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
app.use(koaStatic(resolve('../dist')));

// 创建 createBundleRenderer
const template = fs.readFileSync(resolve('../public/index.template.html'), 'utf-8');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const bundle = require('../dist/vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // 推荐
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

// 处理所有请求
app.use(async (ctx) => {
  const context = {
    url: ctx.url,
  };
    // 渲染 HTML
  const html = await renderToString(context);
  ctx.body = html;
});

app.listen(8080, () => {
  console.log('server started at localhost: 8080');
});
