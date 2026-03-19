# brew 安装应用免等待 Updating Homebrew⋯⋯

## 使用 control + c 取消本次操作

```log
Updating Homebrew...
```

使用 brew 安装应用，当命令行出现以上状态时，按下组合键 `control + c`, 当命令行变成以下状态的时候，说明已经成功取消了，切记只能执行一次 `control + c`

```log
Updating Homebrew...
^C
```

## 禁用掉每次安装前的更新

一次性方案，命令行执行

```bash
export HOMEBREW_NO_AUTO_UPDATE=true
```

长久方案，把以下命令添加到 zshrc 配置文件中~

```bash
# ~/.zshrc
export HOMEBREW_NO_AUTO_UPDATE=true
```

需要更新时，使用

```bash
brew update && brew upgrade && brew cleanup ; say mission complete
brew update && brew upgrade brew-cask && brew cleanup ; say mission complete
```
