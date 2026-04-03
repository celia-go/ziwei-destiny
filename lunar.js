/**
 * 农历转换库（简化版）
 * 基于中国农历算法实现公历-农历转换
 */

console.log('[Lunar] 开始加载...');

// 1900-2100年农历数据
const LUNAR_INFO = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
    0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0,
    0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
    0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
    0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
    0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252,
    0x0d520
];

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ZODIAC = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
const LUNAR_MONTH = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
const LUNAR_DAY = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
];

function getLeapMonth(year) {
    return LUNAR_INFO[year - 1900] & 0xf;
}

function getLeapMonthDays(year) {
    if (getLeapMonth(year)) {
        return (LUNAR_INFO[year - 1900] & 0x10000) ? 30 : 29;
    }
    return 0;
}

function getYearDays(year) {
    let sum = 348;
    for (let i = 0x8000; i > 0x8; i >>= 1) {
        sum += (LUNAR_INFO[year - 1900] & i) ? 1 : 0;
    }
    return sum + getLeapMonthDays(year);
}

function getMonthDays(year, month) {
    return (LUNAR_INFO[year - 1900] & (0x10000 >> month)) ? 30 : 29;
}

function solar2lunar(year, month, day) {
    if (year < 1900 || year > 2100) {
        return null;
    }

    const baseDate = new Date(1900, 0, 31);
    const currentDate = new Date(year, month - 1, day);
    let offset = Math.floor((currentDate - baseDate) / 86400000);

    let lunarYear = 1900;
    let daysInYear = 0;
    while (lunarYear < 2101 && offset > 0) {
        daysInYear = getYearDays(lunarYear);
        offset -= daysInYear;
        lunarYear++;
    }

    if (offset < 0) {
        offset += daysInYear;
        lunarYear--;
    }

    let lunarMonth = 1;
    let isLeap = false;
    const leapMonth = getLeapMonth(lunarYear);

    for (let i = 1; i <= 12 && offset > 0; i++) {
        if (leapMonth > 0 && i === (leapMonth + 1) && !isLeap) {
            --i;
            isLeap = true;
            daysInYear = getLeapMonthDays(lunarYear);
        } else {
            daysInYear = getMonthDays(lunarYear, i);
        }

        offset -= daysInYear;

        if (isLeap && i === (leapMonth + 1)) {
            isLeap = false;
        }

        if (!isLeap) {
            lunarMonth++;
        }
    }

    if (offset === 0 && leapMonth > 0 && lunarMonth === leapMonth + 1) {
        if (isLeap) {
            isLeap = false;
        } else {
            isLeap = true;
            --lunarMonth;
        }
    }

    if (offset < 0) {
        offset += daysInYear;
        --lunarMonth;
    }

    const lunarDay = offset + 1;

    const ganIndex = (lunarYear - 4) % 10;
    const zhiIndex = (lunarYear - 4) % 12;
    const gan = TIAN_GAN[ganIndex];
    const zhi = DI_ZHI[zhiIndex];
    const zodiac = ZODIAC[zhiIndex];

    return {
        year: lunarYear,
        month: lunarMonth,
        day: lunarDay,
        isLeap: isLeap,
        yearGan: gan,
        yearZhi: zhi,
        yearGanIndex: ganIndex,
        yearZhiIndex: zhiIndex,
        zodiac: zodiac,
        monthName: (isLeap ? '闰' : '') + LUNAR_MONTH[lunarMonth - 1] + '月',
        dayName: LUNAR_DAY[lunarDay - 1],
        ganZhi: gan + zhi + '年'
    };
}

function lunar2solar(year, month, day, isLeap = false) {
    if (year < 1900 || year > 2100) {
        return null;
    }

    const leapMonth = getLeapMonth(year);

    let offset = 0;
    for (let i = 1900; i < year; i++) {
        offset += getYearDays(i);
    }

    for (let i = 1; i < month; i++) {
        offset += getMonthDays(year, i);
    }

    if (leapMonth > 0 && month > leapMonth) {
        offset += getLeapMonthDays(year);
    }

    if (isLeap && month === leapMonth) {
        offset += getMonthDays(year, month);
    }

    offset += day - 1;

    const baseDate = new Date(1900, 0, 31);
    const resultDate = new Date(baseDate.getTime() + offset * 86400000);

    return {
        year: resultDate.getFullYear(),
        month: resultDate.getMonth() + 1,
        day: resultDate.getDate()
    };
}

console.log('[Lunar] 准备导出，solar2lunar =', typeof solar2lunar);

if (typeof window !== 'undefined') {
    window.solar2lunar = solar2lunar;
    window.lunar2solar = lunar2solar;
    window.TIAN_GAN_LUNAR = TIAN_GAN;
    window.DI_ZHI_LUNAR = DI_ZHI;
    console.log('[Lunar] ✅ 导出完成！');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { solar2lunar, lunar2solar, TIAN_GAN, DI_ZHI };
}

console.log('[Lunar] 脚本执行完成');
