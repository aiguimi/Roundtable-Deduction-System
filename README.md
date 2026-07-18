# 圆桌智囊 · 多维思维推演系统
# Roundtable Think Tank · Multi-Dimensional Thinking Simulation System

> 挑选 N 位虚拟智者，模拟一场圆桌讨论会。AI 复刻每位人物独有的思维模式、认知视角进行独立分析创作，最终整合所有人观点，生成完整综合报告。
>
> Select N virtual sages to simulate a roundtable discussion. The AI replicates each figure's unique thinking patterns and cognitive perspective for independent analysis, then integrates all viewpoints into a complete synthesis report.

---

## 📑 目录 / Table of Contents

- [项目特点 / Features](#项目特点--features)
- [内置人物库 / Built-in Character Library](#内置人物库--built-in-character-library)
- [推演模式 / Simulation Modes](#推演模式--simulation-modes)
- [快速开始 / Quick Start](#快速开始--quick-start)
- [使用流程 / Usage Flow](#使用流程--usage-flow)
- [支持的 API 服务商 / Supported API Providers](#支持的-api-服务商--supported-api-providers)
- [安全架构 / Security Architecture](#安全架构--security-architecture)
- [全局强制规则 / Global Mandatory Rules](#全局强制规则--global-mandatory-rules)
- [技术栈 / Tech Stack](#技术栈--tech-stack)
- [文件结构 / File Structure](#文件结构--file-structure)
- [免责声明 / Disclaimer](#免责声明--disclaimer)
- [许可证 / License](#许可证--license)

---

## 项目特点 / Features

- **纯前端静态网页** — 无需后端、无需服务器中转、无需账号登录，打开即用
- **零门槛访问** — 无需注册，直接在浏览器中运行
- **API 密钥安全** — 密钥仅临时保存在浏览器内存，刷新即清除，不持久存储、不上传
- **双推演模式** — 经典模式（轮流串行，防串戏）与畅享模式（每角色独立 API、不同大模型并行同时思考）
- **AI 自动研究** — 输入任意历史人物姓名，AI 自动搜集朝代、著作、代表作品、经历、思维方式等，生成完整思维档案
- **多维度思辨** — 支持商业方案分析、观点论证、文学场景原创、多维度思辨等场景
- **双语界面** — 右上角一键切换中文 / English，仅界面壳层与强制声明翻译，AI 生成内容随用户输入语言
- **开源透明** — 任何人可下载源码本地运行，所有算力消耗由使用者自己的 API 额度承担

**English**

- **Pure static front-end** — no backend, no server relay, no login required; open and use
- **Zero barrier** — no registration; runs directly in the browser
- **API key security** — keys live only in browser memory, cleared on refresh, never persisted or uploaded
- **Dual simulation modes** — Classic mode (serial, prevents cross-talk) and Enjoy mode (each role with its own API and model, running in parallel)
- **AI auto-research** — enter any historical figure's name; the AI gathers era, works, representative pieces, biography and thinking style to build a full profile
- **Multi-dimensional deliberation** — business case analysis, argumentation, original literary scenarios, multi-perspective thinking
- **Bilingual UI** — one-click Chinese / English switch at the top right; only the UI shell and mandatory notices are translated, AI output follows the input language
- **Open & transparent** — anyone can download and run the source locally; all compute cost is borne by the user's own API quota

---

## 内置人物库 / Built-in Character Library

| 类别 Category | 人物 Characters |
|------|------|
| 科学家 Scientists | 爱因斯坦 Einstein、达尔文 Darwin、特斯拉 Tesla、图灵 Turing |
| 经济学家 Economists | 凯恩斯 Keynes、亚当·斯密 Adam Smith、哈耶克 Hayek、熊彼特 Schumpeter |
| 军事家 Military | 孙武 Sun Tzu、克劳塞维茨 Clausewitz、毛泽东 Mao Zedong |
| 哲学家 Philosophers | 苏格拉底 Socrates、康德 Kant、尼采 Nietzsche、维特根斯坦 Wittgenstein |
| 文学家 Writers | 苏轼 Su Shi、鲁迅 Lu Xun、莎士比亚 Shakespeare、曹雪芹 Cao Xueqin |
| 思想家 Thinkers | 孔子 Confucius、老子 Laozi、王阳明 Wang Yangming |

支持用户自定义新增角色，自行填写人物思维特征；也支持通过「AI 自动研究」一键生成任意历史人物的思维档案（含朝代、家世、经历、著作、代表作品、经典言论、思维方式和时代局限性，并客观列出争议人物的多元评价）。

**English**

Users can add custom characters by filling in their thinking traits, or use **AI Auto-Research** to generate a profile for any historical figure in one click (including era, family background, biography, works, representative pieces, classic quotes, thinking style and historical limitations, with an objective multi-perspective evaluation of controversial figures).

---

## 推演模式 / Simulation Modes

### ⚡ 经典模式（默认）/ Classic Mode (default)

角色**轮流串行**思考，逐人独立输出，互不参考、杜绝串戏，最后统一汇总综合报告。

**English**

Roles think **serially in turn**, each producing independent output without referencing others, eliminating cross-talk, then a unified synthesis report is generated.

### 🚀 畅享模式 / Enjoy Mode

每位角色可指定**独立 API 密钥、接口地址和模型**，支持混合使用不同大模型（如爱因斯坦用 DeepSeek、凯恩斯用豆包），所有角色**同时并行**思考，速度倍增。即使某一角色调用失败也不影响其他角色完成。

**English**

Each role can specify its **own API key, endpoint and model**, allowing mixed use of different models (e.g. Einstein on DeepSeek, Keynes on Doubao). All roles think **in parallel simultaneously**, multiplying speed. A failure of one role does not affect the others.

---

## 快速开始 / Quick Start

### 方式一：直接打开 / Method 1: Open directly

下载本项目所有文件，用浏览器打开 `index.html` 即可使用。

Download all project files and open `index.html` in a browser.

### 方式二：本地服务器（推荐）/ Method 2: Local server (recommended)

```bash
# 进入项目目录 / Enter the project directory
cd roundtable-think-tank

# 使用内置 Node 静态服务器（部署同款，推荐）
# Use the built-in Node static server (same as deployment, recommended)
node server.js
# 默认端口 5000，可用环境变量指定：
# Default port 5000; override with the env var:
DEPLOY_RUN_PORT=8080 node server.js

# 或使用 Python / Or use Python
python -m http.server 8080

# 或使用 npx serve / Or use npx serve
npx serve
```

然后访问 `http://localhost:5000`（或对应端口）。
Then visit `http://localhost:5000` (or the corresponding port).

### 方式三：部署到平台 / Method 3: Deploy to a platform

项目包含 `.coze` 配置文件，可一键部署到扣子 / Coze 等支持原生静态站点的平台。

The project includes a `.coze` config file for one-click deployment to Coze and similar platforms that host native static sites.

---

## 使用流程 / Usage Flow

1. **配置 API** — 在 API 设置区选择服务商（DeepSeek / 豆包 / OpenAI / 自定义），填入 API 密钥
2. **选择人物** — 从内置人物库中选择 3–8 位智囊，或创建自定义角色，或用「AI 自动研究」生成新角色
3. **选择模式** — 经典模式（串行）或畅享模式（并行，可逐角色配置独立 API）
4. **输入内容** — 手动输入文本、粘贴大段资料，或上传 PDF 文档（前端本地解析）
5. **开始推演** — 点击「开始圆桌推演」，AI 将按所选模式模拟每位人物的独立分析
6. **查看报告** — 浏览单人发言及最终综合汇总报告，支持一键复制

**English**

1. **Configure API** — choose a provider (DeepSeek / Doubao / OpenAI / Custom) and enter your API key
2. **Select characters** — pick 3–8 sages from the library, create a custom one, or generate one via AI Auto-Research
3. **Choose a mode** — Classic (serial) or Enjoy (parallel, with per-role API config)
4. **Input content** — type text, paste material, or upload a PDF (parsed locally in the browser)
5. **Run the simulation** — click "Start Roundtable" and the AI simulates each figure's independent analysis
6. **View the report** — browse individual statements and the final synthesis; one-click copy supported

---

## 支持的 API 服务商 / Supported API Providers

本系统兼容所有 OpenAI API 格式的大模型服务商，包括但不限于：
The system is compatible with any OpenAI-API-format LLM provider, including but not limited to:

| 服务商 Provider | 接口地址 Endpoint | 模型示例 Model Example |
|--------|----------|----------|
| DeepSeek | `https://api.deepseek.com/v1/chat/completions` | `deepseek-chat` |
| 豆包（火山方舟）Doubao (Volcano Engine) | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` | Endpoint ID |
| OpenAI | `https://api.openai.com/v1/chat/completions` | `gpt-4o` |
| 其他兼容服务 Other compatible | 自定义 Custom | 自定义 Custom |

---

## 安全架构 / Security Architecture

1. **纯静态 HTML 网页**，无数据库、无后台服务器中转
2. **API 密钥仅存在浏览器运行内存**：
   - 页面刷新、关闭标签、清除页面缓存 → API 密钥立即销毁
   - 不会写入 localStorage / cookie
   - 不会上传至第三方
3. **所有 AI 请求由浏览器直接转发**至对应大模型服务商
4. **开源模式**：任何人可下载网页源码本地打开运行

**English**

1. **Pure static HTML** — no database, no backend relay
2. **API keys live only in browser memory**:
   - Refresh, close tab, or clear cache → keys are destroyed immediately
   - Never written to localStorage / cookies
   - Never uploaded to third parties
3. **All AI requests are forwarded directly by the browser** to the respective LLM provider
4. **Open source** — anyone can download and run the source locally

---

## 全局强制规则 / Global Mandatory Rules

系统内置以下强制约束（默认启用）：
The following mandatory constraints are built in (enabled by default):

1. **严格人设约束** — 发言贴合人物时代、经历、理论体系；严禁直接复制现存著作语录
2. **内容价值底线** — 禁止低俗、色情、暴力、仇恨、极端煽动、谣言
3. **客观中立准则** — 涉及各国、公众人物、地缘局势时拒绝刻意贬低或无底线吹捧
4. **事实基础** — 依托公认正史和学术理论，禁止虚构重大数据和历史事件；存疑信息标注、争议人物列多元评价
5. **差异化要求** — 多名角色独立思考，保证视角、结论、文风明显区分

**English**

1. **Strict persona constraints** — statements fit the figure's era, experience and theory; direct copying of existing works is forbidden
2. **Content bottom line** — no vulgarity, pornography, violence, hate, extreme incitement, or rumors
3. **Objectivity & neutrality** — no deliberate disparagement or unbounded praise regarding nations, public figures, or geopolitics
4. **Fact-based** — grounded in accepted history and scholarship; no fabricated major data or events; flag uncertain info and list multiple views for controversial figures
5. **Differentiation** — multiple roles think independently, with clearly distinct perspectives, conclusions and styles

---

## 技术栈 / Tech Stack

- 纯 HTML / CSS / JavaScript（无框架依赖）— Vanilla HTML/CSS/JS (no framework)
- [PDF.js](https://mozilla.github.io/pdf.js/) — 前端 PDF 文本提取 / client-side PDF text extraction
- [marked](https://marked.js.org/) — Markdown 渲染 / Markdown rendering
- Google Fonts (Noto Serif SC) — 中文字体 / Chinese typography
- Node.js `server.js` — 零依赖静态文件服务器（部署入口）/ zero-dependency static server (deployment entry)

---

## 文件结构 / File Structure

```
index.html      — 主页面结构（API配置、人物选择、内容输入、结果展示）
                  Main page structure (API config, character selection, input, results)
style.css       — 完整样式表 / Full stylesheet
characters.js   — 人物思维档案库 + API预设 + 系统约束Prompt + AI研究Prompt
                  Character profiles + API presets + system constraints + AI research prompt
app.js          — 应用主逻辑（状态管理、UI渲染、流式API调用、推演流程）
                  Main app logic (state, rendering, streaming API calls, simulation flow)
server.js       — 零依赖静态服务器（部署入口，支持 DEPLOY_RUN_PORT）
                  Zero-dependency static server (deployment entry, supports DEPLOY_RUN_PORT)
AGENTS.md       — 项目说明（面向 AI Agent）/ Project notes (for AI agents)
assets/         — 静态资源（预览图等）/ Static assets (preview images, etc.)
.coze           — 扣子 / Coze 部署配置 / Coze deployment config
```

---

## 免责声明 / Disclaimer

1. 本项目为开源静态思想实验工具，仅用于多角度思辨学习；所有 AI 模拟内容并非历史人物真实言论。
2. 程序不会收集、持久储存用户输入的 API 密钥，密钥生命周期仅限当前会话。
3. 用户需要自备各大厂商大模型 API 权限，调用产生的 token 费用由使用者自行承担。
4. 使用者应当遵守网络安全法规、各大模型服务商使用协议；禁止利用本工具生成违规内容。
5. 用户若自行修改源码内安全约束提示词，由此产生的一切法律风险由修改者自行承担。

**English**

1. This project is an open-source static thought-experiment tool for multi-perspective learning only; all AI-simulated content is NOT the real speech of historical figures.
2. The program does not collect or persistently store your API keys; key lifetime is limited to the current session.
3. Users must provide their own LLM API access; token costs are borne by the user.
4. Users must comply with cybersecurity regulations and each provider's terms; generating violating content is prohibited.
5. If you modify the safety constraint prompts in the source, all resulting legal risks are borne by the modifier.

---

## 许可证 / License

MIT License
