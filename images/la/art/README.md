# 手绘封面素材清单(交给 Sonnet 5.5)

这个目录放行程页面卡片的手绘封面。每张图按下面的文件名保存(`.jpg` 优先,`.png` / `.webp` 也认),
构建脚本 `node src/la/build.mjs` 检测到文件就会自动替换程序生成的占位插画;缺哪张就用哪张的占位,不影响页面构建。

## 统一风格要求

- **画风**:扁平插画 / 丝网版画感,清晰剪影,少细节,暖纸面质感(参考本站新英格兰、东南亚行程页的配图)
- **色板**:米白奶油底 `#f6efe0` `#fff3c8` `#ffd88a`;深墨 `#161226` `#2c3040`;砖红点缀 `#c94f5a` `#e8553f`;金黄 `#f2c14e`;橄榄绿 `#3a5a3a`
- **版权**:画场景氛围,不要出现可辨认的迪士尼角色正脸 / 商标 logo(城堡剪影、过山车、园区造景可以)
- **尺寸**:普通卡片 **1600×900**(横幅);`hero.jpg` **2400×1000**(超宽页头)
- 构图留中线偏下主体,顶部会被卡片标题遮挡

## 文件清单(20 张)

| 文件 | 画面描述(给画手的英文 brief) |
|---|---|
| `hero.jpg` | Wide dusk panorama of Los Angeles: downtown skyline silhouette on the left, a fairy-tale castle spire with fireworks on the right, palm trees in the foreground, warm amber-to-indigo gradient sky |
| `innout.jpg` | A retro roadside burger stand at sunset: red-and-white crossed-arrow sign glowing, palm silhouettes, a small queue of cars, LA freeway lights in the distance |
| `castle.jpg` | A small pastel storybook castle at night with fireworks bursting above, warm golden windows, reflection in a moat, deep indigo sky |
| `sign.jpg` | Nine giant white letters on a dry golden hillside, seen from a green park lawn below, afternoon haze, a few tiny hikers on the trail |
| `lax.jpg` | A retro-futurist airport landmark: white arched space-age building (Theme Building) at dusk, a plane climbing past, runway lights, purple-orange sky |
| `racers.jpg` | Red-rock desert canyon with striped buttes (Ornament Valley), a small open-top race car speeding along the ridge trail, dust trail, blazing noon sun |
| `soarin.jpg` | A hang-glider wing tip in the foreground soaring over orange groves, a river and snow-capped mountains, seen from high above, morning light |
| `avengers.jpg` | A retro-futuristic campus plaza with a quinjet parked on a rooftop, web-lines swinging between buildings (no characters), bright midday |
| `pier.jpg` | A seaside amusement pier at golden hour: big Ferris wheel with a round face design, roller-coaster loop over the water, pastel boardwalk stalls |
| `rise.jpg` | Alien outpost of black basalt spires with a domed spacecraft hangar, a starship silhouette overhead, twin-sun dusk sky (no characters) |
| `bigthunder.jpg` | A runaway mine train rounding a red butte, creaky wooden trestle, cacti and mining derrick, desert sunset |
| `pirates.jpg` | New-Orleans-style wrought-iron balconies over a moonlit bayou, a small boat drifting past fireflies, lanterns glowing |
| `haunted.jpg` | A stately antebellum mansion at dusk with green shutters, wrought-iron fence, fog and a hearse carriage out front, full moon behind twisted oaks |
| `indy.jpg` | A crumbling jungle temple entrance half-swallowed by roots, a rope bridge, expedition jeep parked outside, humid green light |
| `space.jpg` | A gleaming white conical space-port building with sweeping support pylons at night, a rocket streaking across a star field |
| `toontown.jpg` | A cheerful cartoon town square: round yellow hills, wavy cartoon buildings with crooked chimneys, bright flat colours, midday sun |
| `walk.jpg` | A terrazzo sidewalk with pink five-pointed stars embedded in it, a pair of sneakers mid-step, theatre marquee glow in the background, evening |
| `rodeo.jpg` | An elegant shopping street lined with tall skinny palm trees, awnings and window displays, a vintage car cruising by, morning light |
| `getty.jpg` | White travertine museum buildings on a hilltop with curved geometry, a cactus garden in the foreground, view over the hazy LA basin |
| `usc.jpg` | A university quad with red-brick Romanesque arches and arcades, tall palms, students walking, warm afternoon light |

## 流程

1. Sonnet 5.5 按上表出图 → 存到本目录(文件名必须完全一致)
2. 运行 `node src/la/build.mjs`,输出末尾不再列出对应 key 即替换成功
3. 想重画某张:替换同名文件再构建即可
