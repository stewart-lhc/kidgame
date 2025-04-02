const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// 确保输出目录存在
const publicDir = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 创建简单的 og-image.jpg
const createOgImage = () => {
  const svgPath = path.resolve(__dirname, '../public/logo.svg');
  const ogImagePath = path.resolve(__dirname, '../public/og-image.jpg');
  
  console.log('正在生成 og-image.jpg...');
  
  // 使用 ImageMagick 的 convert 命令将 SVG 转换为 JPG
  exec(`convert -background "#4B9AFF" -gravity center -extent 1200x630 ${svgPath} ${ogImagePath}`, (error) => {
    if (error) {
      console.error(`生成 og-image.jpg 失败: ${error.message}`);
      return;
    }
    console.log('og-image.jpg 生成成功!');
  });
};

// 生成所有图标
const generateIcons = () => {
  const svgPath = path.resolve(__dirname, '../public/logo.svg');
  
  // 图标尺寸列表
  const iconSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
  ];
  
  console.log('正在生成图标文件...');
  
  // 生成所有尺寸的图标
  iconSizes.forEach(({ name, size }) => {
    const outputPath = path.resolve(__dirname, `../public/${name}`);
    
    // 使用 ImageMagick 的 convert 命令将 SVG 转换为 PNG
    exec(`convert -background none -resize ${size}x${size} ${svgPath} ${outputPath}`, (error) => {
      if (error) {
        console.error(`生成 ${name} 失败: ${error.message}`);
        return;
      }
      console.log(`${name} 生成成功!`);
    });
  });
  
  // 生成 favicon.ico (包含 16x16, 32x32 和 48x48 三种尺寸)
  const faviconPath = path.resolve(__dirname, '../public/favicon.ico');
  exec(`convert -background none -resize 16x16 ${svgPath} -resize 32x32 ${svgPath} -resize 48x48 ${svgPath} ${faviconPath}`, (error) => {
    if (error) {
      console.error(`生成 favicon.ico 失败: ${error.message}`);
      return;
    }
    console.log('favicon.ico 生成成功!');
  });
  
  // 生成 og-image.jpg
  createOgImage();
};

// 执行脚本
generateIcons(); 