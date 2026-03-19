# 高效下载 GitHub 仓库

## 问题

在特殊的网络环境下，下载大的 GitHub 仓库时经常会遇到下载一半就失败的情况。报错信息如下：

```bash
Cloning into 'core'...
remote: Enumerating objects: 39576, done.
remote: Counting objects: 100% (4439/4439), done.
remote: Compressing objects: 100% (2279/2279), done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
error: 7305 bytes of body are still expected
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

## 原因

出现这个问题的原因有二：

- 网络环境遥遥领先
- 项目实在太大

## 解决方法

第一个网络原因无法解决。项目太大的问题我们可以通过 git clone xxx --depth 1 来解决。但是这样又会带来一个新的问题：我们只下载到了最新的 main 分支，如果想要切换到远程其他分支无法实现。

## 浅克隆请求远程其他分支

- 执行 `git remote set-branches origin '*'` 修改 config 文件

  这是因为通过 --depth 克隆的项目中 `.git/config` 下的 `remote "origin"` 字段为：

  ```bash
  [remote "origin"]
      url = https://github.com/luoquanquan/dapp-demo-private
      fetch = +refs/heads/main:refs/remotes/origin/main
  ```

  通过上述命令可以将固定的 main 分支号改成 \*，修改后的结果：

  ```bash
  [remote "origin"]
      url = https://github.com/luoquanquan/dapp-demo-private
      fetch = +refs/heads/*:refs/remotes/origin/*
  ```

  **当然，也可以手动修改 config 文件**

- 执行 `git fetch -v --depth=1` 请求远程分支信息
- 通过 `git checkout -t origin/branchName` 在本地创建远程分支的同名分支

## 参考资料

- [git shallow clone (clone --depth) misses remote branches](https://stackoverflow.com/questions/23708231/git-shallow-clone-clone-depth-misses-remote-branches)
- [重命名分支](https://docs.github.com/zh/repositories/configuring-branches-and-merges-in-your-repository/managing-branches-in-your-repository/renaming-a-branch)
