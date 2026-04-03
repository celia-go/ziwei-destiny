/**
 * 紫微斗数风水分析模块 v3.2
 * 基于五行理论和命盘分析提供风水建议
 */

/**
 * 五行属性映射
 */
const FIVE_ELEMENTS = {
    "金": { color: ["白色", "金色", "银色"], direction: ["西", "西北"], number: [4, 9] },
    "木": { color: ["绿色", "青色"], direction: ["东", "东南"], number: [3, 8] },
    "水": { color: ["黑色", "蓝色"], direction: ["北"], number: [1, 6] },
    "火": { color: ["红色", "紫色", "粉色"], direction: ["南"], number: [2, 7] },
    "土": { color: ["黄色", "棕色", "米色"], direction: ["中", "西南", "东北"], number: [5, 10] }
};

/**
 * 五行相生相克关系
 */
const ELEMENT_RELATIONS = {
    "金": { generate: "水", overcome: "木", generated_by: "土", overcome_by: "火" },
    "木": { generate: "火", overcome: "土", generated_by: "水", overcome_by: "金" },
    "水": { generate: "木", overcome: "火", generated_by: "金", overcome_by: "土" },
    "火": { generate: "土", overcome: "金", generated_by: "木", overcome_by: "水" },
    "土": { generate: "金", overcome: "水", generated_by: "火", overcome_by: "木" }
};

/**
 * 根据命盘获取五行喜忌
 * @param {object} chart - 命盘数据
 * @returns {object} 五行喜忌分析
 */
function analyzeElementBalance(chart) {
    const elementCount = { "金": 0, "木": 0, "水": 0, "火": 0, "土": 0 };

    // 统计命盘中各五行的数量
    chart.palaces.forEach(palace => {
        palace.stars.forEach(starName => {
            const star = getStarInfo(starName);
            if (star.element) {
                const elements = star.element.split('/');
                elements.forEach(elem => {
                    if (elementCount[elem] !== undefined) {
                        elementCount[elem]++;
                    }
                });
            }
        });
    });

    // 找出最强和最弱的五行
    let maxElement = "木", minElement = "木";
    let maxCount = elementCount["木"], minCount = elementCount["木"];

    for (let elem in elementCount) {
        if (elementCount[elem] > maxCount) {
            maxCount = elementCount[elem];
            maxElement = elem;
        }
        if (elementCount[elem] < minCount) {
            minCount = elementCount[elem];
            minElement = elem;
        }
    }

    // 确定需要补充的五行
    const needElements = [];
    if (minCount < 2) {
        needElements.push(minElement);
        // 添加生该弱元素的五行
        needElements.push(ELEMENT_RELATIONS[minElement].generated_by);
    }

    // 确定需要避免的五行
    const avoidElements = [];
    if (maxCount > 3) {
        avoidElements.push(maxElement);
        // 添加该强元素所生的五行
        avoidElements.push(ELEMENT_RELATIONS[maxElement].generate);
    }

    return {
        elementCount,
        strongElement: maxElement,
        weakElement: minElement,
        needElements: [...new Set(needElements)],
        avoidElements: [...new Set(avoidElements)]
    };
}

/**
 * 城市选择建议
 * @param {object} chart - 命盘数据
 * @returns {string} 城市选择分析
 */
function analyzeCitySelection(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;

    let result = "<h4>宜居城市方位</h4>";

    const cityRecommendations = [];

    needElements.forEach(elem => {
        const directions = FIVE_ELEMENTS[elem].direction;
        directions.forEach(dir => {
            cityRecommendations.push(`<strong>${dir}方</strong>的城市（五行属${elem}）`);
        });
    });

    result += "<p>根据您的命盘五行分析，适宜选择位于出生地<strong>" +
              cityRecommendations.join("、") + "</strong>发展。</p>";

    result += "<h4>城市特征建议</h4><ul>";

    if (needElements.includes("金")) {
        result += "<li>现代化金融中心、科技城市（如深圳、上海、新加坡）</li>";
    }
    if (needElements.includes("木")) {
        result += "<li>绿化好、森林多的生态城市（如成都、昆明、温哥华）</li>";
    }
    if (needElements.includes("水")) {
        result += "<li>临海、临江、多湖泊的水城（如威尼斯、苏州、杭州）</li>";
    }
    if (needElements.includes("火")) {
        result += "<li>阳光充足、气候炎热的南方城市（如广州、海南、迈阿密）</li>";
    }
    if (needElements.includes("土")) {
        result += "<li>历史文化古城、平原地区（如西安、北京、开封）</li>";
    }

    result += "</ul>";

    result += "<p class='tip'>💡 提示：若无法搬迁，可通过居住地的方位调整来补足五行。</p>";

    return result;
}

/**
 * 方位吉凶分析
 * @param {object} chart - 命盘数据
 * @returns {string} 方位分析
 */
function analyzeDirections(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;
    const avoidElements = elementAnalysis.avoidElements;

    let result = "<h4>吉方</h4><ul>";

    const luckyDirections = new Set();
    needElements.forEach(elem => {
        FIVE_ELEMENTS[elem].direction.forEach(dir => luckyDirections.add(dir));
    });

    luckyDirections.forEach(dir => {
        result += `<li><strong>${dir}方</strong>：适合工作、出行、投资</li>`;
    });

    result += "</ul><h4>凶方</h4><ul>";

    const unluckyDirections = new Set();
    avoidElements.forEach(elem => {
        FIVE_ELEMENTS[elem].direction.forEach(dir => unluckyDirections.add(dir));
    });

    if (unluckyDirections.size > 0) {
        unluckyDirections.forEach(dir => {
            result += `<li><strong>${dir}方</strong>：宜避免长期居住或重大决策</li>`;
        });
    } else {
        result += "<li>目前五行平衡，无特别不利方位</li>";
    }

    result += "</ul>";

    result += "<p class='tip'>💡 方位以出生地或当前居住地为中心判断。</p>";

    return result;
}

/**
 * 家居布局建议
 * @param {object} chart - 命盘数据
 * @returns {string} 家居布局分析
 */
function analyzeHomeLayout(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;

    let result = "<h4>卧室布置</h4><ul>";

    if (needElements.includes("金") || needElements.includes("土")) {
        result += "<li>卧室宜选择<strong>西方、西北方</strong>，有利健康和财运</li>";
        result += "<li>床头朝向<strong>西方或北方</strong>睡眠更佳</li>";
    } else if (needElements.includes("木")) {
        result += "<li>卧室宜选择<strong>东方、东南方</strong>，有利成长和发展</li>";
        result += "<li>床头朝向<strong>东方</strong>，提升活力</li>";
    } else if (needElements.includes("水")) {
        result += "<li>卧室宜选择<strong>北方</strong>，有利智慧和财运</li>";
        result += "<li>床头朝向<strong>北方</strong>，增强灵感</li>";
    } else if (needElements.includes("火")) {
        result += "<li>卧室宜选择<strong>南方</strong>，有利事业和名声</li>";
        result += "<li>床头朝向<strong>南方</strong>，提升运势</li>";
    }

    result += "</ul><h4>客厅布置</h4><ul>";
    result += "<li>客厅宜明亮开阔，光线充足</li>";
    result += "<li>沙发应靠墙摆放，背后有靠</li>";
    result += "<li>避免横梁压顶，影响运势</li>";

    if (needElements.includes("水")) {
        result += "<li>可在北方放置鱼缸或水景，增强财运</li>";
    }
    if (needElements.includes("木")) {
        result += "<li>宜多摆放绿植，净化空气提升运势</li>";
    }

    result += "</ul><h4>厨房卫生间</h4><ul>";
    result += "<li>厨房和卫生间不宜相对，水火相冲</li>";
    result += "<li>卫生间门要常关，避免秽气扩散</li>";
    result += "<li>厨房保持整洁，火气不宜过旺</li>";
    result += "</ul>";

    return result;
}

/**
 * 办公风水分析
 * @param {object} chart - 命盘数据
 * @returns {string} 办公风水建议
 */
function analyzeOfficeLayout(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;

    let result = "<h4>办公桌位置</h4><ul>";

    const luckyDirections = new Set();
    needElements.forEach(elem => {
        FIVE_ELEMENTS[elem].direction.forEach(dir => luckyDirections.add(dir));
    });

    result += "<li>办公桌宜选择房间的<strong>" + Array.from(luckyDirections).join("、") + "方</strong>位置</li>";
    result += "<li>座位后方宜有实墙，不宜背对门窗</li>";
    result += "<li>避免座位正对门口或走道，易受冲煞</li>";
    result += "<li>座位上方避免横梁和吊灯直压</li>";
    result += "</ul>";

    result += "<h4>办公桌朝向</h4><ul>";

    const mainDirection = Array.from(luckyDirections)[0] || "南";
    result += `<li>办公桌面向<strong>${mainDirection}方</strong>，有利事业发展</li>`;
    result += "<li>背靠吉方，面向开阔空间，视野开阔心胸宽广</li>";
    result += "</ul>";

    result += "<h4>办公环境</h4><ul>";
    result += "<li>办公桌保持整洁，文件分类摆放</li>";
    result += "<li>左高右低（青龙白虎位），文件柜宜放左侧</li>";

    if (needElements.includes("木")) {
        result += "<li>办公桌放置小型绿植（如富贵竹），提升事业运</li>";
    }
    if (needElements.includes("水")) {
        result += "<li>可在办公桌左前方放水晶球或小鱼缸，招财旺运</li>";
    }
    if (needElements.includes("金")) {
        result += "<li>可摆放金属工艺品或奖杯，增强权威</li>";
    }

    result += "<li>电脑显示器不宜正对自己，稍微偏向为佳</li>";
    result += "</ul>";

    return result;
}

/**
 * 色彩装饰建议
 * @param {object} chart - 命盘数据
 * @returns {string} 色彩建议
 */
function analyzeColors(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;
    const avoidElements = elementAnalysis.avoidElements;

    let result = "<h4>幸运色彩</h4>";

    const luckyColors = new Set();
    needElements.forEach(elem => {
        FIVE_ELEMENTS[elem].color.forEach(color => luckyColors.add(color));
    });

    result += "<p>您的幸运色为：<strong>" + Array.from(luckyColors).join("、") + "</strong></p>";
    result += "<ul>";
    result += "<li>服装可多选择幸运色系，提升运势</li>";
    result += "<li>家居装饰可采用幸运色调，营造和谐气场</li>";
    result += "<li>重要场合穿着幸运色，增强自信和运气</li>";
    result += "</ul>";

    result += "<h4>不宜色彩</h4>";

    const unluckyColors = new Set();
    avoidElements.forEach(elem => {
        FIVE_ELEMENTS[elem].color.forEach(color => unluckyColors.add(color));
    });

    if (unluckyColors.size > 0) {
        result += "<p>宜少用：" + Array.from(unluckyColors).join("、") + "</p>";
        result += "<p class='tip'>💡 不宜色彩非完全禁忌，可作为点缀，但不宜大面积使用。</p>";
    } else {
        result += "<p>目前五行平衡，无特别禁忌色彩。</p>";
    }

    result += "<h4>五行配色建议</h4><ul>";

    needElements.forEach(elem => {
        switch(elem) {
            case "金":
                result += "<li><strong>金色系</strong>：白色、金色、银色 - 象征纯净、高贵、财富</li>";
                break;
            case "木":
                result += "<li><strong>木色系</strong>：绿色、青色 - 象征生机、成长、健康</li>";
                break;
            case "水":
                result += "<li><strong>水色系</strong>：黑色、蓝色 - 象征智慧、沉稳、财富</li>";
                break;
            case "火":
                result += "<li><strong>火色系</strong>：红色、紫色、粉色 - 象征热情、活力、名声</li>";
                break;
            case "土":
                result += "<li><strong>土色系</strong>：黄色、棕色、米色 - 象征稳重、包容、储蓄</li>";
                break;
        }
    });

    result += "</ul>";

    return result;
}

/**
 * 出行方位建议
 * @param {object} chart - 命盘数据
 * @returns {string} 出行建议
 */
function analyzeTravelDirections(chart) {
    const elementAnalysis = analyzeElementBalance(chart);
    const needElements = elementAnalysis.needElements;

    let result = "<h4>旅行吉方</h4>";

    const luckyDirections = new Set();
    needElements.forEach(elem => {
        FIVE_ELEMENTS[elem].direction.forEach(dir => luckyDirections.add(dir));
    });

    result += "<p>适宜前往<strong>" + Array.from(luckyDirections).join("、") +
              "方</strong>旅游、出差、求学、求职。</p>";

    result += "<h4>出行时机</h4><ul>";
    result += "<li>重要出行前查看当日运势，选择吉日出发</li>";
    result += "<li>长途旅行宜选择自己的幸运方位</li>";
    result += "<li>短期旅游可根据季节和五行选择目的地</li>";
    result += "</ul>";

    result += "<h4>旅行建议</h4><ul>";

    needElements.forEach(elem => {
        switch(elem) {
            case "金":
                result += "<li><strong>金行目的地</strong>：现代都市、博物馆、科技园区</li>";
                break;
            case "木":
                result += "<li><strong>木行目的地</strong>：森林公园、植物园、生态景区</li>";
                break;
            case "水":
                result += "<li><strong>水行目的地</strong>：海滨城市、湖泊景区、温泉度假村</li>";
                break;
            case "火":
                result += "<li><strong>火行目的地</strong>：热带地区、沙漠景观、主题乐园</li>";
                break;
            case "土":
                result += "<li><strong>土行目的地</strong>：历史古迹、山区景点、乡村田园</li>";
                break;
        }
    });

    result += "</ul>";

    result += "<p class='tip'>💡 出行方位以当前居住地为中心。若从出生地出发，则以出生地为准。</p>";

    return result;
}

/**
 * 生成完整的风水分析报告
 * @param {object} chart - 命盘数据
 * @returns {object} 完整的风水建议
 */
function generateFengshuiAnalysis(chart) {
    return {
        city: analyzeCitySelection(chart),
        direction: analyzeDirections(chart),
        home: analyzeHomeLayout(chart),
        office: analyzeOfficeLayout(chart),
        color: analyzeColors(chart),
        travel: analyzeTravelDirections(chart)
    };
}

// 添加样式辅助
const fengshuiStyle = `
<style>
.tip {
    background: rgba(241, 196, 15, 0.1);
    border-left: 3px solid var(--gold);
    padding: 0.8rem;
    margin-top: 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
}
</style>
`;

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        analyzeElementBalance,
        generateFengshuiAnalysis,
        analyzeCitySelection,
        analyzeDirections,
        analyzeHomeLayout,
        analyzeOfficeLayout,
        analyzeColors,
        analyzeTravelDirections
    };
}
