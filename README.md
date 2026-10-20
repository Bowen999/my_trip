# 旅行指南

两份可交互的旅行指南,**直接用浏览器打开 HTML 即可**(电脑、平板、手机均可;无需联网,Google 字体只是可选增强)。第二份页面带真实照片:HTML 和 `images/` 文件夹放在一起即可;照片文件缺失时,页面会自动退回手绘插画。

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
- `src/scenes.mjs`、`src/sea/scenes.mjs`、`src/art.mjs`:程序生成的原创插画
- `src/style.css`、`src/app.js`:共用的样式与交互;`src/sea/app-sea.js`:第二个页面独有的交互

## 照片

`images/sea/` 里的照片全部来自 [Wikimedia Commons](https://commons.wikimedia.org/),只选公有领域、CC0、CC BY 和 CC BY-SA 授权的图片。每张照片的作者、授权和来源链接写在 `src/sea/photos.mjs`,也显示在页面底部的「图片来源」和各卡片的封面说明里。更换照片时请同步改 `photos.mjs`。
