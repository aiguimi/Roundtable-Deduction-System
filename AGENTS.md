# AGENTS.md - 圆桌智囊 多维思维推演系统

## 项目概览

纯前端静态网页应用，模拟多位历史人物进行圆桌讨论。用户选择虚拟智者、输入分析内容，AI 复刻每位人物的思维模式进行独立分析，最终生成综合报告。

## 技术栈

- 纯 HTML / CSS / JavaScript（无框架依赖）
- PDF.js (CDN) — 前端 PDF 文本提取
- marked.js (CDN) — Markdown 渲染
- Google Fonts (Noto Serif SC) — 中文字体

## 文件结构

```
index.html      — 主页面结构（API配置、人物选择、内容输入、结果展示）
style.css       — 完整样式表（~1500行）
characters.js   — 人物思维档案库 + API预设 + 系统约束Prompt + AI研究Prompt
app.js          — 应用主逻辑（状态管理、UI渲染、流式API调用、推演流程）
```

## 核心功能模块

1. **API配置** (`app.js: renderApiPresets/selectApiPreset`) — 支持 DeepSeek/豆包/OpenAI/自定义
2. **人物选择** (`app.js: renderCharacterGrid/toggleCharacter`) — 6大分类、搜索筛选、自定义角色
3. **AI自动研究** (`app.js: researchCharacter`) — 输入人物姓名，AI自动生成思维档案
4. **PDF解析** (`app.js: handlePdfFile`) — 前端本地解析PDF提取文本
5. **推演模式** (`app.js: setDiscussionMode`) — 经典模式（串行）/ 畅享模式（并行，每角色独立API）
6. **流式API调用** (`app.js: streamChatCompletion`) — SSE流式读取，打字机渲染
7. **综合报告** (`app.js: buildSynthesisPrompt`) — 汇总各方观点生成综合报告

## 关键数据

- `CHARACTERS` — 19位内置历史人物（科学家/经济学家/军事家/哲学家/文学家/思想家）
- `API_PRESETS` — 4个API预设（DeepSeek/豆包/OpenAI/自定义）
- `SYSTEM_CONSTRAINTS` — 全局强制约束Prompt
- `RESEARCH_PROMPT` — AI自动研究角色的系统Prompt

## 安全特性

- API密钥仅存于浏览器运行内存，刷新即清除
- 不写入 localStorage/cookie
- 所有AI请求由浏览器直接转发至大模型服务商
