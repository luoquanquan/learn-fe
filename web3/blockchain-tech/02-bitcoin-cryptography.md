# 2. 比特币中的密码学原理

本节视频 <https://www.bilibili.com/video/BV1Vt411X7JF/?p=2>

## 比特币中用到了加密学中两个功能

- 哈希
- 签名

## 密码学中的哈希函数(cryptographic hash function) 的两个性质

### collision(哈希碰撞) resistance

假设用不等的输入 x != y 但是得到了相同的输出 H(x) === H(y) 就认为发生了哈希碰撞. 根据[鸽笼原理](https://baike.baidu.com/item/%E9%B8%BD%E7%AC%BC/8489865)哈希碰撞不可避免. 然而给出 x 很难找到可以与之碰撞的 y 除非蛮力求解 (brute-force).

*该性质的作用*: 对于一条信息 message 求 digest

eg: m 的哈希值是 H(m) = digest, 很难做到只修改 m 而使得 digest 的值不变

哈希碰撞无法人为制造, 无法验证, 是根据实践经验得来的

### hiding

哈希函数的计算过程是单向的, 不可逆的. 从 H(x) 不能推导出 x, hiding 性质的前提是输入空间足够大(避免彩虹表), 分布比较均匀. 如果输入空间不够大一般在 x 后面拼接一个随机数 nonce 再取哈希 H(x||nonce) 以此来保证输入空间

*该性质的作用*: 和 collision resistance 一起, 用来实现 digital commitment(或 digital equivalent of a sealed envelope)

sealed envelope:
- 假设某人可以在彩票发售期间预测中奖号码
- 为了避免他发布的预测内容影响到大家对彩票的购买, 他可以将预测的结果 lottery 进行一次哈希得到 H(lottery) 并发布.
- 根据 hiding 特性人们只知道了他预测结果的哈希但是不能知道实际的预测结果
- 彩票开奖时间再公布他预测的 lottery, 根据 collision resistance 特性 lottery 是不可篡改的否则无法通过校验

## puzzle friendly

除了上述密码学中常用到的两个特性外, 比特币加密算法中还有一个常见的特性 puzzle friendly. 哈希值的计算事先是不可预测的, 对于一个需要 k 个 0 开头的结果你是无法预知哪个值更容易得到这个结果的需要调整输入一个一个尝试.

![](http://handle-note-img.niubishanshan.top/20221129235112.png)

挖矿的过程实际上就是找一个随机数 nonce 和区块头里的其他信息合在一起作为输入得出的哈希值要小于等于某个指定的目标阈值的过程 H(block header) ≤ target. block header 即块头, 其内部有很多域其中一个域是我们可以设置的随机数 nonce. 不断的尝试 nonce 使得 H(block header) 获得的哈希值落到指定的范围之内即挖矿成功.

![](http://handle-note-img.niubishanshan.top/20221130000113.png)

puzzle friendly 是指挖矿过程中没有捷径, 为了使得输出的值落在指定的范围内只能一个一个输入去试. 这个过程也可以作为工作量证明(proof of work)的依据. 然而一旦你挖出了矿, 其他人想要验证你挖矿的结果就很容易. 只需要做一次哈希证明 H(block header) ≤ target 即可.

挖矿很难, 验证很容易. (difficult to solve, but easy to verify)

比特币中用的哈希函数叫作 SHA-256(secure hash algorithm) 以上三个性质它都是满足的

## 比特币开户

在本地创建一套公私钥对(public key, private key)即可完成开户.

公私钥匙对是来自于非对称的加密技术(asymmetric encryption algorithm), 其出现主要解决了对称加密过程中密钥分发困难易被窃取的问题.

两人之间信息的交流可以利用密钥(encryption key), A将信息加密后发给B,B收到后用密钥解密,因为加密和解密用的是同一个密钥, 所以叫对称加密. 前提是有渠道可以安全地把密钥分发给通讯的双方. 因此对称加密的缺点就是密钥的分发不方便,因为在网络上很容易被窃听. 非对称密钥是用一对密钥而不是一个,加密用公钥,解密用私钥,加密和解密用的都是接收方的公钥和私钥. 公钥是不用保密的,私钥要保密但是私钥只要保存在本地就行,不用传给对方. 公钥相当于银行账号,别人转账只要知道公钥就行,私钥相当于账户密码,知道私钥可以把账户上钱转走. 公钥和私钥是用来签名.

加密: encryption(接收方公钥, 原文) => 密文
解密: decryption(接收方私钥, 密文) => 原文

假如 A 想向 B 转 10 个比特币, A把交易放在区块链上, 别人怎么知道这笔交易是A发起的呢?这就需要A要用自己的私钥给交易签名, 其他人收到这笔交易后, 要用A的公钥去验证签名. 签名用私钥, 验证用公钥, 用的仍然是同一个人的. 创建账户产生相同公私钥的可能性微乎其微, 所以大量创建账户来窃取其他人账户是不可行的.

## 参考资料

- [鸽笼原理](https://baike.baidu.com/item/%E9%B8%BD%E7%AC%BC)
- [彩虹表](https://baike.baidu.com/item/%E5%BD%A9%E8%99%B9%E8%A1%A8)
- [SHA-256](https://baike.baidu.com/item/sha256)
- [对称加密](https://baike.baidu.com/item/%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86)
- [非对称加密](https://baike.baidu.com/item/%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86)

