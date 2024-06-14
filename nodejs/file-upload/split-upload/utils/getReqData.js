/**
  * 获取请求参数 getReqData
  * @argument ctx koa 请求对象
  * @returns Array 请求参数中的 路径参数(params), 请求参数(query), 请求体(body)
  */

 module.exports = (ctx) => {
    const {
      params,
      query,
      request: {
        body,
        files
      }
    } = ctx

    return [ params, query, body, files ]
  }
