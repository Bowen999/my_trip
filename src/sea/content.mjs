// Content for the Singapore · Kuala Lumpur · Bali trip. Facts checked 2026-10-09.
// Anything not verified from an official source is labelled as such on the page.

export const META = {
  updated: '2026-10-09',
  cn: '2026 年 10 月 9 日',
  dates: '2027 年 1 月 24 日(周日)–30 日(周六)',
};

/* ------------------------------------------------------------------ */
export const ASSUME = [
  ['日期', '暂按 <b>2027-01-24(周日)至 01-30(周六)</b> 排。学校只在工作日接待,<b>第 3、4 天必须落在周一到周五</b>;日期整体平移时请保持这一点。春节是 2 月 6 日,这趟在春节前一周返回。'],
  ['证件', '全员中国大陆普通护照,有效期 6 个月以上。'],
  ['房间', '7 人先按 4 间房规划,确认后再调。'],
  ['酒店档次', '新加坡 / 吉隆坡四星;巴厘岛住候选酒店,或同区同档的酒店。'],
  ['长辈节奏', '每天最早 8:00 出发,中午回酒店休息,少爬坡、少排长队、少走夜路。'],
  ['探校', '三所学校各半天:校园参观 + 招生咨询,<b>不含</b>入学测评。'],
  ['婚礼考察', 'Alila Villas Uluwatu 和 Tirtha Uluwatu 各半天;其他场地可顺路加看。'],
  ['用车', '马来西亚与巴厘岛包车(7 位乘客 + 行李,多半要 10 座小巴级);新加坡打车或坐地铁。'],
];
export const PENDING = [
  '孩子现在的年级、打算申请的入学年级和时间(决定每所学校该问什么)。',
  '4 位长辈有没有行走、饮食方面的限制?',
  '婚礼大概的日期、人数和预算(决定 Alila 和 Tirtha 谁更合适)。',
  '巴厘岛要不要住在 Alila(算作「试住」,但价格最高)?',
  '吉隆坡市区想多看一点吗?目前只有第 3 晚。',
];

export const STATUS = [
  { k: 'warn', t: '三所学校还没有预约', d: '这是第一优先级,现在就该发邮件。Epsom 和 Adcote Matrix 的招生办联系方式见「探校」一章;KTJ 的联系方式我没能核实,请上官网查。' },
  { k: 'warn', t: '马来西亚免签政策:2027 年是否延续,未确认', d: '现行对中国公民免签最长 30 天,说到 2026 年 12 月 31 日止;另有「再延长五年」的报道,我没找到移民局原文。你们 1 月出发,<b>出发前 4–6 周</b>必须核实;如果没有延长,要提前办签证。' },
  { k: 'warn', t: '1 月下旬机票酒店偏贵', d: '2027 年春节是 2 月 6 日,1 月下旬是春运前的出行高峰。机票和酒店宜早订。巴厘岛 1 月是雨季。' },
  { k: 'info', t: '新加坡', d: '中国普通护照 30 天免签(2024-02-09 起);入境前 3 天内填 SG Arrival Card(免费)。' },
  { k: 'info', t: '马来西亚', d: '入境前 3 天内在线填 MDAC,免费,每人一份(含儿童)。当心收费的山寨网站。' },
  { k: 'info', t: '印度尼西亚(巴厘岛)', d: '落地签约 IDR 500,000/人,可网上办电子落地签;入境前 3 天内填 All Indonesia 申报;巴厘岛旅游税 IDR 150,000/人。有消息称落地签费用可能上调。' },
  { k: 'info', t: '广州 ⇄ 巴厘岛直飞', d: '第三方数据显示:南航每周约 14 班,TransNusa 每天 1 班,飞行约 5 小时。2027 年 1 月的时刻表请订票时核对。' },
  { k: 'ok', t: '全程同一时区', d: '广州、新加坡、吉隆坡、巴厘岛都是 UTC+8,没有时差。' },
];

/* ------------------------------------------------------------------ */
/*  一、三地速览                                                       */
/* ------------------------------------------------------------------ */
export const STATS = [
  { t: 'UTC+8', l: '同一个时区', s: '广州、新加坡、吉隆坡、巴厘岛,不倒时差' },
  { t: '3', l: '个国家', s: '新加坡 · 马来西亚 · 印度尼西亚' },
  { t: '4', l: '次飞行', s: '广州→新加坡→吉隆坡→巴厘岛→广州' },
  { t: '3', l: '所学校', s: 'Epsom · Adcote Matrix · KTJ,都在森美兰州' },
  { t: '2', l: '家婚礼候选', s: 'Alila Villas Uluwatu · Tirtha Uluwatu' },
  { t: '30', l: '天免签(新加坡)', s: '马来西亚 2027 年待核实;印尼要落地签' },
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
      ['入境', '现行免签最长 30 天,<b>说到 2026-12-31</b>,2027 年是否延续<b>待核实</b>;入境前 3 天内填 MDAC(免费)'],
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
  shape: '新加坡 2 天 → 森美兰探校 2 天(住吉隆坡 + 机场区)→ 巴厘岛 3 天(含返程日)。',
  pace: '7 天要装下三国、四次飞行、三所学校和两家婚礼酒店,<b>只有 D2 是相对轻松的一天</b>。长辈和孩子要保证睡眠,不要再加景点。',
  schools: '学校只在工作日接待:D3(周二)和 D4(周三)。预约不到的话,先改日期,再改顺序。',
};

export const DAYS = [
  {
    n: 1, d: '1/24 周日', scene: 'jewel', area: '广州 → 新加坡', title: '飞抵狮城', sub: '樟宜 Jewel · 滨海湾', move: '飞 4 小时 · 打车', pace: 1, tags: ['同一时区', '轻松'],
    steps: [
      ['上午', '广州白云机场出发,飞新加坡约 4 小时。出发前 3 天内要填好 SG Arrival Card。'],
      ['下午', '樟宜机场落地、取行李、办 eSIM。直接去相连的 <b>Jewel</b>:午饭,看 HSBC Rain Vortex 室内瀑布(约 40 m 高)。'],
      ['傍晚', '打车(要两辆)或坐地铁到市区酒店,约 30–45 分钟,洗澡休息。'],
      ['晚上', '去滨海湾滨水走走,看 <b>Spectra</b> 灯光水舞秀(免费,约 15 分钟,20:00 / 21:00)。累了就直接睡。'],
    ],
    eat: '晚饭去 Lau Pa Sat 或 Maxwell Food Centre 这样的小贩中心:沙爹、海南鸡饭、炒粿条。',
    stay: '市区(Marina Bay / Chinatown / Bugis),走几步有地铁。连住 2 晚;D3 要早起去机场,选地铁直达樟宜的站点更省事。',
    warn: '7 人在新加坡要<b>两辆车</b>;地铁和公交上不能吃喝;电子烟违法,别带。',
    alt: '航班太晚到:跳过 Jewel,直接回酒店。',
    fun: 'Jewel 的 Rain Vortex 约 40 m 高,是世界最高的室内瀑布之一。',
  },
  {
    n: 2, d: '1/25 周一', scene: 'gardens', area: '新加坡', title: '花园与老街', sub: '滨海湾花园 · 牛车水 · 夜景', move: '地铁 / 打车', pace: 2, tags: ['室内空调多', '午休'],
    steps: [
      ['上午', '<b>Gardens by the Bay</b>:9:00 开门就进。先看擎天树(Supertree Grove,免费),再进 Flower Dome 和 Cloud Forest(联票)。每月有例行停开日(2026 年多落在周二),出发前查官网当月日历。'],
      ['中午', '在滨海湾附近吃饭,回酒店午休约 1.5 小时。'],
      ['下午', '15:30 <b>牛车水</b>:佛牙寺、马里安曼印度庙(新加坡最古老的印度庙)、Chinatown Complex 熟食中心。春节前街上有装饰和年货市集,2027 年的点灯日期未公布;2026 年是春节前约 2.5 周点灯,以官方为准。'],
      ['傍晚', '晚饭在牛车水的小贩中心,或订位吃辣椒螃蟹(先问价)。'],
      ['夜晚', '回滨海湾:鱼尾狮公园、金沙酒店前的 Spectra(20:00 / 21:00),拍夜景。'],
    ],
    eat: '海南鸡饭、叻沙、咖椰吐司早餐。',
    stay: '同一家酒店。',
    warn: '湿热加阵雨:每天安排一次回酒店午休;长辈每天走路控制在 6000–8000 步。',
    alt: '下雨:去金沙酒店的艺术科学博物馆(室内),或在 Jewel / 商场里走走。',
    fun: '新加坡有 4 种官方语言:英语、华语、马来语和泰米尔语。',
  },
  {
    n: 3, d: '1/26 周二', scene: 'epsom', area: '新加坡 → 吉隆坡', title: '第一所学校', sub: '早班机 · Epsom College · 双子塔', move: '飞 1 小时 · 包车', pace: 3, tags: ['探校', '周二'],
    steps: [
      ['上午', '8:00 出发去樟宜,乘早班机飞吉隆坡(约 1 小时,没有时差)。MDAC 在出发前 3 天内填好,每人一份。'],
      ['中午', 'KLIA 落地约 11:00:取行李、包车(10 座小巴级,或商务车加行李车),在机场或 Nilai 午饭。'],
      ['下午', '14:00–16:30 <b>Epsom College</b>(Bandar Enstek,离 KLIA 约 15 分钟):校园导览 + 招生咨询。要提前预约。'],
      ['傍晚', '驱车约 40 分钟,入住吉隆坡市区(KLCC 或 Bukit Bintang)。'],
      ['晚上', 'KLCC 公园看双子塔点灯(免费),附近吃晚饭。想上塔的另订时段(周一休馆,周二照常)。'],
    ],
    eat: '肉骨茶、福建面、海南鸡饭、印度煎饼;晚饭别吃太晚,明早 8:00 出发。',
    stay: '吉隆坡市区一晚(KLCC 或 Bukit Bintang)。',
    warn: '学校参观穿 smart casual。带孩子近两年的成绩单(英文版)、护照复印件、问题清单。航班晚点要立刻邮件通知学校。',
    alt: '航班大幅延误:D3 直接去酒店;D4 排 Epsom 上午 + Adcote Matrix 下午,KTJ 放弃(它最远)。',
    fun: '「吉隆坡」(Kuala Lumpur)意为「泥泞的河口」。双子塔高 452 m,1998–2004 年是世界最高建筑。',
  },
  {
    n: 4, d: '1/27 周三', scene: 'ktj', area: '森美兰', title: '两所学校 + 一顿本地午饭', sub: 'KTJ · Seremban · Adcote Matrix', move: '包车约 3–4 小时', pace: 4, tags: ['探校', '最满的一天'],
    steps: [
      ['早上', '8:00 从吉隆坡出发,往南约 1 小时到 Mantin。'],
      ['上午', '09:30–12:00 <b>KTJ</b>(Kolej Tuanku Ja\'afar,Mantin):参观校园和宿舍,招生咨询。'],
      ['中午', '去 Seremban 午饭:试试 Seremban 烧包(siew pao)和米南加保风味的菜(如 rendang 牛肉干咖喱)。'],
      ['下午', '14:00–16:30 <b>Adcote Matrix</b>(Bandar Sri Sendayan):参观 + 咨询。'],
      ['傍晚', '驱车约 35 分钟到 KLIA 区酒店,晚饭,早睡。'],
    ],
    eat: 'Seremban 烧包、米南加保菜;晚饭在机场区,简单吃。',
    stay: 'KLIA / Sepang 机场区一晚(明早飞巴厘岛,不用赶路)。',
    warn: '一天两所学校加来回车程约 3–4 小时,每所只给半天,<b>别再塞第三个行程</b>。把问题清单打印出来分工:谁问学术、谁问寄宿、谁问费用;让孩子自己问「一天怎么过」。',
    alt: '某所学校约不到这一天:把 D4 上午空出来当缓冲,改成 Seremban 老城散步 + 午饭。',
    fun: '「森美兰」(Negeri Sembilan)意为「九邦」。传统屋顶像水牛角,深受米南加保文化影响。',
  },
  {
    n: 5, d: '1/28 周四', scene: 'flight', area: '吉隆坡 → 巴厘岛', title: '飞去巴厘岛', sub: 'KLIA → DPS · Pecatu 入住', move: '飞 3 小时 10 分 · 包车 1–1.5 小时', pace: 3, tags: ['入境手续多', '雨季'],
    steps: [
      ['上午', '从 KLIA 飞巴厘岛(DPS,约 3 小时 10 分,同一时区)。航班时刻 2027 年 1 月请核对,优先选上午班次。'],
      ['下午', '落地:办落地签(IDR 500,000/人)或提前办电子落地签;All Indonesia 申报和巴厘岛旅游税(IDR 150,000/人)提前在线完成可省时间。包车去 Pecatu / 乌鲁瓦图,约 1–1.5 小时(看路况)。'],
      ['傍晚', '入住,在悬崖边看日落(约 18:40)。'],
      ['晚上', '酒店晚餐。想看 Kecak 火舞:乌鲁瓦图寺 18:00 场约 45 分钟,提前 30 分钟到。台阶多,长辈可放弃。'],
    ],
    eat: '酒店晚餐,第一晚别吃太辣、太生冷。',
    stay: 'Pecatu / 乌鲁瓦图 2 晚。住 Alila Villas Uluwatu 等于「试住」候选酒店;预算不够就住同区四星酒店,只做看房和试菜。',
    warn: '1 月是雨季,午后和傍晚常有阵雨;生水不能喝;用驱蚊液防登革热;机场入境排队长,留足时间。',
    alt: '航班晚到:当天直接入住,D6 照原计划。',
    fun: '「Uluwatu」来自巴厘语:ulu 是「尽头」,watu 是「石头」——石头的尽头。',
  },
  {
    n: 6, d: '1/29 周五', scene: 'tirtha', area: '乌鲁瓦图', title: '婚礼酒店考察日', sub: 'Alila Villas Uluwatu · Tirtha Uluwatu', move: '包车 15–25 分钟(估)', pace: 3, tags: ['婚礼考察', '看日落'],
    steps: [
      ['上午', '10:00 <b>Alila Villas Uluwatu</b>:看仪式场地(悬崖边小屋 Cliff Edge Cabana、悬崖草坪)、宴会场地、客房;约试菜。'],
      ['中午', '在酒店午餐(顺便试菜)。'],
      ['下午', '15:00 <b>Tirtha Uluwatu</b>:看玻璃教堂和餐厅亭。特意选在婚礼同一时段(16:00–18:30)去,看光线、风和噪音。'],
      ['傍晚', '日落约 18:40:在 Tirtha 或酒店看日落,问婚礼策划:日落前后的流程怎么排。'],
      ['晚上', '去 Jimbaran 沙滩吃海鲜晚餐(车程约 30 分钟),或回酒店吃。'],
    ],
    eat: '酒店午餐试菜;晚饭 Jimbaran 海鲜(先问价)。',
    stay: '同一酒店。',
    warn: '悬崖边台阶多、栏杆高度各不同,长辈和孩子要有人专门陪同。雨季一定要<b>在现场</b>看雨天备案的位置。',
    alt: '时间够就加看第三家(同一区:The Ungasan Clifftop Resort 适合小规模、Six Senses Uluwatu 等,来源为婚礼博客,先确认能否接待看场)。',
    fun: 'Tirtha 的玻璃教堂悬在印度洋上,据说下雨时也能在玻璃下办仪式,是雨季的天然备案(需向其书面确认)。',
  },
  {
    n: 7, d: '1/30 周六', scene: 'uluwatu', area: '乌鲁瓦图 → 广州', title: '收尾与回家', sub: '确认报价 · 机场 · 直飞广州', move: '包车 1–1.5 小时 · 飞 5 小时', pace: 2, tags: ['留缓冲', '直飞'],
    steps: [
      ['上午', '睡到自然醒,早餐。和婚礼策划收尾:报价、定金、取消条款、可订日期(拍照留存)。'],
      ['中午', '12:30 左右出发去机场(1–1.5 小时),国际航班提前 3 小时到。'],
      ['下午', '机场吃饭、买伴手礼(巴厘咖啡、椰子糖)。'],
      ['晚上', '直飞广州。第三方数据显示 TransNusa 约 19:50 起飞(每天 1 班),南航另有 00:40 和 08:40 的班次;抵达广州在次日凌晨,提前安排好接送。'],
    ],
    eat: '机场或酒店早午餐。',
    stay: '无(夜间航班离开)。',
    warn: '航班时刻是第三方数据,订票前核对。凌晨抵达广州,别忘了安排老人孩子的回家交通。',
    alt: '想早点回家:订 08:40 的南航航班,考察要在 D6 全部结束。',
    fun: '巴厘岛、新加坡、吉隆坡和广州同在 UTC+8,飞一圈没有时差,这是这条线对老人和孩子最友好的地方。',
  },
];

/* ------------------------------------------------------------------ */
/*  景点(非学校、非婚礼场地)                                            */
/* ------------------------------------------------------------------ */
export const SIGHTS = [
  { id: 'jewel', n: 1, c: 'SG', r: 'must', name: 'Jewel 樟宜', en: 'Jewel Changi Airport', scene: 'jewel', cap: '玻璃穹顶中心是约 40 m 高的 Rain Vortex。',
    blurb: '樟宜机场旁的玻璃穹顶综合体。核心是 HSBC Rain Vortex 室内瀑布,周围是室内森林。落地当天顺路逛,比直接回酒店划算。',
    pts: ['HSBC Rain Vortex:约 40 m 高的室内瀑布', '晚上有免费光影秀(约 20:00 / 21:00,周五至周日加 22:00,各来源略有差异)', '森林谷、美食街;Canopy Park 的游乐设施要另买票', '与 T1 相连,T2 / T3 有步行连廊'],
    facts: { time: '2–3 小时', when: '落地当天下午或晚上', cost: '进入免费,Canopy Park 另付', how: '与 T1 相连' },
    tip: '带长辈和孩子只逛免费区就很好。光影秀时间以官网为准。',
    fun: '瀑布的水循环使用,从穹顶中心的开口落下来,最高落差约 40 m。' },
  { id: 'gardens', n: 2, c: 'SG', r: 'must', name: '滨海湾花园', en: 'Gardens by the Bay', scene: 'gardens', cap: '擎天树之间有空中步道,背后是金沙酒店。',
    blurb: '新加坡最上镜的公园。擎天树群免费开放;两个玻璃花穹(Flower Dome、Cloud Forest)要买票,里面有空调,长辈也走得舒服。',
    pts: ['Supertree Grove:擎天树群,免费;傍晚有灯光秀,时间以官网为准', 'Flower Dome:大型玻璃温室,常年凉爽', 'Cloud Forest:室内「云雾山」和约 35 m 高的瀑布', 'OCBC Skyway:擎天树之间的空中步道(要买票,恐高慎选)'],
    facts: { time: '半天', when: '9:00 开门就进', cost: '两个花穹联票约 S$46 起(第三方参考价)', how: '地铁 Bayfront 站' },
    news: '每月有例行停开日(2026 年多落在周二)。出发前查官网当月日历。',
    tip: '早上进最舒服,中午太晒。擎天树免费,晚上更好看。',
    fun: '擎天树高 25–50 m,树干是钢架,外面爬满真的植物。' },
  { id: 'chinatown', n: 3, c: 'SG', r: 'worth', name: '牛车水', en: 'Chinatown', scene: 'chinatown', cap: '彩色老店屋和春节前的红灯笼。',
    blurb: '老店屋、寺庙、小贩中心都挤在几条街里,走路 10 分钟能看完。春节前夕街上有装饰和年货市集。',
    pts: ['佛牙寺(Buddha Tooth Relic Temple)', '马里安曼印度庙:新加坡最古老的印度庙,1827 年建', 'Chinatown Complex 熟食中心:新加坡最大的熟食中心之一', '春节装饰和年货市集(2027 年日期未公布,以官方为准)'],
    facts: { time: '半天', when: '下午到晚上', cost: '免费', how: '地铁 Chinatown 站' },
    tip: '寺庙要穿得保守些(遮肩膀和膝盖)。下午最热,先在室内休息。',
    fun: '同一条街上,能看到佛寺、印度庙和清真寺。' },
  { id: 'marina', n: 4, c: 'SG', r: 'worth', name: '滨海湾夜景', en: 'Marina Bay & Spectra', scene: 'marina', cap: 'Spectra 的激光与水雾,背后是金沙酒店。',
    blurb: '鱼尾狮公园、金沙酒店、滨海湾沿岸步道。晚上 Spectra 灯光水舞秀在金沙酒店前的 Event Plaza 免费上演。',
    pts: ['鱼尾狮公园:拍照点', 'Spectra:约 15 分钟,20:00 和 21:00(周五、周六加 22:00,以官网为准)', '步道平坦,适合长辈慢走'],
    facts: { time: '2 小时', when: '傍晚到晚上', cost: '免费', how: '地铁 Bayfront / Promenade 站' },
    tip: '提前 20 分钟占位置。下雨会取消。',
    fun: '鱼尾狮是新加坡的象征:狮头代表「狮城」,鱼尾代表渔村的过去。' },
  { id: 'klcc', n: 5, c: 'MY', r: 'must', name: 'KLCC 与双子塔', en: 'KLCC & Petronas Towers', scene: 'klcc', cap: '夜里的双子塔和 KLCC 公园。',
    blurb: '吉隆坡的名片。公园免费,晚上塔身点灯,喷泉有灯光音乐。想上塔的另订时段。',
    pts: ['双子塔:高 452 m;空中桥和观景台要预约时段', 'KLCC 公园:免费,晚上有喷泉表演(时间以现场为准)', '塔下是 Suria KLCC 商场,下雨天、午休都能去'],
    facts: { time: '2 小时', when: '晚上', cost: '上塔约 US$46 起(第三方参考价,非本国居民)', how: '地铁 KLCC 站' },
    news: '据第三方票务信息:周一休馆(节假日除外),周二到周日约 9:00–20:30。以官网为准。',
    tip: '上塔时段是固定的,不能改。长辈不想上塔,在公园看就够了。',
    fun: '双子塔 1998–2004 年是世界最高建筑,两座塔之间的空中桥是为了应急疏散。' },
  { id: 'seremban', n: 6, c: 'MY', r: 'worth', name: 'Seremban 与米南加保文化', en: 'Seremban & Minangkabau', scene: 'seremban', cap: '森美兰的牛角屋顶(米南加保风格)。',
    blurb: 'D4 的午饭站。Seremban 是森美兰州的首府,小城安静,适合在两所学校之间吃饭休息。',
    pts: ['Seremban 烧包(siew pao):当地的招牌点心', '米南加保风味的菜:如 rendang(牛肉干咖喱)', '沿途不少公共建筑用牛角屋顶,值得拍'],
    facts: { time: '1.5 小时', when: 'D4 中午', cost: '吃喝另付', how: '学校之间顺路' },
    tip: '清真餐厅没有猪肉,想吃猪肉的要找非清真餐厅。',
    fun: '「森美兰」意为「九邦」。传统上财产按母系继承,这是米南加保人的习俗(adat perpatih)。' },
  { id: 'ulutemple', n: 7, c: 'ID', r: 'worth', name: '乌鲁瓦图寺与 Kecak 火舞', en: 'Uluwatu Temple & Kecak', scene: 'kecak', cap: '傍晚的 Kecak:几十人围着火堆合唱。',
    blurb: '建在海边悬崖上的寺庙,傍晚的 Kecak 火舞在悬崖旁的露天剧场上演,日落和舞蹈同时欣赏。',
    pts: ['乌鲁瓦图寺:建在约 70 m 高的海边悬崖上', 'Kecak 火舞:18:00 场约 45 分钟(另有 19:00 场),提前 30 分钟到', '寺里有不少猴子,会抢眼镜、手机、帽子', '要穿纱笼和腰带,多数可借'],
    facts: { time: '2–3 小时', when: '傍晚', cost: '寺庙门票和表演票另付(第三方价格不一)', how: '距 Pecatu 酒店约 15–30 分钟' },
    tip: '台阶和山路不少,长辈可只看表演不逛寺。猴子别逗,眼镜帽子收好。',
    fun: 'Kecak 没有乐器,全靠人声「cak-cak-cak」的合唱来伴奏。' },
  { id: 'jimbaran', n: 8, c: 'ID', r: 'worth', name: 'Jimbaran 海滩晚餐', en: 'Jimbaran Seafood', scene: 'jimbaran', cap: '沙滩上的桌子和炭火。',
    blurb: '日落时在沙滩上吃炭烤海鲜,是巴厘岛的经典一晚。适合 7 人团,点套餐比单点省心。',
    pts: ['在沙滩上的桌子吃,看日落', '鱼、虾、花蛤按重量称,炭火烤', '多数店有英文和中文菜单'],
    facts: { time: '2 小时', when: '日落前后', cost: '按重量计价', how: '从乌鲁瓦图约 30 分钟(估)' },
    tip: '<b>点之前问清</b>每 100 克的价格和烹饪费,7 人可点套餐。晚饭前先预订。',
    fun: 'Jimbaran 是渔村,最早的海鲜摊就在沙滩上,现在变成了一整排。' },
];

/* ------------------------------------------------------------------ */
/*  三、探校                                                            */
/* ------------------------------------------------------------------ */
export const SCHOOLS = [
  {
    id: 'epsom', n: 'A', name: 'Epsom College in Malaysia', en: 'Bandar Enstek, Negeri Sembilan', scene: 'epsom', when: '第 3 天 14:00–16:30',
    cap: '示意图:英式红砖与钟楼(并非校园实景)。',
    blurb: '英国 Epsom College 的马来西亚分校,离 KLIA 最近,所以放在落地当天。',
    facts: [
      ['位置', 'Persiaran Kolej, Bandar Enstek, Negeri Sembilan。离 KLIA 约 15 分钟,离吉隆坡市区约 40 分钟(学校官网)'],
      ['体系', '英国国家课程:IGCSE 和 A-Level;从 3 岁到高中,走读与寄宿并存'],
      ['入学', '据报道需要入学测评和面试;你们这次只做「参观 + 咨询」,仍要问清测评的时间、形式和能否线上'],
      ['预约', '官网 Contact Us 联系招生办;第三方页面列出 admissions@epsomschool.com,请以官网为准'],
      ['费用', '各来源数字不一致(从约 RM 5 万到 17 万不等),<b>请直接问学校</b>'],
    ],
    note: '2026 年 10 月 31 日的开放日已过,私人校园参观要联系招生办另约。',
  },
  {
    id: 'adcote', n: 'B', name: 'Adcote Matrix', en: 'Bandar Sri Sendayan, Seremban', scene: 'adcote', when: '第 4 天 14:00–16:30',
    cap: '示意图:现代校舍与草坪(并非校园实景)。',
    blurb: '原名 Matrix Global Schools,2025 年庆祝办学 10 周年。同一校园内有国际学校、私立国民学校和幼教。',
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
    id: 'ktj', n: 'C', name: 'KTJ(Kolej Tuanku Ja\'afar)', en: 'Mantin, Negeri Sembilan', scene: 'ktj', when: '第 4 天 09:30–12:00',
    cap: '示意图:低矮红瓦校舍与大操场(并非校园实景)。',
    blurb: '森美兰王室参与创办的国际寄宿学校,英式课程,历史最久。',
    facts: [
      ['位置', '71700 Mantin, Negeri Sembilan。校园约 80 英亩(一个来源),离 LEKAS 高速很近'],
      ['体系', '英式课程:以英国国家课程为基础,加剑桥 IGCSE 和 A-Level;11 岁起可寄宿(第三方资料)'],
      ['规模', '约 1000 名学生,来自 24 个以上国家(第三方资料)'],
      ['预约', '联系方式<b>我没能核实</b>,请在官网查招生办邮箱;创办年份各来源写 1989 或 1991,不影响参观'],
      ['费用', '各来源数字相差很大(约 RM 2.1 万–12.5 万/年),<b>请直接问学校</b>'],
    ],
    note: '三所里它离 KLIA 最远,放在 D4 上午,从吉隆坡出发更顺路。',
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

We are a family from Guangzhou, China, travelling in Malaysia from 26 to 28 January 2027. Our child is currently in Grade [X], and we are exploring boarding options for entry in [month/year], Year/Form [X].

We would like to book a campus tour and a short admissions consultation on [date] between [time] and [time]. Our group will be [N] people.

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
    id: 'alila', name: 'Alila Villas Uluwatu', en: 'Pecatu, Uluwatu · Hyatt 旗下', scene: 'alila', when: '第 6 天 10:00',
    cap: '示意图:悬崖无边际泳池与别墅(并非实景)。',
    blurb: '悬崖上的全别墅度假村。婚礼与住宿在同一处,考察时可以顺便「试住、试吃」。',
    facts: [
      ['仪式场地', 'Cliff Edge Cabana:悬崖边的仪式点,可 17:00–19:00 独享,约 50 人(Hyatt 官网婚礼页)'],
      ['其他空间', 'Library 约 25 人;CIRE Lawn 约 20 人;最大空间约 5,000 ㎡'],
      ['大型婚礼', '主泳池区域须<b>买断全酒店 2 晚</b>,最多约 300 人(Hyatt 官网婚礼页)'],
      ['数字出入', 'Hyatt 的会议页和第三方网站对人数写法不一(30、122、350、500 都有)。<b>以酒店书面报价为准</b>'],
      ['住宿', '全别墅,就在场地所在地(住宿价格最高,请提前问)'],
    ],
    note: '要问清楚:哪个场地适合你们的人数、买断条件和最低消费、雨天备案的位置。',
  },
  {
    id: 'tirtha', name: 'Tirtha Uluwatu', en: 'Pecatu, Uluwatu · 悬崖婚礼场地', scene: 'tirtha', when: '第 6 天 15:00',
    cap: '示意图:悬崖玻璃教堂(并非实景)。',
    blurb: '以悬在印度洋上的玻璃教堂(Glass Chapel)闻名,另有花园和两层餐饮亭。策划、造型、餐饮、布置都由自家团队负责。',
    facts: [
      ['位置', 'Pecatu 南部悬崖,与 Alila 同属乌鲁瓦图,同一天能看完'],
      ['场地', 'Glass Chapel(玻璃教堂)、热带花园、两层餐饮亭'],
      ['人数', '来源写法不一:约 200 人,或 20–300 人。<b>请书面确认</b>'],
      ['价格', '一个来源写婚礼套餐 US$11,700 起(单一来源,可能过时)'],
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
  { g: '场地与流程', i: ['仪式点和晚宴点之间多远?有几级台阶?长辈怎么走?', '日落约 18:40:建议的仪式时间和流程怎么排?', '悬崖边的栏杆高度、风力、安全措施', '音响、乐队和噪音的截止时间', '最低消费、人数下限和上限,是否需要买断'] },
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
export const MAIL_WED = `Subject: Wedding site inspection request – [Venue] – Fri 29 Jan 2027

Dear Wedding Team,

We are planning a wedding in Bali for around [N] guests in [month/year] and are very interested in [Venue]. We will be in Uluwatu from 28 to 30 January 2027 and would like to arrange a site inspection and tasting on Friday 29 January at [time].

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
  ['现在(10 月)', '给 Epsom、Adcote Matrix、KTJ 发预约邮件;给 Alila 和 Tirtha 的婚礼团队发考察邮件;订机票和酒店(春节前的 1 月下旬偏贵)。'],
  ['出发前 6 周', '核对马来西亚免签政策是否延续,不延续就要办签证;买旅行保险。'],
  ['出发前 2 周', '确认学校与婚礼酒店的最终时间;订包车(吉隆坡、巴厘岛);订 Gardens by the Bay 花穹联票、双子塔时段(选做)。'],
  ['出发前 3 天内', '填 SG Arrival Card、MDAC、All Indonesia 申报;缴巴厘岛旅游税;办电子落地签(可选)。'],
  ['出发当天', '带齐打印的预约确认、护照复印件、成绩单;eSIM;三种货币的少量现金。'],
];
export const FLIGHTS = [
  ['广州 → 新加坡', '约 4 小时', '多家直飞(以订票时为准),选上午班次,下午落地'],
  ['新加坡 → 吉隆坡', '约 1 小时', '选早班机(D3 要赶下午的学校);低成本航司行李另买'],
  ['吉隆坡 → 巴厘岛', '约 3 小时 10 分', '优先选上午班次;低成本航司行李另买,7 人 + 学校材料,提前买行李额'],
  ['巴厘岛 → 广州', '约 5 小时', '第三方数据:TransNusa 约 19:50(每天),南航约 00:40 / 08:40;以订票时为准'],
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
  ['EY · 马来西亚对中印免签延至 2026-12-31', 'https://www.ey.com/en_gl/technical/tax-alerts/malaysia-extends-visa-exemption-period-for-india-and-china-nationals'],
  ['SAYS · 马中互免签证再延五年的报道', 'https://says.com/my/news/malaysia-china-visa-free-travel-deal-will-be-extended-another-5-years'],
  ['MDAC(官方入口)', 'https://imigresen-online.imi.gov.my/mdac/main'],
  ['印尼落地签说明(Wego)', 'https://blog.wego.com/indonesia-visa-on-arrival/'],
  ['All Indonesia(官方入口)', 'https://allindonesia.imigrasi.go.id'],
  ['Love Bali 旅游税(官方入口)', 'https://lovebali.baliprov.go.id'],
  ['Epsom College Malaysia · 到校交通', 'https://www.epsomcollege.edu.my/admissions/how-to-find-us/'],
  ['Epsom College Malaysia · 联系', 'https://www.epsomcollege.edu.my/?p=793'],
  ['Adcote Matrix · 招生 FAQ', 'https://matrixschools.edu.my/applying/faqs/'],
  ['The Vibes · Adcote Matrix 十周年', 'https://www.thevibes.com/articles/education/105367/adcote-matrix-marks-10th-anniversary-vows-to-continue-providing-exceptional-education'],
  ['Boarding Schools Association · KTJ', 'https://www.boarding.org.uk/schools/kolej-tuanku-jaafar-malaysia/'],
  ['Hyatt · Alila Villas Uluwatu 婚礼', 'https://www.hyatt.com/alila-hotels-and-resorts/en-US/dpsav-alila-villas-uluwatu/weddings'],
  ['Honeycombers · Tirtha Uluwatu', 'https://thehoneycombers.com/bali/tirtha-uluwatu-bali-wedding-venue/'],
  ['Bali.com · 巴厘岛 1 月天气', 'https://bali.com/weather/weather-by-month/weather-january/'],
  ['DirectFlights · 广州—巴厘岛直飞', 'https://www.directflights.com/CAN-DPS'],
  ['Marina Bay Sands · Spectra', 'https://marinabaysands.com/attractions/spectra.html'],
  ['Little Day Out · Jewel Rain Vortex 光影秀', 'https://www.littledayout.com/jewel-hsbc-rain-vortex-light-show-and-times/'],
  ['Gardens by the Bay(官网)', 'https://www.gardensbythebay.com.sg'],
];
