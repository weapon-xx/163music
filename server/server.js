const Koa = require('koa');
const app = new Koa();
const path = require('path');
const koaStatic = require('koa-static')
const { createBundleRenderer } = require('vue-server-renderer');
const fs = require('fs');

const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
app.use(koaStatic(resolve('../dist')))

// 第 2 步：获得一个createBundleRenderer
const template = fs.readFileSync(resolve('../public/index.template.html'), 'utf-8');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');
const bundle = require('../dist/vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // 推荐
  template,
  clientManifest
});

function renderToString(context) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            err ? reject(err) : resolve(html);
        });
    });
}

// 第 3 步：添加一个中间件来处理所有请求
app.use(async (ctx, next) => {
    console.log(ctx);
    const context = {
        title: "ssr test",
        url: ctx.url
    };
    // 将 context 数据渲染为 HTML
    const html = await renderToString(context);
    ctx.body = html;
});

app.listen(8080, function() {
    console.log(`server started at localhost: 8080`);
});