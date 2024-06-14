# CSRF 攻击示例项目演示说明

- 执行 `npm start` 启动项目
- 指定 hosts
```hosts
127.0.0.1 quanquan.com
127.0.0.1 hacker.com
```
- 开启两个浏览器, 一个模拟正常用户, 一个模拟黑客

[这里](https://stackoverflow.com/questions/58909271/a-cookie-associated-with-a-cross-site-resource-at-http-local-ip-was-set-witho)说的 chrome 80 会修改 cookie 策略, 限制跨站请求伪造, 但是我用 Chrome 测试发现目前还没有限制
