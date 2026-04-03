/**
 * 紫微斗数精确排盘算法 v3.2
 * 基于《紫微斗数全书》传统算法
 * 使用 IIFE 包装避免全局污染
 */

(function(global) {
    'use strict';

    // 天干
    const HEAVENLY_STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];

    // 地支
    const EARTHLY_BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

    // 十二宫位名称
    const PALACE_NAMES = ["命宫", "父母", "福德", "田宅", "官禄", "奴仆", "迁移", "疾厄", "财帛", "子女", "夫妻", "兄弟"];

    // 五行局
    const FIVE_ELEMENT_BUREAUS = {
        "水二局": 2, "木三局": 3, "金四局": 4, "土五局": 5, "火六局": 6
    };

    /**
     * 计算年干支
     */
    function getYearGanZhi(year) {
        const ganIndex = (year - 4) % 10;
        const zhiIndex = (year - 4) % 12;
        return HEAVENLY_STEMS[ganIndex] + EARTHLY_BRANCHES[zhiIndex];
    }

    /**
     * 根据年干支和出生日确定五行局
     */
    function getBureau(yearGanZhi, day) {
        const bureauTable = {
            "甲子": "水二局", "甲寅": "水二局", "甲辰": "水二局", "甲午": "水二局", "甲申": "水二局", "甲戌": "水二局",
            "乙丑": "金四局", "乙卯": "木三局", "乙巳": "火六局", "乙未": "土五局", "乙酉": "金四局", "乙亥": "水二局",
            "丙子": "火六局", "丙寅": "火六局", "丙辰": "火六局", "丙午": "火六局", "丙申": "火六局", "丙戌": "火六局",
            "丁丑": "水二局", "丁卯": "木三局", "丁巳": "土五局", "丁未": "金四局", "丁酉": "水二局", "丁亥": "木三局",
            "戊子": "火六局", "戊寅": "火六局", "戊辰": "火六局", "戊午": "火六局", "戊申": "火六局", "戊戌": "火六局",
            "己丑": "土五局", "己卯": "金四局", "己巳": "木三局", "己未": "水二局", "己酉": "土五局", "己亥": "木三局",
            "庚子": "土五局", "庚寅": "木三局", "庚辰": "金四局", "庚午": "土五局", "庚申": "木三局", "庚戌": "金四局",
            "辛丑": "土五局", "辛卯": "木三局", "辛巳": "金四局", "辛未": "土五局", "辛酉": "木三局", "辛亥": "金四局",
            "壬子": "金四局", "壬寅": "金四局", "壬辰": "金四局", "壬午": "金四局", "壬申": "金四局", "壬戌": "金四局",
            "癸丑": "木三局", "癸卯": "火六局", "癸巳": "水二局", "癸未": "木三局", "癸酉": "火六局", "癸亥": "水二局"
        };

        return bureauTable[yearGanZhi] || "水二局";
    }

    /**
     * 安命宫 - 确定命宫位置
     */
    function getLifePalacePosition(month, hour) {
        // 从寅宫起正月，顺数到出生月
        let position = (month + 1) % 12; // 寅=2，所以正月从2开始
        // 从当前位置起子时，逆数到出生时辰
        position = (position - hour + 12) % 12;
        return position;
    }

    /**
     * 安紫微星 - 紫微星定位是排盘的关键
     */
    function getZiweiPosition(bureau, day) {
        const bureauNum = FIVE_ELEMENT_BUREAUS[bureau];
        const num = (day - 1) * bureauNum;
        const position = num % 12;
        return position;
    }

    /**
     * 安十四正曜主星
     */
    function placeMajorStars(ziweiPos) {
        const stars = {
            "紫微": ziweiPos,
            "天机": (ziweiPos + 1) % 12,
            "太阳": (ziweiPos + 2) % 12,
            "武曲": (ziweiPos + 3) % 12,
            "天同": (ziweiPos + 4) % 12,
            "廉贞": (ziweiPos + 5) % 12,
            "天府": (10 - ziweiPos + 12) % 12,
            "太阴": (10 - ziweiPos + 1 + 12) % 12,
            "贪狼": (10 - ziweiPos + 2 + 12) % 12,
            "巨门": (10 - ziweiPos + 3 + 12) % 12,
            "天相": (10 - ziweiPos + 4 + 12) % 12,
            "天梁": (10 - ziweiPos + 5 + 12) % 12,
            "七杀": (10 - ziweiPos + 6 + 12) % 12,
            "破军": (10 - ziweiPos + 7 + 12) % 12
        };
        return stars;
    }

    /**
     * 安左辅右弼
     */
    function placeZuofuYoubi(month, hour) {
        // 左辅：从辰宫起正月，顺数
        const zuofu = (month + 3) % 12;
        // 右弼：从戌宫起正月，逆数
        const youbi = (9 - month + 12) % 12;
        return { "左辅": zuofu, "右弼": youbi };
    }

    /**
     * 安文昌文曲
     */
    function placeWenchangWenqu(hour, yearGan) {
        // 文昌：根据出生时辰
        const wenchangTable = [9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8]; // 子时在酉宫
        const wenchang = wenchangTable[hour];

        // 文曲：根据出生年干
        const wenquTable = { "甲": 3, "乙": 2, "丙": 5, "丁": 4, "戊": 5, "己": 4, "庚": 9, "辛": 8, "壬": 11, "癸": 10 };
        const wenqu = wenquTable[yearGan] || 3;

        return { "文昌": wenchang, "文曲": wenqu };
    }

    /**
     * 安天魁天钺
     */
    function placeTiankuiTianyue(yearGan) {
        const tiankuiTable = { "甲": 1, "乙": 8, "丙": 5, "丁": 4, "戊": 1, "己": 8, "庚": 11, "辛": 10, "壬": 7, "癸": 6 };
        const tianyueTable = { "甲": 7, "乙": 6, "丙": 11, "丁": 10, "戊": 7, "己": 6, "庚": 1, "辛": 0, "壬": 5, "癸": 4 };

        return {
            "天魁": tiankuiTable[yearGan] || 1,
            "天钺": tianyueTable[yearGan] || 7
        };
    }

    /**
     * 安禄存
     */
    function placeLucun(yearGan) {
        const lucunTable = { "甲": 2, "乙": 3, "丙": 5, "丁": 6, "戊": 5, "己": 6, "庚": 8, "辛": 9, "壬": 11, "癸": 0 };
        return { "禄存": lucunTable[yearGan] || 2 };
    }

    /**
     * 安擎羊陀罗（禄存前后）
     */
    function placeQingyangTuoluo(lucunPos) {
        return {
            "擎羊": (lucunPos + 1) % 12,
            "陀罗": (lucunPos - 1 + 12) % 12
        };
    }

    /**
     * 安天马
     */
    function placeTianma(yearZhi) {
        const zhiIndex = EARTHLY_BRANCHES.indexOf(yearZhi);
        const tianmaTable = [2, 11, 8, 5, 2, 11, 8, 5, 2, 11, 8, 5]; // 寅午戌马在申
        return { "天马": tianmaTable[zhiIndex] };
    }

    /**
     * 安火星铃星
     */
    function placeHuoxingLingxing(yearZhi, hour) {
        const zhiIndex = EARTHLY_BRANCHES.indexOf(yearZhi);

        // 火星：寅午戌年从寅宫起子时，顺数
        const huoxingBaseTable = [2, 3, 11, 8, 2, 3, 11, 8, 2, 3, 11, 8];
        const huoxingBase = huoxingBaseTable[zhiIndex];
        const huoxing = (huoxingBase + hour) % 12;

        // 铃星：寅午戌年从卯宫起子时，顺数
        const lingxingBaseTable = [3, 2, 0, 9, 3, 2, 0, 9, 3, 2, 0, 9];
        const lingxingBase = lingxingBaseTable[zhiIndex];
        const lingxing = (lingxingBase + hour) % 12;

        return { "火星": huoxing, "铃星": lingxing };
    }

    /**
     * 安地空地劫
     */
    function placeDikongDijie(hour) {
        const dikongTable = [11, 11, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
        const dijieTable = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

        return {
            "地空": dikongTable[hour],
            "地劫": dijieTable[hour]
        };
    }

    /**
     * 安天刑
     */
    function placeTianxing(yearZhi) {
        const zhiIndex = EARTHLY_BRANCHES.indexOf(yearZhi);
        const tianxingTable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10];
        return { "天刑": tianxingTable[zhiIndex] };
    }

    /**
     * 安天姚
     */
    function placeTianyao(yearZhi) {
        const zhiIndex = EARTHLY_BRANCHES.indexOf(yearZhi);
        const tianyaoTable = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 11, 10];
        return { "天姚": tianyaoTable[zhiIndex] };
    }

    /**
     * 安红鸾天喜
     */
    function placeHongluanTianxi(yearZhi) {
        const zhiIndex = EARTHLY_BRANCHES.indexOf(yearZhi);
        // 红鸾：子年在卯，逆推
        const hongluanTable = [3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5, 4];
        const hongluan = hongluanTable[zhiIndex];
        // 天喜在红鸾对宫
        const tianxi = (hongluan + 6) % 12;

        return { "红鸾": hongluan, "天喜": tianxi };
    }

    /**
     * 安四化星（化禄、化权、化科、化忌）
     */
    function placeSihua(yearGan, majorStars) {
        const sihuaTable = {
            "甲": { "禄": "廉贞", "权": "破军", "科": "武曲", "忌": "太阳" },
            "乙": { "禄": "天机", "权": "天梁", "科": "紫微", "忌": "太阴" },
            "丙": { "禄": "天同", "权": "天机", "科": "文昌", "忌": "廉贞" },
            "丁": { "禄": "太阴", "权": "天同", "科": "天机", "忌": "巨门" },
            "戊": { "禄": "贪狼", "权": "太阴", "科": "右弼", "忌": "天机" },
            "己": { "禄": "武曲", "权": "贪狼", "科": "天梁", "忌": "文曲" },
            "庚": { "禄": "太阳", "权": "武曲", "科": "太阴", "忌": "天同" },
            "辛": { "禄": "巨门", "权": "太阳", "科": "文曲", "忌": "文昌" },
            "壬": { "禄": "天梁", "权": "紫微", "科": "左辅", "忌": "武曲" },
            "癸": { "禄": "破军", "权": "巨门", "科": "太阴", "忌": "贪狼" }
        };

        const sihua = sihuaTable[yearGan] || sihuaTable["甲"];
        const result = {};

        Object.keys(sihua).forEach(type => {
            const starName = sihua[type];
            if (majorStars[starName] !== undefined) {
                const pos = majorStars[starName];
                const sihuaStarName = "化" + type;
                result[sihuaStarName] = pos;
            }
        });

        return result;
    }

    /**
     * 完整排盘主函数
     */
    function createZiweiChart(birthData) {
        const { year, month, day, hour, gender } = birthData;

        // 1. 计算年干支
        const yearGanZhi = getYearGanZhi(year);
        const yearGan = yearGanZhi[0];
        const yearZhi = yearGanZhi[1];

        // 2. 确定五行局
        const bureau = getBureau(yearGanZhi, day);

        // 3. 确定命宫位置
        const lifePalacePos = getLifePalacePosition(month, hour);

        // 4. 安紫微星
        const ziweiPos = getZiweiPosition(bureau, day);

        // 5. 安十四正曜
        const majorStars = placeMajorStars(ziweiPos);

        // 6. 安辅星
        const zuofuYoubi = placeZuofuYoubi(month, hour);
        const wenchangWenqu = placeWenchangWenqu(hour, yearGan);
        const tiankuiTianyue = placeTiankuiTianyue(yearGan);
        const lucun = placeLucun(yearGan);
        const qingyangTuoluo = placeQingyangTuoluo(lucun["禄存"]);
        const tianma = placeTianma(yearZhi);
        const huoxingLingxing = placeHuoxingLingxing(yearZhi, hour);
        const dikongDijie = placeDikongDijie(hour);
        const tianxing = placeTianxing(yearZhi);
        const tianyao = placeTianyao(yearZhi);
        const hongluanTianxi = placeHongluanTianxi(yearZhi);

        // 7. 安四化
        const sihua = placeSihua(yearGan, majorStars);

        // 8. 合并所有星曜
        const allStars = {
            ...majorStars,
            ...zuofuYoubi,
            ...wenchangWenqu,
            ...tiankuiTianyue,
            ...lucun,
            ...qingyangTuoluo,
            ...tianma,
            ...huoxingLingxing,
            ...dikongDijie,
            ...tianxing,
            ...tianyao,
            ...hongluanTianxi,
            ...sihua
        };

        // 9. 创建十二宫
        const palaces = [];
        for (let i = 0; i < 12; i++) {
            const palaceIndex = (lifePalacePos + i) % 12;
            const earthlyBranch = EARTHLY_BRANCHES[palaceIndex];
            const stars = [];

            // 找出在此宫位的所有星曜
            for (let starName in allStars) {
                if (allStars[starName] === palaceIndex) {
                    stars.push(starName);
                }
            }

            palaces.push({
                name: PALACE_NAMES[i],
                branch: earthlyBranch,
                position: palaceIndex,
                stars: stars,
                isLifePalace: i === 0
            });
        }

        return {
            birthData: birthData,
            yearGanZhi: yearGanZhi,
            bureau: bureau,
            lifePalacePosition: lifePalacePos,
            palaces: palaces,
            allStars: allStars
        };
    }

    /**
     * 计算三方四正宫位
     * @param {number} palacePos - 宫位位置 (0-11)
     * @returns {Array} 三方四正的宫位位置数组
     */
    function getSanFangSiZheng(palacePos) {
        return [
            palacePos,                        // 本宫
            (palacePos + 4) % 12,            // 三合宫1 (三方)
            (palacePos + 8) % 12,            // 三合宫2 (三方)
            (palacePos + 6) % 12             // 对宫 (四正)
        ];
    }

    /**
     * 获取宫位的星曜列表
     */
    function getPalaceStars(chart, palaceName) {
        const palace = chart.palaces.find(p => p.name === palaceName);
        return palace ? palace.stars : [];
    }

    /**
     * 判断星曜在宫位的庙旺平陷
     * 简化版本，实际应根据详细的庙旺表
     */
    function getStarStrength(starName, position) {
        // 这里简化处理，实际应查阅完整的星曜庙旺表
        const strengthTable = {
            "紫微": { temple: [2, 3], prosperous: [0, 11], neutral: [1, 4, 5, 10], fall: [6, 7, 8, 9] },
            "天机": { temple: [3, 9], prosperous: [2, 8], neutral: [0, 1, 4, 5, 6, 7, 10, 11], fall: [] },
            "太阳": { temple: [3, 4, 5], prosperous: [2, 6], neutral: [0, 1, 7, 8], fall: [9, 10, 11] },
            // 其他星曜可继续添加...
        };

        const table = strengthTable[starName];
        if (!table) return "";

        if (table.temple.includes(position)) return "庙";
        if (table.prosperous.includes(position)) return "旺";
        if (table.fall.includes(position)) return "陷";
        return "平";
    }

    // 导出到全局对象
    global.ZiweiDoushu = {
        createZiweiChart,
        getSanFangSiZheng,
        getPalaceStars,
        getStarStrength,
        PALACE_NAMES,
        EARTHLY_BRANCHES
    };

})(typeof window !== 'undefined' ? window : global);
