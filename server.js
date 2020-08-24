const Koa = require('koa');
const next = require('next');
const Router = require('@koa/router');
require('isomorphic-fetch');
const json = require('koa-json');
const dotenv = require('dotenv');
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;
const { default: graphQLProxy } = require("@shopify/koa-shopify-graphql-proxy");
const { ApiVersion } = require("@shopify/koa-shopify-graphql-proxy");
const koaBody = require('koa-body');

let mockDB = [];

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ secure:true, sameSite: 'none' }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];  
  server.use(json());

  const router = new Router();

  router.get('/a', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/a', ctx.query);
    ctx.respond = false;
  });

  router.get('/b', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/b', ctx.query);
    ctx.respond = false;
  });
  // API Routes
  router.post('/api/banners', koaBody(), async (ctx) => {
    // await app.render(ctx.req, ctx.res, '/b', ctx.query);
    // ctx.respond = false;
    mockDB.push(ctx.request.body);
    console.log(ctx.request.body);
    ctx.body = {
      status: 200,
      message: 'Submitted banner data',
      data: mockDB
    }
  });

  router.get('/api/banners', koaBody(), async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = {
      status: 200,
      message: 'All The Banners',
      data: mockDB
    }
  });

//   router.all('*', async (ctx) => {
//     await handle(ctx.req, ctx.res);
//     ctx.respond = false;
//   });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());

  server.use(
      createShopifyAuth({
          apiKey: SHOPIFY_API_KEY,
          secret: SHOPIFY_API_SECRET_KEY,
          scopes: ['read_products', 'write_products', 'read_script_tags', 'write_script_tags', 'read_analytics'],
          afterAuth(ctx) {
              const { shop, accessToken } = ctx.session;
              ctx.cookies.set('shopOrigin', shop, {
                  httpOnly: false,
                  secure: true,
                  sameSite: 'none'
                
              })
              ctx.redirect(`https://${shop}/admin/apps/geeksample`);
          }
      })
  );

  server.use(graphQLProxy({ version: ApiVersion.October19}));
  server.use(verifyRequest());

  server.use(async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return;
  })
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});