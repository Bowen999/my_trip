// All page content lives here. Facts were checked against public sources on 2026-10-09.
// Prices are reference values and are labelled as such in the page.

export const META = {
  updated: '2026-10-09',
  cn: '2026 年 10 月 9 日',
  title: '海与山之间',
  sub: '温哥华 × 阿尔伯塔 7 日游',
};

/* ------------------------------------------------------------------ */
/*  最新状态                                                            */
/* ------------------------------------------------------------------ */
export const STATUS = [
  { k: 'warn', t: 'Johnston Canyon 可能封闭', d: '据当地旅游网站转述 Parks Canada:10 月 12 日(加拿大感恩节)后因落石风险处理,步道预计关闭约 3 个月。官方公告未核实,出发前查 Banff 公园公告。' },
  { k: 'warn', t: 'Moraine Lake 只能坐接驳', d: '梦莲湖路全年禁止私家车。2026 年接驳季约 6/1–10/12,4 月中旬开订,首日就有近 4 万人订票。2027 年日期尚未公布。' },
  { k: 'ok', t: 'Jasper 大部分已恢复', d: '2024 年 7 月山火后,公园大部分已重新开放;Maligne Canyon、Cavell Road 仍在修复,Palisades 中心长期关闭。' },
  { k: 'warn', t: 'Grouse Mountain 少了一只熊', d: '灰熊 Grinder 于 2026 年 7 月 31 日去世,现在只剩 Coola。很多旧攻略还写「两只熊」。' },
  { k: 'info', t: '景点季节性收尾', d: '2026 年:冰原冒险与 Skywalk 约到 10/12,Maligne 游船到 10/11,Lake Louise / Moraine 接驳季到 10 月中。10 月下旬起很多项目停运。' },
  { k: 'info', t: '11 月 1 日起:冬季轮胎', d: '冰原大道(93 号公路)11/1–4/1 法律要求冬季雪胎(雪花或 M+S 标记)或防滑链。冬季沿途几乎没有加油站、没有手机信号。' },
  { k: 'info', t: 'Jasper 暗夜节', d: '2026 年 10 月 16–25 日。Jasper 是世界第二大暗夜保护区(Parks Canada 说法)。' },
];

/* ------------------------------------------------------------------ */
/*  一、国家与文化                                                      */
/* ------------------------------------------------------------------ */
export const STATS = [
  { n: 998, u: '万 km²', l: '国土面积', s: '世界第二,仅次于俄罗斯' },
  { n: 4100, u: '万', l: '人口(约)', s: '大多住在靠美国一侧的南部' },
  { t: '10 + 3', l: '10 省 3 地区', s: '每个省自己管税、医疗、酒' },
  { t: '英 / 法', l: '两种官方语言', s: '这次的两个省,基本全说英语' },
  { n: 6, u: '个', l: '时区', s: '温哥华与班夫就差 1 小时' },
  { t: 'CAD', l: '加元', s: '标价不含税,下面有算法' },
];

export const PROVINCES = {
  bc: {
    name: '卑诗省 British Columbia',
    scene: 'stanley',
    rows: [
      ['省会', '维多利亚(在温哥华岛上)—— 温哥华不是省会'],
      ['人口', '约 570 万,亚裔比例高'],
      ['地貌', '海岸、雨林、峡湾,雪山直接压到城市背后'],
      ['天气', '夏季干爽凉快,<b>10–3 月多雨</b>,但很少冷到零下'],
      ['税', '多数商品 5% GST + 7% PST ≈ <b>12%</b>'],
      ['时区', '太平洋时间(PT)'],
      ['性格', '松弛、爱户外、爱咖啡和瑜伽,咖啡店比便利店多'],
      ['吃', '三文鱼、寿司、点心、Japadog、Nanaimo Bar'],
    ],
  },
  ab: {
    name: '阿尔伯塔省 Alberta',
    scene: 'banff',
    rows: [
      ['省会', '埃德蒙顿(不是卡尔加里)'],
      ['人口', '约 500 万'],
      ['地貌', '西边是落基山,东边是一望无际的大草原'],
      ['天气', '日照多、空气干;<b>昼夜温差大</b>,冬天可到 −20 ℃ 以下'],
      ['税', '没有省销售税,只有 5% GST —— <b>比 BC 便宜约 7 个点</b>'],
      ['时区', '山地时间(MT),<b>比温哥华快 1 小时</b>'],
      ['性格', '牛仔文化、石油经济、冰球;热情、直爽'],
      ['吃', '阿省牛排、Caesar 鸡尾酒、姜汁牛肉、BeaverTails'],
    ],
  },
};

export const CULTURE = [
  {
    ico: 'totem',
    k: '原住民',
    s: '你去的每个景点,都是别人的家',
    back: [
      '温哥华建在 Musqueam、Squamish、Tsleil-Waututh 三个原住民族(Coast Salish)的传统领地上。',
      '斯坦利公园 Brockton Point 的图腾柱,是最容易看到的原住民艺术。',
      '拍照可以,别攀爬;买纪念品认准原住民艺术家署名。',
    ],
  },
  {
    ico: 'bubble',
    k: '礼貌',
    s: '“Sorry” 是口头禅',
    back: [
      '被撞了对方先说 Sorry,你也说 Sorry,没人真的在道歉。',
      '下公交对司机说 Thank you;排队、让行很自觉,很少有人按喇叭。',
      '问路、点餐说 “Hi, how are you?” 是开场白,不用认真回答长篇。',
    ],
  },
  {
    ico: 'people',
    k: '移民之国',
    s: '多元不是口号,是日常',
    back: [
      '大温哥华约五分之一居民是华裔,Richmond 过半。',
      '同一条街上能吃到点心、拉面、印度咖喱、越南河粉。',
      '很多店员会说中文,但别默认,先用英语开口。',
    ],
  },
  {
    ico: 'boot',
    k: '户外是日常',
    s: '周末就是进山',
    back: [
      '本地人穿徒步鞋逛街很正常,所以你穿冲锋衣吃饭也不奇怪。',
      '国家公园的路牌写得很细:距离、难度、熊活动提示,看了再走。',
      '带走所有垃圾(Leave No Trace),连果皮都要带走。',
    ],
  },
  {
    ico: 'hockey',
    k: '冰球',
    s: '真正的国民运动',
    back: [
      'Vancouver Canucks、Calgary Flames、Edmonton Oilers 都是 NHL 球队。',
      'Flames 与 Oilers 的「阿尔伯塔之战」是死对头。',
      'NHL 常规赛 10 月到次年 4 月,这段时间来可以买一场球票。',
    ],
  },
  {
    ico: 'coin',
    k: '税与小费',
    s: '标价 ≠ 你付的钱',
    back: [
      '标价不含税:BC 约 +12%,阿省 +5%。',
      '餐厅小费 15–20%(刷卡机上会弹出选项,常见 18 / 20 / 25%)。',
      '咖啡店、外卖的小费可选;出租车约 10–15%。',
    ],
  },
];

export const FOODS = [
  { i: 'salmon', n: '烟熏三文鱼 / Salmon Candy', w: 'BC', d: '太平洋三文鱼做的烟熏小条,甜咸有嚼劲,适合带回去。Granville Island 市场就有。' },
  { i: 'hotdog', n: 'Japadog', w: 'BC', d: '温哥华街头起家的日式热狗:照烧酱、海苔、蛋黄酱。招牌 Terimayo。' },
  { i: 'dimsum', n: '点心 / 港式', w: 'BC', d: 'Richmond 的亚洲餐厅密度很高,Golden Village(No. 3 Road 一带)一次吃遍。周末早午市要排队。' },
  { i: 'nanaimo', n: 'Nanaimo Bar', w: 'BC', d: '来自温哥华岛的 Nanaimo:椰蓉饼干底 + 奶油馅 + 巧克力。很甜,小块尝一下。' },
  { i: 'beef', n: '阿省牛排', w: 'AB', d: '阿尔伯塔牛肉出名。想吃就找本地牛排馆,点 ribeye。' },
  { i: 'caesar', n: 'Caesar 鸡尾酒', w: 'AB', d: '1969 年在卡尔加里发明:伏特加 + 蛤蜊番茄汁 + 辣酱,杯边带盐,插根芹菜。' },
  { i: 'ginger', n: '姜汁牛肉', w: 'AB', d: '一般认为 1970 年代诞生在卡尔加里的「加拿大中餐」:脆炸牛肉条 + 甜辣姜酱。国内吃不到。' },
  { i: 'beavertail', n: 'BeaverTails', w: 'CA', d: '像海狸尾巴的手工炸面饼,撒肉桂糖挤柠檬。班夫的 Banff Avenue 上有。' },
  { i: 'poutine', n: 'Poutine', w: 'CA', d: '薯条 + 芝士粒 + 浓肉汁,魁北克发明,全国都有。热量爆表,两人分一份。' },
  { i: 'coffee', n: 'Tim Hortons', w: 'CA', d: '国民连锁咖啡。点 “Double-Double” 是两份奶两份糖。早餐三明治性价比高。' },
];

export const MANNERS = [
  ['钱', '刷卡/手机支付几乎通用,现金用得很少。带一张 Visa 或 Mastercard 最稳。'],
  ['小费', '餐厅按税前价 15–20%。刷卡机提示的 18 / 20 / 25% 随便选一个。'],
  ['水', '自来水可直接喝,景区有免费灌水点,带个保温杯。'],
  ['电', '120 V、两脚扁插(与国内两脚插头兼容);手机充电器标着 100–240 V 就能直接用。'],
  ['网', '国家公园很多路段没信号(特别是冰原大道)。出发前下载离线地图,买 eSIM 更省事。'],
  ['酒', '法定年龄:BC 19 岁、阿省 18 岁。公共场所(街边、海滩)不能喝,车上也不行。'],
  ['车', '靠右行驶,限速单位是 km/h。国家公园里不要停在车道上拍动物。'],
  ['急', '报警、急救、火警统一 <b>911</b>。国家公园也一样,但山里要靠自己多留一份余量。'],
];

export const WILD = {
  rule: [
    { n: '100 m', who: '熊、狼、美洲狮', bus: 10 },
    { n: '30 m', who: '麋鹿、驼鹿、大角羊、山羊、鹿', bus: 3 },
  ],
  animals: {
    bear: { n: '黑熊', t: '体型不大,一样危险。别靠近、别喂、别跑——跑会触发追击。熊喷雾放在手边,而不是背包底。距离 ≥ 100 m。' },
    elk: { n: '麋鹿(Elk)', t: '9–10 月是发情期,公鹿脾气最大,小镇草坪上的也一样。距离 ≥ 30 m。' },
    sheep: { n: '大角羊', t: '常在路边舔盐。别喂、别围成一圈拍。距离 ≥ 30 m。' },
    goat: { n: '雪山羊', t: '住在悬崖上,一身白。远远看就好,≥ 30 m。' },
    moose: { n: '驼鹿(Moose)', t: '最大的鹿科动物,常在湖边吃水草。带幼崽时最危险。距离 ≥ 30 m。' },
  },
  quiz: [
    {
      q: '你在开车,路边出现一头黑熊。该怎么办?',
      o: ['停在路中间,下车拍照', '减速、留在车里、继续慢慢开', '摇下车窗扔点吃的,让它别走'],
      a: 1,
      why: '正解。Parks Canada 要求:遇到野生动物时减速、留在车里、保持移动。下车、停在车道上、喂食都违法,还会害了动物。',
    },
    {
      q: '徒步时前方 50 米有一头熊朝你走来,它似乎还没注意到你。最先该做什么?',
      o: ['转身拔腿就跑', '冷静出声说话,慢慢后退,手放在熊喷雾上', '爬到树上去'],
      a: 1,
      why: '正解。出声让它知道你是人,慢慢后退,别跑——熊短跑可超过 50 km/h,跑只会引发追击。',
    },
    {
      q: '10 月,一只公麋鹿站在班夫小镇的草坪上,低头嚼草。你可以……',
      o: ['靠近到 5 米自拍', '保持 30 m 以上,绕开走', '用苹果引它过来'],
      a: 1,
      why: '正解。发情期的麋鹿会冲撞人。30 m 约是三辆公交车的长度。',
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  二、行程                                                            */
/* ------------------------------------------------------------------ */
export const ROUTE_NOTE = {
  buy: '机票买「<b>温哥华进、卡尔加里出</b>」的多程票,省掉折返。温哥华到卡尔加里飞行约 1.5 小时。',
  car: '前两天不租车;<b>D3 在卡尔加里机场取车</b>,D7 在卡尔加里还。全程自驾约 900 公里。',
  base: '行程按<b>夏季(6–9 月)</b>全开放来排。其他季节看第四部分的「何时去」。',
};

export const DAYS = [
  {
    n: 1, scene: 'stanley', area: '温哥华', title: '海边慢走', sub: '斯坦利公园 · 格兰维尔岛 · 煤气镇', move: '步行 + 小渡轮', tags: ['不用车', '轻松'],
    steps: [
      ['上午', '<b>斯坦利公园</b>:租辆自行车,沿海堤逆时针骑一圈(约 9 公里,含拍照 2–3 小时)。在 Brockton Point 看图腾柱,在 Prospect Point 看狮门大桥。'],
      ['中午', '回市中心吃 <b>Japadog</b> 街边热狗,或找家港式茶餐厅。'],
      ['下午', '<b>Granville Island</b> 公共市场:吃海鲜、买烟熏三文鱼。从 Yaletown 或 Hornby 街码头坐小渡轮过去,比走路有意思。'],
      ['傍晚', '<b>Gastown</b>:卡着整点看蒸汽钟喷汽,再在老街吃晚饭。'],
      ['夜晚', '走到 Canada Place,那个白色帆形屋顶是温哥华最上镜的夜景。'],
    ],
    eat: '海鲜、点心、Japadog。Gastown 的晚餐热门店要提前订位。',
    stay: '住市中心或 Coal Harbour,步行能走完 D1;去机场坐 Canada Line 轻轨约 25–30 分钟。',
    warn: '海堤是单向的,骑行必须逆时针。刚下飞机有时差,别排太满。',
    alt: '下雨:去 UBC 人类学博物馆看西海岸原住民图腾与雕刻,或市中心的温哥华美术馆。',
    fun: '蒸汽钟不是古董,<b>1977 年</b>才建。蒸汽来自市中心的地下供暖管网,但指针其实是电动的,蒸汽主要用来吹哨和「表演」。',
  },
  {
    n: 2, scene: 'capilano', area: '温哥华', title: '山林与一顿饭', sub: '吊桥 · 渔村 · 亚洲美食', move: '叫车 / 公交', tags: ['看天气', '吃'],
    steps: [
      ['上午', '<b>Capilano 吊桥</b>:约 140 m 长、离河面约 70 m。开门就到,人少。想省钱:Lynn Canyon 的吊桥免费。'],
      ['中午', '(可选)<b>Grouse Mountain</b>:缆车 8–10 分钟上山。云太厚就别上——什么也看不到。'],
      ['下午', '去 Richmond 的 <b>Steveston</b> 渔人码头:看渔船、吃炸鱼薯条。'],
      ['晚上', 'Richmond 的亚洲餐厅:点心、火锅、台湾小吃。夏季有 Night Market(大约 5–10 月,出发前查开放日)。'],
    ],
    eat: 'Steveston 的码头炸鱼;晚上去 Richmond 吃一顿中餐,为后面几天山里的西餐做准备。',
    stay: '继续住温哥华,明早去机场。',
    warn: '北岸景点周末人多;雨天路滑。Grouse 先看官方摄像头再决定上不上。',
    alt: '换成 <b>Sea to Sky</b> 一日:Shannon Falls + 海天缆车 + 惠斯勒(单程约 2 小时,自驾或团)。',
    fun: '吊桥的初版是 <b>1889 年</b>用麻绳和雪松木板搭的;现在这座是 1956 年重建的钢缆桥。',
  },
  {
    n: 3, scene: 'banff', area: '卡尔加里 → 班夫', title: '飞进落基山', sub: '航班 · 取车 · 班夫小镇', move: '飞 1.5 h + 开 1.5 h', tags: ['取车', '进山'],
    steps: [
      ['早上', 'YVR → YYC,飞行约 1.5 小时。落地<b>手表拨快 1 小时</b>(阿尔伯塔是山地时间)。'],
      ['中午', '取租车(买全险)。在卡尔加里超市补水、零食。<b>熊喷雾不能带上飞机</b>,到 Canmore / Banff 的户外店买或租。'],
      ['下午', '走 Trans-Canada Hwy 1 向西,约 1.5 小时到班夫。进园要买公园通行证(日票次日 16:00 前有效)。'],
      ['傍晚', '班夫小镇:逛 Banff Avenue,去 Bow Falls 和 Surprise Corner 看费尔蒙班夫温泉酒店。'],
      ['晚上', '二选一:上硫磺山看日落(缆车),或去 Upper Hot Springs 泡温泉看星星。'],
    ],
    eat: '班夫的餐厅偏贵,Banff Avenue 上可以试试 BeaverTails;晚饭尽量订位。',
    stay: '住班夫(D3、D4 两晚),或便宜些的 Canmore(开车约 25 分钟)。夏季旺季要提前几个月订。',
    warn: '公园内限速比外面低,严格遵守。<b>别把食物留在车里</b>——会引来熊。遇到动物减速、别停在车道上。',
    alt: '航班太晚到:D3 晚上改住 Calgary,D4 早上再进山,但梦莲湖早班接驳会赶不上。',
    fun: '班夫是加拿大第一个国家公园:<b>1885 年</b>先划出温泉保护区,后来才扩成国家公园。',
  },
  {
    n: 4, scene: 'moraine', area: '班夫 · 路易斯湖', title: '两个湖的一天', sub: '梦莲湖 · 路易斯湖', move: '接驳 + 自驾', tags: ['需预约', '早起'],
    steps: [
      ['清晨', '<b>Moraine Lake</b>:私家车进不去,只能坐 Parks Canada 预约接驳(每年 4 月中旬开抢)。到了先爬 Rockpile(约 10 分钟),看「十峰谷」。'],
      ['上午', '坐接驳去 <b>Lake Louise</b>:沿湖边走。体力好的走 Lake Agnes 茶屋(单程约 3.4 km、爬升约 400 m,夏季营业)。'],
      ['下午', '回班夫。<b>Johnston Canyon</b> 看瀑布(⚠ 据称 10/12 起封闭约 3 个月)。不然改去 Vermilion Lakes 看日落。'],
      ['晚上', '班夫晚餐,逛街。'],
    ],
    eat: '路易斯湖边的餐厅贵且排队,自带三明治,坐湖边吃。',
    stay: '继续住班夫。',
    warn: '没订到接驳:看 Roam 公交 8X 通票(需订位)或商业观光团;<b>别指望开车直达</b>。湖水颜色最蓝的是 7–8 月;阴天颜色会偏灰。',
    alt: '体力一般:Lake Louise 湖畔走一圈就够了,Lake Agnes 留给下次。',
    fun: '梦莲湖印在 <b>1969–1979 年版加拿大 20 元纸币</b>背面。蓝绿色是冰川磨出的「岩粉」悬浮在水里,反射蓝绿光。',
  },
  {
    n: 5, scene: 'icefield', area: '冰原大道 → 贾斯珀', title: '世界最美公路之一', sub: '佩托湖 · 冰原 · 瀑布', move: '自驾 232 km', tags: ['全天', '没信号'],
    steps: [
      ['早上', '在 Lake Louise <b>加满油</b>。冰原大道全长约 232 km,夏季通常只有 Saskatchewan River Crossing 有油站(以当季运营为准),冬季基本无服务。'],
      ['上午', 'Bow Lake → <b>Peyto Lake</b> 观景台(步行约 10 分钟):湖形像狼头。'],
      ['中午', '<b>哥伦比亚冰原</b>:Glacier Skywalk(悬空玻璃步道)+ 冰上车登 Athabasca 冰川。联票越早订越便宜。'],
      ['下午', 'Sunwapta Falls → <b>Athabasca Falls</b>(约 23 m 高,水量很猛)→ 抵达 Jasper。'],
    ],
    eat: '中途餐厅很少,Lake Louise 或 Saskatchewan Crossing 买好午饭。',
    stay: '住 Jasper(D5、D6 两晚)。旺季房源紧张。',
    warn: '全程手机几乎没信号,<b>先下载离线地图</b>。动物爱在路边,不要停在车道上拍。',
    alt: '嫌太赶:冰原联票只留 Skywalk,把 Ice Explorer 去掉,可省出 1.5 小时。',
    fun: '哥伦比亚冰原是「<b>三洋分水岭</b>」:融水分别流向太平洋、北冰洋和大西洋。Athabasca 冰川近 125 年退了 1.5 km 以上。',
  },
  {
    n: 6, scene: 'maligne', area: '贾斯珀', title: '精灵岛与星空', sub: '玛琳湖 · 药湖 · 暗夜', move: '自驾 48 km 往返', tags: ['游船', '星空'],
    steps: [
      ['上午', '<b>Maligne Lake Road</b>:路上先看 Maligne Canyon(深约 50 m,部分区域仍在修复)和 Medicine Lake(秋天湖水几乎漏光)。'],
      ['中午', '<b>Maligne Lake</b> 乘船去 Spirit Island(约 1.5 小时;2026 年船季到 10/11)。'],
      ['下午', '回镇路上看 Pyramid Lake;有余力上 Jasper SkyTram(Whistlers Mountain)。'],
      ['晚上', 'Jasper 是暗夜保护区,晚饭后找一处没灯的地方看星星。'],
    ],
    eat: 'Jasper 小镇比班夫安静,餐厅也相对便宜一点。',
    stay: '继续住 Jasper。',
    warn: '2024 年山火后部分步道与设施仍在修复,出发前看 Parks Canada 的「What\'s Open」。清晨傍晚动物多,开车慢一点。',
    alt: '不想坐船:改去 Mount Edith Cavell(路况以官方为准),或租皮划艇划 Pyramid Lake。',
    fun: 'Medicine Lake 没有出水口,靠<b>地下溶洞</b>排水,秋冬会漏到几乎只剩一片泥滩;春天融雪时再灌满。',
  },
  {
    n: 7, scene: 'calgary', area: '贾斯珀 → 卡尔加里', title: '回程与离开', sub: '冰原大道回走 · 卡尔加里', move: '自驾约 410 km', tags: ['长途', '送机'],
    steps: [
      ['早上', '<b>8 点前</b>出发,沿 93 号公路再走一次冰原大道(光线方向不同,又是另一番景色)。'],
      ['中午', '回到 Banff / Canmore 吃午饭、补给。'],
      ['下午', '进 Calgary:<b>Calgary Tower</b>(191 m)、Peace Bridge、Stephen Avenue 步行街。'],
      ['傍晚', '还车、送机。国际航班提前 3 小时到。'],
    ],
    eat: '想吃「加拿大中餐」就点姜汁牛肉;想喝点就点 Caesar。',
    stay: '无。晚上航班离开。',
    warn: 'Jasper → Calgary 约 410 km,不停约 5 小时,<b>实际按 6–7 小时算</b>。航班尽量订在 20:00 以后;更早的话 D6 晚改住 Banff / Canmore。',
    alt: '改飞埃德蒙顿:Jasper → Edmonton 约 4 小时(Hwy 16),在 Edmonton 还车离境。',
    fun: '卡尔加里的 Caesar 鸡尾酒 1969 年诞生,Stampede(每年 7 月初 10 天)号称「地球上最伟大的户外表演」。',
  },
];

/* ------------------------------------------------------------------ */
/*  三、景点                                                            */
/* ------------------------------------------------------------------ */
export const SIGHTS = [
  /* ---------------- Vancouver ---------------- */
  {
    id: 'stanley', n: 1, region: 'van', r: 'must', name: '斯坦利公园', en: 'Stanley Park', scene: 'stanley',
    cap: '图腾柱、狮门大桥与背后的北岸山脉。',
    blurb: '比纽约中央公园还大的城市森林(约 405 公顷),却贴着市中心。最好的看法是骑车绕海堤一圈。',
    pts: ['海堤约 9 km,<b>单向逆时针</b>,慢骑 2–3 小时', 'Brockton Point:一组原住民图腾柱,温哥华最热门的拍照点之一', 'Prospect Point:正对狮门大桥的观景台', '树林里的老雪松,下雨天比晴天更好看'],
    facts: { time: '3–4 小时', when: '上午或傍晚', cost: '免费(租车另付)', how: '市中心步行可达' },
    tip: '海边风大,带件薄外套。租车别在周末中午去,排队久。',
    fun: '公园以加拿大总督 <b>Lord Stanley</b> 命名——NHL 冠军的「斯坦利杯」也是他捐的。',
  },
  {
    id: 'granville', n: 2, region: 'van', r: 'worth', name: '格兰维尔岛', en: 'Granville Island', scene: 'granville',
    cap: '彩色小渡轮穿梭在 False Creek。',
    blurb: '从老工业区改造成的创意街区。核心是 Public Market:海鲜、水果、手作点心都能边走边吃。',
    pts: ['Public Market:现开牡蛎、烟熏三文鱼、面包', '工作室与小店:手作陶瓷、玻璃、首饰', '坐 Aquabus 或 False Creek Ferries 小渡轮过去'],
    facts: { time: '2 小时', when: '午前人少', cost: '免费进入,吃喝另付', how: '小渡轮 / 公交 / 步行' },
    tip: '周末和暑假挤,工作日上午最舒服。别在里面吃饱,留肚子给晚饭。',
    fun: '这里以前是造船厂和工厂,1970 年代起改造成今天的样子。',
  },
  {
    id: 'gastown', n: 3, region: 'van', r: 'worth', name: '煤气镇与蒸汽钟', en: 'Gastown & Steam Clock', scene: 'gastown', widget: 'clock',
    cap: '整点时,蒸汽钟会鸣笛、喷汽(点击图中的钟试试)。',
    blurb: '温哥华最老的街区,鹅卵石路、红砖楼、好吃的餐厅。街角的蒸汽钟是必拍。',
    pts: ['蒸汽钟:每 15 分钟敲一次钟,整点汽笛最响', 'Water Street 上的小店与咖啡馆', '晚饭首选这里,餐厅密度高、选择多'],
    facts: { time: '1–2 小时', when: '整点前 5 分钟到', cost: '免费', how: '市中心步行' },
    tip: '汽笛时间以现场为准(不同来源说法略有差异)。晚上热门店先订位。',
    fun: '名字来自 <b>“Gassy” Jack Deighton</b>:1867 年他在这里开酒馆,因为爱聊天得名。蒸汽钟则是 1977 年才建的。',
  },
  {
    id: 'capilano', n: 4, region: 'van', r: 'must', name: '卡皮拉诺吊桥公园', en: 'Capilano Suspension Bridge', scene: 'capilano', widget: 'bridge',
    cap: '吊桥会晃(点击图中的桥试试)。',
    blurb: '横跨河谷的吊桥,人走在上面桥板会轻轻上下晃。园里还有树顶栈道和悬崖栈道。',
    pts: ['吊桥:约 140 m 长、离河面约 70 m', 'Treetops:七座吊桥连起来的树顶栈道,最高约 30 m', 'Cliffwalk:贴着花岗岩崖壁的栈道', '图腾柱与原住民展示'],
    facts: { time: '2–3 小时', when: '开门即到', cost: '约 C$75–85(参考价)', how: '叫车 / 公交约 20–30 分钟' },
    tip: '价格偏高、周末人挤。想省钱去 Lynn Canyon:吊桥免费,人也少。',
    fun: '最早的桥建于 <b>1889 年</b>,用麻绳和雪松木板。1903 年换成钢缆,1956 年重建成现在的桥。',
  },
  {
    id: 'grouse', n: 5, region: 'van', r: 'opt', name: '松鸡山', en: 'Grouse Mountain', scene: 'grouse',
    cap: '黄昏的缆车线与脚下的城市灯光。',
    blurb: '缆车 8–10 分钟就到约 1,100 m 的山顶,天晴时能看到整个大温哥华和海岛。适合天气好的下午。',
    pts: ['Skyride 缆车上山,山顶有餐厅与步道', 'Grouse Grind:俗称「自然界楼梯机」,约 2.5–2.9 km、爬升约 800 m,<b>只能往上走</b>', '野生动物保护区与伐木工表演(夏季)'],
    facts: { time: '半天', when: '晴天下午', cost: '约 C$65–90(票种不同,参考价)', how: '叫车 / 公交' },
    news: '灰熊 <b>Grinder</b> 已于 2026 年 7 月 31 日去世,现在园里只剩 <b>Coola</b>。两只熊在 2001 年左右作为孤儿来到这里。',
    tip: '先看官网实时摄像头。云多就把时间留给别处。',
    fun: 'Grouse Grind 一年有十万人以上爬,下山可以坐缆车(另付一程)或走 BCMC 步道。',
  },
  {
    id: 'richmond', n: 6, region: 'van', r: 'worth', name: '里士满与史蒂文斯顿', en: 'Richmond & Steveston', scene: 'steveston',
    cap: '渔人码头黄昏。',
    blurb: '想一顿吃遍亚洲就来里士满。史蒂文斯顿是它南边的渔村,码头边能直接买到海鲜。',
    pts: ['Golden Village:点心、火锅、台湾小吃', 'Steveston Fisherman\'s Wharf:渔船靠岸卖海鲜', '夏季周末夜市(约 5–10 月)'],
    facts: { time: '半天 + 晚饭', when: '傍晚', cost: '吃喝另付', how: 'Canada Line 轻轨约 25 分钟' },
    tip: '热门店周末晚饭要排队或订位。夜市开放日以官网为准。',
    fun: '里士满超过一半居民是华裔。电视剧《童话镇》(Once Upon a Time)在 Steveston 取景。',
  },
  {
    id: 'seasky', n: 7, region: 'van', r: 'opt', name: '海天公路与惠斯勒', en: 'Sea to Sky & Whistler', scene: 'whistler',
    cap: 'Peak 2 Peak 缆车跨在两座山之间。',
    blurb: '温哥华往北的 99 号公路,一侧是海、一侧是山。想多看一天山就换成这个,当作 D2 的备选。',
    pts: ['Shannon Falls:约 335 m,BC 第三高瀑布', 'Sea to Sky 缆车(Squamish):山顶有吊桥和步道', 'Whistler 村:夏季有 Peak 2 Peak 缆车,全长约 4.4 km'],
    facts: { time: '全天', when: '夏季', cost: '油费 / 团费 + 门票', how: '自驾或团,单程约 1.5–2 小时' },
    tip: '这条线与班夫行程性质接近,已有 D3–D7 的山,可跳过。',
    fun: 'Peak 2 Peak 的单跨距离约 3 km,是世界最长之一。',
  },

  /* ---------------- Alberta ---------------- */
  {
    id: 'banff', n: 8, region: 'ab', r: 'must', name: '班夫小镇与硫磺山', en: 'Banff Town & Sulphur Mountain', scene: 'banff',
    cap: '瀑布山(Cascade Mountain)俯视着班夫小镇。',
    blurb: '被雪山围住的度假小镇。白天逛街,傍晚上硫磺山看日落,晚上泡温泉。',
    pts: ['Banff Gondola:硫磺山缆车,山顶约 2,281 m', 'Upper Hot Springs:天然硫磺温泉,约 37–40 ℃', 'Bow Falls 与 Surprise Corner:拍班夫温泉酒店的经典角度', 'Banff Avenue:商店与餐厅,街头偶尔有麋鹿'],
    facts: { time: '1 天(含缆车)', when: '傍晚日落', cost: '缆车约 C$70–80(参考价);公园票另付', how: '自驾 / Roam 公交' },
    tip: '缆车网上提前订便宜,清晨和傍晚时段更低。公园日票 C$12.25(2026 参考价)次日 16:00 前有效。',
    fun: '1954 年玛丽莲·梦露在 Bow River 一带拍了《大江东去》。<b>班夫的垃圾桶都是防熊的</b>。',
  },
  {
    id: 'johnston', n: 9, region: 'ab', r: 'worth', name: '约翰斯顿峡谷', en: 'Johnston Canyon', scene: 'johnston', status: 'warn',
    cap: '栈道贴着岩壁,脚下是青绿色溪水。',
    blurb: '一条挂在峡谷岩壁上的铁栈道,通往两个瀑布。走完全程约 5 公里往返。',
    pts: ['Lower Falls:单程约 1.2 km,最短最热门', 'Upper Falls:单程约 2.7 km', 'Ink Pots:再往里,冰川融水冒出的彩色小池'],
    facts: { time: '2–3 小时', when: '清晨(车位满得快)', cost: '免费(含公园票)', how: 'Hwy 1A,自驾' },
    news: '⚠ 当地旅游网站称 Parks Canada 因落石风险处理,步道在 <b>10 月 12 日后预计关闭约 3 个月</b>;官方公告未核实,出发前查 Banff 公园公告。',
    tip: '夏季中午挤到走不动。冬天这里是著名的冰瀑徒步(多为带队)。',
    fun: '峡谷是溪水在石灰岩里一点点切出来的,栈道就钉在岩壁上,所以走起来特别「悬」。',
  },
  {
    id: 'louise', n: 10, region: 'ab', r: 'must', name: '路易斯湖', en: 'Lake Louise', scene: 'louise', widget: 'lakecolor',
    cap: '湖的尽头是 Victoria 冰川,湖边是费尔蒙城堡酒店。',
    blurb: '蓝绿湖水 + 冰川 + 城堡酒店,落基山最经典的一张明信片。湖边独木舟是红色的,拍照特别搭。',
    pts: ['湖畔步道:平路,适合所有人', 'Lake Agnes 茶屋:单程约 3.4 km、爬升约 400 m', '独木舟(夏季租借,价格偏高)', '夏季湖边几乎没有停车位,要用 Park & Ride'],
    facts: { time: '2–4 小时', when: '上午', cost: '免费进入;接驳另付', how: 'Park & Ride 接驳(滑雪场停车场)' },
    tip: '游客最多的时间是 10:00–15:00,尽量早到或傍晚。',
    fun: '路易斯湖与「阿尔伯塔」同名:两者都以维多利亚女王的女儿 <b>Louise Caroline Alberta</b> 命名。',
  },
  {
    id: 'moraine', n: 11, region: 'ab', r: 'must', name: '梦莲湖', en: 'Moraine Lake', scene: 'moraine',
    cap: '秋天的落叶松把山谷染成金色(图为 9 月下旬至 10 月初)。',
    blurb: '十座雪峰围着一汪蓝到发假的湖。比路易斯湖更像「照片」。',
    pts: ['Rockpile:湖边巨石堆,步行约 10 分钟,看十峰谷全景', '湖边步道与红色独木舟', '想走远点:Larch Valley(秋天落叶松季;熊区常有「4 人以上同行」的规定,以公园公告为准)'],
    facts: { time: '2–3 小时', when: '早班接驳', cost: '接驳约 C$12.75 + 订票费 C$3.5(2026 参考价)', how: '只能预约接驳,私家车禁入' },
    news: '2026 年接驳季约 <b>6/1–10/12</b>。预约<b>每年 4 月中旬</b>开抢(2026 年为 4 月 15 日 8:00 MDT)。2027 年的日期尚未公布,请关注 Parks Canada。',
    tip: '订不到就看 Roam 8X 通票(需在班夫出发)或商业团。别抱着「到了再说」的心态。',
    fun: '梦莲湖印在 <b>1969–1979 年版加拿大 20 元</b>纸币背面。秋天落叶松变金约在 9 月下旬到 10 月初。',
  },
  {
    id: 'peyto', n: 12, region: 'ab', r: 'worth', name: '佩托湖与弓湖', en: 'Peyto Lake & Bow Lake', scene: 'peyto',
    cap: '从 Bow Summit 往下看,湖形像一个狼头。',
    blurb: '冰原大道上最容易「顺便」停下的两个湖。佩托湖从上往下看颜色最夸张。',
    pts: ['Peyto Lake:观景台离停车场约 10 分钟', 'Bow Lake:湖对面是 Crowfoot Glacier', '都是路边景点,不需要装备'],
    facts: { time: '1–1.5 小时', when: '上午', cost: '免费', how: 'Hwy 93N 自驾' },
    tip: '佩托湖停车场很早满,早点到,否则要在路上绕。',
    fun: '佩托湖以向导与猎人 “Wild Bill” Peyto 命名。',
  },
  {
    id: 'icefield', n: 13, region: 'ab', r: 'must', name: '哥伦比亚冰原', en: 'Columbia Icefield', scene: 'icefield',
    cap: 'Ice Explorer 冰上车开到 Athabasca 冰川上。',
    blurb: '落基山最大的冰原。可以坐大轮冰上车走到冰川表面,再去悬空的 Skywalk。',
    pts: ['Glacier Skywalk:玻璃步道,探出崖壁、脚下约 280 m', 'Ice Explorer:大轮冰上车,在冰川上停留约 20 分钟', '游客中心:冰川展览与观景视角'],
    facts: { time: '半天', when: '上午', cost: '联票约 C$126 起(参考价,越晚越贵)', how: 'Hwy 93N,自驾' },
    news: '2026 年运营约 <b>5/1–10/12</b>,视天气而定;如当天无法运营会退款。',
    tip: '提前 2 周以上订最便宜;下午 15:30 后出发的场次便宜约 20%。',
    fun: '冰原是「<b>三洋分水岭</b>」:融水流向太平洋、北冰洋、大西洋。Athabasca 冰川近 125 年退了 1.5 km 以上、损失过半体积。',
  },
  {
    id: 'athabasca', n: 14, region: 'ab', r: 'worth', name: '阿萨巴斯卡瀑布', en: 'Athabasca & Sunwapta Falls', scene: 'athabasca',
    cap: '水量大、力量强,不靠高度取胜。',
    blurb: '冰原大道北段的两个瀑布,都在公路边,走几分钟就到。Athabasca 约 23 m 高,但水流砸进岩缝的力量特别震撼。',
    pts: ['Athabasca Falls:栈道很近,水汽打脸', 'Sunwapta Falls:上下两层瀑布', '都有栏杆,但湿滑,别翻越'],
    facts: { time: '1–1.5 小时', when: '任意时段', cost: '免费', how: 'Hwy 93N,靠近 Jasper' },
    tip: '带防水外套;景点岩石湿滑,翻栏杆落水是这里最常见的事故。',
    fun: '这条河的名字 Athabasca,来自 Cree 语,意为「芦苇之地」。',
  },
  {
    id: 'jasper', n: 15, region: 'ab', r: 'worth', name: '贾斯珀小镇与暗夜星空', en: 'Jasper Town & Dark Sky', scene: 'jasper',
    cap: '极光与星空(示意)。暗夜保护区里能看到银河。',
    blurb: '比班夫更安静、更像山村。晚上灯少,抬头就是银河;运气好还能看到极光。',
    pts: ['Jasper SkyTram:Whistlers Mountain 缆车', 'Pyramid Lake:看倒影的最佳去处', 'Dark Sky Preserve:世界第二大暗夜保护区(11,000 km² 以上)'],
    facts: { time: '半天–1 天', when: '傍晚与夜晚', cost: '大部分免费', how: '小镇可步行' },
    news: '2024 年 7 月山火毁掉小镇约三分之一建筑,如今大部分已重建。2026 年<b>暗夜节 10 月 16–25 日</b>。',
    tip: '看星星要远离路灯,带件厚外套,10 月夜里零度上下。',
    fun: '小镇街边常能看到麋鹿,同样要保持 30 m 以上的距离。',
  },
  {
    id: 'maligne', n: 16, region: 'ab', r: 'must', name: '玛琳湖与药湖', en: 'Maligne Lake & Medicine Lake', scene: 'maligne',
    cap: '精灵岛(Spirit Island)是落基山的招牌。',
    blurb: '落基山最大的天然湖(约 22 km 长)。坐船去精灵岛是整条 Maligne Lake Road 的高潮。',
    pts: ['Maligne Lake 游船:约 1.5 小时到 Spirit Island', 'Medicine Lake:秋冬会「漏光」', 'Maligne Canyon:深约 50 m,部分区域修复中'],
    facts: { time: '半天–1 天', when: '早班船', cost: '船票各渠道不同;含接送的团约 C$267 起(参考价)', how: 'Maligne Lake Road 约 48 km' },
    news: '2026 年船季约 <b>5/29–10/11</b>。Maligne Canyon 仍在修复,先看 Parks Canada 状态页。',
    tip: '早班船人少、水面平,拍到的倒影最好。',
    fun: 'Medicine Lake 靠<b>地下溶洞</b>排水,秋冬几乎见底,春天融雪灌满。',
  },
  {
    id: 'calgary', n: 17, region: 'ab', r: 'worth', name: '卡尔加里', en: 'Calgary', scene: 'calgary',
    cap: '和平桥、卡尔加里塔与背后的城市。',
    blurb: '落基山脚下的牛仔城。留给回程半天,逛得轻松点。',
    pts: ['Calgary Tower:191 m,有玻璃地板', 'Peace Bridge:红白色的步行桥', 'Stephen Avenue:步行街,餐厅集中', '每年 7 月初 Stampede:十天的牛仔节'],
    facts: { time: '半天', when: '下午', cost: '多数免费;塔另付', how: '市区步行 / 轻轨' },
    tip: '回程留足时间:还车 + 机场 3 小时。周五傍晚进市区可能堵。',
    fun: 'Caesar 鸡尾酒(1969)和姜汁牛肉(1970 年代)据说都诞生在这里。',
  },
  {
    id: 'badlands', n: 18, region: 'ab', r: 'opt', name: '德兰赫勒', en: 'Drumheller & Badlands', scene: 'badlands',
    cap: '荒地里的风蚀砂岩柱(Hoodoos)。',
    blurb: '卡尔加里东北约 1.5 小时。有世界一流的恐龙博物馆,和一只能爬进嘴里的巨型霸王龙。',
    pts: ['Royal Tyrrell Museum:古生物博物馆', '镇上约 26 m 高的巨型霸王龙', 'Hoodoos:风蚀砂岩柱'],
    facts: { time: '1 天', when: '夏季', cost: '博物馆另付', how: '从卡尔加里自驾约 1.5 小时' },
    tip: '只有当 D7 航班很晚、你想多一站时才值得。',
    fun: '这里的岩层里挖出过大量白垩纪恐龙化石,所以叫「恐龙谷」。',
  },
];

export const BONUS = [
  ['Lake Minnewanka', '班夫旁的大湖,清晨最安静。'],
  ['Vermilion Lakes', '班夫日落名所,偶尔有麋鹿和驼鹿。'],
  ['Yoho · Emerald Lake', '过 BC 省界后的翡翠湖,颜色比路易斯更绿。'],
  ['Kananaskis', '阿省的大片山地,远没有班夫拥挤。'],
  ['West Edmonton Mall', '埃德蒙顿的超级商场,下雨天/冬天备选。'],
];

/* ------------------------------------------------------------------ */
/*  四、实用                                                            */
/* ------------------------------------------------------------------ */
export const SEASONS = {
  spring: {
    n: '春', m: '4–5 月',
    pro: ['人少、住宿便宜', '温哥华樱花约 3 月底至 4 月中', '野生动物出来觅食,容易看到熊'],
    con: ['山上还有雪,很多高海拔步道没开', '湖面多半还结着冰,没有蓝绿色', 'Moraine Lake 路 6 月 1 日前后才开'],
    wear: '分层穿衣、防水鞋、抓绒',
    temp: '温哥华 5–15 ℃;班夫 −5–10 ℃',
  },
  summer: {
    n: '夏', m: '6–8 月',
    pro: ['所有景点、接驳、船都开', '湖水最蓝(7–8 月)', '白天长,班夫夏至日落约 22 点'],
    con: ['人最多、住宿最贵、停车最难', '要提前几个月订房、接驳', '8 月常有山火烟霾'],
    wear: '短袖 + 薄外套 + 防晒;夜里山里很凉',
    temp: '温哥华 15–25 ℃;班夫白天 20–25 ℃,夜里约 5 ℃',
  },
  autumn: {
    n: '秋', m: '9–10 月',
    pro: ['落叶松变金:9 月下旬至 10 月初', '游客少、住宿价格回落', '麋鹿发情期(要保持距离)'],
    con: ['10 月中旬后接驳、游船、冰原项目陆续停运', '早晚有霜、道路偶有结冰', '温哥华开始进入雨季'],
    wear: '羽绒/抓绒、帽子手套、防水鞋',
    temp: '温哥华 8–15 ℃;班夫 −2–9 ℃',
  },
  winter: {
    n: '冬', m: '11–3 月',
    pro: ['滑雪(Lake Louise / Sunshine / Norquay / Marmot)', '冰瀑与 Maligne Canyon 冰上徒步', '极光与星空的好季节'],
    con: ['Icefields Parkway 11/1–4/1 必须有冬季雪胎或防滑链', '白天短,很多景点关闭,Moraine Lake 路封', '冬季该路段无加油站、无手机信号'],
    wear: '厚羽绒、保暖内衣、雪靴、手套帽子面罩',
    temp: '温哥华 2–7 ℃;班夫 −15–−5 ℃,冷空气可到 −30 ℃',
  },
};

export const TIMELINE = [
  ['提前 6–9 个月', '机票(温哥华进、卡尔加里出);夏季班夫 / 贾斯珀住宿(旺季最早订满)。'],
  ['每年 4 月中旬', 'Moraine Lake 接驳开订(2026 年为 4/15 8:00 MDT)。2027 日期未公布,关注 Parks Canada。'],
  ['提前 1–2 个月', '租车(YYC 取还,买全险);冰原联票、Maligne 游船、Banff Gondola(越早越便宜)。'],
  ['出发前 1 周', '查 Parks Canada 公园公告、Jasper「What\'s Open」、511 Alberta 路况;看野火/空气质量。'],
  ['出发当天', '下载离线地图;到班夫 / Canmore 买熊喷雾;车里不留食物。'],
];

export const PRICES = [
  ['公园日票(成人)', 'C$12.25', '次日 16:00 前有效;17 岁以下免费;团体/家庭车 C$24.50'],
  ['公园年卡 Discovery Pass', 'C$83.50', '≥ 7 天才划算,这趟 5 天买日票'],
  ['Moraine / Lake Louise 接驳', 'C$12.75 + 3.5', '订票费不退;私家车禁入'],
  ['Banff Gondola', 'C$70–80', '网上提前订更便宜'],
  ['冰原冒险 + Skywalk 联票', 'C$126 起', '提前 2 周订最便宜,越晚越贵'],
  ['Capilano 吊桥', 'C$75–85', '参考价,以官网为准'],
  ['Grouse Mountain', 'C$65–90', '票种不同价差大'],
  ['YYC → 班夫机场巴士', 'C$70–85 单程', '三人以上租车更划算'],
];

export const PACK = [
  { g: '证件与钱', i: ['护照(有效期足够)', '签证 / eTA(以加拿大移民局官网为准)', '驾照 + 翻译件或国际驾照(按租车公司要求)', 'Visa / Mastercard 信用卡', '旅行保险(含自驾与医疗)'] },
  { g: '衣物', i: ['分层:速干内层 + 抓绒 + 防水外套', '防滑徒步鞋', '帽子 / 薄手套(山里早晚冷)', '墨镜 + 防晒', '一件稍正式的衣服(Gastown 晚餐)'] },
  { g: '装备', i: ['离线地图(Google Maps 先下载)', '充电宝 + 车充', '保温杯 / 水壶', '小背包 + 防水套', '手机支架', '熊喷雾(到当地买,不能带上飞机)'] },
  { g: '药品', i: ['晕车药(山路多弯)', '创可贴 / 水泡贴', '常用药', '驱蚊液(6–8 月)'] },
];

export const SOURCES = [
  ['Parks Canada · Lake Louise & Moraine 接驳', 'https://parks.canada.ca/lakelouise-transit'],
  ['Parks Canada · Jasper What\'s Open', 'https://www.parks.canada.ca/pn-np/ab/jasper/visit/ouvert-fermee-open-closed'],
  ['Parks Canada · Icefields Parkway 冬季须知', 'https://parks.canada.ca/pn-np/ab/jasper/activ/experience/hiver-winter/pcghiver-ipwinter/pcg-securite-safety-ip'],
  ['Parks Canada · Jasper 野生动物距离公告', 'https://parks.canada.ca/pn-np/ab/jasper/bulletins/a8a66ab1-d0db-4300-b227-8eb8f57d88ae'],
  ['Parks Canada · Jasper 暗夜保护区', 'https://parks.canada.ca/pn-np/ab/jasper/gestion-management/designation/cieletoile-darksky'],
  ['Tourism Jasper · 2026 暗夜节', 'https://www.jasper.travel/blog/jasper-dark-sky-festival-2026-top-events/'],
  ['Banff Jasper Collection · 冰原冒险', 'https://www.banffjaspercollection.com/attractions/columbia-icefield-glacier-adventure/'],
  ['Banff Jasper Collection · 玛琳湖游船', 'https://www.banffjaspercollection.com/attractions/maligne-lake-cruise/location-hours/'],
  ['Travel Banff Canada · Johnston Canyon', 'https://travelbanffcanada.com/johnston-canyon-hike-banff-national-park/'],
  ['Banff Bound · 2026 公园门票', 'https://banffbound.com/blog/parks-canada-discovery-pass-price-2026'],
  ['Daily Hive · Grouse 灰熊 Grinder', 'https://dailyhive.com/vancouver/grouse-mountain-grizzly-bear-grinder-passed-away'],
  ['Wikipedia · Capilano Suspension Bridge', 'https://en.wikipedia.org/wiki/Capilano_Suspension_Bridge'],
  ['Yellowstone to Yukon · 班夫野生动物通道', 'https://y2y.net/blog/the-home-of-wildlife-crossings-banff-alberta/'],
  ['Read the Plaque · Gastown Steam Clock', 'https://www.readtheplaque.com/plaque/steam-clock'],
  ['City of Vancouver · Seawall 地图', 'https://vancouver.ca/files/cov/Seawall-Printable-Map3.pdf'],
];
