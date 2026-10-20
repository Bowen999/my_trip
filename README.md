# 旅行指南

两份可交互的单文件旅行指南,**直接用浏览器打开 HTML 即可**(电脑、平板、手机均可;无需联网,Google 字体只是可选增强)。第二份页面的真实照片已全部内嵌在 HTML 里,所以单独转发这一个文件、或放进任何 App 的内置浏览器(WebView)都能完整显示,不需要 `images/` 文件夹。

| 文件 | 内容 |
| --- | --- |
| `index.html` | 海与山之间 · 温哥华 × 阿尔伯塔 7 日游 |
| `singapore-malaysia-bali.html` | 南行九日 · 吉隆坡 / 新加坡 / 巴厘岛 9 日行程(1/24–2/1,含森美兰三所学校探校、巴厘岛婚礼酒店考察,按小时排的日程) |

内容截至 2026-10-19(南行九日页面),价格与班期为参考,出发前请以官方信息为准。南行九日页面不含机票和酒店价格。

## 功能

- 四部分:国家与文化 / 7 日行程 / 18 个景点 / 出发前清单
- 全部内容可折叠;每张卡片、每一章都能朗读(浏览器自带语音合成,自动展开并高亮跟读)
- 文字大小可调(85%–170%),深色模式,打印时自动展开全部
- 互动:路线地图小车、翻转卡片、找动物小游戏、遇熊小测验、季节切换、蒸汽钟与吊桥、小费/汇率计算器、可勾选打包清单、实时时差

## 重新生成

页面由脚本生成(Node 18+):

```sh
node src/build.mjs       # 输出 index.html
node src/sea/build.mjs   # 输出 singapore-malaysia-bali.html
```

- `src/content.mjs`、`src/sea/content.mjs`:各页面的文字内容;`src/sea/photos.mjs`:南行九日页面的照片清单(作者、授权、来源)
- `src/sea/compat.mjs`:构建时给样式加旧版 Safari 的回退写法(`color-mix`、`inset`、`aspect-ratio` 等)
- `src/scenes.mjs`、`src/sea/scenes.mjs`、`src/art.mjs`:程序生成的原创插画
- `src/style.css`、`src/app.js`:共用的样式与交互;`src/sea/app-sea.js`:第二个页面独有的交互

## 照片

`images/sea/` 里的照片是构建页面时读取的素材:`images/sea/cover/*.jpg` 是缩小后的版本,构建时以 base64 写进 HTML(封面和相册共用,每张只写一次);`images/sea/*.jpg` 是对应的原图,留作素材(缺少缩小版时才会直接使用)。照片大部分来自 [Wikimedia Commons](https://commons.wikimedia.org/)(CC BY / CC BY-SA 授权,按要求署名);Epsom、KTJ 的校园图取自学校官网,Tirtha 的两张取自 NOW! Bali 的文章。这些是自用旅行指南用的图片,不要用于商业用途。每张照片的作者、来源链接写在 `src/sea/photos.mjs`;页面里图片下面不再显示版权信息,统一放在页面最末尾、默认折叠的「图片来源与版权说明」里。更换照片时请同步改 `photos.mjs` 并重新生成缩小版。
