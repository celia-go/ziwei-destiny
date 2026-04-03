/**
 * 紫微斗数星曜信息数据库 v3.2
 * 包含主星、辅星、煞星的详细信息
 */

const STAR_INFO = {
    // ========== 十四主星 ==========
    "紫微": {
        name: "紫微星",
        category: "帝星",
        element: "土",
        nature: "吉",
        description: "紫微星为北斗帝星，诸星之主，为官禄主，化气为尊。主贵、主权柄。",
        personality: "领导能力强，有威严，自尊心强，喜欢掌控全局。做事有计划，有野心，追求成就感。",
        career: "适合管理、行政、政治、公务员等领导性职位。能够统筹全局，善于决策。",
        wealth: "财运稳定，多通过权力和地位获得财富。适合投资不动产和稳健型项目。",
        love: "感情中喜欢主导，需要伴侣的尊重和认可。婚姻稳定，但容易因工作忙碌而忽略伴侣。",
        health: "注意脾胃、消化系统。压力大时容易失眠、头痛。",
        lucky: {
            color: ["紫色", "金色", "黄色"],
            number: [1, 6, 9],
            direction: ["北方", "中央"]
        }
    },
    "天机": {
        name: "天机星",
        category: "智慧星",
        element: "木",
        nature: "吉",
        description: "天机星为南斗智慧之星，善谋略，化气为善。主智慧、机变、兄弟。",
        personality: "聪明机智，思维敏捷，善于策划。好学多才，但容易多虑，性格较为敏感。",
        career: "适合策划、咨询、教育、科研、设计等需要智慧和创意的工作。",
        wealth: "财运起伏，靠智慧和技术赚钱。适合短线投资和灵活经营。",
        love: "感情细腻，重视精神交流。容易因为过度思虑而影响感情，需要学会放松。",
        health: "注意神经系统、肝胆。容易焦虑、失眠，需要保持心情愉快。",
        lucky: {
            color: ["绿色", "青色"],
            number: [3, 8],
            direction: ["东方", "东南"]
        }
    },
    "太阳": {
        name: "太阳星",
        category: "贵人星",
        element: "火",
        nature: "吉",
        description: "太阳星为日之精，诸阳之宗，化气为贵。主贵、主父、主夫、主子。",
        personality: "热情开朗，慷慨大方，乐于助人。有正义感，喜欢被人需要和依赖。",
        career: "适合公职、外交、传媒、教育等需要与人打交道的工作。贵人运强，容易得到提携。",
        wealth: "财运起伏，挣得多花得也多。适合从事与人际关系相关的生意。",
        love: "男命主父亲和子女，女命主丈夫。感情热烈，但容易因为过于热心而忽略家庭。",
        health: "注意眼睛、心脏、血压。要避免过度劳累，保持规律作息。",
        lucky: {
            color: ["红色", "橙色"],
            number: [2, 7],
            direction: ["南方", "东方"]
        }
    },
    "武曲": {
        name: "武曲星",
        category: "财星",
        element: "金",
        nature: "吉",
        description: "武曲星为北斗财星，化气为财。主财、主刚强、主寡宿。",
        personality: "刚毅果断，意志坚定，执行力强。做事务实，重视物质和成果。性格较为刚直。",
        career: "适合金融、财务、军警、工程、制造等需要果断决策的工作。",
        wealth: "财运佳，善于理财。适合实业投资，不宜投机。能够通过自己的努力积累财富。",
        love: "感情较为理性，不善于表达情感。需要学会温柔和体贴，避免因刚硬而伤害伴侣。",
        health: "注意呼吸系统、骨骼、牙齿。容易因为过度劳累而受伤。",
        lucky: {
            color: ["白色", "金色", "银色"],
            number: [4, 9],
            direction: ["西方", "西北"]
        }
    },
    "天同": {
        name: "天同星",
        category: "福星",
        element: "水",
        nature: "吉",
        description: "天同星为南斗福星，化气为福。主福、主寿、主享受。",
        personality: "温和善良，随遇而安，心态平和。喜欢享受生活，不喜欢竞争和冲突。",
        career: "适合服务业、艺术、娱乐、公益等轻松愉快的工作。不宜压力过大的职业。",
        wealth: "财运平稳，不求大富大贵，但能衣食无忧。适合稳健投资。",
        love: "感情温和，重视家庭和谐。婚姻美满，能够给伴侣带来快乐和安全感。",
        health: "身体素质较好，长寿之星。注意不要过度安逸导致懒散和肥胖。",
        lucky: {
            color: ["蓝色", "黑色"],
            number: [1, 6],
            direction: ["北方"]
        }
    },
    "廉贞": {
        name: "廉贞星",
        category: "桃花星",
        element: "火",
        nature: "中",
        description: "廉贞星为北斗囚星，化气为囚。主桃花、主血光、主刑伤。",
        personality: "性格多变，外冷内热，感情丰富。有艺术天赋，但情绪波动较大。",
        career: "适合艺术、娱乐、公关、设计、美容等与美感相关的工作。",
        wealth: "财运起伏大，容易有偏财。但也容易因感情或冲动而破财。",
        love: "桃花旺盛，感情经历丰富。需要慎重选择伴侣，避免烂桃花。",
        health: "注意心血管、泌尿系统、妇科疾病。要控制情绪，避免意外伤害。",
        lucky: {
            color: ["粉色", "紫色", "红色"],
            number: [2, 7],
            direction: ["南方"]
        }
    },
    "天府": {
        name: "天府星",
        category: "财库星",
        element: "土",
        nature: "吉",
        description: "天府星为南斗帝星，化气为令。主财库、主田宅、主贵。",
        personality: "稳重踏实，善于理财，有领导才能。做事有计划，善于积累和储蓄。",
        career: "适合财务、金融、房地产、管理等需要稳健经营的工作。",
        wealth: "财运好，善于积累财富。适合长期投资和不动产投资。",
        love: "感情稳定，重视家庭和物质基础。婚姻幸福，能够给家人安全感。",
        health: "体质较好，但要注意脾胃、消化系统。不要过度饮食。",
        lucky: {
            color: ["黄色", "棕色"],
            number: [5, 10],
            direction: ["中央", "西南"]
        }
    },
    "太阴": {
        name: "太阴星",
        category: "财富星",
        element: "水",
        nature: "吉",
        description: "太阴星为月之精，化气为富。主财、主母、主妻、主女。",
        personality: "温柔体贴，心思细腻，善于照顾他人。性格内敛，感情丰富。",
        career: "适合服务业、教育、护理、家政、艺术等需要细心和耐心的工作。",
        wealth: "财运好，善于理财和储蓄。适合房地产和稳健投资。",
        love: "男命主妻子和母亲，女命主自己。感情细腻，婚姻美满，家庭和睦。",
        health: "注意内分泌、妇科、情绪问题。要保持心情愉快，避免忧郁。",
        lucky: {
            color: ["白色", "银色", "浅蓝"],
            number: [1, 6],
            direction: ["北方", "西方"]
        }
    },
    "贪狼": {
        name: "贪狼星",
        category: "欲望星",
        element: "木/水",
        nature: "中",
        description: "贪狼星为北斗桃花星，化气为桃花。主欲望、主交际、主才艺。",
        personality: "多才多艺，善于交际，欲望强烈。喜欢新鲜事物，追求刺激和享受。",
        career: "适合销售、娱乐、公关、艺术、服务业等需要人际交往和表现力的工作。",
        wealth: "财运起伏大，偏财运旺。但容易因享乐而破财，需要节制。",
        love: "桃花旺盛，感情经历丰富。需要专一和自制，否则容易陷入感情纠纷。",
        health: "注意肝胆、肾脏、性病。要避免酗酒和不良生活习惯。",
        lucky: {
            color: ["绿色", "紫色"],
            number: [3, 8],
            direction: ["东方", "北方"]
        }
    },
    "巨门": {
        name: "巨门星",
        category: "是非星",
        element: "水",
        nature: "中",
        description: "巨门星为北斗暗星，化气为暗。主是非、主口才、主研究。",
        personality: "口才好，善于辩论，心思细腻。但容易多疑，招惹是非。",
        career: "适合律师、教师、传媒、销售、研究等需要口才和分析能力的工作。",
        wealth: "财运起伏，适合靠口才和专业技能赚钱。要注意避免口舌招致损失。",
        love: "感情中容易因沟通问题产生矛盾。需要学会信任和宽容，避免无谓争吵。",
        health: "注意口腔、咽喉、呼吸系统。也要注意情绪和人际压力。",
        lucky: {
            color: ["黑色", "蓝色"],
            number: [1, 6],
            direction: ["北方"]
        }
    },
    "天相": {
        name: "天相星",
        category: "印星",
        element: "水",
        nature: "吉",
        description: "天相星为南斗印星，化气为印。主衣禄、主贵、主面子。",
        personality: "稳重得体，注重仪表和礼仪。有责任感，善于协调和服务。",
        career: "适合行政、秘书、公关、服务业、美容等需要形象和服务的工作。",
        wealth: "财运稳定，衣食无忧。适合稳健投资和服务性行业。",
        love: "感情稳定，重视伴侣的外在和内在。婚姻和睦，家庭幸福。",
        health: "注意肾脏、泌尿系统、皮肤。要保持良好的生活习惯。",
        lucky: {
            color: ["蓝色", "白色"],
            number: [1, 6],
            direction: ["北方", "西方"]
        }
    },
    "天梁": {
        name: "天梁星",
        category: "荫星",
        element: "土",
        nature: "吉",
        description: "天梁星为南斗荫星，化气为荫。主寿、主贵人、主医药。",
        personality: "成熟稳重，有长者风范，善于助人。有同情心，喜欢照顾弱小。",
        career: "适合医疗、教育、法律、公益、宗教等需要爱心和责任感的工作。",
        wealth: "财运平稳，不求暴富。适合从事服务性和公益性事业。",
        love: "感情稳定，重视精神交流。婚姻美满，能够给伴侣安全感和支持。",
        health: "长寿之星，体质较好。注意脾胃、消化系统，保持健康生活方式。",
        lucky: {
            color: ["黄色", "灰色"],
            number: [5, 10],
            direction: ["中央", "西南"]
        }
    },
    "七杀": {
        name: "七杀星",
        category: "将星",
        element: "金",
        nature: "中",
        description: "七杀星为南斗将星，化气为权。主威猛、主刚强、主孤克。",
        personality: "勇敢果断，意志坚强，执行力超强。性格刚烈，不服输，有领导才能。",
        career: "适合军警、竞技、创业、危机管理等需要勇气和魄力的工作。",
        wealth: "财运起伏大，适合创业和冒险。能够在困境中突破，但要注意风险。",
        love: "感情强烈但不善表达。需要学会温柔，避免因强势而伤害伴侣。",
        health: "注意意外伤害、骨骼、手术。要控制脾气，避免冲动惹祸。",
        lucky: {
            color: ["红色", "黑色", "金色"],
            number: [4, 9],
            direction: ["西方", "南方"]
        }
    },
    "破军": {
        name: "破军星",
        category: "消耗星",
        element: "水",
        nature: "中",
        description: "破军星为北斗耗星，化气为耗。主破坏、主变动、主开创。",
        personality: "勇于变革，敢于冒险，不怕失败。性格冲动，喜欢新鲜事物，但容易三分钟热度。",
        career: "适合创新、创业、艺术、设计、拆迁等需要突破和变革的工作。",
        wealth: "财运起伏极大，大起大落。适合高风险高回报的投资，但要谨慎。",
        love: "感情多变，容易分分合合。需要学会稳定和坚持，避免朝三暮四。",
        health: "注意意外伤害、手术、破相。要控制冲动，避免危险活动。",
        lucky: {
            color: ["黑色", "蓝色", "紫色"],
            number: [1, 6],
            direction: ["北方"]
        }
    },

    // ========== 重要辅星 ==========
    "左辅": {
        name: "左辅星",
        category: "辅佐星",
        element: "土",
        nature: "吉",
        description: "左辅星为贵人星，主助力、协调。能增强主星力量，带来贵人运。",
        personality: "善于协调，乐于助人，人际关系好。",
        career: "增强工作能力，容易得到贵人提携和帮助。",
        wealth: "财运稳定上升，多贵人相助。",
        love: "感情顺利，容易得到长辈祝福。",
        health: "身体健康，有病能遇良医。"
    },
    "右弼": {
        name: "右弼星",
        category: "辅佐星",
        element: "土",
        nature: "吉",
        description: "右弼星为贵人星，主助力、辅佐。能增强主星力量，带来贵人运。",
        personality: "聪明灵活，善于交际，人缘好。",
        career: "工作顺利，容易得到同事和下属的支持。",
        wealth: "财运佳，多得人帮助。",
        love: "感情美满，伴侣贤惠。",
        health: "体质好，恢复力强。"
    },
    "文昌": {
        name: "文昌星",
        category: "科名星",
        element: "金",
        nature: "吉",
        description: "文昌星主文才、考试、学业。利于读书、考试、文职工作。",
        personality: "聪明好学，文采好，气质佳。",
        career: "利于文职、教育、文化、考试升迁。",
        wealth: "适合通过知识和文化赚钱。",
        love: "感情浪漫，重视精神交流。",
        health: "注意用脑过度，要适当休息。"
    },
    "文曲": {
        name: "文曲星",
        category: "才艺星",
        element: "水",
        nature: "吉",
        description: "文曲星主才艺、口才、灵感。利于艺术、音乐、创作。",
        personality: "多才多艺，感性，有艺术天赋。",
        career: "适合艺术、设计、创作、演艺。",
        wealth: "适合通过才艺和创意赚钱。",
        love: "感情细腻，浪漫多情。",
        health: "注意情绪波动和神经系统。"
    },
    "天魁": {
        name: "天魁星",
        category: "贵人星",
        element: "火",
        nature: "吉",
        description: "天魁星为阳贵人，主白天的贵人、长辈、男性贵人。",
        personality: "正直大方，容易得到长辈和上司欣赏。",
        career: "工作中多得男性贵人和领导提携。",
        wealth: "贵人相助，财运提升。",
        love: "易得长辈撮合，婚姻顺利。",
        health: "有病遇良医，化险为夷。"
    },
    "天钺": {
        name: "天钺星",
        category: "贵人星",
        element: "火",
        nature: "吉",
        description: "天钺星为阴贵人，主夜晚的贵人、女性贵人、暗助。",
        personality: "温和谦逊，容易得到女性和平辈帮助。",
        career: "工作中多得女性贵人和同事相助。",
        wealth: "暗中有人相助，财运稳定。",
        love: "易得女性长辈认可，婚姻美满。",
        health: "体质好，遇难呈祥。"
    },
    "禄存": {
        name: "禄存星",
        category: "财星",
        element: "土",
        nature: "吉",
        description: "禄存星主财禄、储蓄。能带来稳定的财运和物质保障。",
        personality: "善于理财，节俭，有经济头脑。",
        career: "收入稳定，适合财务和商业。",
        wealth: "财运佳，善于积累财富。",
        love: "重视物质基础，婚姻稳定。",
        health: "身体健康，衣食无忧。"
    },
    "天马": {
        name: "天马星",
        category: "驿马星",
        element: "火",
        nature: "中",
        description: "天马星主变动、迁移、出外。利于旅行、搬迁、变动。",
        personality: "活泼好动，喜欢变化和新鲜事物。",
        career: "适合外勤、旅游、贸易、运输业。",
        wealth: "财运变动大，适合流动性行业。",
        love: "感情易有聚散，需要稳定。",
        health: "注意旅途安全和奔波劳累。"
    },

    // ========== 煞星 ==========
    "擎羊": {
        name: "擎羊星",
        category: "煞星",
        element: "金",
        nature: "凶",
        description: "擎羊星为刑星，主刑伤、冲动、急躁。容易有意外伤害和口舌是非。",
        personality: "性格急躁，容易冲动，说话直接容易得罪人。",
        career: "工作中容易与人冲突，要注意人际关系。",
        wealth: "财运起伏，容易因冲动而破财。",
        love: "感情易有冲突，要学会控制脾气。",
        health: "注意意外伤害、手术、开刀。"
    },
    "陀罗": {
        name: "陀罗星",
        category: "煞星",
        element: "金",
        nature: "凶",
        description: "陀罗星为忌星，主延迟、纠缠、阻碍。容易遇到拖延和困扰。",
        personality: "做事犹豫，容易拖延，心思重重。",
        career: "工作进展缓慢，容易遇到阻碍。",
        wealth: "财运受阻，赚钱辛苦。",
        love: "感情纠缠，难以抉择。",
        health: "注意慢性疾病和拖延病情。"
    },
    "火星": {
        name: "火星",
        category: "煞星",
        element: "火",
        nature: "凶",
        description: "火星主急躁、暴烈、意外。容易有火灾、烫伤、急病。",
        personality: "性格急躁，容易发火，缺乏耐心。",
        career: "工作中容易急于求成，要学会稳重。",
        wealth: "财来财去，要避免冲动投资。",
        love: "感情激烈但不稳定，要控制情绪。",
        health: "注意火伤、烫伤、发炎、急症。"
    },
    "铃星": {
        name: "铃星",
        category: "煞星",
        element: "火",
        nature: "凶",
        description: "铃星主阴火、暗伤、慢性疾病。容易有暗中损害和慢性问题。",
        personality: "表面平静内心焦躁，容易压抑情绪。",
        career: "工作中易有暗中小人，要谨慎。",
        wealth: "财运有暗耗，要注意防范。",
        love: "感情易有暗中波折，要坦诚沟通。",
        health: "注意慢性炎症、内热、隐疾。"
    },
    "地空": {
        name: "地空星",
        category: "煞星",
        element: "火",
        nature: "凶",
        description: "地空星主空虚、破耗、理想。容易有空想和破财，但也有创意。",
        personality: "想象力丰富，但容易不切实际，好高骛远。",
        career: "适合创意工作，但要脚踏实地。",
        wealth: "财运空虚，容易破财，要务实。",
        love: "感情易有理想化倾向，要面对现实。",
        health: "注意精神压力和空虚感。"
    },
    "地劫": {
        name: "地劫星",
        category: "煞星",
        element: "火",
        nature: "凶",
        description: "地劫星主劫煞、破耗、变化。容易有突发状况和破财。",
        personality: "喜欢冒险，但容易遇到意外变故。",
        career: "工作中易有突发状况，要谨慎。",
        wealth: "财运起伏大，容易突然破财。",
        love: "感情易有突变，要珍惜当下。",
        health: "注意意外和突发疾病。"
    },
    "天空": {
        name: "天空星",
        category: "煞星",
        element: "火",
        nature: "凶",
        description: "天空星主空虚、消耗、精神。容易有虚耗和精神困扰。",
        personality: "多愁善感，容易空想，缺乏实际行动。",
        career: "工作中要务实，避免空想。",
        wealth: "财运虚浮，难以积累。",
        love: "感情需要实际行动，不能只是空想。",
        health: "注意精神健康和空虚感。"
    },

    // ========== 其他重要辅星 ==========
    "天刑": {
        name: "天刑星",
        category: "刑星",
        element: "火",
        nature: "中",
        description: "天刑星主刑法、纪律、正义。利于法律、军警工作，但也主官非。",
        personality: "正直严谨，有正义感，但容易过于刚硬。",
        career: "适合法律、军警、纪检等工作。",
        wealth: "财运平稳，要注意合法经营。",
        love: "感情较为严肃，要学会温柔。",
        health: "注意意外伤害和手术。"
    },
    "天姚": {
        name: "天姚星",
        category: "桃花星",
        element: "水",
        nature: "中",
        description: "天姚星主桃花、魅力、艺术。带来异性缘，但也容易桃花纠纷。",
        personality: "有魅力，异性缘好，但要注意桃花劫。",
        career: "适合美容、艺术、娱乐业。",
        wealth: "可通过人际关系赚钱。",
        love: "桃花旺，但要谨慎选择，避免烂桃花。",
        health: "注意生殖系统和情色困扰。"
    },
    "红鸾": {
        name: "红鸾星",
        category: "桃花星",
        element: "水",
        nature: "吉",
        description: "红鸾星主婚姻、喜庆。利于婚姻和喜事。",
        personality: "感情顺利，容易遇到良缘。",
        career: "工作中多喜事，人际和谐。",
        wealth: "财运稳定，多喜庆之财。",
        love: "婚姻运旺，容易结婚或恋爱。",
        health: "身心愉快，健康良好。"
    },
    "天喜": {
        name: "天喜星",
        category: "桃花星",
        element: "水",
        nature: "吉",
        description: "天喜星主喜庆、婚姻。带来喜事和好心情。",
        personality: "心情愉快，容易遇到喜事。",
        career: "工作顺利，多有好消息。",
        wealth: "财运亨通，喜从天降。",
        love: "感情甜蜜，婚姻美满。",
        health: "身心健康，精神愉悦。"
    },
    "化禄": {
        name: "化禄星",
        category: "四化星",
        element: "木",
        nature: "吉",
        description: "化禄主财禄、顺利、收获。所在宫位吉利，容易有好结果。",
        personality: "人缘好，做事顺利。",
        career: "工作得力，容易升迁加薪。",
        wealth: "财运佳，收入增加。",
        love: "感情甜蜜，关系和谐。",
        health: "身体健康，心情愉快。"
    },
    "化权": {
        name: "化权星",
        category: "四化星",
        element: "木",
        nature: "吉",
        description: "化权主权力、能力、掌控。增强主导能力和执行力。",
        personality: "能力增强，做事有魄力。",
        career: "工作中掌握主动权，容易升职。",
        wealth: "财运旺，能够掌控财源。",
        love: "感情中占主导，但要避免强势。",
        health: "体力充沛，精力旺盛。"
    },
    "化科": {
        name: "化科星",
        category: "四化星",
        element: "水",
        nature: "吉",
        description: "化科主名声、文才、贵人。利于考试、名誉、文化事业。",
        personality: "聪明好学，有文化修养。",
        career: "工作中名声好，容易受到认可。",
        wealth: "财运稳定，通过知识赚钱。",
        love: "感情文雅，门当户对。",
        health: "身心健康，气质佳。"
    },
    "化忌": {
        name: "化忌星",
        category: "四化星",
        element: "水",
        nature: "凶",
        description: "化忌主阻碍、困扰、执着。容易有困难和纠结，但也主专注。",
        personality: "容易执着，钻牛角尖。",
        career: "工作中易遇阻碍，要坚持。",
        wealth: "财运受阻，赚钱辛苦。",
        love: "感情易有波折，要多沟通。",
        health: "注意相关宫位的疾病。"
    }
};

/**
 * 获取星曜信息
 * @param {string} starName - 星曜名称
 * @returns {object} 星曜详细信息
 */
function getStarInfo(starName) {
    // 移除星曜名称中的修饰词（如"庙"、"旺"、"平"、"陷"等）
    const cleanName = starName.replace(/[庙旺平陷]/g, '');
    return STAR_INFO[cleanName] || {
        name: starName,
        description: "此星曜信息暂未收录。",
        category: "其他",
        nature: "中"
    };
}

/**
 * 判断是否为主星
 * @param {string} starName - 星曜名称
 * @returns {boolean}
 */
function isMajorStar(starName) {
    const majorStars = ["紫微", "天机", "太阳", "武曲", "天同", "廉贞",
                        "天府", "太阴", "贪狼", "巨门", "天相", "天梁",
                        "七杀", "破军"];
    const cleanName = starName.replace(/[庙旺平陷]/g, '');
    return majorStars.includes(cleanName);
}

/**
 * 判断是否为吉星
 * @param {string} starName - 星曜名称
 * @returns {boolean}
 */
function isLuckyStar(starName) {
    const cleanName = starName.replace(/[庙旺平陷]/g, '');
    const info = getStarInfo(cleanName);
    return info.nature === "吉";
}

/**
 * 判断是否为煞星
 * @param {string} starName - 星曜名称
 * @returns {boolean}
 */
function isMaleficStar(starName) {
    const cleanName = starName.replace(/[庙旺平陷]/g, '');
    const info = getStarInfo(cleanName);
    return info.nature === "凶";
}

// 导出函数供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        STAR_INFO,
        getStarInfo,
        isMajorStar,
        isLuckyStar,
        isMaleficStar
    };
}
