# 同时配置 gitlab 和 github

## 背景

```shell
git clone git@github.com:luoquanquan/handle-note.git
正克隆到 'handle-note'...
ssh: Could not resolve hostname github.com2: nodename nor servname provided, or not known
fatal: 无法读取远程仓库。

请确认您有正确的访问权限并且仓库存在。
```

开发电脑只配置了公司内部 gitlab 的 ssh key, 无法 clone github 优质仓库. 面对这种情况有三种方案

## 直接下载

- 点击 Clone or download 的绿色按钮
- 在弹出的下拉框中点击右下角 `Download Zip` 下载代码库的安装包

使用此方案下载的代码包解压后不包含 `.git` 项目配置目录无法跟踪项目并提交

## 使用 https 方案

- 点击 Clone or download 的绿色按钮
- 在弹出的下拉框中点击左上角 Use HTTPS 输入框中的链接变成了以 https 开头
- 执行以下命令
  ```shell
  git clone https://github.com/luoquanquan/handle-note.git
  ```
- 展示的结果如下
  ```shell
  正克隆到 'handle-note'...
  remote: Enumerating objects: 220, done.
  remote: Counting objects: 100% (220/220), done.
  remote: Compressing objects: 100% (154/154), done.
  remote: Total 220 (delta 40), reused 219 (delta 39), pack-reused 0
  接收对象中: 100% (220/220), 593.36 KiB | 70.00 KiB/s, 完成.
  处理 delta 中: 100% (40/40), 完成.
  ```
- 完成

使用以上方法克隆的项目可以正常跟踪和提交

## 创建配置文件支持 ssh 方式

- 打开命令行，执行 `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
- `Enter file in which to save the key` 在这一步的时候切记创建一个新的 key 名字，否则会覆盖掉当前正在用的密钥文件；示例：`/Users/quanquanluo/.ssh/id_github_rsa`
- 一路回车⋯⋯
- 完成后进入用户的密钥目录 Mac: `~/.ssh` Windows: `C:/Users/quanquan/.ssh` 此时该目录下文件列表
  ```shell
  id_github_rsa.pub id_rsa.pub id_github_rsa
  id_rsa            known_hosts
  ```
  包含了公司 git 的配置文件和 github 项目的配置文件
- 把生成文件 id_github_rsa.pub 中的内容粘贴到这里 [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new) 在登录的 github 的前提下
- 最后，在当前目录创建 config 文件，并粘贴一下内容
  ```shell
  Host 我的公司
      HostName baidu.gitlab.com
      IdentityFile "~/.ssh/id_rsa"
  Host GitHub
      HostName github.com
      IdentityFile "~/.ssh/id_github_rsa"
  ```
- 验证：
  ```shell
  git clone git@github.com:luoquanquan/handle-note.git
  正克隆到 'handle-note'...
  remote: Enumerating objects: 220, done.
  remote: Counting objects: 100% (220/220), done.
  remote: Compressing objects: 100% (154/154), done.
  remote: Total 220 (delta 40), reused 219 (delta 39), pack-reused 0
  接收对象中: 100% (220/220), 593.36 KiB | 84.00 KiB/s, 完成.
  处理 delta 中: 100% (40/40), 完成.
  ```

## https 和 ssh 的区别

使用 ssh 方式 push 代码时，你不需要验证用户名和密码。而对于使用 https 的用户每次 push 代码的时候需要验证用户名和密码(首次推送可以选择缓存)
