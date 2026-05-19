const fs = require('fs');
const path = require('path');

const now = new Date();
const date = now.toISOString().slice(0, 10);
const folder = path.join(__dirname);
const filePath = path.join(folder, `${date}.md`);

const template = `# 开发日志 ${date}

## 已完成
- 

## 待办
- 

## 备注
- 
`;

if (fs.existsSync(filePath)) {
  console.log(`日志已存在：${filePath}`);
} else {
  fs.writeFileSync(filePath, template, 'utf8');
  console.log(`已创建当日日志：${filePath}`);
}
