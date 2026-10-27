// Content for the LA trip (YEG → LAX; Disney two parks in one day + LA city), 2027-02-09 → 02-12.
// Single edition (like the New England page). Facts checked 2026-10-26; anything not confirmed from an official page says so.
// Readers: 2 people flying in from Edmonton, familiar with the US — skip generic US info.
// Style: short, direct Chinese; English place names stay in English (that is what the map and signs show).

export const META = {
  updated: '2026-10-26',
  cn: '2026 年 10 月 26 日',
  dates: '2027 年 2 月 9 日(周二)– 2 月 12 日(周五)',
  title: '天使之城四日',
  tag: '2 人 · 1 间房 · 租车 4 天',
  hero: '洛杉矶 × 迪士尼 4 天 3 夜:2/9 飞 LAX、住 Buena Park 两晚;2/10 迪士尼一天两园;2/11 搬去 USC,好莱坞与 Getty;2/12 飞回埃德蒙顿。',
};

/* ------------------------------------------------------------------ */
/*  计划假设与待确认                                                    */
/* ------------------------------------------------------------------ */
export const ASSUME = [
  ['日期', '<b>2027/2/9(周二)→ 2/12(周五)</b>,4 天 3 晚。2/9 落地 LAX 后住 Buena Park 2 晚,2/11 搬 USC 1 晚,2/12 回家。'],
  ['人和房', '2 人,1 间房。'],
  ['车', 'LAX 取还,租 4 天:2/9 落地取车,2/12 中午还车。2/10 迪士尼那天车不动,停酒店。'],
  ['行李', '<b>全程只带手提行李</b>:票价只含 1 件手提,回程转机只有 53 分钟,托运只会添乱。'],
  ['时区', '全程太平洋时间(PT)。2 月 LA 比埃德蒙顿慢 1 小时(两边都在冬令时)。'],
  ['不写的', '签证、换汇、小费规矩、一般美国常识都不写。票价、营业时间以官方页面为准。'],
];

export const PENDING = [
  '两家酒店房费还没给我:DoubleTree Buena Park 2 晚、USC Hotel 1 晚。花销表里留了位,发我就填上。',
  '2/10 班车:<b>2/9 入住时问 bell desk</b> 首班 / 末班 / 频率 / 要不要预约 —— 这决定 2/10 早上坐班车还是打车(单程约 $30)。',
  'Single Pass 预算:按往年区间留了 $54–150 / 2 人,当天 App 实价。要不要设个上限?',
  '租车订哪家?保险用自己的车险 / 信用卡,还是买租车公司的 LDW?取车记得拍四角视频。',
  '回程 53 分钟转机很紧:要不要花钱改早一班从 LAX 走?不改就按第 4 天的方案执行(手提行李 + 靠前座位)。',
  'Getty 2/11 想逛多久?行程按 1.5–2 小时排,它 17:30 闭馆。',
];

export const STATUS = [
  { k: 'warn', t: '回程转机只有 53 分钟', d: '2/12 SEA 16:47 到、17:40 走。票价只含 1 件手提行李正好 —— <b>全程只带随身行李</b>,下机直接看大屏找登机口,别排队买吃的;座位尽量选靠前。' },
  { k: 'warn', t: '2/10 园区时间还没公布', d: '2027/2/10 的两园时间官方还没出。按 2 月平日惯例:Disneyland 约 8:00 开、22:00–23:00 关,DCA 约 8:00–9:00 开、21:00 关。<b>出发前在 Disneyland App 核对</b>,别把 8:00 当成已确认时间;行程里的钟点都是按惯例估的。' },
  { k: 'warn', t: '酒店班车时刻未知', d: 'DoubleTree 只确认了「5 英里内免费班车,Disneyland 在范围内」。<b>2/9 入住第一件事:去 bell desk 问 2/10 时刻表</b>(首班、频率、末班、要不要预约、有没有座位限制)。首班赶不上开园就打车,单程约 $30。' },
  { k: 'info', t: '门票已核实(还没买)', d: '2/10 是 <b>Tier 0</b>(最便宜档):1 日 Park Hopper $179/人 税前,两人 $358;Multi Pass $35/人,两人 $70。<b>买完票立刻在 App 约首园(约 DCA)</b> —— Park Hopper 只需约首园,进首园后当天随时换园。' },
  { k: 'info', t: '两个王牌项目要单买', d: '抵抗组织崛起、汽车总动员赛车<b>不在 Multi Pass 里</b>,当天入园后在 App 买 Single Pass,每个项目每天限 1 张;价格当天才知道,预算按往年区间留 $54–150 / 2 人。' },
  { k: 'ok', t: 'DoubleTree 停车 $0(已核实)', d: 'Hilton 官网写明自助停车免费(Complimentary),房费明细无度假村费。2/9、2/10 两天车都停酒店。' },
  { k: 'ok', t: 'Getty 赶上了:3/15 起闭馆一年', d: 'Getty Center <b>2027/3/15 起闭馆改造,2028 年春才重开</b>(为 2028 洛杉矶奥运)。你们 2/11 去正好是最后一个多月。门票免费,但要提前在官网约 2/11 下午的定时入场;停车 $25/车。' },
  { k: 'info', t: '在埃德蒙顿就过完美国海关', d: 'YEG 有美国预清关:登机前过完美国边检,落地 SEA / LAX 按国内航班算。预清关要排队,2/9 早点到机场。订票截图提示去程在 SEA 要重新托运行李 —— 只带手提就不受影响。' },
];

/* ------------------------------------------------------------------ */
/*  速览                                                               */
/* ------------------------------------------------------------------ */
export const STATS = [
  { t: '4', l: '天 3 晚', s: '2/9(周二)→ 2/12(周五)' },
  { t: '2', l: '个乐园一天打完', s: '上午加州冒险乐园 → 下午迪士尼乐园' },
  { t: '¥4,014', l: '两人机票', s: '只含手提行李,不含托运' },
  { t: '$179', l: '门票/人(税前)', s: 'Tier 0 · Park Hopper;Multi Pass 另加 $35/人' },
  { t: '10:35', l: '返程出发时间', s: '2/12 从 USC 酒店出发的截止时间(算术见第 4 天)' },
  { t: '$0', l: '前两晚停车', s: 'DoubleTree 自助停车免费(已核实)' },
];

export const ROUTE_NOTE = {
  shape: '2/9 飞 LAX,住 Buena Park 2 晚(迪士尼)→ 2/11 搬 USC 1 晚(好莱坞、比弗利、Getty)→ 2/12 飞回。',
  pace: '最累的是 <b>2/10</b>:迪士尼开园打到闭园,一天 2 万步。2/11 市区点多但每段车程短。2/12 唯一的死线是 10:35 出发。',
};

/* ------------------------------------------------------------------ */
/*  一、迪士尼攻略与吃喝                                                */
/* ------------------------------------------------------------------ */
/* 1.1 票与预约 */
export const TICKETS = [
  ['1 日 Park Hopper(Tier 0)', '$179/人 税前', '2 人 $358。档位已核实,还没买;2/10(周三)是全年最便宜的一档'],
  ['Lightning Lane Multi Pass', '$35/人', '2 人 $70。入园当天在 App 买;大部分项目靠它约「闪电通道」'],
  ['Lightning Lane Single Pass', '当天实价', '抵抗组织崛起 + 汽车总动员赛车单买,每项目每天限 1 张。预算 $54–150 / 2 人(往年区间,估)'],
  ['园区停车', '约 $40/天', '你们坐班车 / 打车,用不上(2026 年刚涨过价,以官网为准)'],
];
export const TICKET_STEPS = [
  '<b>买票</b>:官网或 App,选 2/10、1 日 Park Hopper(Tier 0)。',
  '<b>买完立刻约首园</b>:Theme Park Reservation 约 <b>加州冒险乐园(DCA)</b>。约满了票就砸手里,别拖。',
  '<b>两张票绑同一个 App 账号</b>:一个人统一约 Multi Pass、统一买 Single Pass,速度快一倍。',
  '<b>2/10 当天</b>:扫码进 DCA 后马上买 Multi Pass(第一个约 Soarin\');下午进 DL 先买抵抗组织崛起的 Single Pass。',
];

/* 1.2 迪士尼黑话(点卡片翻面) */
export const LINGO = [
  { ico: 'star', k: 'Park Hopper', s: '一天两园票', back: ['普通票一天只能进一个园;Park Hopper 可以换园。', '只需给首园做预约(你们约 DCA)。', '2024 年起进首园后随时可换园,没有「等到几点」的说法了。'] },
  { ico: 'cal', k: '园区预约', s: 'Theme Park Reservation', back: ['买票 ≠ 能进园:每一天还要约「首园」。', '2/10 约 DCA;约满就没法补救。', '所以买完票第一件事就是约。'] },
  { ico: 'route', k: 'Multi Pass', s: '$35/人 · 当天买', back: ['原 Genie+ 改名的 Lightning Lane Multi Pass。', '用 App 给项目约「闪电通道」时段,用掉一个才能约下一个。', '不含两个王牌:抵抗组织崛起、汽车总动员赛车。'] },
  { ico: 'coin', k: 'Single Pass', s: '王牌项目单买', back: ['抵抗组织崛起、汽车总动员赛车单独卖。', '当天 App 内买,价格当天出,每项目每天限 1 张。', '预算按往年区间留 $54–150 / 2 人(估)。'] },
  { ico: 'sun', k: 'Rope Drop', s: '开园冲刺', back: ['开园第一批进园,头 1 小时排队最短。', '2 月平日约 8:00 开(以 App 为准),提前 30 分钟到安检。', '赛车就放在这个时候打。'] },
  { ico: 'people', k: 'Single Rider', s: '单人通道', back: ['补空位的通道,2 人分开坐能省一半排队。', '汽车总动员赛车有。', '介意分开坐就别用。'] },
  { ico: 'eat', k: 'Mobile Order', s: 'App 点餐', back: ['午饭在 App 提前点好,到店按「我已到达」取餐。', '饭点现场排队 30 分钟起,App 点基本不排。'] },
  { ico: 'bubble', k: 'PhotoPass', s: '免费拍照法', back: ['园区摄影师拍的照片,App 里下载要单买,贵。', '直接把你自己的手机递给摄影师拍,免费。'] },
];

/* 1.3 / 1.4 两园打法 */
export const DCA_PLAN = [
  ['开园直奔', '<b>汽车总动员赛车</b>', '全天最长队,开园 20 分钟内能坐上;不想排就买它的 Single Pass'],
  ['第 2 站', '<b>飞跃地平线(Soarin\')</b>', '用 Multi Pass 约第一个时段;中间 B 区视野最正'],
  ['可选', '<b>蜘蛛侠 Web Slingers</b>', '挥手臂打蜘蛛机器人,费胳膊;累了就跳过'],
  ['收尾', '<b>怪兽电力公司 → 小美人鱼</b>', '两个慢速 dark ride,排队都短,当上午的收尾'],
  ['午饭', '<b>DCA 园内 Mobile Order</b>', '饭点提前 30 分钟点;San Fransokyo 的酸面包碗、Cocina Cucamonga 的 taco 都行'],
];
export const DCA_NOTE = 'Multi Pass 从开园就开始约:用掉第一个预约后,就可以开始约下午 Disneyland 的项目了(Park Hopper)。';
export const DL_PLAN = [
  ['12:30 前后', '<b>走路换园</b>', '两个园区大门面对面,走 2 分钟;进 DL 第一件事:买抵抗组织崛起的 Single Pass'],
  ['下午顺序', '<b>抵抗组织崛起 → 大雷山 → 加勒比海盗 → 鬼屋 → 印第安纳琼斯</b>', '从西边(银河边缘、边疆区)往回打,少回头路;能约 Multi Pass 的都约上'],
  ['傍晚', '<b>太空山 → 米奇与米妮无轨铁路 → 兔子罗杰</b>', '明日世界和卡通城收尾;天黑后大雷山夜景好,想二刷这时候人最少'],
  ['晚饭', '<b>Main Street 走着吃</b>', 'churro、火鸡腿、玉米热狗;灯亮起来是全天最好看的时候'],
  ['闭园', '<b>20:00–21:00(惯例,以 App 为准)</b>', '有烟花看烟花;末班班车赶不上就打车回(约 $30)'],
];

/* 1.5 班车与打车 */
export const SHUTTLE = [
  ['已确认', 'DoubleTree 有 5 英里内免费班车,Disneyland 在范围内(官网与点评一致)。'],
  ['未知', '时刻表、频率、要不要预约、座位限制 —— 官网都没写,<b>2/9 入住时问 bell desk</b>。'],
  ['决策规则', '首班到园晚于开园 → 早上去程打车;末班早于闭园 → 回程打车;班次太少 → 放弃中午回酒店休息,改在园内找地方坐(DCA 的 Animation Academy 有座有空调)。'],
  ['打车预算', '单程约 $30,预留两程 $60。Buena Park 到园区车程约 10–15 分钟。'],
];

/* 1.6 吃喝。w: DSN 园区 · LA 市区 */
export const FOODS = [
  { i: 'softserve', n: 'Dole Whip 菠萝软冰淇淋', w: 'DSN', d: 'Tiki Room 旁的 Tropical Hideaway。下午排队 10–15 分钟,园里下午茶的固定节目。' },
  { i: 'churro', n: 'Churro 西班牙油条', w: 'DSN', d: '园区小推车到处有,裹肉桂糖,趁热吃。花车巡游时人手一根。' },
  { i: 'drumstick', n: '火鸡腿', w: 'DSN', d: 'Frontierland 推车,比脸大,两人分一个正好。' },
  { i: 'corndog', n: '玉米热狗', w: 'DSN', d: 'Main Street 的 Little Red Wagon 小红车,玉米面糊现裹现炸。' },
  { i: 'breadbowl', n: '酸面包碗浓汤', w: 'DSN', d: 'DCA San Fransokyo Square:蛤蜊浓汤装进酸面包,旧金山来的吃法。' },
  { i: 'sandwich', n: '蒙地卡罗三明治', w: 'DSN', d: 'Blue Bayou / Cafe Orleans 的招牌:炸三明治蘸果酱。Blue Bayou 要订位,进园就刷 App。' },
  { i: 'burger', n: 'In-N-Out Double-Double', w: 'LA', d: '两片肉两片芝士。隐藏菜单 <b>Animal Style</b>:加烤洋葱、酸黄瓜、秘制酱;薯条点「well-done」才脆。' },
  { i: 'taco', n: '街头 taco', w: 'LA', d: 'LA 的灵魂食物:路边小推车 $2–3 一个,洋葱、香菜、莎莎酱。晚上 Figueroa 一带有摊,看哪家人多去哪家。' },
  { i: 'donut', n: 'Randy\'s Donuts', w: 'LA', d: '机场西北的 24 小时甜甜圈店,屋顶一个 10 米大甜甜圈。离 LAX 5 分钟,2/11 顺路可绕。' },
  { i: 'dip', n: '法式蘸汁三明治', w: 'LA', d: 'Philippe The Original(1908,downtown):蘸肉汁的三明治,自称发源地;另一家 Cole\'s 也说是自己发明的。' },
];
export const EATS = [
  { c: 'DSN', list: [
    ['Mobile Order 午饭', 'App 下单,两园都行', '饭点提前 30 分钟点;San Fransokyo 酸面包碗、Cocina Cucamonga 的 taco 都行', '2/10 午饭'],
    ['Dole Whip', 'Tropical Hideaway(冒险乐园一侧)', '菠萝软冰淇淋', '2/10 下午'],
    ['火鸡腿 + 玉米热狗', 'Frontierland 推车 / Main Street 小红车', '走着吃的晚饭', '2/10 傍晚'],
    ['Blue Bayou', 'New Orleans Square', '开在加勒比海盗 ride 场景里的餐厅;要订位,想吃进园就刷 App', '2/10 晚饭(可选,贵)'],
    ['备选:Main Street 甜品店', 'Main Street, U.S.A.', '闭园前看灯时顺手买', ''],
  ] },
  { c: 'LA', list: [
    ['In-N-Out 机场店', '9149 S Sepulveda Blvd', '周二开到凌晨 1 点;排队是常态,进店比得来速快', '2/9 落地第一顿'],
    ['Hollywood 一带', 'Hollywood Blvd & Highland 周边', '游客区,先看一眼评分再进', '2/11 午饭'],
    ['Getty 咖啡厅', 'Getty Center 山上', '景观位,三明治沙拉;不便宜但好看', '2/11 下午茶(可选)'],
    ['USC / Figueroa 一带', '酒店周边', '连锁快餐一堆,累了就近;想吃正经的开 10 分钟去 downtown', '2/11 晚饭'],
    ['备选:Randy\'s Donuts', '805 W Manchester Ave', '24 小时;离 LAX 近', ''],
    ['备选:Philippe The Original', '1001 N Alameda St(downtown)', '1908 年老店,法式蘸汁三明治;饭点排队', ''],
  ] },
];
export const FOOD_REGION = { DSN: '迪士尼园区', LA: '洛杉矶市区' };

/* 1.7 开园小测验 */
export const QUIZ = [
  { q: '下面哪个项目<b>不在</b> Multi Pass 里?', o: ['大雷山', '加勒比海盗', '抵抗组织崛起', '鬼屋'], a: 2, why: '抵抗组织崛起(和汽车总动员赛车)要单独买 Single Pass,当天 App 内买,每项目每天限 1 张。' },
  { q: 'Park Hopper 票,换园要怎么约?', o: ['两个园都要约', '只约首园', '完全不用约'], a: 1, why: '只约首园(你们约 DCA);进首园后当天随时换园。' },
  { q: '酒店班车首班晚于开园,怎么办?', o: ['等第二班', '打车(约 $30)', '放弃开园,多睡会儿'], a: 1, why: '开园头 1 小时排队最短,值这 $30。末班早于闭园同理,回程也打车。' },
  { q: 'Single Pass 每个项目每天能买几张?', o: ['1 张', '2 张', '不限'], a: 0, why: '每项目每天限 1 张,价格当天才出。赛车和崛起各买一张就到顶了。' },
];

/* ------------------------------------------------------------------ */
/*  二、4 日行程                                                        */
/* ------------------------------------------------------------------ */
// scene: illustration key (src/la/scenes.mjs,or images/la/art/<key>.jpg) · photo / gallery: keys in src/la/photos.mjs
// pace 1–3 · drive: the day's driving · stay: where to sleep
export const DAYS = [
  {
    n: 1, d: '2/9 周二', scene: 'innout', photo: 'innout', gallery: ['lax'], area: 'YEG → SEA → LAX', title: '飞 LA · 取车 · In-N-Out', sub: 'AS1459 转 AS487 · 落地 14:40 · 住 Buena Park', move: '两段飞机 + 取车自驾', pace: 2, tags: ['09:01 起飞', '只带手提行李'],
    steps: [
      ['07:00', '到 YEG。飞美国在这里过<b>美国预清关</b>(登机前过完美国边检),要排队,别卡点。只带手提行李,不用排托运。'],
      ['09:01', '<b>AS1459</b> 飞西雅图,09:00 到 —— 落地是太平洋时间,表上像负 1 分钟,实际约 1.5 小时。'],
      ['09:00–11:52', '西雅图转机 2 小时 52 分,很从容:吃早饭、充电。订票截图提示这里要重新托运行李 —— 只带手提就与你无关。'],
      ['11:52', '<b>AS487</b> 飞 LAX,14:40 到。'],
      ['14:40–15:40', '落地跟 <b>Rental Cars</b> 标识坐免费摆渡去租车中心取车,留 45–60 分钟(含排队)。取车拍四角 + 油表视频。'],
      ['16:00', '<b>In-N-Out 机场店</b>(9149 S Sepulveda Blvd)垫一顿:排队是常态,周二开到凌晨 1 点。点 Double-Double,Animal Style 是隐藏菜单。'],
      ['17:00', '开车去 <b>DoubleTree by Hilton Buena Park</b>(7000 Beach Blvd),35–50 分钟。入住 16:00 起;自助停车免费(已核实)。'],
      ['入住后', '<b>第一件正事:去 bell desk 问 2/10 迪士尼班车时刻表</b> —— 首班、频率、末班、要不要预约、有没有座位限制。官网只写了「免费、到 Disney」。'],
      ['晚上', '早睡。明天是全程最累的一天。'],
    ],
    eat: '下午 In-N-Out;晚饭酒店附近随便解决(Beach Blvd 上一排连锁)。',
    drive: 'LAX → In-N-Out 约 5 分钟;→ Buena Park 约 30 英里、35–50 分钟(I-105 E → I-605 N → CA-91 E)。',
    stay: { name: 'DoubleTree by Hilton Buena Park', night: '第 1 晚 / 共 2 晚', pts: ['7000 Beach Blvd, Buena Park;入住 16:00、退房 11:00', '自助停车免费,无度假村费(Hilton 官网已核实)', '5 英里内免费班车,Disneyland 在范围内 —— 时刻表入住时问 bell desk', '房费:未提供,花销表留了位'] },
    warn: '时差只有 1 小时不用刻意调,但别午睡过头;明早要早起抢开园。',
    alt: '航班延误也别慌:In-N-Out 开到凌晨 1 点,晚点也吃得上;太累就直接去酒店。',
    fun: 'In-N-Out 1948 年开在 Baldwin Park,是加州第一家得来速;机场店窗外能看飞机降落。',
  },
  {
    n: 2, d: '2/10 周三', scene: 'castle', photo: 'castle', gallery: ['carsland', 'galaxysedge'], area: '安纳海姆 · 迪士尼两园', title: '迪士尼一天两园', sub: '上午 DCA → 下午 Disneyland · Park Hopper', move: '酒店班车 / 打车,不动自己的车', pace: 3, tags: ['开园到闭园', '首园约 DCA'],
    steps: [
      ['07:15', '出门。班车首班赶不上开园就打车(约 $30)。<b>开园前 30 分钟到安检</b>。'],
      ['08:00', 'DCA 开园(惯例,以 App 为准):直奔<b>汽车总动员赛车</b>,排 standby 或买它的 Single Pass。'],
      ['09:00', '<b>飞跃地平线</b>(Multi Pass 第一个约它)→ <b>蜘蛛侠</b>(可选)→ <b>怪兽电力公司</b> → <b>小美人鱼</b>。每用掉一个 Multi Pass 就马上约下一个。'],
      ['11:30', '午饭在 DCA 用 Mobile Order 提前点。'],
      ['12:30', '换园去 Disneyland:两个大门面对面,走 2 分钟。进园<b>先买抵抗组织崛起的 Single Pass</b>。'],
      ['下午', '按顺序打:<b>抵抗组织崛起 → 大雷山 → 加勒比海盗 → 鬼屋 → 印第安纳琼斯 → 太空山 → 米奇与米妮无轨铁路 → 兔子罗杰</b>。'],
      ['傍晚', 'Main Street 走着吃晚饭:churro、火鸡腿、玉米热狗。灯亮了是全天最好看的时候。'],
      ['20:00–21:00', '闭园(惯例,以 App 为准)。有烟花看烟花;末班班车赶不上就打车回。'],
    ],
    eat: '全天园内:Mobile Order 午饭、Dole Whip 下午茶、火鸡腿 + 玉米热狗晚饭。',
    drive: '不动车。班车或打车,单程约 $30 / 10–15 分钟。',
    stay: { name: 'DoubleTree by Hilton Buena Park(同前一晚)', night: '第 2 晚 / 共 2 晚', pts: ['明早 11:00 前退房,行李今晚大体收好'] },
    warn: '抵抗组织崛起、汽车总动员赛车<b>不在 Multi Pass 里</b>,要单买 Single Pass:当天 App 内买,每项目每天限 1 张,价格当天才知道(预算 $54–150 / 2 人)。',
    alt: '班车班次太少、中午回酒店不方便:改在园内休息 —— DCA 的 Animation Academy 有座有空调,DL 的 Main Street 长椅看人也很好。想加项目:DCA 的跳楼机「银河护卫队:使命突围」把小美人鱼换掉。',
    fun: '两个园区大门只隔一个广场;DCA 站的地方,1955 年开园时是 Disneyland 的停车场。',
  },
  {
    n: 3, d: '2/11 周四', scene: 'sign', photo: 'hollywoodsign', gallery: ['tcl', 'rodeodrive', 'getty'], area: 'Buena Park → USC → 好莱坞 → 比弗利 → Getty', title: '换酒店 · 好莱坞与 Getty', sub: '11:00 前退房 · 行李寄存 USC · 四个点', move: '自驾,全天约 60 英里', pace: 2, tags: ['Getty 要预约', '15:00 入住'],
    steps: [
      ['10:30', '收拾退房(11:00 前),开车去 <b>USC Hotel</b>(3540 S Figueroa St),25–35 分钟。入住 15:00 才开始 —— 先把行李寄存在前台。'],
      ['11:15', 'USC 校园走马看花:Tommy Trojan 铜像、Doheny 图书馆外面。'],
      ['12:00', '开去 <b>Lake Hollywood Park</b> 拍好莱坞标志(35–45 分钟):最省力的正面机位,字母本身不能开车上去。'],
      ['13:00', '下山到<b>星光大道</b>、TCL 中国剧院(前院是明星手印水泥地)。午饭在 Hollywood 一带。'],
      ['15:00', '开 15 分钟到<b>比弗利山庄</b>:Rodeo Drive 看橱窗,Beverly Gardens Park 拍「Beverly Hills」标志牌。'],
      ['16:00', '开 15 分钟到 <b>Getty Center</b>(免费,但要提前约的定时入场;停车 $25)。坐缆车上山:白色建筑、仙人掌花园、向西看海。<b>17:30 闭馆</b>。'],
      ['18:00', '开回 USC Hotel 正式入住。停车约 $45/天(各渠道 $40–50,到店再确认)。'],
    ],
    eat: '午饭好莱坞;下午茶 Getty 咖啡厅(可选);晚饭 USC / Figueroa 一带。',
    drive: '三段高速 + 市区:Getty 那段走 Sepulveda 或 I-405;Lake Hollywood Park 山路窄,慢开。',
    stay: { name: 'USC Hotel', night: '第 3 晚', pts: ['3540 S Figueroa St;入住 15:00、退房 11:00', '停车约 $45/天(各渠道 $40–50,到店再确认)', '房费:未提供,花销表留了位', '明早 10:35 是出发死线'] },
    warn: 'Getty <b>17:30 闭馆</b>,别去太晚;免费入场券提前在官网约好。好莱坞标志不能开车到字母跟前,Lake Hollywood Park 是正面最省力的机位。今天是它在 2028 年春重开前的最后一个多月(3/15 起闭馆改造)。',
    alt: 'Getty 约不到 / 逛不动:换 Griffith Observatory(免费,看标志远景和全城,停车位难找);或者在比弗利多待会儿。',
    fun: '好莱坞标志 1923 年立的时候写的是「HOLLYWOODLAND」,是房地产广告;1949 年才删成现在这 9 个字母。',
  },
  {
    n: 4, d: '2/12 周五', scene: 'lax', photo: 'lax', area: 'USC → LAX → SEA → YEG', title: '回家 · 53 分钟转机', sub: '10:35 出发 · 14:00 起飞 · 21:27 到 YEG', move: '自驾还车 + 两段飞机', pace: 1, tags: ['10:35 出发', '手提行李直接走'],
    steps: [
      ['10:35', '<b>从 USC Hotel 出发(死线)</b>。算术:航班 14:00 − 提前 2 小时到航站楼 = 12:00;− 还车 + 摆渡 30 分钟 = 11:30;− USC → LAX 车程 35 分钟 = 10:55;− 拥堵预留 20 分钟 = <b>10:35</b>。'],
      ['10:35–11:30', 'USC → LAX:I-110 S → I-105 W,约 12 英里。顺路在加油站加满。'],
      ['11:30', '到租车中心还车,坐摆渡去航站楼。'],
      ['14:00', '<b>AS527</b> 飞西雅图,16:47 到。座位尽量靠前。'],
      ['16:47–17:40', '转机 <b>53 分钟</b>:只带手提行李,下机直接看大屏找登机口,别排队买吃的。'],
      ['17:40', '<b>AS1519</b> 飞埃德蒙顿,21:27 到(山地时间,比 LA 快 1 小时)。'],
    ],
    eat: '午饭在 LAX 登机前买点带上;西雅图转机没时间吃。',
    drive: 'USC → LAX 约 12 英里,算 55 分钟(含拥堵预留)。',
    stay: null,
    warn: '53 分钟是合法但很紧的转机:前序晚点就可能误机。重要物品(药、证件、充电)全在随身包里。',
    alt: '真误机:直接找 Alaska 柜台免费改签下一班 SEA → YEG;要稳就现在花钱改早一班从 LAX 走。',
    fun: 'LAX 的 Theme Building(1961)是 Googie 建筑名作,摆渡车上能看一眼。',
  },
];

/* ------------------------------------------------------------------ */
/*  三、景点                                                            */
/* ------------------------------------------------------------------ */
// c: DCA / DL / LA · r: must | worth | opt
export const SIGHTS = [
  { id: 'racers', n: 1, c: 'DCA', r: 'must', name: '汽车总动员赛车', en: 'Radiator Springs Racers', scene: 'racers', photo: 'carsland', cap: '水箱温泉镇的峡谷赛道。',
    blurb: 'DCA 王牌:先在峡谷里巡游,最后两车并排户外竞速。全天排队王,开园直奔或买 Single Pass。',
    pts: ['<b>不在 Multi Pass 里</b>:开园直奔排 standby,或当天 App 买 Single Pass(每项目每天限 1 张)', '有 Single Rider 通道:2 人分开坐,排队省一半', '6 人一车,最后一段是真正的户外竞速'],
    facts: { time: '开园 20 分钟内;白天 60–120 分钟', when: '2/10 开园第一件事', cost: '含门票;Single Pass 单买', how: 'DCA · Cars Land' },
    tip: '想二刷:傍晚花车 / 烟花时段排队会明显变短。',
    fun: 'Cars Land 的峡谷照着 66 号公路沿线搭的,天黑后整条街的霓虹灯全开,是 DCA 最好看的时候。' },
  { id: 'soarin', n: 2, c: 'DCA', r: 'worth', name: '飞跃地平线', en: "Soarin'", scene: 'soarin', photo: 'soarin', cap: '滑翔机翼下的加州。',
    blurb: '悬挂式滑翔机影院:升到空中环游,风里带气味(橙花、海洋)。',
    pts: ['Multi Pass 可约,开园就约它的第一个时段', '中间排(B 区)视野最正,边上会变形', '常规是「环游世界」版;美食节前后常换回「飞越加州」原版,碰到哪版看运气'],
    facts: { time: '约 45 分钟(含排队)', when: '2/10 上午第二站', cost: '含门票', how: 'DCA · Grizzly Peak' },
    tip: '恐高慎入:升到约 12 米,脚下悬空。',
    fun: '这套系统 2001 年在 DCA 首发,之后才被复制到全世界。' },
  { id: 'web', n: 3, c: 'DCA', r: 'opt', name: '蜘蛛侠 Web Slingers', en: 'WEB SLINGERS: A Spider-Man Adventure', scene: 'avengers', photo: 'avengers', cap: '复仇者联盟园区。',
    blurb: '不用手柄、挥手臂就能「吐丝」打蜘蛛机器人的射击 ride,玩完胳膊会酸。',
    pts: ['Multi Pass 可约', '在复仇者联盟园区,顺路看跳楼机外观和屋顶的蜘蛛侠表演', '行程把它列成可选:累了就跳过,不差这一项'],
    facts: { time: '30–45 分钟', when: '2/10 上午(可选)', cost: '含门票', how: 'DCA · Avengers Campus' },
    tip: '想玩同一园区的跳楼机(银河护卫队:使命突围),把小美人鱼换掉。',
    fun: '那座跳楼机是 2004 年的老 Tower of Terror 改的,外墙还留着原来的骨架。' },
  { id: 'pixar', n: 4, c: 'DCA', r: 'opt', name: '怪兽电力公司 · 小美人鱼', en: "Monsters, Inc. & The Little Mermaid", scene: 'pier', photo: 'pixarpier', cap: 'Pixar Pier 的摩天轮。',
    blurb: '两个坐着小车慢慢看的经典 dark ride,排队短,正好当上午的收尾。',
    pts: ['怪兽电力公司:坐出租车穿过 Monstropolis', '小美人鱼:贝壳车环游海底', '都在 Multi Pass 里,但 2 月排队本就不长,到现场看再决定约不约'],
    facts: { time: '各 20–30 分钟', when: '2/10 上午收尾', cost: '含门票', how: 'DCA · Hollywood Land / Pixar Pier' },
    tip: '想坐 Pixar Pal-A-Round 摩天轮也在这:有固定厢和摇摆厢,恐高选固定。',
    fun: 'Pixar Pier 前身是 2001 年的 Paradise Pier;那台尖叫过山车 2018 年换成了超人总动员涂装。' },
  { id: 'rise', n: 5, c: 'DL', r: 'must', name: '抵抗组织崛起', en: 'Star Wars: Rise of the Resistance', scene: 'rise', photo: 'galaxysedge', cap: '银河边缘的黑色尖峰。',
    blurb: '迪士尼乐园最强项目:不是单一 ride,是约 20 分钟的连续体验 —— 排队区、运输船、歼星舰机库、逃生车一场接一场。',
    pts: ['<b>不在 Multi Pass 里</b>:当天 App 买 Single Pass(每项目每天限 1 张,价格当天出)', '进 DL 第一件事就是买它,买完再开始排别的', '所在的银河边缘园区(Galaxy\'s Edge)本身就像一座外星集市,值得逛'],
    facts: { time: '体验约 20 分钟 + 排队', when: '2/10 换园后第一个', cost: 'Single Pass 单买', how: 'DL · Galaxy\'s Edge' },
    tip: '它爱临时故障:App 显示暂停时别走远,恢复后的队最短。',
    fun: '排队区会真的把你「押送」穿过一队风暴兵 —— 全美迪士尼里剧本最长的排队区。' },
  { id: 'bigthunder', n: 6, c: 'DL', r: 'worth', name: '大雷山', en: 'Big Thunder Mountain Railroad', scene: 'bigthunder', photo: 'bigthunder', cap: '矿区过山车。',
    blurb: '矿车过山车,刺激度温和,天黑后坐视野完全不一样。',
    pts: ['Multi Pass 可约', '傍晚人最少,夜景也最好', '想坐最后排跟工作人员说,等一班就行'],
    facts: { time: '45–60 分钟', when: '2/10 下午', cost: '含门票', how: 'DL · Frontierland' },
    tip: '二刷放傍晚,顺路看园区亮灯。',
    fun: '排队区的爆破道具是可以按着玩的。' },
  { id: 'pirates', n: 7, c: 'DL', r: 'must', name: '加勒比海盗', en: 'Pirates of the Caribbean', scene: 'pirates', photo: 'pirates', cap: '新奥尔良广场的阳台。',
    blurb: '1967 年开的水上 dark ride —— 电影是它改编的,不是反过来。新奥尔良广场里最凉快的地方。',
    pts: ['Multi Pass 可约', '两条排队通道汇流,排哪条都行', '前两排可能溅到一点水'],
    facts: { time: '约 45 分钟', when: '2/10 下午', cost: '含门票', how: 'DL · New Orleans Square' },
    tip: 'ride 里抬头看右侧的餐厅:Blue Bayou 就开在场景里,想在那吃得进园就订。',
    fun: '电影里杰克船长的不少桥段,是从这个 ride 的场景反抄出来的。' },
  { id: 'haunted', n: 8, c: 'DL', r: 'must', name: '鬼屋', en: 'Haunted Mansion', scene: 'haunted', photo: 'haunted', cap: '种植园风格的老宅。',
    blurb: '999 个鬼魂的老宅,恐怖和搞笑的平衡做得极好。2 月是原版装饰(圣诞季的限定皮肤 1 月已拆)。',
    pts: ['Multi Pass 可约', '「没有出口的拉伸房间」是剧情,别慌', 'Doom Buggy 小车会转角度,注意看每个房间'],
    facts: { time: '约 40 分钟', when: '2/10 下午', cost: '含门票', how: 'DL · New Orleans Square' },
    tip: '结尾搭车的「顺风车鬼」是投影把戏,坐中间看得最全。',
    fun: '外观是南方种植园风,原型之一在巴尔的摩。' },
  { id: 'indy', n: 9, c: 'DL', r: 'must', name: '印第安纳琼斯', en: 'Indiana Jones Adventure', scene: 'indy', photo: 'indy', cap: '神庙门口。',
    blurb: '坐越野车冲进神庙逃亡,颠簸剧烈 —— 1995 年的技术放到现在还是第一梯队。',
    pts: ['Multi Pass 可约', '晕车、腰不好慎坐', '排队区的拉杆机关是可以拉玩的'],
    facts: { time: '约 60 分钟', when: '2/10 下午', cost: '含门票', how: 'DL · Adventureland' },
    tip: '它故障率偏高:遇上了先玩别的,过会儿再回来。',
    fun: '排队区里有电影《夺宝奇兵》用过的真道具卡车。' },
  { id: 'space', n: 10, c: 'DL', r: 'worth', name: '太空山', en: 'Space Mountain', scene: 'space', photo: 'spacemountain', cap: '白色穹顶与发射塔。',
    blurb: '全黑室内过山车:看不到轨道,所以比实际刺激得多。',
    pts: ['Multi Pass 可约', '2 月是普通版(万圣节季有「鬼魂银河」皮肤)', '随身小包放脚下口袋就行'],
    facts: { time: '约 50 分钟', when: '2/10 傍晚', cost: '含门票', how: 'DL · Tomorrowland' },
    tip: '其实速度只有约 50 km/h,全靠黑暗加成。',
    fun: '1977 年开的;出口那条红蓝隧道是原版装修。' },
  { id: 'railway', n: 11, c: 'DL', r: 'worth', name: '米奇与米妮无轨铁路', en: "Mickey & Minnie's Runaway Railway", scene: 'toontown', photo: 'toontown', cap: '卡通城的圆山。',
    blurb: '2023 年开在卡通城的无轨 ride:一场 2.5 分钟的动画短片灾难,歌很洗脑。',
    pts: ['Multi Pass 可约', '卡通城 2023 年翻新过,顺路拍照', '兔子罗杰就在旁边,顺脚就去'],
    facts: { time: '约 40 分钟', when: '2/10 傍晚', cost: '含门票', how: 'DL · Mickey\'s Toontown' },
    tip: '主题曲「Nothing Can Stop Us Now」会在脑子里循环一晚上,预警。',
    fun: '排队区是「米老鼠短片回顾展」,海报上的片名全是双关语。' },
  { id: 'roger', n: 12, c: 'DL', r: 'opt', name: '兔子罗杰卡通旋转车', en: "Roger Rabbit's Car Toon Spin", scene: 'toontown', cap: '卡通城的出租车。',
    blurb: '1994 年的老派旋转车:方向盘能自己转,卡通城的活化石。',
    pts: ['Multi Pass 可约,但 standby 通常也就 20 分钟', '方向盘自己控制:转得越狠越好玩(腰不好别猛转)'],
    facts: { time: '约 30 分钟', when: '2/10 傍晚(可选)', cost: '含门票', how: 'DL · Mickey\'s Toontown' },
    tip: '时间不够就跳过的第一候选。',
    fun: '兔子罗杰是电影角色里唯一拥有自己 ride 的 —— 当年版权谈了很久。' },
  { id: 'castle', n: 13, c: 'DL', r: 'worth', name: '睡美人城堡与闭园烟花', en: 'Sleeping Beauty Castle & Fireworks', scene: 'castle', photo: 'castle', cap: '城堡与烟花。',
    blurb: '乐园的正中心,1955 年的原版城堡。傍晚从城堡前走回 Main Street,有烟花看烟花。',
    pts: ['2 月平日烟花不一定每天都有,以 App 当天日程为准', '城堡里有个小小的睡美人故事 walkthrough,顺路看', 'Main Street 亮灯是全天最好看的时候'],
    facts: { time: '看当天日程', when: '2/10 闭园前', cost: '含门票', how: '乐园正中' },
    tip: '看烟花的省力位:Main Street 中段,城堡和橱窗灯能一起看。',
    fun: '加州这座比奥兰多的小一半 —— 华特当年预算不够,故意做小,靠「强迫透视」显得远而精致。' },
  { id: 'innout', n: 14, c: 'LA', r: 'must', name: 'In-N-Out 机场店', en: 'In-N-Out Burger (LAX)', scene: 'innout', photo: 'innout', cap: '夕阳下的红白箭头招牌。',
    blurb: '加州汉堡图腾。LAX 旁边这家是「落地第一顿」的标准答案,窗外能看飞机降落。',
    pts: ['9149 S Sepulveda Blvd,离机场 5 分钟', '排队是常态:得来速更长,进店点更快', '点 Double-Double;<b>Animal Style</b>(烤洋葱 + 秘制酱)在隐藏菜单', '周二开到凌晨 1 点'],
    facts: { time: '30–45 分钟(含排队)', when: '2/9 取车后', cost: '约 $10/人', how: '取车后开 5 分钟' },
    tip: '薯条默认偏软,点「well-done」才脆;可以免费加整个烤辣椒。',
    fun: '菜单 70 多年几乎没变过;1948 年的加州第一家得来速。' },
  { id: 'sign', n: 15, c: 'LA', r: 'must', name: '好莱坞标志 · Lake Hollywood Park', en: 'Hollywood Sign from Lake Hollywood Park', scene: 'sign', photo: 'hollywoodsign', cap: '山坡上的九个大字。',
    blurb: '正面拍标志最省力的地方:一片山坡草坪,免费,停车位少。',
    pts: ['字母本身不能开车上去 —— 公园是最近、最省力的正面机位', '上山走 Canyon Lake Dr:窄、弯多、两边停满车,慢开', '上午顺光;下午略逆光但天更蓝'],
    facts: { time: '30–45 分钟', when: '2/11 中午', cost: '免费', how: '从好莱坞开 15 分钟上山' },
    tip: '别堵居民车道,别停消防栓前 —— 这一带贴条很勤。',
    fun: '1923 年立的时候写的是 HOLLYWOODLAND,是房地产广告;每个字母约 13.7 米高。' },
  { id: 'walk', n: 16, c: 'LA', r: 'worth', name: '星光大道与 TCL 中国剧院', en: 'Walk of Fame & TCL Chinese Theatre', scene: 'walk', photo: 'walkoffame', gallery: ['tcl'], cap: '人行道上的星星。',
    blurb: '2,700 多颗星星的人行道,加上 1927 年的中国剧院 —— 前院水泥地上全是明星手印脚印。',
    pts: ['剧院前院的手印脚印免费看', '华特·迪士尼的星在剧院斜对面一带,顺路找', '这条街很游客:看好包,卡通人物合影是要小费的'],
    facts: { time: '约 1 小时', when: '2/11 下午第一站', cost: '免费(停车自费)', how: '标志下山开 10 分钟;车停 Highland 中心停车楼' },
    tip: '停车楼商户消费能抵扣一部分停车费,以小票和现场牌子为准。',
    fun: '星星不是白给的:名人(或粉丝会)要出约 $75,000,还得承诺出席揭幕式。' },
  { id: 'rodeo', n: 17, c: 'LA', r: 'worth', name: '比弗利山庄 · Rodeo Drive 与标志牌', en: 'Rodeo Drive & Beverly Hills Sign', scene: 'rodeo', photo: 'rodeodrive', cap: '棕榈夹道的购物街。',
    blurb: '三个街区的奢侈品街,加 Beverly Gardens Park 的「Beverly Hills」标志牌,45 分钟拍完。',
    pts: ['Rodeo Drive 看橱窗就好,不少店里不让拍照', '标志牌在 Beverly Gardens Park(Santa Monica Blvd 与 Cañon Dr 口),喷泉边', '想看豪宅:往北随便开进两条居民区街道'],
    facts: { time: '约 45 分钟', when: '2/11 下午', cost: '免费', how: '从好莱坞开 15 分钟;市政停车楼常有前 2 小时免费(以牌子为准)' },
    tip: '日落前 1 小时光线最好,招牌和棕榈都镀金。',
    fun: '邮编 90210 因为 90 年代同名美剧,成了美国最有名的邮编。' },
  { id: 'getty', n: 18, c: 'LA', r: 'must', name: 'Getty Center', en: 'Getty Center', scene: 'getty', photo: 'getty', cap: '白色石灰岩与仙人掌花园。',
    blurb: '白色石灰岩建筑群 + 中央花园 + 俯瞰 LA 到海边。门票免费,但要提前约时段 —— 而且 2027/3/15 起闭馆一年改造,你们赶上了末班车。',
    pts: ['<b>免费但要预约</b>:提前在官网约 2/11 下午的定时入场', '停车 $25/车,停山下停车楼,坐缆车上山', '看点:中央花园、仙人掌园、梵高《鸢尾花》、向西的一层层山城海', '<b>17:30 闭馆</b>,别去太晚'],
    facts: { time: '1.5–2 小时', when: '2/11 16:00 前后入场', cost: '门票免费 + 停车 $25', how: '从比弗利开 15 分钟' },
    news: '2027/3/15 起闭馆改造,2028 年春重开(为 2028 洛杉矶奥运)——2/11 是最后一个多月。',
    tip: '向西的视野傍晚最好;建筑石料是意大利运来的石灰华,上面找得到叶子化石印。',
    fun: '1997 年开馆;这次闭馆是它建成以来最大的一次改造。' },
  { id: 'usc', n: 19, c: 'LA', r: 'opt', name: 'USC 校园', en: 'University of Southern California', scene: 'usc', photo: 'usc', cap: '红砖拱廊与棕榈。',
    blurb: '酒店就在校园里,早晚顺路走一圈:红砖拱廊、Tommy Trojan 铜像。',
    pts: ['Tommy Trojan(1930)是毕业生合影的固定机位', 'Doheny 图书馆外观;《毕业生》《阿甘正传》都来取过景', '校园免费进出,主路晚上灯很亮'],
    facts: { time: '30 分钟', when: '2/11 早晚顺路', cost: '免费', how: '酒店出门就是' },
    tip: '晚上散步走校园里的主路,比校外街区亮堂。',
    fun: '乔治·卢卡斯的母校,电影学院全美第一 —— 星球大战算半个「校产」。' },
];

/* ------------------------------------------------------------------ */
/*  四、开车与出发前                                                    */
/* ------------------------------------------------------------------ */
export const DRIVE = [
  ['取车', 'LAX 的租车公司集中在租车中心:跟着 <b>Rental Cars</b> 标识坐免费摆渡,全程留 45–60 分钟(含排队)。取车拍四角 + 油表视频,问清还车点是同一栋楼。'],
  ['高速', '最左道只用来超车;画菱形的是 <b>carpool(2+ 人)车道</b>,你们 2 人能用,但要等虚线段才能进出。LA 司机变线猛,提前看好导航出口。'],
  ['红灯右转', '先停稳、让行人和直行,然后可以右转 —— 除非牌子写 <b>NO TURN ON RED</b>。'],
  ['加油', '自助加油,先插卡或进店报枪号。<b>还车前在 LAX 附近加满</b>:租车公司收的油费最贵。'],
  ['停车 · DoubleTree', '自助停车免费(Hilton 官网已核实,无度假村费)。'],
  ['停车 · 迪士尼', '自己开车去园区约 $40/天(2026 年刚涨过,以官网为准)—— 你们坐班车 / 打车,用不上。'],
  ['停车 · 好莱坞', 'Highland 中心停车楼,商户消费能抵扣一部分(以现场为准);路边咪表看清限时。'],
  ['停车 · 比弗利', '市政停车楼常有前 2 小时免费(以牌子为准);Beverly Gardens Park 边有咪表。'],
  ['停车 · Getty', '山下停车楼 $25/车(2026 年价),坐缆车上山;门票免费但要预约。'],
  ['停车 · USC Hotel', '约 $45/天(各渠道 $40–50,Expedia 政策页写的 $45)—— 到店再确认一次。'],
  ['Lake Hollywood Park', '上山的 Canyon Lake Dr 窄、弯多、两边停满车:慢开,公园边找位,别堵居民车道。'],
  ['还车', '2/12 留 30 分钟给还车 + 摆渡;前一晚把加油点看好。'],
];

export const FLIGHTS = [
  ['2/9 周二 · AS1459', 'YEG 09:01 → SEA 09:00', '落地是太平洋时间:表上像负 1 分钟,实际约 1.5 小时。YEG 登机前过美国预清关'],
  ['2/9 · 西雅图转机', '停 2 小时 52 分', '从容:吃早饭、充电。截图提示需重新托运行李 —— 只带手提就无关'],
  ['2/9 · AS487', 'SEA 11:52 → LAX 14:40', '落地跟 Rental Cars 标识走'],
  ['2/12 周五 · AS527', 'LAX 14:00 → SEA 16:47', '座位尽量靠前,下机就是冲刺'],
  ['2/12 · 西雅图转机', '停 53 分钟', '很紧:直接看大屏找登机口,不排队买吃的'],
  ['2/12 · AS1519', 'SEA 17:40 → YEG 21:27', '落地是山地时间,比 LA 快 1 小时'],
];
export const FLIGHT_NOTE = '票价 ¥2,007/人 × 2 = <b>¥4,014</b>,只含 1 件手提行李(尺寸以 Alaska 官网为准,约 22×14×9 英寸),不含托运。';

export const TIMELINE = [
  ['现在(10/26 起)', '买 2/10 迪士尼门票 + 立刻约首园 DCA;Getty 官网约 2/11 下午免费定时入场(3/15 起闭馆一年,别拖);订两家酒店(房费发我填表);订租车;下载 Disneyland App 注册,两张票绑同一账号。'],
  ['出发前 2 周', '看 2/10 园区时间有没有公布(惯例:DL 约 8:00–22:00+,DCA 约 8/9:00–21:00);想好当天谁的手机当主力(买票、约 Multi Pass、拍照);Getty 预约截图存离线。'],
  ['出发前 2 天', '再核对园区时间与天气(2 月是 LA 雨季);租车、酒店、门票二维码全部截图离线;Alaska App 提前值机,回程座位选靠前。'],
  ['2/9 入住时', 'bell desk 问班车时刻表;定 2/10 早上班车还是打车;早睡。'],
  ['2/10 入园当天', '扫码进 DCA 马上买 Multi Pass,第一个约 Soarin\';进 DL 先买抵抗组织崛起的 Single Pass。'],
  ['2/11', 'Getty 带预约截图,17:30 闭馆别迟到;傍晚回 USC 正式入住,问清停车费。'],
  ['2/12', '10:35 出发;前一晚看好加油点,还车 + 摆渡留 30 分钟。'],
];

export const COSTS = [
  ['机票(2 人)', '¥4,014', '¥2,007/人;只含手提行李'],
  ['迪士尼门票(2 人)', '$358', 'Tier 0 Park Hopper $179×2,税前;已核实'],
  ['Multi Pass(2 人)', '$70', '$35×2,入园当天买'],
  ['Single Pass(2 项 × 2 人)', '约 $54–150', '当天 App 实价,往年区间(估)'],
  ['DoubleTree 2 晚', '待补', '停车 $0(已核实)'],
  ['USC Hotel 1 晚', '待补', '停车约 $45'],
  ['Getty 停车', '$25', '门票免费'],
  ['租车 4 天', '待补', '加油约 1 箱'],
  ['打车备选', '$0–60', '班车赶不上才用,单程约 $30'],
  ['吃(2 人 4 天)', '约 $300–400', '园里一天偏贵'],
];
export const COST_NOTE = '已知美元项小计约 $537–633,加吃的约 <b>$850–1,050</b>(不含房费和租车,等我拿到房费再补全)。';

export const PACK = [
  { g: '证件与钱', i: ['护照', '驾照(取车要)', '信用卡 + 借记卡各一张', '订单截图(机票 / 酒店 / 门票 / Getty 预约),存离线', '迪士尼门票二维码截图'] },
  { g: '随身行李(每人限 1 件)', i: ['登机箱(约 22×14×9 英寸,以 Alaska 官网为准)', '液体每瓶 ≤100 ml,装一个透明袋', '折叠背包:白天进园用,去程塞在登机箱里', '重要物品(药、证件、充电)全放手提 —— 回程转机 53 分钟,没有容错'] },
  { g: '衣物', i: ['2 月 LA:白天 18–22 ℃,晚上 8–12 ℃', '薄外套 / 卫衣 1 件', '好走的鞋:迪士尼一天 2 万步', '帽子 + 墨镜', '折叠伞(2 月是雨季)'] },
  { g: '电子与园里', i: ['充电宝(≤100 Wh,只能随身不能托运)', '充电线 + 车充', '防晒霜(2 月紫外线也不弱)', '空水壶(园区有直饮水)', '免洗洗手液', '小零食(园里贵)'] },
];

export const SOURCES = [
  ['Disneyland · 门票(Tier 日历)', 'https://disneyland.disney.go.com/tickets/'],
  ['Disneyland · 园区时间与日历', 'https://disneyland.disney.go.com/calendars/'],
  ['Disneyland · Lightning Lane(Multi / Single Pass)', 'https://disneyland.disney.go.com/lightning-lane-passes/'],
  ['Disneyland · 园区停车', 'https://disneyland.disney.go.com/guest-services/parking/'],
  ['Undercover Tourist · 2026/2027 最便宜入园日', 'https://www.undercovertourist.com/blog/cheapest-days-to-visit-disneyland/'],
  ['Expedia · DoubleTree Buena Park(自助停车免费)', 'https://www.expedia.com/Buena-Park-Hotels-DoubleTree-By-Hilton-Buena-Park.h12753.Hotel-Information'],
  ['USC Hotel 官网', 'https://uschotel.usc.edu/'],
  ['Getty Center · 参观与预约', 'https://www.getty.edu/visit/center/'],
  ['Getty 闭馆改造(The Architect’s Newspaper)', 'https://www.archpaper.com/2026/04/getty-center-renovations/'],
  ['In-N-Out · 门店查询', 'https://www.in-n-out.com/locations'],
  ['Alaska Airlines · 手提行李规定', 'https://www.alaskaair.com/content/travel-info/baggage/carry-on-luggage'],
  ['CBP · 美国预清关(含 YEG)', 'https://www.cbp.gov/travel/preclearance'],
  ['Hollywood Walk of Fame', 'https://walkoffame.com/'],
  ['TCL Chinese Theatre', 'https://www.tclchinesetheatres.com/'],
  ['Beverly Hills · Beverly Gardens Park', 'https://www.beverlyhills.org/exploring/beverlygardenspark/'],
  ['Rodeo Drive', 'https://rodeodrive-bh.com/'],
  ['Randy\'s Donuts', 'https://randysdonuts.com/'],
  ['Philippe The Original', 'https://www.philippes.com/'],
  ['USC', 'https://www.usc.edu/'],
  ['LAX', 'https://www.flylax.com/'],
];
