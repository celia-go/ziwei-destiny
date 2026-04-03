/**
 * 紫微斗数命盘主应用程序 v3.2
 * 连接UI与算法，实现交互功能
 * 包含三方四正高亮、星曜详情弹窗、中宫命盘总结等完整功能
 */

// 全局变量
let currentChart = null;

/**
 * 更新历法标签
 */
function updateCalendarLabels() {
    const calendarType = document.getElementById('calendarType').value;
    const yearLabel = document.getElementById('yearLabel');
    const monthLabel = document.getElementById('monthLabel');
    const dayLabel = document.getElementById('dayLabel');

    if (calendarType === 'lunar') {
        yearLabel.textContent = '（农历）';
        monthLabel.textContent = '（农历）';
        dayLabel.textContent = '（农历）';
    } else {
        yearLabel.textContent = '（阳历）';
        monthLabel.textContent = '（阳历）';
        dayLabel.textContent = '（阳历）';
    }
}

/**
 * 生成命盘
 */
function generateChart() {
    // 获取输入数据
    const gender = document.getElementById('gender').value;
    const calendarType = document.getElementById('calendarType').value;
    let year = parseInt(document.getElementById('year').value);
    let month = parseInt(document.getElementById('month').value);
    let day = parseInt(document.getElementById('day').value);
    const hourSelect = document.getElementById('hour').value;

    // 验证输入
    if (!year || !month || !day || hourSelect === '') {
        alert('请填写完整的生辰信息！');
        return;
    }

    const hour = parseInt(hourSelect);

    // 如果是阳历，转换为农历
    let lunarDate;
    if (calendarType === 'solar') {
        try {
            lunarDate = Lunar.solar2lunar(year, month, day);
            if (!lunarDate) {
                alert('日期转换失败，请检查输入的阳历日期是否正确！');
                return;
            }
            year = lunarDate.lYear;
            month = lunarDate.lMonth;
            day = lunarDate.lDay;
        } catch (e) {
            alert('日期转换出错：' + e.message);
            return;
        }
    }

    // 创建生辰数据
    const birthData = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        gender: gender,
        calendarType: calendarType
    };

    // 生成命盘
    try {
        currentChart = ZiweiDoushu.createZiweiChart(birthData);

        // 显示命盘
        displayChart(currentChart);

        // 生成分析
        generateAnalysis(currentChart);

        // 生成风水建议
        generateFengshuiRecommendations(currentChart);

        // 切换显示
        document.getElementById('inputPanel').classList.add('hidden');
        document.getElementById('chartPanel').classList.remove('hidden');

        // 滚动到命盘
        document.getElementById('chartPanel').scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
        alert('排盘出错：' + e.message);
        console.error(e);
    }
}

/**
 * 显示命盘
 */
function displayChart(chart) {
    const zodiacChart = document.getElementById('zodiacChart');
    zodiacChart.innerHTML = '';

    // 显示生辰信息
    const birthInfo = document.getElementById('birthInfo');
    const genderText = chart.birthData.gender === 'male' ? '男' : '女';
    const calendarText = chart.birthData.calendarType === 'lunar' ? '农历' : '阳历';
    const hourNames = ["子时", "丑时", "寅时", "卯时", "辰时", "巳时", "午时", "未时", "申时", "酉时", "戌时", "亥时"];

    // 计算三方四正宫位
    const mingPos = chart.mingPalacePosition;
    const sanFangSiZheng = {
        ming: mingPos,
        qianyi: (mingPos + 6) % 12,   // 对宫（迁移宫）
        caibo: (mingPos + 4) % 12,     // 三合宫1（财帛宫）
        guanlu: (mingPos + 8) % 12     // 三合宫2（官禄宫）
    };

    // 获取三方四正宫位名称
    const sanFangNames = [
        chart.palaces[0].name,  // 命宫
        chart.palaces[(0 + 4) % 12].name,  // 财帛宫
        chart.palaces[(0 + 8) % 12].name,  // 官禄宫
        chart.palaces[(0 + 6) % 12].name   // 迁移宫（对宫）
    ];

    birthInfo.innerHTML = `
        ${genderText}命 | ${calendarText} ${chart.birthData.year}年${chart.birthData.month}月${chart.birthData.day}日 ${hourNames[chart.birthData.hour]} |
        ${chart.yearGanZhi}年 | ${chart.bureau}<br>
        <span style="color: var(--gold); font-size: 0.9rem;">三方四正：${sanFangNames.join(' · ')}</span>
    `;

    // 按照传统命盘布局排列（逆时针）
    const layoutOrder = [4, 5, 6, 7, 3, 8, 2, 9, 1, 10, 0, 11];

    layoutOrder.forEach((i, index) => {
        const palace = chart.palaces[i];

        // 判断是否为命宫
        const isMingPalace = palace.isLifePalace;

        // 判断是否为三方四正宫位（命宫除外，因为命宫有自己的样式）
        const isSanFangSiZheng = !isMingPalace && (
            palace.position === sanFangSiZheng.qianyi ||
            palace.position === sanFangSiZheng.caibo ||
            palace.position === sanFangSiZheng.guanlu
        );

        // 创建宫位元素
        const palaceDiv = createPalaceElement(palace, isMingPalace, isSanFangSiZheng, index === 5);

        zodiacChart.appendChild(palaceDiv);
    });
}

/**
 * 创建宫位元素
 * @param {Object} palace - 宫位数据
 * @param {Boolean} isMingPalace - 是否为命宫
 * @param {Boolean} isSanFangSiZheng - 是否为三方四正
 * @param {Boolean} isCenterPosition - 是否为中央位置（用于显示命盘总结）
 * @returns {HTMLElement} 宫位DOM元素
 */
function createPalaceElement(palace, isMingPalace, isSanFangSiZheng, isCenterPosition) {
    const palaceDiv = document.createElement('div');
    palaceDiv.className = 'palace';
    palaceDiv.dataset.position = palace.position;

    // 为命宫添加特殊样式（金色边框）
    if (isMingPalace) {
        palaceDiv.classList.add('life-palace');
    }

    // 为三方四正添加特殊样式（紫色边框和深色背景）
    if (isSanFangSiZheng) {
        palaceDiv.classList.add('san-fang-si-zheng');
    }

    // 如果是中央位置，显示命盘总结而非普通宫位
    if (isCenterPosition) {
        const summary = generateChartSummary(currentChart);
        palaceDiv.innerHTML = summary;
        palaceDiv.classList.add('center-summary');
        return palaceDiv;
    }

    // 宫位名称
    const palaceName = document.createElement('div');
    palaceName.className = 'palace-name';
    palaceName.textContent = `${palace.name}（${palace.branch}）`;
    palaceDiv.appendChild(palaceName);

    // 星曜列表
    const starsDiv = document.createElement('div');
    starsDiv.className = 'palace-stars';

    palace.stars.forEach(starName => {
        const starSpan = document.createElement('span');
        starSpan.className = 'star';
        starSpan.textContent = starName;

        // 添加点击事件显示星曜详情
        starSpan.onclick = (e) => {
            e.stopPropagation();
            displayStarInfo(starName);
        };

        // 标记主星
        if (isMajorStar(starName)) {
            starSpan.classList.add('major-star');
        }

        // 标记吉星
        if (isLuckyStar(starName)) {
            starSpan.classList.add('lucky-star');
        }

        // 标记煞星
        if (isMaleficStar(starName)) {
            starSpan.classList.add('malefic-star');
        }

        starsDiv.appendChild(starSpan);
    });

    palaceDiv.appendChild(starsDiv);

    return palaceDiv;
}

/**
 * 生成命盘总结（中宫显示）
 * @param {Object} chart - 命盘数据
 * @returns {String} HTML字符串
 */
function generateChartSummary(chart) {
    // 获取命宫主星
    const lifePalace = chart.palaces[0];
    const majorStars = lifePalace.stars.filter(s => isMajorStar(s));
    const mingStarsText = majorStars.length > 0 ? majorStars.join('、') : '无主星';

    // 获取三方宫位的星曜
    const mingPos = chart.mingPalacePosition;
    const caiboPalace = chart.palaces.find(p => p.position === (mingPos + 4) % 12);
    const guanluPalace = chart.palaces.find(p => p.position === (mingPos + 8) % 12);
    const qianyiPalace = chart.palaces.find(p => p.position === (mingPos + 6) % 12);

    // 收集三方见星
    const sanFangStars = new Set();
    [caiboPalace, guanluPalace, qianyiPalace].forEach(palace => {
        palace.stars.filter(s => isMajorStar(s)).forEach(s => sanFangStars.add(s));
    });

    const sanFangText = sanFangStars.size > 0 ? Array.from(sanFangStars).join('、') : '无主星';

    return `
        <div style="display: flex; flex-direction: column; justify-content: center; height: 100%; text-align: center; padding: 1rem;">
            <div style="font-size: 1.5rem; color: var(--gold); font-weight: bold; margin-bottom: 1rem;">命盘</div>
            <div style="font-size: 0.95rem; line-height: 1.8; color: var(--text-light);">
                <div style="margin-bottom: 0.8rem;">
                    <span style="color: var(--purple-light);">命主：</span>
                    <span style="color: var(--gold);">${mingStarsText}</span>
                </div>
                <div style="margin-bottom: 0.8rem;">
                    <span style="color: var(--purple-light);">${chart.bureau}</span>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">
                    <span style="color: var(--purple-light);">三方见：</span>
                    <br>${sanFangText}
                </div>
            </div>
        </div>
    `;
}

/**
 * 显示星曜详细信息（模态弹窗）
 * @param {String} starName - 星曜名称
 */
function displayStarInfo(starName) {
    const info = getStarInfo(starName);
    const modal = document.getElementById('starModal');
    const modalBody = document.getElementById('starModalBody');

    let html = `<h2>${info.name}</h2>`;

    if (info.category) {
        html += `<p><strong>分类：</strong>${info.category}`;
        if (info.element) {
            html += ` | <strong>五行：</strong>${info.element}`;
        }
        if (info.nature) {
            const natureText = info.nature === '吉' ? '吉星' : info.nature === '凶' ? '煞星' : '中性';
            html += ` | <strong>性质：</strong>${natureText}`;
        }
        html += `</p>`;
    }

    html += `<h3>星曜特质</h3><p>${info.description}</p>`;

    if (info.personality) {
        html += `<h3>性格特点</h3><p>${info.personality}</p>`;
    }

    if (info.career) {
        html += `<h3>事业发展</h3><p>${info.career}</p>`;
    }

    if (info.wealth) {
        html += `<h3>财运状况</h3><p>${info.wealth}</p>`;
    }

    if (info.love) {
        html += `<h3>感情婚姻</h3><p>${info.love}</p>`;
    }

    if (info.health) {
        html += `<h3>健康注意</h3><p>${info.health}</p>`;
    }

    if (info.lucky) {
        html += `<h3>幸运元素</h3>`;
        html += `<p><strong>幸运色：</strong>${info.lucky.color.join('、')}</p>`;
        html += `<p><strong>幸运数字：</strong>${info.lucky.number.join('、')}</p>`;
        html += `<p><strong>吉利方位：</strong>${info.lucky.direction.join('、')}</p>`;
    }

    modalBody.innerHTML = html;
    modal.style.display = 'block';
    modal.classList.remove('hidden');
}

/**
 * 关闭星曜弹窗
 */
function closeStarModal() {
    const modal = document.getElementById('starModal');
    modal.style.display = 'none';
    modal.classList.add('hidden');
}

// 点击弹窗外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('starModal');
    if (event.target === modal) {
        closeStarModal();
    }
};

/**
 * 生成本命分析
 */
function generateAnalysis(chart) {
    const lifeAnalysis = document.getElementById('lifeAnalysis');

    // 获取命宫星曜
    const lifePalace = chart.palaces[0];
    const lifeStars = lifePalace.stars;

    let html = '<h4>命宫分析</h4>';
    html += `<p>您的命宫位于<strong>${lifePalace.branch}</strong>宫，五行属<strong>${chart.bureau}</strong>。</p>`;

    if (lifeStars.length > 0) {
        const majorStars = lifeStars.filter(s => isMajorStar(s));
        if (majorStars.length > 0) {
            html += '<p>命宫主星：<strong>' + majorStars.join('、') + '</strong></p>';

            // 根据主星分析性格
            const mainStar = getStarInfo(majorStars[0]);
            html += `<h4>性格特质</h4><p>${mainStar.personality || '性格分析暂缺'}</p>`;
            html += `<h4>事业运势</h4><p>${mainStar.career || '事业分析暂缺'}</p>`;
            html += `<h4>财运状况</h4><p>${mainStar.wealth || '财运分析暂缺'}</p>`;
            html += `<h4>感情婚姻</h4><p>${mainStar.love || '感情分析暂缺'}</p>`;
            html += `<h4>健康提示</h4><p>${mainStar.health || '健康分析暂缺'}</p>`;
        } else {
            html += '<p>命宫无主星，但有辅星照耀。</p>';
        }
    } else {
        html += '<p>命宫无主星，需参考对宫（迁移宫）的星曜来论命。</p>';
    }

    // 吉凶星分析
    const luckyStars = lifeStars.filter(s => isLuckyStar(s));
    const maleficStars = lifeStars.filter(s => isMaleficStar(s));

    if (luckyStars.length > 0) {
        html += `<h4>吉星助力</h4><p>命宫有<strong>${luckyStars.join('、')}</strong>等吉星，带来贵人运和好运势。</p>`;
    }

    if (maleficStars.length > 0) {
        html += `<h4>煞星影响</h4><p>命宫有<strong>${maleficStars.join('、')}</strong>等煞星，需要注意化解和调整心态。</p>`;
    }

    lifeAnalysis.innerHTML = html;

    // 设置默认年份为当前年份
    document.getElementById('yearSelect').value = new Date().getFullYear();

    // 设置默认日期为今天
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('daySelect').value = today;
}

/**
 * 分析流年运势
 */
function analyzeYear() {
    const yearInput = document.getElementById('yearSelect').value;
    const year = parseInt(yearInput);

    if (!year || !currentChart) {
        alert('请先生成命盘并输入有效年份！');
        return;
    }

    const yearAnalysis = document.getElementById('yearAnalysis');

    // 计算流年宫位（简化版）
    const birthYear = currentChart.birthData.year;
    const age = year - birthYear + 1;
    const liuNianPalaceIndex = (age - 1) % 12;
    const liuNianPalace = currentChart.palaces[liuNianPalaceIndex];

    let html = `<h4>${year}年运势概览</h4>`;
    html += `<p>流年命宫位于<strong>${liuNianPalace.name}（${liuNianPalace.branch}）</strong>。</p>`;

    // 分析流年宫位的星曜
    if (liuNianPalace.stars.length > 0) {
        const majorStars = liuNianPalace.stars.filter(s => isMajorStar(s));
        if (majorStars.length > 0) {
            html += `<h4>主要影响</h4>`;
            majorStars.forEach(star => {
                const info = getStarInfo(star);
                html += `<p><strong>${star}：</strong>${info.description}</p>`;
            });
        }
    }

    // 吉凶星影响
    const luckyStars = liuNianPalace.stars.filter(s => isLuckyStar(s));
    const maleficStars = liuNianPalace.stars.filter(s => isMaleficStar(s));

    if (luckyStars.length > 0) {
        html += `<p><strong>吉星照耀：</strong>${luckyStars.join('、')}，今年运势较为顺利。</p>`;
    }

    if (maleficStars.length > 0) {
        html += `<p><strong>煞星影响：</strong>${maleficStars.join('、')}，今年需谨慎行事，化解不利。</p>`;
    }

    html += `<h4>运势建议</h4>`;
    html += `<ul>`;
    html += `<li>把握吉星带来的机遇，积极进取</li>`;
    html += `<li>注意煞星影响，避免冒险和冲动</li>`;
    html += `<li>多行善事，广结善缘，增强正能量</li>`;
    html += `<li>保持健康作息，调整心态，以不变应万变</li>`;
    html += `</ul>`;

    yearAnalysis.innerHTML = html;
}

/**
 * 分析流日运势
 */
function analyzeDay() {
    const dayInput = document.getElementById('daySelect').value;

    if (!dayInput || !currentChart) {
        alert('请先生成命盘并选择日期！');
        return;
    }

    const dayAnalysis = document.getElementById('dayAnalysis');
    const selectedDate = new Date(dayInput);
    const dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][selectedDate.getDay()];

    let html = `<h4>${dayInput} 星期${dayOfWeek}</h4>`;

    // 简化的流日分析（实际需要更复杂的算法）
    const dayNum = selectedDate.getDate();
    const luckyLevel = (dayNum % 3);

    if (luckyLevel === 0) {
        html += `<p><strong>运势指数：</strong>⭐⭐⭐⭐⭐ 大吉</p>`;
        html += `<h4>今日宜</h4><ul>`;
        html += `<li>✅ 签约合作</li>`;
        html += `<li>✅ 投资理财</li>`;
        html += `<li>✅ 求职面试</li>`;
        html += `<li>✅ 外出旅行</li>`;
        html += `<li>✅ 拜访贵人</li>`;
        html += `</ul>`;
        html += `<h4>今日忌</h4><ul>`;
        html += `<li>❌ 无特别禁忌</li>`;
        html += `</ul>`;
    } else if (luckyLevel === 1) {
        html += `<p><strong>运势指数：</strong>⭐⭐⭐ 中吉</p>`;
        html += `<h4>今日宜</h4><ul>`;
        html += `<li>✅ 学习进修</li>`;
        html += `<li>✅ 规划未来</li>`;
        html += `<li>✅ 整理家务</li>`;
        html += `<li>✅ 联络老友</li>`;
        html += `</ul>`;
        html += `<h4>今日忌</h4><ul>`;
        html += `<li>❌ 重大投资</li>`;
        html += `<li>❌ 与人争执</li>`;
        html += `</ul>`;
    } else {
        html += `<p><strong>运势指数：</strong>⭐⭐ 平</p>`;
        html += `<h4>今日宜</h4><ul>`;
        html += `<li>✅ 休息调养</li>`;
        html += `<li>✅ 反思总结</li>`;
        html += `<li>✅ 静心修行</li>`;
        html += `</ul>`;
        html += `<h4>今日忌</h4><ul>`;
        html += `<li>❌ 签约合作</li>`;
        html += `<li>❌ 冒险投资</li>`;
        html += `<li>❌ 搬家动土</li>`;
        html += `<li>❌ 与人冲突</li>`;
        html += `</ul>`;
    }

    html += `<p class="tip">💡 流日分析仅供参考，实际行动还需结合个人情况和理性判断。</p>`;

    dayAnalysis.innerHTML = html;
}

/**
 * 生成风水建议
 */
function generateFengshuiRecommendations(chart) {
    const fengshui = generateFengshuiAnalysis(chart);

    document.getElementById('cityAnalysis').innerHTML = fengshui.city;
    document.getElementById('directionAnalysis').innerHTML = fengshui.direction;
    document.getElementById('homeAnalysis').innerHTML = fengshui.home;
    document.getElementById('officeAnalysis').innerHTML = fengshui.office;
    document.getElementById('colorAnalysis').innerHTML = fengshui.color;
    document.getElementById('travelAnalysis').innerHTML = fengshui.travel;
}

/**
 * 重置表单
 */
function reset() {
    document.getElementById('inputPanel').classList.remove('hidden');
    document.getElementById('chartPanel').classList.add('hidden');
    currentChart = null;

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    // 设置默认值
    const currentYear = new Date().getFullYear();
    document.getElementById('year').value = currentYear;

    // 绑定回车键提交
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const chartPanel = document.getElementById('chartPanel');
            if (chartPanel.classList.contains('hidden')) {
                generateChart();
            }
        }
    });

    console.log('紫微斗数命盘系统 v3.2 加载完成');
    console.log('功能：三方四正高亮 | 星曜详情弹窗 | 命盘中宫总结');
});
