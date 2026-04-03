# 紫微斗数命盘预测系统

一个现代化的紫微斗数网页应用，提供命盘生成、运势分析和风水建议。

## 功能特点

### 🎯 核心功能
- **命盘生成** - 支持农历/阳历输入，自动排盘
- **星曜详解** - 点击星曜查看详细说明
- **三方四正** - 高亮显示命宫及三方四正宫位
- **本命分析** - 性格、事业、财运、感情、健康
- **流年运势** - 任意年份运势预测
- **流日预测** - 每日宜忌建议

### 🏠 风水建议
- 城市选择推荐
- 方位吉凶分析
- 家居布局建议
- 办公室风水
- 色彩装饰指导
- 出行方位建议

## 技术特点

- 基于《紫微斗数全书》传统算法
- 支持 1900-2100 年农历转换
- 响应式设计，支持移动端
- 现代深色主题，星空动态背景
- 无需服务器，纯静态HTML

## 快速开始

### 本地运行

```bash
cd ~/ziwei-destiny
python3 -m http.server 9999
```

然后访问：http://localhost:9999/index.html

### 局域网访问

```bash
python3 -m http.server 9999 --bind 0.0.0.0
```

其他设备访问：http://你的IP:9999/index.html

## 部署

### Vercel
1. 访问 https://vercel.com
2. 上传项目文件夹
3. 一键部署

### Netlify
1. 访问 https://netlify.com
2. 拖拽项目文件夹
3. 自动发布

### Gitee Pages
1. 注册 Gitee 账号
2. 创建仓库并推送代码
3. 启用 Gitee Pages

## 文件说明

- `index.html` - 主页面
- `app.js` - 应用逻辑
- `ziwei-accurate.js` - 紫微斗数算法
- `lunar.js` - 农历转换
- `star-info.js` - 星曜信息数据库
- `fengshui.js` - 风水分析
- `styles.css` - 样式表

## 许可

仅供学习娱乐使用，不作为专业命理咨询依据。

## 作者

Generated with Claude Code
