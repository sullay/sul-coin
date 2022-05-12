import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import api from './router/api'

const app = new Koa();

app.use(koaBody());
app.use(api.routes());

app.on('error', (err, ctx) => {
  console.log(`server error${err}`, ctx);
})

app.listen(3000);