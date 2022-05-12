import * as KoaRouter from 'koa-router'

const router = new KoaRouter({
  prefix: '/api'
})

router.get('/test', ctx => {
  ctx.body = '123456'
})

export default router;