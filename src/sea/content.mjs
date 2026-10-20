// Content for the Kuala Lumpur · Singapore · Bali trip (9 days). Facts checked 2026-10-19.
// Anything not verified from an official source is labelled as such on the page.

export const META = {
  updated: '2026-10-19',
  cn: '2026 年 10 月 19 日',
  dates: '2027 年 1 月 24 日(周日)–2 月 1 日(周一)',
};

/* ------------------------------------------------------------------ */
export const ASSUME = [
  ['日期', '<b>2027-01-24(周日)至 02-01(周一)</b>,共 9 天。学校只在工作日接待,三所学校都放在<b>周三 01-27</b>;日期整体平移时请保持这一点。春节是 2 月 6 日,这趟在春节前一周结束。'],
  ['出发', '7 人分三批:天津 1 人、徐州 4 人、太原 2 人。01-24 在广州集合过夜,01-25 一起飞吉隆坡(14:40 落地)。'],
  ['返程', '不在本页规划(02-01 返程,你们另行安排)。本页只管到 01-31 晚上前往机场为止。'],
  ['证件', '全员中国大陆普通护照,有效期 6 个月以上。'],
  ['房间', '7 人先按 4 间房规划;巴厘岛住 4 卧的 villa(Pecatu / 乌鲁瓦图)。'],
  ['住宿区域', '吉隆坡 KLCC 区(3 晚)、新加坡滨海湾(1 晚)、巴厘岛乌鲁瓦图(2 晚)。'],
  ['长辈节奏', '每天最早 8:00 出发(周三探校 7:45),中午回酒店休息,少爬坡、少排长队、少走夜路。'],
  ['探校', '三所学校排在<b>同一天</b>:Epsom → Adcote Matrix → Seremban 午饭 → KTJ,每所约 90 分钟:校园参观 + 招生咨询,<b>不含</b>入学测评。长辈跟着去,在接待处或车上休息。'],
  ['婚礼考察', '周六 01-30:Alila Villas Uluwatu 和 Tirtha Uluwatu 各半天;周日 01-31 作备选日。'],
  ['spa', '01-29 夜里到 villa 后做 spa(要提前约);约不成就挪到 01-31。'],
  ['用车', '马来西亚与巴厘岛包车(7 位乘客 + 行李,多半要 10 座小巴级);新加坡打车 2 辆或坐地铁。'],
];
export const PENDING = [
  '孩子现在的年级、打算申请的入学年级和时间(决定每所学校该问什么)。',
  '4 位长辈有没有行走、饮食方面的限制?',
  '婚礼大概的日期、人数和预算(决定 Alila 和 Tirtha 谁更合适)。',
  '巴厘岛要不要住在 Alila(算作「试住」)?',
  '01-28 的吉隆坡 → 新加坡航班从 KLIA 还是 KLIA2 起飞?(决定几点出发去机场)',
  '01-31 选哪一条:A 悠闲,还是 B 文化(乌鲁瓦图寺 + Kecak)?',
];

export const STATUS = [
  { k: 'warn', t: '三所学校还没有预约', d: '这是第一优先级,现在就该发邮件,并写明<b>三所都要排在 1 月 27 日(周三)</b>,请每所给出具体时段。Epsom 官网招生邮箱 admissions@epsomcollege.edu.my(WhatsApp +60 16 2267 831);Adcote Matrix 的联系方式见「探校」一章;KTJ 的联系方式我没能核实,请上官网查。' },
  { k: 'warn', t: '马来西亚免签:2027 年是否延续,未确认', d: 'The Star 引内政部长的话:中国公民免签 <b>90 天</b>,现行说到 2026 年 12 月 31 日止,另说双方同意「再延 5 年」。我没找到移民局关于 2027 年的原文。你们 1 月出发,<b>出发前 4–6 周</b>必须核实;如果没有延长,要提前办签证。' },
  { k: 'warn', t: '周一双子塔闭馆', d: '01-25(周一)到吉隆坡当天不能上塔(含空中桥和观景台),所以上塔放在 01-26(周二)上午,<b>提前网上订时段</b>。另有一个来源写周一仅每月第 2、4 个周一开放,是单一来源,不要指望。' },
  { k: 'warn', t: '周六考察婚礼场地:可能有真实婚礼', d: '01-30 是周六,Alila 和 Tirtha 周六大概率有真实婚礼,可能不接受考察,或日落时段被占。邮件里同时问 01-30 和 01-31(周日),把 01-31 当备选日。' },
  { k: 'warn', t: '01-29 夜里的 spa 要提前确认', d: 'Alila Spa 官网写「最后预约 20:30」,你们约 21:30 才到 villa。请提前让 villa 管家确认能否约 22:00 的上门服务;不行就挪到 01-31。' },
  { k: 'warn', t: '春运与雨季', d: '春节是 2 月 6 日,1 月下旬的国内出发段和 2 月 1 日返程都在春运期间,机票和火车票宜早订。巴厘岛 1 月是雨季。' },
  { k: 'info', t: '滨海湾花园 2027 年停开日(官网)', d: '花穹(Flower Dome)1/12、2/2 停开;云雾林(Cloud Forest)1/19、2/23 停开。你们 01-29 去,两处都开放。' },
  { k: 'info', t: '新加坡', d: '中国普通护照 30 天免签(2024-02-09 起);入境前 3 天内填 SG Arrival Card(免费),01-28 入境,01-25 起可填。' },
  { k: 'info', t: '马来西亚', d: '入境前 3 天内在线填 MDAC,免费,每人一份(含儿童),01-25 入境,01-22 起可填。当心收费的山寨网站。' },
  { k: 'info', t: '印度尼西亚(巴厘岛)', d: '落地签现为 IDR 500,000/人,可网上办电子落地签;入境前 3 天内填 All Indonesia 申报;巴厘岛旅游税 IDR 150,000/人。8 月有提案要涨到电子签 IDR 750,000、落地办 IDR 1,000,000,尚未批准。' },
  { k: 'info', t: '已定的三段航班', d: '01-25 广州 → 吉隆坡,14:40 落地;01-28 吉隆坡 17:15 → 新加坡 18:40;01-29 新加坡 16:05 → 巴厘岛 19:00。请以出票信息为准。' },
  { k: 'ok', t: '节假日已核对,没有冲突', d: '马来西亚 Thaipusam 01-22 在出发前;联邦直辖区日 02-01 只影响吉隆坡,你们那天不在。巴厘岛 Galungan 01-13、Kuningan 01-23 都在出发前。' },
  { k: 'ok', t: '全程同一时区', d: '广州、吉隆坡、新加坡、巴厘岛都是 UTC+8,没有时差。' },
];

/* ------------------------------------------------------------------ */
/*  一、三地速览                                                       */
/* ------------------------------------------------------------------ */
export const STATS = [
  { t: 'UTC+8', l: '同一个时区', s: '广州、吉隆坡、新加坡、巴厘岛,不倒时差' },
  { t: '3', l: '个国家', s: '马来西亚 · 新加坡 · 印度尼西亚' },
  { t: '3', l: '段飞行', s: '广州→吉隆坡→新加坡→巴厘岛(返程另行安排)' },
  { t: '3', l: '所学校 · 1 天', s: 'Epsom · Adcote Matrix · KTJ,周三一天走完' },
  { t: '2', l: '家婚礼候选', s: 'Alila Villas Uluwatu · Tirtha Uluwatu' },
  { t: '30', l: '天免签(新加坡)', s: '马来西亚报道为 90 天,2027 年待核实;印尼要落地签' },
];

export const COUNTRIES = {
  sg: {
    n: '新加坡',
    scene: 'chinatown',
    rows: [
      ['货币', '新加坡元 SGD'],
      ['语言', '官方语言有 4 种:英语、华语、马来语、泰米尔语;英语通行'],
      ['入境', '中国普通护照 <b>30 天免签</b>;入境前 3 天内填 SG Arrival Card(免费)'],
      ['电', '英标三脚方头插座,230 V。<b>国内的两脚插头要带转换头</b>'],
      ['小费', '不用给。账单常已含约 10% 服务费和 9% 消费税'],
      ['规矩', '地铁和公交上<b>不能吃喝</b>;电子烟在新加坡违法,别带;榴莲不能带上地铁和进酒店'],
      ['天气', '1 月仍在东北季风期,午后常有阵雨;气温约 24–31 ℃'],
      ['急', '警察 999,救护车 995'],
    ],
  },
  my: {
    n: '马来西亚',
    scene: 'klcc',
    rows: [
      ['货币', '马来西亚林吉特 MYR'],
      ['语言', '国语是马来语;英语、华语很通行'],
      ['入境', '中国公民免签最长 <b>90 天</b>(The Star),现行<b>说到 2026-12-31</b>,另说同意再延 5 年,2027 年是否延续<b>待核实</b>;入境前 3 天内填 MDAC(免费)'],
      ['电', '英标三脚方头插座,230 V(同新加坡)'],
      ['小费', '不强制。餐厅常加约 10% 服务费和税'],
      ['规矩', '穆斯林为主,餐厅分清真 / 非清真;进清真寺要遮住肩膀和腿;递东西用右手'],
      ['天气', '全年湿热,随时有阵雨;气温约 24–33 ℃'],
      ['急', '警察、救护车、消防统一 999'],
    ],
  },
  id: {
    n: '巴厘岛(印尼)',
    scene: 'uluwatu',
    rows: [
      ['货币', '印尼盾 IDR。数字很大,用页面底部的换算器'],
      ['语言', '印尼语;巴厘语;旅游区英语通行'],
      ['入境', '落地签约 <b>IDR 500,000/人</b>(约 30 天);入境前 3 天内填 All Indonesia 申报;巴厘岛旅游税 <b>IDR 150,000/人</b>'],
      ['电', '欧标圆脚插座(C/F),230 V。要带另一种转换头'],
      ['小费', '不强制。酒店和高档餐厅常加约 10% 服务费和税,也可小额给'],
      ['规矩', '以印度教为主:路边的小供品别踩;进寺庙要穿纱笼(多数寺庙可借或租);不要摸小孩的头'],
      ['健康', '自来水<b>不能直接喝</b>,买瓶装水;雨季蚊子多,要防登革热'],
      ['天气', '1 月是雨季:气温约 24–31 ℃,多为短阵雨,午后和傍晚更常见'],
      ['急', '统一紧急号码 112'],
    ],
  },
};

export const CULTURE = [
  { ico: 'people', k: '多元共居', s: '新加坡:四种官方语言', back: ['新加坡约四分之三是华人,另有马来人和印度人。', '地铁广播、路牌都是多语的。', '英语最通行,华语在牛车水和小贩中心也好用。'] },
  { ico: 'warn', k: '规矩多', s: '新加坡:干净是罚出来的', back: ['地铁和公交上不能吃喝,乱扔垃圾要罚款。', '电子烟违法,入境前先把它留在家里。', '榴莲不能带上地铁,很多酒店也禁止。'] },
  { ico: 'bubble', k: '三大族群', s: '马来西亚:马来、华、印', back: ['马来语是国语,但英语、华语很通行。', '餐厅分清真(不含猪肉和酒)与非清真。', '进清真寺要遮住肩膀和腿,通常有长袍可借。'] },
  { ico: 'pin', k: '森美兰的特别', s: '「九邦」,受米南加保影响', back: ['Negeri Sembilan 意为「九个邦」。', '深受 Minangkabau(米南加保)文化影响:传统屋顶像水牛角。', '传统上财产按母系继承(adat perpatih)。去学校的路上,会看到不少牛角屋顶的建筑。'] },
  { ico: 'totem', k: '印度教之岛', s: '巴厘岛:每天都有供品', back: ['岛上大多数人信印度教。', '路边、店门口的小竹篮是每天的供品(canang sari),别踩。', '进寺庙要穿纱笼和腰带,多数寺庙可借或租。'] },
  { ico: 'coin', k: '标价 ≠ 结账价', s: '三国的餐厅常见「++」', back: ['新加坡约 +20%(10% 服务费 + 9% 消费税)。', '马来西亚约 +15–17%。巴厘岛高档餐厅常见 +21% 左右。', '以账单为准;这些加收不是小费。'] },
];

export const FOODS = [
  { i: 'chickenrice', n: '海南鸡饭', w: 'SG', d: '白切鸡配鸡油饭,三种酱。新加坡的 Maxwell Food Centre 最出名。' },
  { i: 'laksa', n: '叻沙', w: 'SG', d: '椰浆咖喱汤配米粉和虾,偏辣。小碗尝一下就好。' },
  { i: 'chillicrab', n: '辣椒螃蟹', w: 'SG', d: '新加坡国菜。按重量计价,<b>点之前先问价</b>,配馒头蘸汁。' },
  { i: 'kayatoast', n: '咖椰吐司', w: 'SG', d: '烤吐司夹咖椰酱和黄油,配半熟蛋和咖啡。早餐首选,老人也好入口。' },
  { i: 'nasilemak', n: '椰浆饭 Nasi Lemak', w: 'MY', d: '椰浆煮的饭,配辣椒酱、江鱼仔、花生和蛋。马来西亚的国民早餐。' },
  { i: 'bakkutteh', n: '肉骨茶', w: 'MY', d: '猪骨熬的药材汤。吉隆坡偏药材与酱油味,新加坡偏胡椒味。' },
  { i: 'rotiCanai', n: '印度煎饼 Roti Canai', w: 'MY', d: '酥软的印度煎饼,蘸咖喱。早餐、宵夜都有。' },
  { i: 'sate', n: '沙爹', w: 'MY', d: '炭烤的肉串配花生酱。三国都有,马来西亚和巴厘岛的各有风味。' },
  { i: 'babiguling', n: '巴厘烤乳猪', w: 'ID', d: '巴厘岛名菜,香料烤整只乳猪(<b>含猪肉</b>,穆斯林餐厅没有)。' },
  { i: 'seafood', n: 'Jimbaran 海鲜', w: 'ID', d: '沙滩上的炭烤海鲜。按重量称,<b>先问价格和烹饪方式</b>,7 人可以点套餐。' },
];

export const MANNERS = [
  ['钱', '三国刷卡都很普遍,但要备少量现金:新加坡元、马来西亚林吉特、印尼盾(巴厘岛的小店和停车费用现金)。'],
  ['网', '买 eSIM,三国分别买或买「东南亚通用」套餐;手机租 Wi-Fi 也行。'],
  ['电', '新加坡 / 马来西亚是英标三脚;巴厘岛是欧标圆脚。准备两种转换头,7 人至少 3 个多口充电器。'],
  ['水', '新加坡和马来西亚的自来水可饮用(多数人仍习惯买瓶装);巴厘岛<b>不能直接喝</b>。'],
  ['药', '带长辈的常用药(含英文药名)、肠胃药、退烧药、创可贴。巴厘岛雨季带驱蚊液。'],
  ['急', '新加坡 999 / 995;马来西亚 999;印尼 112。'],
  ['防晒', '每天出门涂防晒、戴帽,备轻便雨衣;室内空调很冷,带件薄外套。'],
  ['车', '三国都靠左行驶。新加坡打车、地铁很方便;马来西亚和巴厘岛建议包车加司机。'],
];

/* ------------------------------------------------------------------ */
/*  二、7 日行程                                                       */
/* ------------------------------------------------------------------ */
export const ROUTE_NOTE = {
  shape: '广州集合 1 天 → 吉隆坡 4 天(含周三探校)→ 新加坡 1 晚 + 半天 → 巴厘岛 3 天(含周六考察日)。',
  pace: '9 天里<b>最满的是周三</b>(三所学校)。其余每天都留了午休;新加坡只有半天,不要再加景点。',
  schools: '学校只在工作日接待:三所都放在 D4(1/27 周三)。预约不到的话,先舍掉最远的 KTJ,再改日期。',
};

// plane: the day's icon is a plane (flight day); photo / gallery: keys into PHOTOS (real photos, if available)
export const DAYS = [
  {
    n: 1, d: '1/24 周日', scene: 'gz', photo: 'gz', plane: true, area: '三地 → 广州', title: '广州集合', sub: '三批人汇合 · 早睡', move: '各自飞广州', pace: 1, tags: ['全员汇合', '轻松'],
    steps: [
      ['白天', '三批人分别抵达广州:天津 1 人、徐州 4 人、太原 2 人。到达时间各不相同,先入住,不用互相等。'],
      ['18:30', '全员在酒店附近汇合,吃一顿晚饭(广式晚茶、烧腊都方便,吃清淡些,明天要飞)。'],
      ['20:00', '最后一次检查:护照、MDAC 截图(入境前 3 天内填)、转换插头、长辈的药和英文药名、行李标签。'],
      ['21:30', '早睡。明早国际航班要提前约 3 小时到白云机场。'],
    ],
    eat: '晚饭选广式清淡口味;明天机上和落地后都不方便好好吃饭。',
    stay: '白云机场附近住 1 晚,次日赶飞机最省事。',
    warn: '三批人到达时间不同:先说好酒店名称和集合时间,别各自改酒店。次日国际航班要提前约 3 小时到机场。',
    alt: '有人晚点到:先到的人先睡,次日在机场值机柜台汇合。',
    fun: '天津、徐州、太原三地出发的 7 个人在广州汇合,第二天一起出国。',
  },
  {
    n: 2, d: '1/25 周一', scene: 'klcc', photo: 'klcc', plane: true, area: '广州 → 吉隆坡', title: '飞抵吉隆坡', sub: 'KLIA · KLCC 公园 · 喷泉夜景', move: '飞约 3 小时 45 分 · 包车 1–1.5 小时', pace: 2, tags: ['同一时区', '周一双子塔闭馆'],
    steps: [
      ['上午', '广州起飞,飞行约 3 小时 45 分(没有时差)。MDAC 在出发前 3 天内填好,每人一份(含儿童)。'],
      ['14:40', '吉隆坡落地。入境、取行李约 1 小时。出口找事先订好的 10 座小巴司机(不要上机场拉客的私车)。'],
      ['16:00', '包车进城约 1–1.5 小时。周一傍晚进城高峰会堵,7 人加行李,不要换地铁转车。'],
      ['17:45', '入住 KLCC 区酒店,洗澡休息 45 分钟。'],
      ['18:30', '晚饭在 <b>Suria KLCC</b> 商场(室内,走路可达):Madam Kwan\'s 或美食广场的马来西亚菜。'],
      ['20:00', 'KLCC 公园看 <b>Lake Symphony</b> 喷泉灯光秀(来源写 20:00 / 21:00 / 22:00 整点配乐场,另有 19:30 / 20:30 / 21:30 的纯灯光场,约 10–15 分钟,免费),双子塔夜景最好看。'],
      ['21:30', '回酒店,早睡。'],
    ],
    eat: 'Suria KLCC 内用餐,晚饭别吃太晚。',
    stay: '吉隆坡 KLCC 区,连住 3 晚(1/25、1/26、1/27),步行到双子塔和商场。',
    warn: '<b>周一双子塔(含空中桥、观景台)闭馆</b>,今天只在公园看外观,上塔放到明天。落地后买 eSIM、换少量林吉特,在机场就办。',
    alt: '落地太晚或太累:直接去酒店,晚饭在酒店吃,喷泉明天再看。',
    fun: 'KLCC 公园就在双子塔脚下,晚上喷泉和灯光常配着音乐。',
  },
  {
    n: 3, d: '1/26 周二', scene: 'merdeka', photo: 'towers', gallery: ['merdeka', 'petaling'], plane: false, area: '吉隆坡', title: '双子塔与老城', sub: '双子塔 · 独立广场 · 茨厂街', move: '走路 / 打车 2 辆', pace: 3, tags: ['双子塔(周二开放)', '午休'],
    steps: [
      ['07:30', '酒店早餐。带薄外套(塔上空调冷)和折叠伞。'],
      ['09:30', '<b>双子塔</b>:空中桥(41 层)+ 观景台(86 层),坐电梯,约 1–1.5 小时。周二 9:00–21:00 开放(最后入场约 20:30;第三方来源,以官网为准),<b>提前网上订时段</b>。'],
      ['11:15', 'KLCC 公园遮阴步道慢走。12:15 在 Suria KLCC 午饭。'],
      ['13:30', '回酒店午休约 2 小时(长辈、孩子都睡一觉)。'],
      ['15:45', '打车 2 辆去<b>独立广场</b>(约 15 分钟):Sultan Abdul Samad 大楼的红砖拱廊和铜顶钟楼,傍晚光线最好,外观免费。'],
      ['16:45', '走到 Masjid Jamek 清真寺外的河口(Klang 河与 Gombak 河交汇处,「吉隆坡」意为「泥泞的河口」说的就是这里),再走约 10 分钟到 <b>Central Market</b>(来源写每天 10:00–22:00,有空调,手工艺品和伴手礼)。'],
      ['18:30', '<b>茨厂街</b>(Petaling Street,吉隆坡华人街)晚饭:福建面、肉骨茶、客家菜都有。'],
      ['20:00', '打车回酒店(夜里不走路)。'],
    ],
    eat: '午饭 Suria KLCC;晚饭茨厂街。想吃夜市大排档,Jalan Alor 傍晚开摊(来源写约 17:00–23:00),但离酒店远,今天不排。',
    stay: '同一家酒店。',
    warn: '今天是走路较多的一天:午休不要省。进清真寺要遮住肩膀和膝盖,礼拜时间游客不能进。茨厂街的商品要砍价,看管好手机和钱包。雨季午后常有雷阵雨,备伞。',
    alt: '下雨:下午全改在 Central Market 和 Suria KLCC 室内逛;独立广场等雨停后再去,或舍掉。',
    fun: '双子塔 1998–2004 年是世界最高建筑,41 层的空中桥连着两座塔,也用于紧急疏散。',
  },
  {
    n: 4, d: '1/27 周三', scene: 'epsom', photo: 'epsom', plane: false, area: '吉隆坡 ⇄ 森美兰', title: '探校日:三所学校', sub: 'Epsom · Adcote Matrix · KTJ', move: '包车一整天,路上约 4 小时', pace: 4, tags: ['探校', '周三', '最满的一天'],
    steps: [
      ['07:30', '早餐。带孩子近两年的成绩单(英文版)、护照复印件、打印的问题清单。'],
      ['07:45', '一辆 10 座小巴出发,往南约 40 分钟到 Enstek(Epsom 官网:离吉隆坡市区约 40 分钟)。'],
      ['09:00', '<b>Epsom College</b>(Bandar Enstek):校园导览 + 招生咨询,约 90 分钟。'],
      ['11:00', '去 <b>Adcote Matrix</b>(Bandar Sri Sendayan,路上约 25–30 分钟,估):参观 + 咨询,约 90 分钟。'],
      ['13:00', 'Seremban 午饭(车程约 20 分钟,估):烧包(siew pao)、米南加保风味的菜(如 rendang),约 1 小时。'],
      ['15:00', '去 <b>KTJ</b>(Mantin,车程约 30 分钟,估):参观校园和宿舍 + 咨询,约 90 分钟。'],
      ['16:45', '回吉隆坡,晚高峰约 1–1.5 小时。'],
      ['18:45', '酒店附近简单晚饭,早睡。'],
    ],
    eat: 'Seremban 烧包、米南加保菜;晚饭简单吃。',
    stay: '同一家酒店。',
    warn: '一天三所,每所只给约 90 分钟,<b>别再加第四个行程</b>。三所都要预约,请要求每所给出这一天的具体时段;学校实际接待时间以回复为准(Epsom 往年写工作日 9:00–17:00,需确认)。长辈跟着去,在接待处、咖啡厅或车上休息,不用走完整个校园。把问题清单分工:谁问学术、谁问寄宿、谁问费用;让孩子自己问「一天怎么过」。',
    alt: '约不到三所同一天:舍掉最远的 KTJ,下午回市区,或在 Seremban 老城散步。',
    fun: '「森美兰」(Negeri Sembilan)意为「九邦」。传统屋顶像水牛角,深受米南加保文化影响。',
  },
  {
    n: 5, d: '1/28 周四', scene: 'birdpark', photo: 'birdpark', gallery: ['marina', 'laupasat'], plane: true, area: '吉隆坡 → 新加坡', title: '鸟园上午,夜飞狮城', sub: 'KL 飞禽公园 · 飞新加坡 · Spectra', move: '包车 1 小时 · 飞约 1 小时 25 分 · 打车', pace: 3, tags: ['上午轻松', '夜景'],
    steps: [
      ['07:30', '早餐,退房,行李寄存在酒店前台(下午取)。'],
      ['08:45', '包车到 Lake Gardens(约 20 分钟,早高峰可能 30 分钟)。'],
      ['09:00', '<b>KL 飞禽公园</b>(Bird Park,9:00–18:00)开门入场:平路加遮阴,一整片森林罩在网下,约 2–2.5 小时。成人票约 RM 85–90(第三方,未核实)。'],
      ['11:30', '离开鸟园,12:00 午饭(KLCC 或 Lake Gardens 附近)。'],
      ['13:00', '回酒店取行李,13:15 包车去机场(约 1 小时)。'],
      ['14:30', '到机场(航班 17:15,国际航班提前 2–3 小时)。办托运;低成本航司的行李额提前买好。'],
      ['17:15', '起飞,约 1 小时 25 分,18:40 到新加坡樟宜。SG Arrival Card 要在入境前 3 天内填好。'],
      ['19:30', '入境、取行李,打车 2 辆进市区(约 25–30 分钟),20:20 入住滨海湾酒店,放下行李。'],
      ['20:40', '步行到滨海湾 Event Plaza 占位,<b>21:00 Spectra</b> 灯光水舞秀(周日到周四 20:00 和 21:00 两场,约 15 分钟,免费)。'],
      ['21:30', '去 Lau Pa Sat 吃晚饭:夜里开摊的沙爹街、海南鸡饭。太累就跳过 Spectra,直接在酒店附近吃。'],
    ],
    eat: '午饭鸟园附近;晚饭 Lau Pa Sat 沙爹(吃之前先问价)。',
    stay: '新加坡滨海湾 / Bayfront 一带 1 晚(明早步行到滨海湾花园)。',
    warn: '周四 17:15 的航班:上午不排远的、不排要排长队的。吉隆坡早高峰和去机场的路都会堵,留足时间。新加坡地铁和公交上不能吃喝,电子烟违法。官网另列过一组 Spectra 例外时间(8:30 / 9:30 / 10:30,日期不明),出发前查官网。',
    alt: '想去 Batu Caves(6:00–21:00 开放,坐 KTM 约 30–45 分钟):要爬 272 级台阶,长辈在底下看就好;需要 7:00 出发,并留足回酒店取行李的时间。',
    fun: '鸟园的鸟大多是自由飞行的,走在网罩下就像走进鸟群里。',
  },
  {
    n: 6, d: '1/29 周五', scene: 'gardens', photo: 'gardens', gallery: ['cloudforest', 'flowerdome', 'jewel'], plane: true, area: '新加坡 → 巴厘岛', title: '花园半日,夜抵巴厘岛', sub: '云雾林 · 花穹 · Jewel · 飞巴厘岛', move: '打车 · 飞约 2 小时 55 分 · 包车约 1 小时', pace: 3, tags: ['新加坡半日', '入境手续多'],
    steps: [
      ['07:30', '早餐,收好行李。'],
      ['08:45', '步行或打车到滨海湾花园(从 Bayfront 站走约 10–15 分钟)。'],
      ['09:00', '<b>云雾林</b>(Cloud Forest,9:00–21:00)先进:电梯直上顶层,沿 Cloud Walk 走下来,约 1–1.5 小时,不用爬楼。'],
      ['10:20', '<b>花穹</b>(Flower Dome,9:00–21:00):凉爽的大温室,约 50 分钟。'],
      ['11:10', '擎天树群(Supertree Grove,免费)拍照,约 20 分钟。OCBC Skyway 空中步道另买票,长辈和恐高的可略。'],
      ['11:45', '回酒店取行李,12:15 打车 2 辆去樟宜(约 25–30 分钟)。'],
      ['12:50', '到 <b>Jewel</b>:午饭,看 HSBC Rain Vortex 约 40 米高的室内瀑布(免费),约 1 小时。'],
      ['14:00', '值机、托运行李。16:05 起飞,飞约 2 小时 55 分。'],
      ['19:00', '巴厘岛落地。办落地签(IDR 500,000/人)或用已办好的电子落地签;All Indonesia 申报和旅游税(IDR 150,000/人)提前在线完成,可省 30 分钟以上。'],
      ['20:15', '出机场,司机举牌接机,包车去 Pecatu / 乌鲁瓦图(夜里约 1 小时,路上经过 Jimbaran)。'],
      ['21:30', '到 villa,洗澡,吃简餐(提前和管家说好留饭)。'],
      ['22:00', 'villa 内 <b>spa</b>(提前预约)。Alila Spa 官网写最后预约 20:30,所以必须<b>提前让 villa 管家确认</b>能否约 22:00 的上门服务;不行就挪到 1/31。'],
    ],
    eat: '午饭 Jewel;晚饭 villa 简餐。',
    stay: 'Pecatu / 乌鲁瓦图 villa(7 人 4 间房),连住 1/29、1/30 两晚。',
    warn: '<b>花穹和云雾林每月各停开一天</b>:官网公布 2027 年花穹 1/12、2/2 停开,云雾林 1/19、2/23 停开,1/29 两处都开放。16:05 的航班:11:45 一定要离开花园,不要再加景点。巴厘岛 1 月是雨季,生水不能喝。',
    alt: '花穹或云雾林当天意外关闭:改在 Jewel 多待一会儿,或只逛擎天树群。',
    fun: '云雾林里有一道约 35 米高的室内瀑布,从「云雾山」顶上落下来。',
  },
  {
    n: 7, d: '1/30 周六', scene: 'tirtha', photo: 'tirtha', gallery: ['alila', 'jimbaran'], plane: false, area: '乌鲁瓦图', title: '婚礼酒店考察日', sub: 'Alila Villas Uluwatu · Tirtha Uluwatu · Jimbaran', move: '包车 15–30 分钟(估)', pace: 3, tags: ['婚礼考察', '周六', '看日落'],
    steps: [
      ['08:00', 'villa 早餐。昨晚睡得晚,不早起。'],
      ['10:00', '<b>Alila Villas Uluwatu</b>:看仪式场地(悬崖边的 Cliff Edge Cabana、悬崖草坪)、宴会场地、客房,和婚礼团队见面,约 1.5 小时。'],
      ['11:30', '试菜当午饭:中式、素食、儿童餐。顺便问清雨天备案的位置。'],
      ['13:00', '回 villa 午休约 2 小时(长辈和孩子)。'],
      ['15:30', '<b>Tirtha Uluwatu</b>:看玻璃教堂、花园和餐饮亭,约 1.5 小时。然后在餐饮亭坐着,待到约 18:40 日落,看光线、风和噪音,问婚礼策划日落前后的流程怎么排。'],
      ['19:15', '去 Jimbaran(约 30 分钟):沙滩海鲜晚餐。先问价和烹饪方式,7 人点套餐,建议提前订位。'],
      ['21:30', '回 villa。'],
    ],
    eat: '酒店试菜午饭;Jimbaran 海鲜晚饭(先问价)。',
    stay: '同一 villa。',
    warn: '<b>周六</b>:这两家周六大概率有真实婚礼,可能不接受考察或日落时段被占。邮件里同时问 1/30 和 1/31,把 1/31 当备选日。悬崖边台阶多、栏杆高度不一,长辈和孩子要有人专门陪同。雨季一定要<b>在现场</b>看雨天备案的位置。',
    alt: '1/30 约不到:把考察挪到 1/31(周日)白天,1/30 改成休息和海滩。时间够就加看第三家(同一区,来源为婚礼博客,先确认能否接待看场)。',
    fun: 'Tirtha 的玻璃教堂悬在印度洋上,据说下雨时也能在玻璃下办仪式,是雨季的天然备案(需向其书面确认)。',
  },
  {
    n: 8, d: '1/31 周日', scene: 'uluwatu', photo: 'ulutemple', gallery: ['kecak'], plane: false, area: '乌鲁瓦图', title: '最后一天:悠闲或文化', sub: '二选一 · 弹性安排', move: '包车 15–40 分钟(估)', pace: 2, tags: ['二选一', '弹性'],
    steps: [
      ['09:00', '睡到自然醒,villa 早餐。1/29 没约成 spa 的,上午补上。'],
      ['12:00', 'villa 退房,行李寄存(或直接装车)。'],
      ['A', '<b>悠闲</b>:午饭后在泳池或海边;下午再来一次 spa;晚饭在 villa,或去 Jimbaran。'],
      ['B', '<b>文化</b>:下午去<b>乌鲁瓦图寺</b>(悬崖寺庙,猴子多,要穿纱笼和腰带,门票另付),17:00 前到;<b>18:00 Kecak 火舞</b>(来源写 18:00 和 19:00 两场,约 45–60 分钟,提前 30 分钟到;票约 US$9,另加寺庙门票,第三方参考价)。台阶多,长辈可只看表演。'],
      ['晚上', '前往机场。返程不在本页规划:从乌鲁瓦图到机场约 1–1.5 小时,国际航班建议提前 3 小时到。选 B 的话,请按返程航班时间倒推,必要时砍掉 Kecak。'],
    ],
    eat: 'A:villa 或 Jimbaran;B:寺里和 Kecak 之后在附近简餐。',
    stay: 'villa 12:00 退房后无住宿(返程时间另行安排)。',
    warn: 'B 线的猴子会抢眼镜、手机、帽子,收好。行李寄存先和 villa 管家说好。',
    alt: '下雨:A 改成室内 spa 加 villa 午休;B 的 Kecak 在露天,下雨可能取消。',
    fun: 'Kecak 没有乐器,全靠几十个人的「cak-cak-cak」合唱来伴奏。',
  },
  {
    n: 9, d: '2/1 周一', scene: 'flight', plane: true, area: '巴厘岛 → 回家', title: '返程日', sub: '返程另行安排', move: '返程', pace: 1, tags: ['返程', '不在本页规划'],
    steps: [
      ['全天', '返程航班和接送由你们另行安排,本页不展开。'],
    ],
    eat: '按返程航班安排。',
    stay: '无。',
    warn: '春节(2 月 6 日)前一周,国内机场和火车都比较挤,换乘要留足时间。',
    alt: '返程航班在夜里:1/31 的活动要提前结束,具体看返程时间。',
    fun: '这趟旅行从头到尾都在 UTC+8,手机时间一次都不用改。',
  },
];

/* ------------------------------------------------------------------ */
/*  景点(非学校、非婚礼场地)                                            */
/* ------------------------------------------------------------------ */
export const SIGHTS = [
  { id: 'klcc', n: 1, c: 'MY', r: 'must', name: 'KLCC 与双子塔', en: 'KLCC & Petronas Towers', scene: 'klcc', photo: 'towers', cap: '夜里的双子塔和 KLCC 公园。',
    blurb: '吉隆坡的名片。公园免费,晚上塔身点灯,喷泉有灯光音乐。你们 1/25 晚上先在公园看外观,1/26(周二)上午上塔。',
    pts: ['双子塔:高 452 m;41 层空中桥和 86 层观景台,要预约时段', 'Lake Symphony 喷泉灯光秀:来源写 20:00 / 21:00 / 22:00 配乐场,另有 19:30 / 20:30 / 21:30 纯灯光场,免费,约 10–15 分钟', '塔下是 Suria KLCC 商场,下雨天、午休都能去', '公园有遮阴步道,长辈走得舒服'],
    facts: { time: '上塔 1–1.5 小时 + 公园 1 小时', when: '1/25 晚看喷泉,1/26 上午上塔', cost: '上塔约 US$46 起(第三方参考价,非本国居民)', how: '地铁 KLCC 站' },
    news: '据第三方票务信息:<b>周一休馆</b>(节假日除外),周二到周日约 9:00–21:00(最后入场约 20:30)。另一个来源写周一仅每月第 2、4 个周一开放,是单一来源。以官网为准。',
    tip: '上塔时段是固定的,不能改。长辈不想上塔,在公园看就够了。',
    fun: '双子塔 1998–2004 年是世界最高建筑,两座塔之间的空中桥是为了应急疏散。' },
  { id: 'merdeka', n: 2, c: 'MY', r: 'worth', name: '独立广场与吉隆坡老城', en: 'Merdeka Square & Old KL', scene: 'merdeka', photo: 'merdeka', gallery: ['petaling'], cap: '示意图:红砖拱廊与铜顶钟楼(并非实景)。',
    blurb: '吉隆坡的老城核心,几个点挨得很近,走路就能串起来:独立广场、Sultan Abdul Samad 大楼、Masjid Jamek 河口、Central Market 和茨厂街。',
    pts: ['独立广场:一大片草坪,殖民时期的行政中心,免费', 'Sultan Abdul Samad 大楼:红砖拱廊加铜顶钟楼,傍晚光线最好(外观免费)', 'Masjid Jamek:Klang 河与 Gombak 河的交汇处,「吉隆坡」的名字来自这里;进清真寺要遮住肩膀和膝盖,礼拜时游客不能进', 'Central Market:有空调的手工艺品市场,来源写每天 10:00–22:00', '茨厂街(Petaling Street):华人街和夜市,各店营业时间不一,傍晚最热闹'],
    facts: { time: '下午到傍晚约 3 小时', when: '1/26 15:45 起', cost: '外观免费;逛街吃饭另付', how: '打车 2 辆,景点之间步行约 10 分钟' },
    tip: '雨季午后常有雷阵雨:先进 Central Market 躲雨,雨停后、傍晚光线好时再回独立广场拍照。',
    fun: '「吉隆坡」(Kuala Lumpur)意为「泥泞的河口」,指的就是两条河的交汇处。' },
  { id: 'birdpark', n: 3, c: 'MY', r: 'worth', name: 'KL 飞禽公园', en: 'Kuala Lumpur Bird Park', scene: 'birdpark', photo: 'birdpark', cap: '示意图:网罩下的鸟舍与火烈鸟(并非实景)。',
    blurb: 'Lake Gardens 里的大型「走进式」鸟舍:一整片森林罩在网下,鸟大多自由飞行。全程平路、有遮阴,长辈和孩子都走得轻松。',
    pts: ['走进式大鸟舍:鸟自由飞行,可以近距离看', '每天 9:00–18:00 开放(来源写节假日也开)', '鸟类表演:来源写每天 12:30 和 15:30 在圆形剧场;你们 9:00 入场、11:30 离开,不赶这两场', 'Lake Gardens 里还有蝴蝶园、兰花园,时间够可顺路(开放时间各来源不一)'],
    facts: { time: '2–2.5 小时', when: '1/28 上午 9:00 开门入场', cost: '成人约 RM 85–90(第三方参考价,各来源不一,未核实)', how: '包车约 20 分钟,早高峰可能 30 分钟' },
    tip: '早上入场最舒服:人少、鸟活跃、不太热。航班在下午,11:30 前要离开。',
    fun: '整座鸟舍是一张巨大的网,罩住一片山谷里的森林,所以鸟能飞、人能走进去。' },
  { id: 'seremban', n: 4, c: 'MY', r: 'worth', name: 'Seremban 与米南加保文化', en: 'Seremban & Minangkabau', scene: 'seremban', photo: 'seremban', cap: '森美兰的牛角屋顶(米南加保风格)。',
    blurb: 'D4 的午饭站。Seremban 是森美兰州的首府,小城安静,适合在两所学校之间吃饭休息。',
    pts: ['Seremban 烧包(siew pao):当地的招牌点心', '米南加保风味的菜:如 rendang(牛肉干咖喱)', '沿途不少公共建筑用牛角屋顶,值得拍'],
    facts: { time: '1 小时', when: '1/27 13:00 午饭', cost: '吃喝另付', how: 'Adcote 与 KTJ 之间,顺路' },
    tip: '清真餐厅没有猪肉,想吃猪肉的要找非清真餐厅。',
    fun: '「森美兰」意为「九邦」。传统上财产按母系继承,这是米南加保人的习俗(adat perpatih)。' },
  { id: 'marina', n: 5, c: 'SG', r: 'worth', name: '滨海湾夜景与 Spectra', en: 'Marina Bay & Spectra', scene: 'marina', photo: 'marina', gallery: ['laupasat'], cap: 'Spectra 的激光与水雾,背后是金沙酒店。',
    blurb: '1/28 夜里到新加坡后的第一站:滨海湾、金沙酒店和 Lau Pa Sat 沙爹街。Spectra 灯光水舞秀在金沙酒店前的 Event Plaza 免费上演。',
    pts: ['Spectra:约 15 分钟;周日到周四 20:00 和 21:00,周五、周六加 22:00', '官网另列一组例外时间(8:30 / 9:30 / 10:30,日期不明),出发前查官网', 'Lau Pa Sat:老市集建筑,夜里沙爹街开摊(吃之前先问价)', '步道平坦,适合长辈慢走'],
    facts: { time: '2–2.5 小时(含晚饭)', when: '1/28 夜里(21:00 场)', cost: '免费;吃喝另付', how: '地铁 Bayfront / Promenade 站,或打车' },
    tip: '提前 15–20 分钟占位置。下雨会取消。太累就跳过,在酒店附近吃。',
    fun: '鱼尾狮是新加坡的象征:狮头代表「狮城」,鱼尾代表渔村的过去。' },
  { id: 'gardens', n: 6, c: 'SG', r: 'must', name: '滨海湾花园', en: 'Gardens by the Bay', scene: 'gardens', photo: 'gardens', gallery: ['cloudforest', 'flowerdome'], cap: '擎天树之间有空中步道,背后是金沙酒店。',
    blurb: '新加坡最上镜的公园。擎天树群免费开放;两个玻璃花穹(Flower Dome、Cloud Forest)要买票,里面有空调,长辈也走得舒服。',
    pts: ['Cloud Forest:室内「云雾山」和约 35 m 高的瀑布,坐电梯上、沿 Cloud Walk 走下来', 'Flower Dome:大型玻璃温室,常年凉爽', 'Supertree Grove:擎天树群,免费', 'OCBC Skyway:擎天树之间的空中步道(另买票,恐高慎选)'],
    facts: { time: '约 2.5 小时(9:00–11:30)', when: '1/29 开门就进', cost: '两个花穹联票约 S$46 起(第三方参考价)', how: '地铁 Bayfront 站' },
    news: '官网公布 2027 年停开日:花穹 1/12、2/2;云雾林 1/19、2/23。你们 1/29 去,两处都开放。花穹、云雾林 9:00–21:00,OCBC Skyway 9:00–21:00(最后入场 20:30)。',
    tip: '早上进最舒服。云雾林坐电梯上、走下来,不用爬楼。11:45 一定要离开,16:05 的航班在等。',
    fun: '擎天树高 25–50 m,树干是钢架,外面爬满真的植物。' },
  { id: 'jewel', n: 7, c: 'SG', r: 'worth', name: 'Jewel 樟宜', en: 'Jewel Changi Airport', scene: 'jewel', photo: 'jewel', cap: '玻璃穹顶中心是约 40 m 高的 Rain Vortex。',
    blurb: '樟宜机场旁的玻璃穹顶综合体。核心是 HSBC Rain Vortex 室内瀑布,周围是室内森林。去机场前的午饭站,比在机场里干等划算。',
    pts: ['HSBC Rain Vortex:约 40 m 高的室内瀑布', '晚上有免费光影秀(约 20:00 / 21:00,各来源略有差异),你们白天去,只看瀑布', '森林谷、美食街;Canopy Park 的游乐设施要另买票', '与 T1 相连,T2 / T3 有步行连廊'],
    facts: { time: '约 1 小时', when: '1/29 12:50 午饭 + 看瀑布', cost: '进入免费,Canopy Park 另付', how: '与 T1 相连' },
    tip: '带长辈和孩子只逛免费区就很好。14:00 前要去值机,别进 Canopy Park。',
    fun: '瀑布的水循环使用,从穹顶中心的开口落下来,最高落差约 40 m。' },
  { id: 'ulutemple', n: 8, c: 'ID', r: 'worth', name: '乌鲁瓦图寺与 Kecak 火舞', en: 'Uluwatu Temple & Kecak', scene: 'kecak', photo: 'ulutemple', gallery: ['kecak'], cap: '傍晚的 Kecak:几十人围着火堆合唱。',
    blurb: '建在海边悬崖上的寺庙,傍晚的 Kecak 火舞在悬崖旁的露天剧场上演,日落和舞蹈同时欣赏。1/31 的「B 文化」线。',
    pts: ['乌鲁瓦图寺:建在约 70 m 高的海边悬崖上', 'Kecak 火舞:来源写 18:00 和 19:00 两场,约 45–60 分钟,提前 30 分钟到', '寺里有不少猴子,会抢眼镜、手机、帽子', '要穿纱笼和腰带,多数可借'],
    facts: { time: '2–3 小时', when: '1/31 傍晚(B 线)', cost: '表演票约 US$9,另加寺庙门票(第三方参考价,不一)', how: '距 Pecatu 约 15–30 分钟' },
    tip: '台阶和山路不少,长辈可只看表演不逛寺。猴子别逗,眼镜帽子收好。返程时间紧就砍掉。',
    fun: 'Kecak 没有乐器,全靠人声「cak-cak-cak」的合唱来伴奏。' },
  { id: 'jimbaran', n: 9, c: 'ID', r: 'worth', name: 'Jimbaran 海滩晚餐', en: 'Jimbaran Seafood', scene: 'jimbaran', photo: 'jimbaran', cap: '沙滩上的桌子和炭火。',
    blurb: '日落时在沙滩上吃炭烤海鲜,是巴厘岛的经典一晚。适合 7 人团,点套餐比单点省心。你们 1/30 晚上看完 Tirtha 后去。',
    pts: ['在沙滩上的桌子吃,看日落', '鱼、虾、花蛤按重量称,炭火烤', '多数店有英文和中文菜单'],
    facts: { time: '2 小时', when: '1/30 晚上 19:45 前后', cost: '按重量计价', how: '从 Tirtha 约 30 分钟(估)' },
    tip: '<b>点之前问清</b>每 100 克的价格和烹饪费,7 人可点套餐。晚饭前先预订。',
    fun: 'Jimbaran 是渔村,最早的海鲜摊就在沙滩上,现在变成了一整排。' },
];

/* ------------------------------------------------------------------ */
/*  三、探校                                                            */
/* ------------------------------------------------------------------ */
export const SCHOOLS = [
  {
    id: 'epsom', n: 'A', name: 'Epsom College in Malaysia', en: 'Bandar Enstek, Negeri Sembilan', scene: 'epsom', photo: 'epsom', when: '第 4 天 09:00–10:30',
    cap: '示意图:英式红砖与钟楼(并非校园实景)。',
    blurb: '英国 Epsom College 的马来西亚分校,三所里最先去:从吉隆坡市区开约 40 分钟,上午的校园最有生气。',
    facts: [
      ['位置', 'Persiaran Kolej, Bandar Enstek, Negeri Sembilan。离 KLIA 约 15 分钟,离吉隆坡市区约 40 分钟(学校官网)'],
      ['体系', '英国国家课程:IGCSE 和 A-Level;从 3 岁到高中,走读与寄宿并存'],
      ['入学', '据报道需要入学测评和面试;你们这次只做「参观 + 咨询」,仍要问清测评的时间、形式和能否线上'],
      ['预约', '官网 Admissions 页:邮箱 admissions@epsomcollege.edu.my,WhatsApp +60 16 2267 831;往年的政策写工作日 9:00–17:00(2023/24 政策,需确认)。第三方页面列出的 admissions@epsomschool.com 是旧地址,请以官网为准'],
      ['费用', '各来源数字不一致(从约 RM 5 万到 17 万不等),<b>请直接问学校</b>'],
    ],
    note: '官网列出 2026 年 10 月 31 日(周六)的 A-Level 开放日,你们的行程赶不上;1 月 27 日的私人参观要联系招生办另约。2026–27 学年第二学期 2027-01-05 开学,1/27 是正常上课日。',
  },
  {
    id: 'adcote', n: 'B', name: 'Adcote Matrix', en: 'Bandar Sri Sendayan, Seremban', scene: 'adcote', photo: 'adcote', when: '第 4 天 11:00–12:30',
    cap: '示意图:现代校舍与草坪(并非校园实景)。',
    blurb: '原名 Matrix Global Schools,2025 年庆祝办学 10 周年。同一校园内有国际学校、私立国民学校和幼教。排在第二站,中午在 Seremban 吃饭。',
    facts: [
      ['位置', 'Bandar Sri Sendayan, Seremban。官网称离 Seremban 收费站约 10 分钟、离 KLIA 约 35 分钟'],
      ['体系', '第三方资料:小学 IPC,中学剑桥 IGCSE 与 A-Level;3–18 岁;11 岁起可寄宿(以学校为准)'],
      ['预约', 'admissions@matrixschools.edu.my。电话 1300 229 888 是马来西亚境内号码,从中国可能拨不通,<b>优先用邮件或官网表单</b>'],
      ['资料', '官网有 Open Days 与 FAQ 页:matrixschools.edu.my/applying/faqs/'],
      ['费用', '第三方资料约 RM 2.6 万–6.5 万/年,<b>请直接问学校</b>'],
    ],
    note: '官网列的校址在 Sendayan Merchant Square;出发前问清楚具体的接待地点。',
  },
  {
    id: 'ktj', n: 'C', name: 'KTJ(Kolej Tuanku Ja\'afar)', en: 'Mantin, Negeri Sembilan', scene: 'ktj', photo: 'ktj', when: '第 4 天 15:00–16:45',
    cap: '示意图:低矮红瓦校舍与大操场(并非校园实景)。',
    blurb: '森美兰王室参与创办的国际寄宿学校,英式课程,历史最久。排在最后一站:Mantin 在回吉隆坡的路上,顺路。',
    facts: [
      ['位置', '71700 Mantin, Negeri Sembilan。校园约 80 英亩(一个来源),离 LEKAS 高速很近'],
      ['体系', '英式课程:以英国国家课程为基础,加剑桥 IGCSE 和 A-Level;11 岁起可寄宿(第三方资料)'],
      ['规模', '约 1000 名学生,来自 24 个以上国家(第三方资料)'],
      ['预约', '官网 ktj.edu.my 查招生办邮箱,<b>我没能核实</b>。第三方目录页列出校长邮箱 principal@ktj.edu.my,只作联系线索;创办年份各来源写 1989 或 1991,不影响参观'],
      ['费用', '各来源数字相差很大(约 RM 2.1 万–12.5 万/年),<b>请直接问学校</b>'],
    ],
    note: '三所里它离市区最远。一天三所排不下时,先舍掉它。',
  },
];

export const SCHOOL_CHECK = [
  { g: '学术与升学', i: ['课程体系:IGCSE 之后是 A-Level 吗?初中阶段怎么过渡?', '每班多少人?老师的背景和流动性?', '近三年 A-Level / IGCSE 成绩和大学去向(英国、澳洲、香港、中国大陆)', '选科自由度,有没有拓展课程(竞赛、艺术、体育)', '英语不够好的国际生有没有 ESL / EAL 支持?'] },
  { g: '寄宿与生活', i: ['宿舍几人间?男女分区?有没有空调?', '舍监几人看多少学生?夜间安全怎么管?', '周末和假期是否必须留校?谁带孩子出门?', '饮食:有没有中餐、素食、清真之外的选择?', '手机、网络、电子设备的规则', '校医和附近医院;生病怎么处理?', '孩子的小问题:一天怎么过?周末做什么?能不能和在读的国际生聊聊?'] },
  { g: '费用', i: ['学费、寄宿费、注册费、押金、校服、考试费、交通、活动费各多少?', '学费每年涨多少?', '付款周期和退费规则', '有没有奖学金或兄弟姐妹折扣'] },
  { g: '入学与签证', i: ['什么时候入学?中途能不能插班?', '入学测评考什么、怎么考、什么时候出分?要面试吗?', '需要什么材料:成绩单、推荐信、护照、体检?', '国际学生需要什么签证 / 学生准证?由谁办理、要多久?', '国际学生需要本地监护人吗?', '春节假期和学期日历(2027 年春节 2 月 6 日)'] },
];
export const SCHOOL_DOCS = ['护照复印件(孩子 + 家长)', '孩子最近两年的成绩单(英文版或翻译件)', '现在学校的介绍和孩子的特长材料(作品、证书)', '打印的问题清单和预约确认邮件', '一支笔、一个小本子:让孩子自己记'];

export const MAIL_SCHOOL = `Subject: Campus visit request – [School name] – [date], 2027

Dear Admissions Team,

We are a family from China, travelling in Malaysia from 25 to 28 January 2027. Our child is currently in Grade [X], and we are exploring boarding options for entry in [month/year], Year/Form [X].

We would like to book a campus tour and a short admissions consultation on Wednesday 27 January 2027, ideally for about 90 minutes at [preferred time, e.g. 9:00 / 11:00 / 15:00]. We plan to visit three schools in the Negeri Sembilan area on that one day, so please propose the slot that fits best. Our group will be [N] people.

Could you please let us know:
1. Available time slots on that day, and whether a boarding house tour is possible;
2. Admission steps, entry assessment and interview format, and key intake dates;
3. Tuition, boarding and other fees for the coming academic year;
4. Support for international students (English support, guardianship, student pass);
5. Documents we should bring.

Thank you very much. We look forward to hearing from you.

Best regards,
[Name]  |  WhatsApp / WeChat: [number]  |  Email: [email]`;

/* ------------------------------------------------------------------ */
/*  四、婚礼考察                                                        */
/* ------------------------------------------------------------------ */
export const HOTELS = [
  {
    id: 'alila', name: 'Alila Villas Uluwatu', en: 'Pecatu, Uluwatu · Hyatt 旗下', scene: 'alila', photo: 'alila', when: '第 7 天(周六)10:00',
    cap: '示意图:悬崖无边际泳池与别墅(并非实景)。',
    blurb: '悬崖上的全别墅度假村。婚礼与住宿在同一处,考察时可以顺便「试住、试吃」。',
    facts: [
      ['仪式场地', 'Cliff Edge Cabana:悬崖边的仪式点,可 17:00–19:00 独享,约 50 人(Hyatt 官网婚礼页)'],
      ['其他空间', 'Library 约 25 人;CIRE Lawn 约 20 人;最大空间约 5,000 ㎡'],
      ['大型婚礼', '主泳池区域须<b>买断全酒店 2 晚</b>,最多约 300 人(Hyatt 官网婚礼页)'],
      ['数字出入', 'Hyatt 的会议页和第三方网站对人数写法不一(30、122、350、500 都有)。<b>以酒店书面报价为准</b>'],
      ['住宿', '全别墅,就在场地所在地;你们也可以住在这里,当作「试住」'],
    ],
    note: '要问清楚:哪个场地适合你们的人数、买断条件和最低消费、雨天备案的位置。',
  },
  {
    id: 'tirtha', name: 'Tirtha Uluwatu', en: 'Pecatu, Uluwatu · 悬崖婚礼场地', scene: 'tirtha', photo: 'tirtha', when: '第 7 天(周六)15:30',
    cap: '示意图:悬崖玻璃教堂(并非实景)。',
    blurb: '以悬在印度洋上的玻璃教堂(Glass Chapel)闻名,另有花园和两层餐饮亭。策划、造型、餐饮、布置都由自家团队负责。',
    facts: [
      ['位置', 'Pecatu 南部悬崖,与 Alila 同属乌鲁瓦图,同一天能看完'],
      ['场地', 'Glass Chapel(玻璃教堂)、热带花园、两层餐饮亭'],
      ['人数', '来源写法不一:约 200 人,或 20–300 人。<b>请书面确认</b>'],
      ['住宿', '<b>未查到是否有住宿</b>,请问清楚:是否只能做场地,宾客住哪里'],
    ],
    note: '玻璃教堂对雨季友好,但要书面确认「下雨时仪式怎么办、晚宴在哪、改期规则」。',
  },
];
export const HOTEL_MORE = [
  ['The Ungasan Clifftop Resort', '7 栋悬崖别墅和悬崖餐厅,可只租一栋或买断全部,适合小规模(婚礼博客来源,未核实)。'],
  ['Six Senses Uluwatu', '来源写最多约 170 人,有泳池露台和草坪,可看到寺庙(婚礼博客来源,未核实)。'],
  ['Wonderland Uluwatu', '悬崖边的空白场地,来源写最多约 300 人坐席(婚礼博客来源,未核实)。'],
];
export const WED_CHECK = [
  { g: '场地与流程', i: ['仪式点和晚宴点之间多远?有几级台阶?长辈怎么走?', '日落约 18:40:建议的仪式时间和流程怎么排?', '悬崖边的栏杆高度、风力、安全措施', '音响、乐队和噪音的截止时间', '最低消费、人数下限和上限,是否需要买断', '1/30(周六)当天场地有没有别的婚礼?仪式场地和日落时段能不能看?不行的话 1/31 能不能约?'] },
  { g: '雨季备案(1 月是雨季)', i: ['<b>书面</b>的雨天方案:有顶的位置在哪里?能容纳多少人?', '谁决定「下雨改室内」,什么时候决定?', '改期和退款规则'] },
  { g: '长辈与孩子', i: ['无障碍路线、接驳车、休息区、洗手间位置', '有没有适合孩子的活动安排和餐食'] },
  { g: '餐饮与中式环节', i: ['试菜:中式、素食、儿童餐', '自带酒水的开瓶费', '敬茶、红色布置等中式环节能不能做?限制是什么?', '有没有会说中文的协调人'] },
  { g: '住宿与交通', i: ['客房数量、房型、宾客团购价、含不含早餐', '机场到酒店的接驳安排和费用', '宾客在婚礼前后的住宿如何排'] },
  { g: '费用与合同', i: ['定金比例、付款节点、取消条款', '报价币种(USD / IDR)、服务费与税是否包含', '汇率如何锁定', '建议买婚礼取消险'] },
  { g: '法律与手续', i: ['法律婚姻 vs 仪式婚礼:酒店通常能办什么?', '印尼法律婚姻对外国人手续复杂,多数外国新人在巴厘岛办仪式,法律登记回国办。<b>请婚礼策划确认当前要求</b>', '如需法律登记:要哪些文件、提前多久、谁负责'] },
];
export const DM_CRITERIA = [
  ['景观与日落', 3], ['仪式场地氛围', 3], ['雨天备案', 3], ['长辈友好度', 2], ['住宿配套', 2], ['餐饮与试菜(含中式)', 2], ['预算透明度', 3], ['沟通与响应速度', 2], ['日期与人数灵活度', 2],
];
export const MAIL_WED = `Subject: Wedding site inspection request – [Venue] – Sat 30 Jan 2027

Dear Wedding Team,

We are planning a wedding in Bali for around [N] guests in [month/year] and are very interested in [Venue]. We will be in Uluwatu from 29 to 31 January 2027 and would like to arrange a site inspection and tasting on Saturday 30 January at [time]. If that is not possible because of events that day, Sunday 31 January would also work.

Could you please let us know:
1. Available time slots and who we will meet;
2. Ceremony and reception spaces, capacity, minimum spend and packages;
3. The wet-season (January) rain plan – covered or indoor options – in writing;
4. Accommodation options and rates for our guests, and airport transfers;
5. Sunset time and a recommended ceremony timeline;
6. Whether Chinese-style elements (tea ceremony, red décor), a Chinese menu and vegetarian options are possible;
7. Deposit, payment schedule and cancellation policy.

Thank you very much. We look forward to hearing from you.

Best regards,
[Name]  |  WhatsApp / WeChat: [number]  |  Email: [email]`;

/* ------------------------------------------------------------------ */
/*  五、出发前                                                          */
/* ------------------------------------------------------------------ */
export const TIMELINE = [
  ['现在(10 月)', '给 Epsom、Adcote Matrix、KTJ 发预约邮件,都约 1 月 27 日(周三);给 Alila 和 Tirtha 的婚礼团队发考察邮件,同时问 1 月 30 日和 31 日;订三段国际航班和徐州 / 天津 / 太原到广州的机票,以及广州、吉隆坡、新加坡、巴厘岛的住宿(春运前宜早订)。'],
  ['出发前 6 周', '核对马来西亚免签政策是否延续,不延续就要办签证;买旅行保险。'],
  ['出发前 2 周', '确认学校与婚礼酒店的最终时间;订包车(吉隆坡的机场接送和周三整天、巴厘岛的机场接送);订双子塔 1/26 上午的时段(必订)、滨海湾花园花穹 + 云雾林联票;请 villa 管家预约 1/29 夜里的 spa;订 Jimbaran 1/30 晚上的位子。'],
  ['入境前 3 天内', 'MDAC(1/25 入境,1/22 起可填)、SG Arrival Card(1/28 入境,1/25 起可填)、All Indonesia 申报(1/29 入境,1/26 起可填);缴巴厘岛旅游税;办电子落地签(可选)。'],
  ['出发当天', '带齐打印的预约确认、护照复印件、成绩单;eSIM;三种货币的少量现金。'],
];
export const FLIGHTS = [
  ['天津 / 徐州 / 太原 → 广州', '各自出发', '1/24 到广州集合,三批人到达时间不同'],
  ['广州 → 吉隆坡', '约 3 小时 45 分', '1/25 当天 14:40 落地;7 人尽量订同一订单'],
  ['吉隆坡 → 新加坡', '约 1 小时 25 分', '1/28 当天 17:15 起飞,18:40 落地;低成本航司行李另买'],
  ['新加坡 → 巴厘岛', '约 2 小时 55 分', '1/29 当天 16:05 起飞,19:00 落地;低成本航司行李另买,提前买行李额'],
];
export const PACK = [
  { g: '证件与钱', i: ['护照(有效期 6 个月以上)+ 复印件', '三国入境申报的截图 / 打印件(SG Arrival Card、MDAC、All Indonesia)', 'Visa / Mastercard 信用卡', '三种货币的少量现金', '旅行保险(含医疗和航班延误)'] },
  { g: '学校与婚礼材料', i: ['孩子近两年成绩单(英文版)', '孩子的特长材料', '学校和婚礼的问题清单(打印)', '预约确认邮件(打印)', '学校参观 smart casual 的衣服'] },
  { g: '衣物', i: ['轻薄透气的衣物 + 一件薄外套(空调房冷)', '防滑、舒服的鞋(悬崖、台阶多)', '帽子、墨镜、防晒', '轻便雨衣或折叠伞(1 月雨季)', '泳衣(酒店有泳池)'] },
  { g: '药品与电子', i: ['长辈的常用药(英文药名)', '肠胃药、退烧药、创可贴', '驱蚊液(登革热)', '英标三脚 + 欧标圆脚转换头', '多口充电器和充电宝'] },
];

export const SOURCES = [
  ['新加坡外交部 · 中新互免 30 天签证', 'https://mfa.gov.sg/Overseas-Mission/Hong-Kong/Announcements/Mutual-30-Day-Visa-Exemption-Arrangement'],
  ['SG Arrival Card(官方入口)', 'https://eservices.ica.gov.sg/sgarrivalcard'],
  ['The Star · 马中免签再延 5 年、停留 90 天', 'https://www.thestar.com.my/news/nation/2025/04/22/visa-exemptions-drew-nearly-a-million-chinese-tourists-so-far-this-year-says-saifuddin'],
  ['EY · 马来西亚对中印免签延至 2026-12-31', 'https://www.ey.com/en_gl/technical/tax-alerts/malaysia-extends-visa-exemption-period-for-india-and-china-nationals'],
  ['SAYS · 马中互免签证再延五年的报道', 'https://says.com/my/news/malaysia-china-visa-free-travel-deal-will-be-extended-another-5-years'],
  ['MDAC(官方入口)', 'https://imigresen-online.imi.gov.my/mdac/main'],
  ['马来西亚 2027 年公共假期', 'https://www.officeholidays.com/countries/malaysia/2027'],
  ['印尼落地签说明(Wego)', 'https://blog.wego.com/indonesia-visa-on-arrival/'],
  ['The Star · 印尼落地签涨价提案(2026-08)', 'https://www.thestar.com.my/aseanplus/aseanplus-news/2026/08/12/indonesia-to-raise-visa-on-arrival-fee-to-up-to-rm230'],
  ['All Indonesia(官方入口)', 'https://allindonesia.imigrasi.go.id'],
  ['Love Bali 旅游税(官方入口)', 'https://lovebali.baliprov.go.id'],
  ['Wikipedia · Galungan 与 Kuningan 日期', 'https://en.wikipedia.org/wiki/Galungan'],
  ['Epsom College Malaysia · 参观与联系', 'https://www.epsomcollege.edu.my/?p=1581'],
  ['Epsom College Malaysia · 到校交通', 'https://www.epsomcollege.edu.my/admissions/how-to-find-us/'],
  ['Epsom College Malaysia · 2026–27 学期表', 'https://epsomcollege.edu.my/wp-content/uploads/2026/03/ECM-Term-Dates-2026-27.pdf'],
  ['Adcote Matrix · 招生 FAQ', 'https://matrixschools.edu.my/applying/faqs/'],
  ['The Vibes · Adcote Matrix 十周年', 'https://www.thevibes.com/articles/education/105367/adcote-matrix-marks-10th-anniversary-vows-to-continue-providing-exceptional-education'],
  ['Boarding Schools Association · KTJ', 'https://www.boarding.org.uk/schools/kolej-tuanku-jaafar-malaysia/'],
  ['Hyatt · Alila Villas Uluwatu 婚礼', 'https://www.hyatt.com/alila-hotels-and-resorts/en-US/dpsav-alila-villas-uluwatu/weddings'],
  ['Hyatt · Spa Alila(最后预约时间)', 'https://www.hyatt.com/alila-hotels-and-resorts/en-US/dpsav-alila-villas-uluwatu/spa-alila'],
  ['Honeycombers · Tirtha Uluwatu', 'https://thehoneycombers.com/bali/tirtha-uluwatu-bali-wedding-venue/'],
  ['Bali.com · 巴厘岛 1 月天气', 'https://bali.com/weather/weather-by-month/weather-january/'],
  ['MyRapid · 双子塔开放时间', 'https://myrapid.com.my/petronas-twin-towers'],
  ['Sunway Hotels · KLCC Lake Symphony 场次', 'https://www.sunwayhotels.com/sunway-resort/explore/klcc'],
  ['Malaysia Traveller · KL 飞禽公园', 'https://malaysia-traveller.com/kl-bird-park.html'],
  ['Headout · Batu Caves', 'https://www.headout.com/blog/batu-caves/'],
  ['Marina Bay Sands · Spectra', 'https://marinabaysands.com/attractions/spectra.html'],
  ['Little Day Out · Spectra 场次', 'https://www.littledayout.com/spectra-marina-bay-sands-light-show-timings-and-other-useful-things-to-know/'],
  ['Little Day Out · Jewel Rain Vortex 光影秀', 'https://www.littledayout.com/jewel-hsbc-rain-vortex-light-show-and-times/'],
  ['Gardens by the Bay(官网公告:2027 年停开日)', 'https://www.gardensbythebay.com.sg/en/whats-on/announcements.html'],
  ['Pelago · 乌鲁瓦图 Kecak 场次与票价', 'https://www.pelago.com/en-US/activity/ppiyy2jge-uluwatu-kecak-fire-dance-show-ID/'],
];
