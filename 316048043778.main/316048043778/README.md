# 正义链：检察官的24小时 - 游戏项目

## 项目简介
这是一个检察官职业能力测试小游戏，玩家将扮演见习检察官，在24小时内处理10个不同类型的案件，通过选择不同的处理方式来获得不同的"正义值"分数。

## 技术栈
- React 18+
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (动画效果)

## 项目结构
```
src/
├── components/        # 组件文件
├── contexts/          # 上下文
├── hooks/             # 自定义钩子
├── lib/               # 工具函数和数据
├── pages/             # 页面组件
├── App.tsx            # 应用入口组件
├── index.css          # 全局样式
└── main.tsx           # 渲染入口
```

## 开发指南

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

构建后的文件将生成在`dist/static`目录下。