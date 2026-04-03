#!/bin/bash

echo "==================================="
echo "  紫微斗数命盘系统 - 自动安装"
echo "==================================="
echo ""

cd ~/ziwei-destiny

# 检查必需文件
missing_files=()

if [ ! -f "index.html" ]; then missing_files+=("index.html"); fi
if [ ! -f "styles.css" ]; then missing_files+=("styles.css"); fi
if [ ! -f "app.js" ]; then missing_files+=("app.js"); fi
if [ ! -f "lunar.js" ]; then missing_files+=("lunar.js"); fi
if [ ! -f "ziwei-accurate.js" ]; then missing_files+=("ziwei-accurate.js"); fi
if [ ! -f "star-info.js" ]; then missing_files+=("star-info.js"); fi
if [ ! -f "fengshui.js" ]; then missing_files+=("fengshui.js"); fi

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "✅ 所有文件已就绪！"
else
    echo "❌ 缺少以下文件："
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "正在为您创建缺失的文件..."
fi

echo ""
echo "==================================="
echo "  当前文件列表："
echo "==================================="
ls -lh *.html *.js *.css 2>/dev/null

echo ""
echo "==================================="
echo "  启动本地服务器"
echo "==================================="
pkill -f "python3 -m http.server 9999" 2>/dev/null
python3 -m http.server 9999 --bind 0.0.0.0 > /dev/null 2>&1 &

echo "✅ 服务器已启动！"
echo ""
echo "访问地址："
echo "  本地：http://localhost:9999/index.html"
echo "  局域网：http://$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1):9999/index.html"
echo ""
echo "==================================="
