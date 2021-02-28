学习笔记
#### 持续集成 - 发布前检查
最终阶段集成：前面各自开发，最终集成联调
在持续集成被提出之前，客户端主要的开发模式就是最终阶段集成

持续集成概念：
* daily build：每天晚上全局build一次，是否可以build成功
* BVT：build verification test，构建的验证测试，属于一种冒烟测试，测试case一般都是最基本最简单的case，对build成功之后的结果进行一个基本的验证

前端做持续集成，可以利用无头浏览器把整棵DOM树生成出来,然后检查DOM树里面特定的某些格式
DOM树里可以通过CSSOM拿到元素的位置，背景图以及元素的一些结构
客观上，使用无头浏览器，可以配合一些规则校验，最后完成BVT任务

#### git-hook
.git/hook/*.sample 去掉.sample后缀，变为linux可执行文件，shell脚本编写
* applypatch-msg.sample
* commit-msg.sample
* fsmonitor-watchman.sample
* post-update.sample
* pre-applypatch.sample
* pre-commit.sample：lint之类的操作会放到pre-commit里面
* pre-push.sample：最终check的操作放到pre-push里面
* pre-rebase.sample
* pre-receive.sample
* prepare-commit-msg.sample
* update.sample 
`chmod +x ./pre-commit`修改权限，使脚本可执行

#### Eslint
```javascript
$ npm init -y
$ npm install --save-dev eslint
$ npx eslint --init //会生成配置文件.eslintrc.js
$ npx eslint ./index.js
```
git stash
git 有一个自带的机制，当你修改了当前文件，add 操作了之后，你的 status 是提交状态，此时你若是再次修改，不提交，这时候会出现两种状态: 已提交和未提交的，这个是同个文件。但是 commit 的时候，检查的是后一个状态，也就是修改之后未提交的，这个是 git 检查机制的问题。可以通过git stash push -k将没有add的文件缓存起来。commit之后再将用git stash pop将没有add的代码重新提交。

```javascript
$ git stash push -k
$ git stash list
$ git stash pop
```

#### 使用无头浏览器检查DOM
window下alias命令不可用，需要配置，参考<https://www.cnblogs.com/onelikeone/p/10783497.html>
配置完成alias chrome， window下执行chrome --headless命令无效，打开无头浏览器模式参考<https://blog.csdn.net/weixin_44193978/article/details/105251984>

