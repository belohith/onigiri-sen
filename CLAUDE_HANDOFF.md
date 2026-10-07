# Onigiri Sen 项目交接给 Claude

交接日期：2026 年 10 月 7 日，America/Los_Angeles。接手人：Claude。项目负责人及邮件账户使用者：Ace Chen。

这是 Onigiri Sen 的正式品牌官网。最近完成的 Takana 新品和品牌时间线更新已经推送，并能在正式网站看到。接下来优先确认 Miho 是否认可内容，之后继续维护网站。本文件记录交接时的状态；接手后先核实 Git、线上页面及邮件回复，避免重复发布或重复发信。

## 项目位置和当前状态

- 本地仓库：`/Users/bonifacec137/Desktop/Project X/Code Dev/onigiri-sen`
- GitHub：<https://github.com/belohith/onigiri-sen>
- 正式网站：<https://www.onigirisen.jp/>
- Vercel 地址：<https://onigiri-sen.vercel.app/>
- 生产相关代码分支：`main`。
- 最近更新提交：`710292807ef1c8d3f5f99d85131e5e649081b411`，`Add Takana flavor and update bilingual company timeline`。
- 2026 年 10 月 7 日检查时，本地 HEAD 和远端 main 均为上述提交，工作区干净。本交接文件是在该检查之后新增，尚未提交或推送。
- 同日正式 `/products` 页面 HTML 已包含 Takana，`/our-story` 已包含新 2026 标题和 `2026 Late`。没有核实 Vercel 控制台的具体部署 ID。
- 仓库另有 `ai-feature` 分支；README 将 RAG 搜索描述为开发中、尚未部署。未审查该分支，不要直接合并。

## 技术结构

实际版本以 `frontend/package.json` 和 lockfile 为准：Next.js 16.2.4、React 19.2.4、TypeScript、Tailwind CSS 4、ESLint 9。根 README 提及 Next.js 14，版本描述已过时。

应用在 `frontend`，采用 Next.js App Router。`backend` 和 `shared` 目前只有空 README，并不是独立服务。没有发现数据库、CMS 或网站内容编辑后台。文字、门店和产品数据主要直接写在 TSX 文件中；图片与 PDF 在 `frontend/public`。

主要文件：

- `frontend/app/page.tsx`：首页、滚动新闻、Instagram 嵌入。
- `frontend/app/components/OurFlavors.tsx`：首页与产品页共享的产品数据、卡片、标签和过敏原。
- `frontend/app/products/page.tsx`：产品页、食材介绍、饮食分类。
- `frontend/app/components/Findusnearyou.tsx`：两页共享的门店列表、搜索和嵌入 Google My Maps。列表与地图点是两个数据源，不能只改一个就声称二者都更新了。
- `frontend/app/components/TrustedBy.tsx`：首页与批发页共享的合作品牌 Logo。
- `frontend/app/our-story/page.tsx`：品牌故事、历程、合作伙伴等。
- `frontend/app/media/page.tsx`：媒体报道列表。
- `frontend/app/press/`：新闻稿页面。
- `frontend/app/contact/page.tsx`、`careers/page.tsx`、`wholesale/page.tsx`：三个表单页面。
- `frontend/app/api/contact/route.ts`、`api/careers/route.ts`、`api/wholesale/route.ts`：服务端表单和 Resend 邮件处理。
- `frontend/app/context/LangContext.tsx`：英文和日文状态，通常用 `t(en, ja)` 提供两套文案。默认英文，未持久化到存储，也没有独立语言路由。
- `frontend/app/layout.tsx`：全局布局、字体、SEO 和 Google Analytics。

## 本地运行和环境变量

在仓库内执行：

```bash
cd frontend
npm ci
npm run dev -- --port 3001
```

开发预览为 <http://localhost:3001/>。历史上曾启动开发进程；接手时检查端口，不要假设它还在运行。

环境变量应放在本地 `frontend/.env.local` 或部署平台环境变量配置中，不要提交密钥：

- `RESEND_API_KEY`：Resend API 密钥。三个 API 模块在加载时创建 Resend 实例，缺失时连生产构建也会失败。
- `CONTACT_TO_EMAIL`：团队接收表单邮件的地址。缺失时当前实现使用空字符串。
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`：可选的 GA4 标识，配置后布局加载 Analytics。

发件人当前写为 `Onigiri Sen <contact@onigirisen.jp>`，实际投递需要有效 Resend 配置。未做真实表单邮件投递测试。不要将本地占位密钥写入生产。

## Miho 的需求和已完成改动

需求来自 Miho Higuchi，`miho@onigirisen.jp`，邮件主题 `Website Update Request`。

邮件串：<https://mail.google.com/mail/u/?authuser=bonistudio.core%40gmail.com#all/1a0d054fdb3b0bb9>

### Takana 新品

9 月 29 日提出，10 月 2 日再次提醒，原计划于 10 月 5 日周一上线。相关需求邮件 ID 为 `1a0ef616bffed326`，最后催办邮件 ID 为 `1a0fdfbf87ecb598`。

已完成：

- 首页与产品页共享列表首位新增 `Takana (Pickled Mustard Greens)`，日文为 `高菜`。
- 标签只有 Vegan、Vegetarian；含小麦，未添加 GF 或 Organic。
- 过敏原英文 `Soy, Wheat, and Sesame`，日文 `大豆・小麦・ごま`。
- Products 页 Vegan 和 Vegetarian 分类均从只有 Ume 改为 `Ume · Takana`，并同步日文。
- 从原需求邮件保存产品照片为 `frontend/public/images/flavors/takana.png`，插画为 `frontend/public/images/char-takana.png`。
- 原附件名分别为 `Onigiri_Sen_Takana .PNG` 和 `takana.png`。邮件中的 `vegan.png`、`vegetarian.png` 与现有徽章哈希一致，所以复用现有素材。日文标签也沿用现有日文素材。

### Our Story 时间线

9 月 28 日需求邮件 ID 为 `1a0e9db46ac30f4e`，提供完整英文和日文文案，已按邮件更新：

- 2026 标题：`Strengthening Our Base & Entering California`／`地盤の確立と、カリフォルニアへの第一歩`。
- 内容说明 T-Mobile Park、Town & Country Markets 巩固太平洋西北地区基础，San Jose 为首次进入 California。
- 新增 `2026 Late`，标题 `Expanding to San Francisco & Los Angeles`／`サンフランシスコ、そしてロサンゼルスへ`。
- 内容表述计划在 11 月进入 San Francisco、12 月进入 Los Angeles，不能把未来计划擅自改成已完成事实。
- 将节点间距和连接线的硬编码三节点条件改为按数组长度判断。

### 较早需求

9 月 23 至 24 日的需求包括 Pork Furikake 改名、Spicy Tuna Mayo 在 PCC 才适用 Organic 和 GF 的标签注释，以及 Town & Country 横幅、Logo 和四家门店。Miho 在 9 月 28 日表示此前需求已由 Lohi 完成。

代码中已看到改名、PCC 注释、Logo、新闻横幅和 Ballard、Shoreline、Mill Creek、Lakemont 门店列表。嵌入地图的实际地图点没有逐一核验。首页英文横幅仍是 `coming September 28th`，现在已过期；这是后续可修正内容，不属于本次已完成更新。

## 验证结果和技术待办

2026 年 10 月 5 日对更新代码执行过：

- `RESEND_API_KEY=re_build_placeholder npm run build`：编译、TypeScript、17 个页面生成通过。这只是当前进程的占位环境变量，不是真实邮件密钥，也没有发送邮件。
- `git diff --check`：通过。
- 浏览器检查：首页与产品页同步显示 Takana，照片加载正常；英日切换、390px 手机和 1280px 桌面产品显示已检查；时间线英文布局及日文文案已检查。
- ESLint：15 errors、42 warnings，与修改前总数一致。未证明每一条诊断完全相同，也没有全面修复已有问题。

已有问题包括 effect 中同步 setState、渲染中声明组件、普通 img 和未使用变量。构建还有 `metadataBase` 未设置的警告；Open Graph URL 当前指向 Vercel 地址。没有自动化测试脚本。不要把构建成功等同于表单投递或所有功能已验收。

## 发布和身份验证

用户已明确授权推送并发布这批内容，同时保留旧版以便恢复。更新现已在远端与线上可见。

当时终端 `git push` 因缺少 HTTPS 凭据失败，系统没有 `gh` 或 `vercel` CLI。Codex 的 GitHub 插件读取仓库时显示用户有 push 权限，但创建远端备份分支被集成权限拒绝，返回 403。浏览器 GitHub 未登录。这些登录状态与 GitHub Desktop 相互独立。

用户随后展示 GitHub Desktop 的仓库和 Push origin 按钮。Codex 的原生界面操作失败，因此请求用户点击；到交接检查时提交已到远端。不要再把发布描述为仍被登录阻挡。以后可优先使用 GitHub Desktop，或由用户配置终端登录；不要提取应用私有凭据。

README 声明 Vercel 托管、Squarespace 管理 DNS；实际 Vercel 项目根目录、Production Branch 和环境变量需要从控制台核实。正式页面验证应覆盖 `/`、`/products` 和 `/our-story` 的英文、日文及图片加载。

## 备份和恢复

修改前的准确本地版本是 `e4d0ec0bbe1a9c7e80babbd55db1152dc8f1e75d`，已保存：

- 本地标签：`backup/pre-miho-update-2026-10-05`。
- 独立完整 Git bundle：`/Users/bonifacec137/Desktop/Project X/Code Dev/onigiri-sen-backups/before-miho-update-2026-10-05.bundle`，约 135 MB，已通过 `git bundle verify`，含备份标签及其完整历史。
- 远端检查未发现该备份标签或此前尝试创建的备份分支。不要声称备份已上传 GitHub。

更新提交的父提交为 `b2c7b02122d4fc244e99a330d03c5f56c11b5db6`，它比备份标签多一个根 README，页面业务代码相同。

如要撤销线上更新，先确认最新 HEAD 和他人改动，再优先用 `git revert 710292807ef1c8d3f5f99d85131e5e649081b411` 创建可审查的逆向提交，验证后推送。不要直接 reset main 或 force push。若只是查看旧版，可在独立 worktree 检出备份标签，不影响当前工作区。

## 待完成的 Miho 通知

用户原话已授权：发布后邮件告知 Miho，让她看看是否符合需求，有问题再告诉 Ace。本次 Codex 尚未发送通知，也未检查后续是否已有用户或其他代理发送；Claude 应先检查该邮件串，避免重复发送。

Codex 会话的 Gmail 插件曾验证连接账户为 `bonistudio.core@gmail.com`。Claude 是否可用相同连接需要独立确认，不能假设继承 Codex 的 MCP、浏览器会话或授权凭据。

若尚未通知，可在原邮件串回复 Miho，准确说明 Takana 和双语时间线已上线，附以下链接，请她检查产品照片、标签、过敏原和时间线，有任何调整直接回复 Ace。不要声称 Miho 已验收，也不要把通知说成已发送。

- <https://www.onigirisen.jp/>
- <https://www.onigirisen.jp/products>
- <https://www.onigirisen.jp/our-story>

可用英文正文：

> Hi Miho,
>
> The website updates are now live. Takana has been added to the homepage and Products page with the product photo, illustration, Vegan and Vegetarian labels, and the Soy, Wheat, and Sesame allergen information. Takana is also listed under both dietary categories.
>
> I have also updated the English and Japanese Our Story timeline for 2026 and added the 2026 Late section with the San Francisco and Los Angeles expansion plans.
>
> Could you please review the homepage, Products page, and Our Story page and let me know whether these match what you had in mind? If anything needs adjusting, please reply with the details and I will follow up.
>
> Thank you!
> Ace

## Claude 接手顺序

1. 阅读本文件和源码，运行 `git status -sb`、`git fetch origin`，确认有没有新的提交或本地改动。
2. 核实正式页面，并检查 Miho 邮件串有无新的反馈或已经发出的完成通知。
3. 若通知尚未发送且邮件工具可用，按用户已有授权完成通知；若 Claude 的运行环境要求重新授权，由用户处理对应连接。
4. 维护内容时同步英日双语，产品标签和过敏原以 Miho 提供资料为准；不要自动扩大到其他产品或 AI 分支。
5. 后续先本地修改、验证和审查，再按用户的发布授权执行；保留旧版本并以新增逆向提交方式回滚。
