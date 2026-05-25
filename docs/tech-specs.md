# 技术规范

## 栈与工具
- 前端框架：React 19
- 样式方案：Tailwind CSS 3
- 构建工具：Vite 8
- 版本管理：Git

## 依赖与结构
- 入口：`src/main.jsx`
- 组件：按页面拆分 `src/components/`（暂未拆分，当前集中在 App.jsx）
- 数据：简历内容与页面文案放在 `src/data/` 中
- 静态资源：`src/assets/`

## 动画技术选型
- **CSS-only 优先**：过渡、关键帧动画、CSS 3D transforms
- **Scroll-triggered**：使用 Intersection Observer（已在 App.jsx 中有基础实现）
- **视差滚动**：JS 监听 scroll 事件 + CSS `transform: translateY()`（已有基础实现）
- **3D 效果**：CSS `perspective`、`transform-style: preserve-3d`、`rotateY/X`
- **不引入额外动画库**（保持依赖轻量）

## 设计实现要求
- 使用 Tailwind 语义类，避免大量内联样式
- 复杂动画和特效写在 `index.css` 中
- 响应式：默认移动优先，支持 `sm/md/lg/xl` 布局
- 动画：优先使用 `transition` / `transform` / `opacity`

## 可编辑机制
- 初期实现：组件接受数据源，并给出"可编辑模式"入口
- 数据持久化：`localStorage` 存储编辑后的内容
- 先保证本地可编辑，再考虑外部存储或 CMS 集成

## 安全与稳定
- 不直接执行外部输入内容代码
- 保持组件单一职责，避免过度嵌套
- 每一步先做基础功能，再补动画和样式
- 每次改动后需通过 Vite build 验证

## 图片与资源
- 海洋背景图：`src/assets/ocean-bg.jpg`（Unsplash 免费授权）
- 头像：`src/assets/hero.png`
- 纸质纹理：CSS 生成（噪点 + 渐变），不使用外部纹理图片
