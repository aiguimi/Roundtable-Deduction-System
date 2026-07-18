/**
 * 圆桌智囊 - 多维思维推演系统
 * 应用主逻辑
 */

// ====== 全局状态 ======
const state = {
  apiKey: '',
  baseUrl: '',
  model: '',
  presetIndex: 0,
  selectedCharacters: [],
  customCharacters: [],
  inputText: '',
  pdfText: '',
  pdfFileName: '',
  outputDepth: 'full',
  isGenerating: false,
  activeCategory: 'all',
  searchKeyword: '',
  inputTab: 'text',
  individualResults: [],
  synthesisResult: '',
  discussionMode: 'classic',  // 'classic' = 轮流串行 | 'parallel' = 畅享并行
  charApiConfigs: {},          // { charId: { apiKey, baseUrl, model } } 畅享模式每角色独立API
  lang: 'zh'                   // 'zh' | 'en' 界面语言
};

// ====== 国际化 (i18n) ======
// zh 以当前中文为基准，en 为英文翻译。新增字符串时两语言同步维护。
const I18N = {
  zh: {
    header_title: '圆桌<span class="accent">智囊</span>',
    header_subtitle: '多维思维推演系统 · Multi-dimensional Thinking Deduction',
    header_company: '爱硅蜜网络科技',
    header_slogan: '学习AI，拥抱AI，用好AI',
    panel1_title: 'API 密钥配置',
    api_url_label: 'API 接口地址',
    model_label: '模型名称 / Endpoint ID',
    api_key_label: 'API 密钥',
    api_key_show: '显示',
    api_key_hide: '隐藏',
    api_test: '测试连接',
    api_testing: '测试中',
    api_retest: '重新测试',
    security_note: '安全提示：API密钥仅临时保存在当前浏览器内存中，页面刷新或关闭标签页后立即彻底清除。网页不会将密钥写入本地存储(localStorage/cookie)，不会上传至任何第三方服务器。所有AI请求由浏览器直接转发至对应大模型服务商。',
    panel2_title: '圆桌人物选择',
    research_label: 'AI自动研究角色 — 输入任意历史人物姓名，AI自动搜集朝代、著作、代表作品、经历、思维方式等，生成完整思维档案',
    research_placeholder: '输入人物姓名，如：李白、曾国藩、柏拉图、丘吉尔…',
    research_btn: '🔍 AI自动研究',
    preset_label: '⚡ 快捷阵容（点击自动入座）：',
    preset_china_name: '🀄 中国智囊',
    preset_china_desc: '战国 → 近代 · 华夏思想群星',
    preset_europe_name: '🏛️ 欧洲智囊',
    preset_europe_desc: '英 · 法 · 德 · 俄 · 意 五国巨匠',
    preset_wallstreet_name: '💹 华尔街智囊',
    preset_wallstreet_desc: '金融市场的顶级操盘思维',
    preset_team_name: '🧩 全能团队',
    preset_team_desc: '政治·经济·法律·心理·军事·社会·科学·数学 八维覆盖',
    search_placeholder: '搜索人物姓名…',
    panel3_title: '输入待分析内容',
    tab_text: '📝 文本输入',
    tab_pdf: '📄 PDF上传',
    textarea_placeholder: '请输入待分析的问题、观点、方案、创作需求等…\n\n例如：请结合当下中小企业现状，分析成本控制的可行思路。',
    pdf_upload_text: '点击选择PDF文件或拖拽至此处',
    pdf_upload_hint: '支持 .pdf 格式，前端本地解析提取文本，不上传至服务器',
    panel4_title: '推演参数',
    mode_label: '推演模式：',
    mode_classic: '⚡ 经典模式',
    mode_parallel: '🚀 畅享模式',
    hint_classic: '经典模式：角色轮流串行思考，逐人输出，互不串戏',
    hint_parallel: '畅享模式：每位角色可指定独立API和不同大模型，并行同时思考，速度倍增',
    depth_label: '输出深度：',
    depth_concise: '精简版',
    depth_full: '完整版',
    parallel_header: '畅享模式 — 独立API配置',
    parallel_desc: '为每位智囊指定独立的API密钥和模型，可混合使用不同大模型（如爱因斯坦用DeepSeek、凯恩斯用豆包），所有角色将同时并行思考。',
    parallel_batch: '📋 批量填充全局配置',
    parallel_clear: '清空独立配置',
    start_btn: '开始圆桌推演',
    gen_running: '推演进行中…',
    btn_redo: '重新推演',
    results_title: '圆桌推演报告',
    copy_full_report: '📋 一键复制完整报告',
    synthesis_title: '📋 综合汇总报告',
    copy_full: '复制全文',
    copy: '复制',
    disclaimer_title: '⚠️ 重要提示',
    footer_disclaimer: '免责声明：本项目为开源静态思想实验工具，仅用于多角度思辨学习；所有AI模拟内容并非历史人物真实言论。程序不会收集、持久储存用户输入的API密钥，密钥生命周期仅限当前会话。用户需自备各大厂商大模型API权限，调用产生的token费用由使用者自行承担。使用者应遵守网络安全法规及各大模型服务商使用协议，禁止利用本工具生成违规内容。',
    footer_version: '圆桌智囊 · 多维思维推演系统 v1.0',
    custom_title: '创建自定义角色',
    custom_name_label: '角色名称 *',
    custom_era_label: '时代 / 背景描述',
    custom_title_label: '身份 / 头衔',
    custom_profile_label: '思维档案（详细描述角色的思维体系、认知视角、文风特点）*',
    custom_name_ph: '例如：未来学家',
    custom_era_ph: '例如：21世纪',
    custom_title_ph: '例如：科技趋势分析师',
    custom_profile_ph: '请详细描述该角色的：\n1. 核心思想体系\n2. 思维特征与分析方法\n3. 认知视角与关注重点\n4. 文风与语言特点\n\n描述越详细，AI模拟越精准。',
    btn_cancel: '取消',
    btn_add: '添加角色',
    btn_join: '加入圆桌',
    research_modal_title: 'AI角色研究报告',
    btn_retry: '重试',
    cat_all: '全部',
    cat_scientist: '科学家',
    cat_economist: '经济学家',
    cat_military: '军事家',
    cat_philosopher: '哲学家',
    cat_writer: '文学家',
    cat_thinker: '思想家',
    add_custom: '创建自定义角色',
    default_era: '自定义',
    default_title: '自定义角色',
    roundtable_empty: '请从上方选择智囊入席',
    roundtable_table: '圆桌',
    seats_n: '{n}人智囊',
    selected_count: '已选 {n} 位智囊',
    parallel_empty: '请先在上方选择圆桌人物',
    parallel_select_preset: '-- 选择预设 --',
    ph_api_url: 'API接口地址',
    ph_model: '模型名称',
    ph_api_key: 'API密钥（留空则用全局密钥）',
    api_key_required: '请先填写API密钥',
    api_url_required: '请先填写 API 接口地址',
    api_model_required: '请先填写模型名称',
    api_ok: '连接成功！模型: {model}，耗时: {elapsed}s',
    api_reply_suffix: '，AI回复: "{reply}"',
    api_fail: '连接失败：{msg}',
    req_error: '请求异常：{msg}',
    preset_empty: '该阵容暂无可用的智囊',
    seated: '已就座「{name}」· {n} 位智囊',
    need_name: '请填写角色名称',
    need_profile: '请填写思维档案',
    role_created: '角色「{name}」已创建并入选',
    need_research_name: '请输入人物姓名',
    need_api_key: '请先在API设置区填入API密钥',
    need_api_config: '请先完成API接口地址和模型名称配置',
    already_in: '「{name}」已在圆桌中',
    joined: '「{name}」已加入圆桌',
    researching: '正在研究：{name}…',
    research_loading: 'AI正在搜集「{name}」的资料',
    research_loading2: '整理朝代、家世、经历、著作、代表作品、思维方式…',
    research_failed: '研究失败',
    research_done: '角色「{name}」研究完成并加入圆桌',
    pdf_only: '请上传PDF格式文件',
    pdf_parsing: '正在解析PDF文件…',
    pdf_too_few: 'PDF文本内容过少，可能为扫描件或图片型PDF',
    pdf_done: 'PDF解析完成：{pages}页，{chars}字符',
    pdf_fail: 'PDF解析失败：',
    need_global_key: '请先在API配置区填写全局密钥',
    batch_filled: '已将全局API配置批量填充到所有角色',
    cleared: '已清空所有角色独立API配置',
    char_key_missing: '角色「{name}」未配置API密钥',
    char_url_missing: '角色「{name}」未配置API接口地址',
    char_model_missing: '角色「{name}」未配置模型名称',
    need_2: '请至少选择2位智囊',
    max_8: '最多支持8位智囊同时推演',
    need_input: '请输入待分析的内容',
    no_report: '暂无可复制的报告内容',
    copied: '已复制到剪贴板',
    copy_fail: '复制失败，请手动选择文本复制',
    done_msg: '圆桌推演完成！',
    analysis_fail: '分析失败：',
    synth_fail: '综合报告生成失败：',
    model_custom_opt: '✏️ 自定义模型...',
    card_thinking: '正在思考中…',
    card_thinking_as: '正在以{name}的视角思考中…',
    synth_loading: '正在汇总各方观点，生成综合报告…',
    synth_generating: '正在生成综合报告…',
    progress_prepare: '准备中…',
    parallel_thinking: '{n}位智囊同时思考中…',
    completed: '{done}/{total} 位智囊已完成'
  },
  en: {
    header_title: 'Roundtable <span class="accent">Sage</span>',
    header_subtitle: 'Multi-dimensional Thinking Deduction System',
    header_company: 'Aiguimi Network Technology',
    header_slogan: 'Learn AI · Embrace AI · Master AI',
    panel1_title: 'API Key Configuration',
    api_url_label: 'API Endpoint URL',
    model_label: 'Model Name / Endpoint ID',
    api_key_label: 'API Key',
    api_key_show: 'Show',
    api_key_hide: 'Hide',
    api_test: 'Test Connection',
    api_testing: 'Testing',
    api_retest: 'Retest',
    security_note: 'Security note: Your API key is held only in the current browser memory and is wiped immediately on page refresh or tab close. It is never written to localStorage/cookies or uploaded to any third-party server. All AI requests are forwarded directly from your browser to the model provider.',
    panel2_title: 'Roundtable Participants',
    research_label: 'AI Character Research — enter any historical figure\'s name; the AI gathers their era, works, masterpieces, life and mindset to build a complete thinking profile.',
    research_placeholder: 'Enter a name, e.g. Li Bai, Zeng Guofan, Plato, Churchill…',
    research_btn: '🔍 AI Research',
    preset_label: '⚡ Quick Lineups (click to seat):',
    preset_china_name: '🀄 China Sages',
    preset_china_desc: 'Warring States → Modern · Stars of Chinese thought',
    preset_europe_name: '🏛️ European Sages',
    preset_europe_desc: 'Britain · France · Germany · Russia · Italy',
    preset_wallstreet_name: '💹 Wall Street Sages',
    preset_wallstreet_desc: 'Top trading minds of the financial markets',
    preset_team_name: '🧩 All-round Team',
    preset_team_desc: 'Politics · Economy · Law · Psychology · Military · Society · Science · Math',
    search_placeholder: 'Search by name…',
    panel3_title: 'Input Content to Analyze',
    tab_text: '📝 Text Input',
    tab_pdf: '📄 PDF Upload',
    textarea_placeholder: 'Enter the question, viewpoint, proposal or creative brief to analyze…\n\nExample: Analyze feasible approaches to cost control for today\'s SMEs.',
    pdf_upload_text: 'Click to choose a PDF, or drag it here',
    pdf_upload_hint: 'PDF supported. Parsed locally in your browser; never uploaded.',
    panel4_title: 'Deduction Settings',
    mode_label: 'Mode:',
    mode_classic: '⚡ Classic',
    mode_parallel: '🚀 Parallel',
    hint_classic: 'Classic: sages think one by one in series; outputs stay isolated with no cross-talk.',
    hint_parallel: 'Parallel: each sage can use its own API and model; they think simultaneously for much faster results.',
    depth_label: 'Output Depth:',
    depth_concise: 'Concise',
    depth_full: 'Full',
    parallel_header: 'Parallel Mode — Per-Role API Config',
    parallel_desc: 'Assign an independent API key and model to each sage; mix different models (e.g. Einstein on DeepSeek, Keynes on Doubao). All roles think in parallel at once.',
    parallel_batch: '📋 Apply Global Config to All',
    parallel_clear: 'Clear Role Configs',
    start_btn: 'Start Roundtable',
    gen_running: 'Deduction in progress…',
    btn_redo: 'Run Again',
    results_title: 'Roundtable Report',
    copy_full_report: '📋 Copy Full Report',
    synthesis_title: '📋 Synthesis Report',
    copy_full: 'Copy All',
    copy: 'Copy',
    disclaimer_title: '⚠️ Important Notice',
    footer_disclaimer: 'Disclaimer: This is an open-source static thought-experiment tool for multi-perspective thinking and learning only; all AI-simulated content is NOT the real statements of historical figures. The program never collects or persistently stores your API key; the key lives only for the current session. Users must provide their own model-provider API access, and bear any token costs. Users must comply with cyber-security laws and their provider\'s terms, and must not generate违规 content with this tool.',
    footer_version: 'Roundtable Sage · Multi-dimensional Thinking Deduction v1.0',
    custom_title: 'Create Custom Role',
    custom_name_label: 'Role Name *',
    custom_era_label: 'Era / Background',
    custom_title_label: 'Identity / Title',
    custom_profile_label: 'Thinking Profile (describe the role\'s mindset, perspective, style) *',
    custom_name_ph: 'e.g. Futurist',
    custom_era_ph: 'e.g. 21st century',
    custom_title_ph: 'e.g. Tech Trend Analyst',
    custom_profile_ph: 'Describe the role in detail:\n1. Core ideology\n2. Thinking traits & methods\n3. Perspective & focus\n4. Style & language\n\nThe more detailed, the more accurate the simulation.',
    btn_cancel: 'Cancel',
    btn_add: 'Add Role',
    btn_join: 'Join Table',
    research_modal_title: 'AI Character Research',
    btn_retry: 'Retry',
    cat_all: 'All',
    cat_scientist: 'Scientist',
    cat_economist: 'Economist',
    cat_military: 'Military Strategist',
    cat_philosopher: 'Philosopher',
    cat_writer: 'Writer',
    cat_thinker: 'Thinker',
    add_custom: 'Create Custom Role',
    default_era: 'Custom',
    default_title: 'Custom Role',
    roundtable_empty: 'Select sages above to seat them',
    roundtable_table: 'Table',
    seats_n: '{n} Sages',
    selected_count: 'Selected {n} sages',
    parallel_empty: 'Select roundtable participants above first',
    parallel_select_preset: '-- Select Preset --',
    ph_api_url: 'API endpoint URL',
    ph_model: 'Model name',
    ph_api_key: 'API key (blank = use global)',
    api_key_required: 'Please enter your API key first',
    api_url_required: 'Please enter the API endpoint URL',
    api_model_required: 'Please enter the model name',
    api_ok: 'Connected! Model: {model}, Time: {elapsed}s',
    api_reply_suffix: ', AI reply: "{reply}"',
    api_fail: 'Connection failed: {msg}',
    req_error: 'Request error: {msg}',
    preset_empty: 'No available sages in this lineup',
    seated: 'Seated: {name} · {n} sages',
    need_name: 'Please enter the role name',
    need_profile: 'Please enter the thinking profile',
    role_created: 'Role \'{name}\' created and seated',
    need_research_name: 'Please enter a person\'s name',
    need_api_key: 'Please enter your API key in API settings first',
    need_api_config: 'Please complete the API endpoint and model config first',
    already_in: '\'{name}\' is already at the table',
    joined: '\'{name}\' has joined the table',
    researching: 'Researching: {name}…',
    research_loading: 'AI is gathering materials on \'{name}\'',
    research_loading2: 'Organizing era, family, life, works, masterpieces, mindset…',
    research_failed: 'Research failed',
    research_done: 'Profile of \'{name}\' complete and added to the table',
    pdf_only: 'Please upload a PDF file',
    pdf_parsing: 'Parsing PDF…',
    pdf_too_few: 'Too little text in the PDF; it may be a scanned or image-only PDF',
    pdf_done: 'PDF parsed: {pages} pages, {chars} characters',
    pdf_fail: 'PDF parsing failed: ',
    need_global_key: 'Please enter the global API key first',
    batch_filled: 'Global API config applied to all roles',
    cleared: 'Cleared all role-specific API configs',
    char_key_missing: 'Role \'{name}\' has no API key configured',
    char_url_missing: 'Role \'{name}\' has no API endpoint',
    char_model_missing: 'Role \'{name}\' has no model name',
    need_2: 'Please select at least 2 sages',
    max_8: 'Up to 8 sages supported at once',
    need_input: 'Please enter the content to analyze',
    no_report: 'No report content to copy yet',
    copied: 'Copied to clipboard',
    copy_fail: 'Copy failed; please select and copy manually',
    done_msg: 'Roundtable deduction complete!',
    analysis_fail: 'Analysis failed: ',
    synth_fail: 'Synthesis report failed: ',
    model_custom_opt: '✏️ Custom model...',
    card_thinking: 'Thinking…',
    card_thinking_as: 'Thinking from {name}\'s perspective…',
    synth_loading: 'Synthesizing all views into a report…',
    synth_generating: 'Generating synthesis report…',
    progress_prepare: 'Preparing…',
    parallel_thinking: '{n} sages thinking simultaneously…',
    completed: '{done}/{total} sages done'
  }
};

// 翻译辅助函数：支持 {param} 占位符替换；缺失翻译回退到中文，再回退到 key
function t(key, params) {
  let str = (I18N[state.lang] && I18N[state.lang][key]) || I18N.zh[key] || key;
  if (params && typeof params === 'object') {
    for (const k in params) {
      str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]);
    }
  }
  return str;
}

// 人物显示名：根据当前语言返回英文名（界面展示用）；中文界面或缺失翻译时回退中文名
function charName(c) {
  if (!c) return '';
  if (state.lang === 'en' && typeof CHARACTER_NAME_EN !== 'undefined' && CHARACTER_NAME_EN[c.id]) {
    return CHARACTER_NAME_EN[c.id];
  }
  return c.name;
}

// 服务商预设显示名：根据当前语言返回英文名（界面展示用）；中文界面或缺失翻译时回退中文名
function presetName(p) {
  if (!p) return '';
  if (state.lang === 'en' && p.nameEn) return p.nameEn;
  return p.name;
}

// 自定义角色默认值（时代/头衔）：仅当为内置中文默认值时随语言翻译，用户输入值原样展示
function displayEra(ch) {
  if (!ch) return '';
  if (ch.era === '自定义') return t('default_era');
  return ch.era || '';
}
function displayTitle(ch) {
  if (!ch) return '';
  if (ch.title === '自定义角色') return t('default_title');
  return ch.title || '';
}

// 应用语言：更新所有带 data-i18n 属性的静态/动态文本，并重渲染数据驱动部分
function applyLanguage(lang) {
  state.lang = lang;
  try { localStorage.setItem('rt_lang', lang); } catch (e) {}
  document.documentElement.lang = (lang === 'en') ? 'en' : 'zh-CN';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });

  // 底部免责声明更新（随语言切换）
  const dt = document.getElementById('disclaimer-text');
  if (dt) dt.textContent = (lang === 'en' && typeof DISCLAIMER_TEXT_EN !== 'undefined') ? DISCLAIMER_TEXT_EN : DISCLAIMER_TEXT;

  // 重新渲染数据驱动的动态内容
  renderCategoryFilters();
  renderPresetGroups();
  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();
  if (state.discussionMode === 'parallel') renderParallelApiConfigs();

  // 切换按钮高亮
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// ====== 初始化 ======
function init() {
  // PDF.js worker
  if (typeof pdfjsLib !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
  }

  // marked 配置
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  // 初始化界面语言（从本地存储读取，默认中文）
  try {
    const savedLang = localStorage.getItem('rt_lang');
    if (savedLang === 'en' || savedLang === 'zh') state.lang = savedLang;
  } catch (e) {}
  applyLanguage(state.lang);

  renderApiPresets();
  renderCategoryFilters();
  renderPresetGroups();
  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();

  // 免责声明（随语言切换）
  document.getElementById('disclaimer-text').textContent =
    (state.lang === 'en' && typeof DISCLAIMER_TEXT_EN !== 'undefined') ? DISCLAIMER_TEXT_EN : DISCLAIMER_TEXT;

  // 拖拽上传
  setupDragDrop();

  // API Key 输入监听
  document.getElementById('api-key').addEventListener('input', e => {
    state.apiKey = e.target.value;
  });
  document.getElementById('api-base-url').addEventListener('input', e => {
    state.baseUrl = e.target.value;
  });

  // 搜索输入
  document.getElementById('char-search').addEventListener('input', renderCharacterGrid);

  // 研究输入回车
  document.getElementById('research-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') researchCharacter();
  });

  // PDF 文件选择
  document.getElementById('pdf-file-input').addEventListener('change', handlePdfUpload);
}

// ====== 面板折叠 ======
function togglePanel(panelId) {
  document.getElementById(panelId).classList.toggle('collapsed');
}

// ====== API 预设 ======
function renderApiPresets() {
  const container = document.getElementById('api-presets');
  container.innerHTML = API_PRESETS.map((preset, i) => `
    <button class="api-preset-btn ${i === 0 ? 'active' : ''}" data-action="api-preset" data-preset-index="${i}">
      ${presetName(preset)}
    </button>
  `).join('');
  selectApiPreset(0);
}

function selectApiPreset(index) {
  state.presetIndex = index;
  const preset = API_PRESETS[index];

  document.querySelectorAll('.api-preset-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });

  document.getElementById('api-base-url').value = preset.baseUrl;
  state.baseUrl = preset.baseUrl;

  // 填充模型下拉框
  const modelSelect = document.getElementById('api-model-select');
  const customInput = document.getElementById('api-model-custom');
  const hiddenInput = document.getElementById('api-model');
  modelSelect.innerHTML = '';

  if (preset.models && preset.models.length > 0) {
    preset.models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modelSelect.appendChild(opt);
    });
    // 添加自定义选项
    const customOpt = document.createElement('option');
    customOpt.value = '__custom__';
    customOpt.textContent = t('model_custom_opt');
    modelSelect.appendChild(customOpt);

    modelSelect.style.display = '';
    customInput.style.display = 'none';
    customInput.value = '';

    // 选中默认模型
    const defaultModel = preset.model || preset.models[0];
    modelSelect.value = preset.models.includes(defaultModel) ? defaultModel : '__custom__';

    if (modelSelect.value === '__custom__') {
      customInput.style.display = '';
      customInput.value = defaultModel;
      hiddenInput.value = defaultModel;
    } else {
      hiddenInput.value = modelSelect.value;
    }
  } else {
    // 自定义预设，无模型列表
    modelSelect.style.display = 'none';
    customInput.style.display = '';
    customInput.value = preset.model || '';
    hiddenInput.value = preset.model || '';
  }

  state.model = hiddenInput.value;
}

function toggleApiKeyVisibility() {
  const input = document.getElementById('api-key');
  const btn = document.querySelector('.api-key-toggle');
  if (input.type === 'password') {
    input.type = 'text';
    btn.textContent = t('api_key_hide');
  } else {
    input.type = 'password';
    btn.textContent = t('api_key_show');
  }
}

// ====== API 连接测试 ======
async function testApiConnection() {
  const btn = document.getElementById('api-test-btn');
  const btnText = document.getElementById('api-test-btn-text');
  const resultEl = document.getElementById('api-test-result');

  const apiKey = document.getElementById('api-key').value.trim();
  const baseUrl = document.getElementById('api-base-url').value.trim();
  const model = document.getElementById('api-model').value.trim();

  // 验证必填项
  if (!apiKey) {
    resultEl.className = 'api-test-result error';
    resultEl.textContent = t('api_key_required');
    return;
  }
  if (!baseUrl) {
    resultEl.className = 'api-test-result error';
    resultEl.textContent = t('api_url_required');
    return;
  }
  if (!model) {
    resultEl.className = 'api-test-result error';
    resultEl.textContent = t('api_model_required');
    return;
  }

  // 进入测试中状态
  btn.disabled = true;
  btnText.innerHTML = '<span class="loading-spinner"></span> ' + t('api_testing');
  resultEl.className = 'api-test-result testing';
  resultEl.textContent = t('api_testing');

  try {
    const startTime = Date.now();

    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: '请回复"连接成功"四个字' }
        ],
        stream: false,
        max_tokens: 20,
        temperature: 0
      })
    });

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      let errorMsg = `HTTP ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMsg += `: ${errorJson.error?.message || errorText}`;
      } catch {
        if (errorText) errorMsg += `: ${errorText.substring(0, 200)}`;
      }

      // 给出针对性建议
      let suggestion = '';
      if (response.status === 401) {
        suggestion = (state.lang === 'en') ? ' — Invalid or expired API key; please check it.' : ' — API 密钥无效或已过期，请检查密钥是否正确';
      } else if (response.status === 403) {
        suggestion = (state.lang === 'en') ? ' — No access to this model; check key permissions or model name.' : ' — 无权访问该模型，请检查密钥权限或模型名称';
      } else if (response.status === 404) {
        suggestion = (state.lang === 'en') ? ' — Endpoint or model not found; please check the values.' : ' — 接口地址或模型名称不存在，请检查是否填写正确';
      } else if (response.status === 429) {
        suggestion = (state.lang === 'en') ? ' — Too many requests; please try again later.' : ' — 请求过于频繁，请稍后再试';
      }

      resultEl.className = 'api-test-result error';
      resultEl.textContent = t('api_fail', { msg: errorMsg + suggestion });
    } else {
      const data = await response.json();
      const replyContent = data.choices?.[0]?.message?.content || '';
      const usedModel = data.model || model;

      resultEl.className = 'api-test-result success';
      resultEl.innerHTML = escapeHtml(t('api_ok', { model: usedModel, elapsed: elapsed })) +
        (replyContent ? escapeHtml(t('api_reply_suffix', { reply: replyContent.substring(0, 50) })) : '');
    }
  } catch (error) {
    let suggestion = '';
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      suggestion = (state.lang === 'en') ? ' — Cannot reach this address; check the URL and CORS restrictions.' : ' — 无法连接到该地址，请检查接口地址是否正确、是否存在跨域限制（CORS）';
    } else if (error.message.includes('timeout')) {
      suggestion = (state.lang === 'en') ? ' — Request timed out; network may be down or the service is slow.' : ' — 请求超时，可能是网络不通或服务响应过慢';
    }

    resultEl.className = 'api-test-result error';
    resultEl.textContent = t('req_error', { msg: error.message + suggestion });
  } finally {
    btn.disabled = false;
    btnText.textContent = t('api_retest');
  }
}

// ====== 分类筛选 ======
function renderCategoryFilters() {
  const container = document.getElementById('category-filters');
  container.innerHTML = `
    <button class="category-chip active" data-action="filter-category" data-category="all">${t('cat_all')}</button>
    ${CATEGORIES.map(cat => `
      <button class="category-chip" data-action="filter-category" data-category="${cat.id}">
        ${cat.icon} ${t('cat_' + cat.id)}
      </button>
    `).join('')}
  `;
}

function filterCategory(catId) {
  state.activeCategory = catId;
  document.querySelectorAll('.category-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.category === catId);
  });
  renderCharacterGrid();
}

// ====== 快捷阵容（一键自动入座） ======
function renderPresetGroups() {
  const container = document.getElementById('preset-groups');
  if (!container || typeof PRESET_GROUPS === 'undefined') return;
  const btns = PRESET_GROUPS.map(g => `
    <button class="preset-btn" data-action="apply-preset" data-preset-id="${g.id}" title="${t('preset_' + g.id + '_desc')}">
      <span class="preset-name">${t('preset_' + g.id + '_name')}</span>
      <span class="preset-desc">${t('preset_' + g.id + '_desc')}</span>
    </button>
  `).join('');
  // 保留 label，追加按钮
  const label = container.querySelector('.preset-label');
  container.innerHTML = '';
  if (label) container.appendChild(label);
  container.insertAdjacentHTML('beforeend', btns);
}

function applyPreset(presetId) {
  const group = PRESET_GROUPS.find(g => g.id === presetId);
  if (!group) return;
  const allChars = getAllCharacters();
  const members = group.members
    .map(id => allChars.find(c => c.id === id))
    .filter(Boolean);

  if (members.length === 0) {
    showNotification(t('preset_empty'), 'error');
    return;
  }

  // 替换式自动入座（清空当前选择，坐下这一桌）
  state.selectedCharacters = members;
  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();

  // 滚动并高亮圆桌
  const rt = document.getElementById('roundtable-wrapper');
  if (rt) rt.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showNotification(t('seated', { name: group.name, n: members.length }), 'success');
}

// ====== 人物选择 ======
function getAllCharacters() {
  return [...CHARACTERS, ...state.customCharacters];
}

function renderCharacterGrid() {
  state.searchKeyword = document.getElementById('char-search').value.toLowerCase().trim();
  const grid = document.getElementById('character-grid');
  const allChars = getAllCharacters();

  let filtered = allChars.filter(ch => {
    const matchCategory = state.activeCategory === 'all' || ch.category === state.activeCategory;
    const enName = (typeof CHARACTER_NAME_EN !== 'undefined' && CHARACTER_NAME_EN[ch.id]) || '';
    const matchSearch = !state.searchKeyword ||
      ch.name.toLowerCase().includes(state.searchKeyword) ||
      enName.toLowerCase().includes(state.searchKeyword) ||
      (ch.fullName && ch.fullName.toLowerCase().includes(state.searchKeyword)) ||
      (ch.title && ch.title.toLowerCase().includes(state.searchKeyword));
    return matchCategory && matchSearch;
  });

  let html = filtered.map(ch => {
    const cat = CATEGORIES.find(c => c.id === ch.category) || { color: '#888', icon: '?' };
    const isSelected = state.selectedCharacters.some(s => s.id === ch.id);
    return `
      <div class="character-card ${isSelected ? 'selected' : ''}" data-action="toggle-character" data-char-id="${ch.id}">
        <div class="avatar" style="background:${cat.color}">${charName(ch).charAt(0)}</div>
        <div class="name">${charName(ch)}</div>
        <div class="era">${displayEra(ch)}</div>
        ${ch.region ? `<div class="region-badge">${ch.region}</div>` : ''}
        <div class="title-text">${displayTitle(ch)}</div>
      </div>
    `;
  }).join('');

  // 添加自定义角色按钮
  html += `
    <div class="add-custom-btn" data-action="open-custom-modal">
      <span class="plus">+</span>
      <span class="text">${t('add_custom')}</span>
    </div>
  `;

  grid.innerHTML = html;
}

function toggleCharacter(id) {
  const allChars = getAllCharacters();
  const char = allChars.find(c => c.id === id);
  if (!char) return;

  const index = state.selectedCharacters.findIndex(s => s.id === id);
  if (index >= 0) {
    state.selectedCharacters.splice(index, 1);
  } else {
    state.selectedCharacters.push(char);
  }

  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();
}

function updateSelectionBar() {
  const countEl = document.getElementById('selection-count');
  if (countEl) countEl.textContent = t('selected_count', { n: state.selectedCharacters.length });
  const namesContainer = document.getElementById('selected-names');
  namesContainer.innerHTML = state.selectedCharacters.map(ch => `
    <span class="selected-tag">
      ${charName(ch)}
      <span class="remove" data-action="toggle-character" data-char-id="${ch.id}">×</span>
    </span>
  `).join('');

  // 畅享模式：人物变动时刷新独立API配置面板
  if (state.discussionMode === 'parallel') {
    renderParallelApiConfigs();
  }
}

// ====== 圆桌可视化 ======
function renderRoundtable() {
  const wrapper = document.getElementById('roundtable-wrapper');
  const chars = state.selectedCharacters;

  if (chars.length === 0) {
    wrapper.innerHTML = `
      <div class="roundtable-empty">
        <div>
          <div class="empty-icon">🪑</div>
          <div>${t('roundtable_empty')}</div>
        </div>
      </div>
    `;
    return;
  }

  const size = 400;
  const centerX = size / 2;
  const centerY = size / 2;
  const tableRadius = Math.max(50, Math.min(80, 180 / chars.length * 2));
  const seatRadius = Math.max(90, Math.min(150, 180));
  const avatarRadius = 28;

  let seats = '';
  chars.forEach((ch, i) => {
    const angle = (i / chars.length) * 2 * Math.PI - Math.PI / 2;
    const x = centerX + seatRadius * Math.cos(angle);
    const y = centerY + seatRadius * Math.sin(angle);
    const cat = CATEGORIES.find(c => c.id === ch.category) || { color: '#888' };

    // 名字位置偏移
    const nameY = y + avatarRadius + 14;
    const nameX = x;

    seats += `
      <g class="roundtable-seat" style="animation: fadeInSeat 0.4s ease ${i * 0.08}s both;">
        <circle cx="${x}" cy="${y}" r="${avatarRadius}" fill="${cat.color}" opacity="0.9" stroke="#fff" stroke-width="2"/>
        <text x="${x}" y="${y + 6}" text-anchor="middle" font-size="16" fill="#fff" font-weight="700">${charName(ch).charAt(0)}</text>
        <text class="seat-name" x="${nameX}" y="${nameY}" text-anchor="middle">${charName(ch)}</text>
      </g>
    `;
  });

  wrapper.innerHTML = `
    <svg class="roundtable-svg" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tableGrad">
          <stop offset="0%" stop-color="#e8e4dc"/>
          <stop offset="100%" stop-color="#d4cfc4"/>
        </radialGradient>
        <style>
          @keyframes fadeInSeat {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
        </style>
      </defs>
      <!-- 外圆装饰 -->
      <circle cx="${centerX}" cy="${centerY}" r="${seatRadius + 40}" fill="none" stroke="#e0ddd5" stroke-width="1" stroke-dasharray="4 4"/>
      <!-- 圆桌 -->
      <circle cx="${centerX}" cy="${centerY}" r="${tableRadius}" fill="url(#tableGrad)" stroke="#c9a961" stroke-width="2"/>
      <circle cx="${centerX}" cy="${centerY}" r="${tableRadius - 8}" fill="none" stroke="#c9a961" stroke-width="0.5" opacity="0.5"/>
      <text x="${centerX}" y="${centerY - 8}" text-anchor="middle" font-size="14" fill="#8a7a5a" font-family="serif" font-weight="600">${t('roundtable_table')}</text>
      <text x="${centerX}" y="${centerY + 12}" text-anchor="middle" font-size="11" fill="#a89878" font-family="serif">${t('seats_n', { n: chars.length })}</text>
      <!-- 座椅 -->
      ${seats}
    </svg>
  `;
}

// ====== 自定义角色 ======
function openCustomCharModal() {
  document.getElementById('custom-char-modal').classList.add('visible');
}

function closeCustomCharModal() {
  document.getElementById('custom-char-modal').classList.remove('visible');
  document.getElementById('custom-name').value = '';
  document.getElementById('custom-era').value = '';
  document.getElementById('custom-title').value = '';
  document.getElementById('custom-profile').value = '';
}

function saveCustomCharacter() {
  const name = document.getElementById('custom-name').value.trim();
  const era = document.getElementById('custom-era').value.trim();
  const title = document.getElementById('custom-title').value.trim();
  const profile = document.getElementById('custom-profile').value.trim();

  if (!name) {
    showNotification(t('need_name'), 'error');
    return;
  }
  if (!profile) {
    showNotification(t('need_profile'), 'error');
    return;
  }

  const customChar = {
    id: 'custom_' + Date.now(),
    name: name,
    fullName: name,
    category: 'thinker',
    era: era || '自定义',
    title: title || '自定义角色',
    profile: `你是${name}，${era ? '时代背景：' + era + '。' : ''}${title ? '身份：' + title + '。' : ''}

${profile}`
  };

  state.customCharacters.push(customChar);
  state.selectedCharacters.push(customChar);

  closeCustomCharModal();
  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();
  showNotification(t('role_created', { name: name }), 'success');
}

// ====== AI自动研究角色 ======
let pendingResearchResult = null;

async function researchCharacter() {
  const input = document.getElementById('research-input');
  const name = input.value.trim();

  if (!name) {
    showNotification(t('need_research_name'), 'error');
    input.focus();
    return;
  }

  if (!state.apiKey) {
    showNotification(t('need_api_key'), 'error');
    document.getElementById('panel-api').classList.remove('collapsed');
    return;
  }
  if (!state.baseUrl || !state.model) {
    showNotification(t('need_api_config'), 'error');
    document.getElementById('panel-api').classList.remove('collapsed');
    return;
  }

  // 检查是否已存在同名角色
  const existing = getAllCharacters().find(c => c.name === name || c.fullName === name);
  if (existing) {
    if (state.selectedCharacters.some(s => s.id === existing.id)) {
      showNotification(t('already_in', { name: name }), 'info');
      return;
    }
    // 直接选中已有角色
    state.selectedCharacters.push(existing);
    renderCharacterGrid();
    renderRoundtable();
    updateSelectionBar();
    showNotification(t('joined', { name: name }), 'success');
    input.value = '';
    return;
  }

  // 打开研究模态框，显示加载状态
  const modal = document.getElementById('research-modal');
  const body = document.getElementById('research-modal-body');
  const titleEl = document.getElementById('research-modal-title');
  const confirmBtn = document.getElementById('confirm-research-btn');

  modal.classList.add('visible');
  titleEl.textContent = t('researching', { name: name });
  confirmBtn.style.display = 'none';
  body.innerHTML = `
    <div style="text-align:center;padding:2.5rem 1rem;">
      <div class="loading-spinner" style="width:36px;height:36px;margin:0 auto 1rem;border:3px solid var(--accent-light);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
      <div style="font-size:0.95rem;color:var(--text-secondary);">${t('research_loading', { name: name })}</div>
      <div style="font-size:0.8rem;color:var(--text-muted);margin-top:0.3rem;">${t('research_loading2')}</div>
    </div>
  `;

  try {
    const messages = [
      { role: 'system', content: RESEARCH_PROMPT },
      { role: 'user', content: `请研究以下历史人物并生成完整的思维档案：\n\n人物：${name}` }
    ];

    let result = '';

    await streamChatCompletion(messages, (chunk, full) => {
      result = full;
      body.innerHTML = `<div class="research-result-content">${renderMarkdown(full)}</div>`;
      // 滚动到底部
      body.scrollTop = body.scrollHeight;
    }, { maxTokens: 4000, temperature: 0.7 });

    pendingResearchResult = { name, profile: result };
    titleEl.textContent = t('research_modal_title') + '：' + name;
    confirmBtn.style.display = 'inline-block';

    // 滚动到顶部供用户审阅
    body.scrollTop = 0;

  } catch (error) {
    console.error('角色研究失败:', error);
    body.innerHTML = `
      <div style="padding:1.5rem;text-align:center;">
        <div style="font-size:2rem;margin-bottom:0.5rem;">❌</div>
        <div style="color:var(--error);font-size:0.9rem;margin-bottom:0.5rem;">${t('research_failed')}</div>
        <div style="color:var(--text-muted);font-size:0.82rem;">${escapeHtml(error.message)}</div>
        <div style="margin-top:1rem;">
          <button class="modal-btn secondary" data-action="retry-research" data-name="${name}">${t('btn_retry')}</button>
        </div>
      </div>
    `;
  }
}

function closeResearchModal() {
  document.getElementById('research-modal').classList.remove('visible');
  pendingResearchResult = null;
}

function confirmResearchResult() {
  if (!pendingResearchResult) return;

  const { name, profile } = pendingResearchResult;

  // 尝试从研究结果中提取朝代和身份
  let era = 'AI研究';
  let title = 'AI自动研究角色';

  const eraMatch = profile.match(/\*\*朝代\/时代\*\*[：:]\s*(.+)/);
  if (eraMatch) era = eraMatch[1].trim();

  const titleMatch = profile.match(/\*\*身份\/头衔\*\*[：:]\s*(.+)/);
  if (titleMatch) title = titleMatch[1].trim();

  const lifeMatch = profile.match(/\*\*生卒年\*\*[：:]\s*(.+)/);
  if (lifeMatch) era = (era + ' · ' + lifeMatch[1].trim()).replace('AI研究 · ', '');

  const customChar = {
    id: 'research_' + Date.now(),
    name: name,
    fullName: name,
    category: 'thinker',
    era: era,
    title: title,
    profile: `你是${name}。以下是基于公开史料整理的完整思维档案，请在圆桌讨论中严格遵循此档案中的思维模式和认知视角进行独立思考：

${profile}

【重要约束】
以上资料（包括著作、代表作品、经典言论）仅作为你理解角色的背景参考。在圆桌讨论发言中，你必须以该人物的思维模式进行独立原创分析，严禁直接引用上述著作、诗歌、言论原文。`
  };

  state.customCharacters.push(customChar);
  state.selectedCharacters.push(customChar);

  closeResearchModal();
  document.getElementById('research-input').value = '';
  renderCharacterGrid();
  renderRoundtable();
  updateSelectionBar();
  showNotification(t('research_done', { name: name }), 'success');
}

// ====== 输入切换 ======
function switchInputTab(tab) {
  state.inputTab = tab;
  document.querySelectorAll('.input-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  document.getElementById('input-text-area').style.display = tab === 'text' ? 'block' : 'none';
  document.getElementById('input-pdf-area').style.display = tab === 'pdf' ? 'block' : 'none';
}

// ====== PDF 上传与解析 ======
function setupDragDrop() {
  const zone = document.getElementById('pdf-upload-zone');
  if (!zone) return;

  zone.addEventListener('dragover', e => {
    e.preventDefault();
    zone.classList.add('dragover');
  });
  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handlePdfFile(file);
    } else {
      showNotification(t('pdf_only'), 'error');
    }
  });
}

async function handlePdfUpload(event) {
  const file = event.target.files[0];
  if (file) {
    await handlePdfFile(file);
  }
}

async function handlePdfFile(file) {
  showNotification(t('pdf_parsing'), 'info');

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';
    const numPages = pdf.numPages;

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    if (fullText.trim().length < 10) {
      showNotification(t('pdf_too_few'), 'error');
      return;
    }

    // 限制文本长度（避免超出API上下文限制）
    const maxChars = 10000;
    if (fullText.length > maxChars) {
      fullText = fullText.substring(0, maxChars) + '\n\n' + ((state.lang === 'en') ? '[Document truncated…]' : '[文档内容过长，已截断…]');
    }

    state.pdfText = fullText;
    state.pdfFileName = file.name;

    document.getElementById('pdf-file-info-container').innerHTML = `
      <div class="pdf-file-info">
        <div>
          <div class="file-name">📄 ${file.name}</div>
          <div class="file-meta">${numPages} ${state.lang === 'en' ? 'pages' : '页'} · ${fullText.length} ${state.lang === 'en' ? 'chars' : '字符'}</div>
        </div>
        <span class="remove-pdf" data-action="clear-pdf">✕ ${state.lang === 'en' ? 'Remove' : '移除'}</span>
      </div>
    `;

    showNotification(t('pdf_done', { pages: numPages, chars: fullText.length }), 'success');
  } catch (error) {
    console.error('PDF解析错误:', error);
    showNotification(t('pdf_fail') + error.message, 'error');
  }
}

function clearPdf() {
  state.pdfText = '';
  state.pdfFileName = '';
  document.getElementById('pdf-file-info-container').innerHTML = '';
  document.getElementById('pdf-file-input').value = '';
}

// ====== 参数设置 ======
function setDepth(depth) {
  state.outputDepth = depth;
  document.querySelectorAll('.radio-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.depth === depth);
  });
}

// ====== 推演模式切换 ======
function setDiscussionMode(mode) {
  state.discussionMode = mode;
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });
  const parallelPanel = document.getElementById('parallel-api-panel');
  if (parallelPanel) {
    parallelPanel.style.display = mode === 'parallel' ? 'block' : 'none';
  }
  // 切换提示文案
  const hintClassic = document.getElementById('mode-hint-classic');
  const hintParallel = document.getElementById('mode-hint-parallel');
  if (hintClassic) hintClassic.style.display = mode === 'classic' ? 'block' : 'none';
  if (hintParallel) hintParallel.style.display = mode === 'parallel' ? 'block' : 'none';
  if (mode === 'parallel') {
    renderParallelApiConfigs();
  }
}

// ====== 畅享模式：渲染每角色独立API配置 ======
function renderParallelApiConfigs() {
  const container = document.getElementById('parallel-api-configs');
  if (!container) return;

  if (state.selectedCharacters.length === 0) {
    container.innerHTML = '<div class="parallel-empty">' + t('parallel_empty') + '</div>';
    return;
  }

  container.innerHTML = state.selectedCharacters.map((ch, i) => {
    const cat = CATEGORIES.find(c => c.id === ch.category) || { color: '#888' };
    const cfg = state.charApiConfigs[ch.id] || {};
    return `
      <div class="char-api-row" data-char-id="${ch.id}">
        <div class="char-api-header">
          <div class="avatar" style="background:${cat.color}">${charName(ch).charAt(0)}</div>
          <div class="char-api-name">${charName(ch)}</div>
          <select class="char-api-preset" onchange="applyCharPreset('${ch.id}', this.value)">
            <option value="-1">${t('parallel_select_preset')}</option>
            ${API_PRESETS.map((p, pi) => `<option value="${pi}" ${cfg.baseUrl === p.baseUrl ? 'selected' : ''}>${presetName(p)}</option>`).join('')}
          </select>
        </div>
        <div class="char-api-fields">
          <input type="text" class="char-api-url" placeholder="${t('ph_api_url')}" value="${cfg.baseUrl || ''}" oninput="updateCharApiConfig('${ch.id}', 'baseUrl', this.value)">
          <input type="text" class="char-api-model" placeholder="${t('ph_model')}" value="${cfg.model || ''}" oninput="updateCharApiConfig('${ch.id}', 'model', this.value)">
          <input type="password" class="char-api-key" placeholder="${t('ph_api_key')}" value="${cfg.apiKey || ''}" oninput="updateCharApiConfig('${ch.id}', 'apiKey', this.value)">
        </div>
      </div>
    `;
  }).join('');
}

// ====== 畅享模式：更新单个角色API配置 ======
function updateCharApiConfig(charId, field, value) {
  if (!state.charApiConfigs[charId]) {
    state.charApiConfigs[charId] = {};
  }
  state.charApiConfigs[charId][field] = value;
}

// ====== 畅享模式：应用预设到单个角色 ======
function applyCharPreset(charId, presetIndex) {
  if (presetIndex === '-1') return;
  const preset = API_PRESETS[parseInt(presetIndex)];
  state.charApiConfigs[charId] = {
    ...state.charApiConfigs[charId],
    baseUrl: preset.baseUrl,
    model: preset.model
  };
  renderParallelApiConfigs();
}

// ====== 畅享模式：批量填充全局配置到所有角色 ======
function batchFillApiConfigs() {
  if (!state.apiKey) {
    showNotification(t('need_global_key'), 'error');
    return;
  }
  state.selectedCharacters.forEach(ch => {
    state.charApiConfigs[ch.id] = {
      apiKey: state.apiKey,
      baseUrl: state.baseUrl,
      model: state.model
    };
  });
  renderParallelApiConfigs();
  showNotification(t('batch_filled'), 'success');
}

// ====== 畅享模式：清空所有角色独立配置 ======
function clearCharApiConfigs() {
  state.charApiConfigs = {};
  renderParallelApiConfigs();
  showNotification(t('cleared'), 'info');
}

// ====== 畅享模式：获取角色有效API配置 ======
function getCharApiConfig(charId) {
  const cfg = state.charApiConfigs[charId];
  if (!cfg) return {};
  return {
    apiKey: cfg.apiKey || state.apiKey,
    baseUrl: cfg.baseUrl || state.baseUrl,
    model: cfg.model || state.model
  };
}

// ====== 获取输入内容 ======
function getInputContent() {
  let text = '';
  if (state.inputTab === 'text') {
    text = document.getElementById('input-text').value.trim();
  } else if (state.inputTab === 'pdf' && state.pdfText) {
    text = state.pdfText;
  }
  return text;
}

// ====== 验证 ======
function validateBeforeStart() {
  if (state.discussionMode === 'classic') {
    // 经典模式：验证全局API配置
    if (!state.apiKey) {
      showNotification(t('api_key_required'), 'error');
      document.getElementById('panel-api').classList.remove('collapsed');
      return false;
    }
    if (!state.baseUrl) {
      showNotification(t('api_url_required'), 'error');
      return false;
    }
    if (!state.model) {
      showNotification(t('api_model_required'), 'error');
      return false;
    }
  } else {
    // 畅享模式：验证每角色API配置
    for (const ch of state.selectedCharacters) {
      const cfg = getCharApiConfig(ch.id);
      if (!cfg.apiKey) {
        showNotification(t('char_key_missing', { name: charName(ch) }), 'error');
        document.getElementById('panel-options').classList.remove('collapsed');
        return false;
      }
      if (!cfg.baseUrl) {
        showNotification(t('char_url_missing', { name: charName(ch) }), 'error');
        return false;
      }
      if (!cfg.model) {
        showNotification(t('char_model_missing', { name: charName(ch) }), 'error');
        return false;
      }
    }
  }
  if (state.selectedCharacters.length < 2) {
    showNotification(t('need_2'), 'error');
    document.getElementById('panel-chars').classList.remove('collapsed');
    return false;
  }
  if (state.selectedCharacters.length > 8) {
    showNotification(t('max_8'), 'error');
    return false;
  }
  const input = getInputContent();
  if (!input) {
    showNotification(t('need_input'), 'error');
    document.getElementById('panel-input').classList.remove('collapsed');
    return false;
  }
  return true;
}

// ====== API 流式调用 ======
async function streamChatCompletion(messages, onChunk, options = {}) {
  // 畅享模式：优先使用角色专属API配置，否则回退到全局配置
  const apiConfig = options.apiConfig || {};
  const apiKey = apiConfig.apiKey || state.apiKey;
  const baseUrl = apiConfig.baseUrl || state.baseUrl;
  const model = apiConfig.model || state.model;

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
      stream: true,
      temperature: options.temperature ?? 0.85,
      max_tokens: options.maxTokens ?? (state.outputDepth === 'concise' ? 1500 : 3000)
    })
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    let errorMsg = `API请求失败 (${response.status})`;
    try {
      const errorJson = JSON.parse(errorText);
      errorMsg += `: ${errorJson.error?.message || errorText}`;
    } catch {
      if (errorText) errorMsg += `: ${errorText}`;
    }
    throw new Error(errorMsg);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let fullContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop();

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data:')) continue;
      const data = trimmed.slice(5).trim();
      if (data === '[DONE]') continue;

      try {
        const json = JSON.parse(data);
        const content = json.choices?.[0]?.delta?.content;
        if (content) {
          fullContent += content;
          onChunk(content, fullContent);
        }
      } catch (e) {
        // 忽略解析错误
      }
    }
  }

  return fullContent;
}

// ====== 构建单人分析 Prompt ======
function buildIndividualPrompt(character, inputContent) {
  const depthInstruction = state.outputDepth === 'concise'
    ? '请精简分析，控制在500字以内，聚焦核心观点。'
    : '请完整展开分析，充分展现你的思维深度和独特视角。';

  const systemPrompt = `${SYSTEM_CONSTRAINTS}

${character.profile}

【当前任务】
你正在参加一场圆桌讨论会。请基于你上述的角色思维档案，以该人物的思维模式和认知视角，对以下议题进行独立分析。

${depthInstruction}

【分析要求】
1. 严禁直接复制该人物的现存著作、诗词、历史原话，必须全新独立原创推演
2. 保持该人物的文风和思维特点
3. 你的分析应当独立完整，不参考其他人的观点
4. 从你独特的认知视角出发，提出有价值的见解
5. 输出格式使用 Markdown`;

  const userPrompt = `【讨论议题/分析内容】
${inputContent}

请以${character.name}的思维视角，展开你的独立分析：`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

// ====== 构建综合报告 Prompt ======
function buildSynthesisPrompt(characters, analyses, inputContent) {
  const records = characters.map((ch, i) => {
    return `--- ${ch.name}的发言 ---
${analyses[i] || '(无发言内容)'}`;
  }).join('\n\n');

  const depthInstruction = state.outputDepth === 'concise'
    ? '综合报告请精简输出，聚焦核心共识与分歧。'
    : '综合报告请完整输出，深入梳理各方观点。';

  const systemPrompt = `${SYSTEM_CONSTRAINTS}

【你的角色】
你是这场圆桌讨论会的主持人兼综合分析师。你的任务是梳理各位智囊的独立发言，生成一份完整的综合报告。

${depthInstruction}

【报告结构要求】
1. **各方共识**：梳理所有发言中观点一致或接近的部分
2. **观点分歧**：标注各方不同的立场和结论，说明分歧所在
3. **综合结论**：整合各方观点，给出全面、平衡的综合结论与建议
4. **时代局限性标注**：若某位人物的观点受时代局限存在偏差，在此标注说明
5. 报告末尾自动追加免责声明

输出格式使用 Markdown。`;

  const disclaimer = (state.lang === 'en' && typeof DISCLAIMER_TEXT_EN !== 'undefined') ? DISCLAIMER_TEXT_EN : DISCLAIMER_TEXT;

  const userPrompt = `【原始议题】
${inputContent}

【各方独立发言记录】
${records}

请梳理以上发言，生成综合汇总报告。报告末尾请追加以下免责声明：

${disclaimer}`;

  return [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: userPrompt }
  ];
}

// ====== 渲染 Markdown ======
function renderMarkdown(text) {
  if (typeof marked !== 'undefined') {
    try {
      return marked.parse(text);
    } catch (e) {
      return escapeHtml(text);
    }
  }
  return escapeHtml(text);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ====== 主流程：开始推演 ======
async function startDeduction() {
  if (state.isGenerating) return;
  if (!validateBeforeStart()) return;

  state.isGenerating = true;
  state.individualResults = new Array(state.selectedCharacters.length).fill('');
  state.synthesisResult = '';

  const inputContent = getInputContent();
  const characters = [...state.selectedCharacters];

  // UI 状态切换
  const startBtn = document.getElementById('start-btn');
  const startBtnText = document.getElementById('start-btn-text');
  startBtn.disabled = true;
  startBtnText.innerHTML = '<span class="loading-spinner"></span> ' + t('gen_running');
  document.getElementById('progress-section').style.display = 'block';

  // 显示结果区域
  const resultsSection = document.getElementById('results-section');
  resultsSection.classList.add('visible');
  document.getElementById('synthesis-card').style.display = 'none';
  // 隐藏一键复制按钮（推演开始后隐藏，完成后再显示）
  const copyBtn = document.getElementById('copy-full-report-btn');
  if (copyBtn) copyBtn.style.display = 'none';

  // 渲染单人卡片框架
  const individualContainer = document.getElementById('individual-results');
  individualContainer.innerHTML = characters.map((ch, i) => {
    const cat = CATEGORIES.find(c => c.id === ch.category) || { color: '#888' };
    // 畅享模式显示角色使用的模型名称
    let metaText = `${ch.era || ''} · ${ch.title || ''}`;
    if (state.discussionMode === 'parallel') {
      const cfg = getCharApiConfig(ch.id);
      if (cfg.model) metaText += ` · 🤖 ${cfg.model}`;
    }
    return `
      <div class="individual-card" id="card-${i}">
        <div class="individual-card-header">
          <div class="avatar" style="background:${cat.color}">${charName(ch).charAt(0)}</div>
          <div class="info">
            <div class="name">${charName(ch)}</div>
            <div class="meta">${metaText}</div>
          </div>
          <button class="copy-btn" data-action="copy-individual" data-index="${i}" style="display:none;" id="copy-${i}">${t('copy')}</button>
        </div>
        <div class="individual-card-body" id="body-${i}">
          <span class="loading-text">正在思考中…</span>
        </div>
      </div>
    `;
  }).join('');

  if (state.discussionMode === 'parallel') {
    // ====== 畅享模式：并行同时推演 ======
    await runParallelDeduction(characters, inputContent);
  } else {
    // ====== 经典模式：轮流串行推演 ======
    await runClassicDeduction(characters, inputContent);
  }

  // ====== 生成综合报告（两种模式共用） ======
  updateProgress(characters.length, characters.length + 1, t('synth_generating'));

  const synthesisCard = document.getElementById('synthesis-card');
  const synthesisBody = document.getElementById('synthesis-body');
  synthesisCard.style.display = 'block';
  synthesisBody.innerHTML = '<span class="loading-text">' + t('synth_loading') + '</span><span class="cursor-blink"></span>';

  try {
    const synthMessages = buildSynthesisPrompt(characters, state.individualResults, inputContent);
    let synthAccumulated = '';

    // 综合报告使用全局API配置
    await streamChatCompletion(synthMessages, (chunk, full) => {
      synthAccumulated = full;
      synthesisBody.innerHTML = renderMarkdown(full) + '<span class="cursor-blink"></span>';
    });

    state.synthesisResult = synthAccumulated;
    synthesisBody.innerHTML = renderMarkdown(synthAccumulated);
    // 显示一键复制按钮
    const copyBtn = document.getElementById('copy-full-report-btn');
    if (copyBtn) copyBtn.style.display = 'inline-block';

  } catch (error) {
    console.error('综合报告生成失败:', error);
    synthesisBody.innerHTML = `<div style="color:var(--error);">❌ ${escapeHtml(t('synth_fail'))}${escapeHtml(error.message)}</div>`;
  }

  // 完成
  updateProgress(characters.length + 1, characters.length + 1, t('done_msg'));
  startBtn.disabled = false;
  startBtnText.textContent = t('btn_redo');
  state.isGenerating = false;

  // 滚动到结果区域
  resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showNotification(t('done_msg'), 'success');
}

// ====== 经典模式：轮流串行 ======
async function runClassicDeduction(characters, inputContent) {
  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    const bodyEl = document.getElementById(`body-${i}`);

    updateProgress(i, characters.length, charName(ch) + (state.lang === 'en' ? ' is thinking…' : '正在思考…'));

    bodyEl.innerHTML = '<span class="loading-text">' + t('card_thinking_as', { name: charName(ch) }) + '</span><span class="cursor-blink"></span>';

    try {
      const messages = buildIndividualPrompt(ch, inputContent);
      let accumulated = '';

      await streamChatCompletion(messages, (chunk, full) => {
        accumulated = full;
        bodyEl.innerHTML = renderMarkdown(full) + '<span class="cursor-blink"></span>';
      });

      state.individualResults[i] = accumulated;
      bodyEl.innerHTML = renderMarkdown(accumulated);
      document.getElementById(`copy-${i}`).style.display = 'inline-block';

    } catch (error) {
      console.error(`分析失败 [${ch.name}]:`, error);
      state.individualResults[i] = `（分析失败：${error.message}）`;
      bodyEl.innerHTML = `<div style="color:var(--error);">❌ ${escapeHtml(t('analysis_fail'))}${escapeHtml(error.message)}</div>`;
    }

    updateProgress(i + 1, characters.length, charName(ch) + (state.lang === 'en' ? ' done' : '分析完成'));
  }
}

// ====== 畅享模式：并行同时 ======
async function runParallelDeduction(characters, inputContent) {
  let completedCount = 0;
  const total = characters.length;

  // 所有卡片同时显示"思考中"
  characters.forEach((ch, i) => {
    const bodyEl = document.getElementById(`body-${i}`);
    bodyEl.innerHTML = '<span class="loading-text">' + t('card_thinking_as', { name: charName(ch) }) + '</span><span class="cursor-blink"></span>';
  });

  updateProgress(0, total, t('parallel_thinking', { n: total }));

  // 并行发起所有请求
  const promises = characters.map((ch, i) => {
    const bodyEl = document.getElementById(`body-${i}`);
    const apiConfig = getCharApiConfig(ch.id);

    return (async () => {
      try {
        const messages = buildIndividualPrompt(ch, inputContent);
        let accumulated = '';

        await streamChatCompletion(messages, (chunk, full) => {
          accumulated = full;
          bodyEl.innerHTML = renderMarkdown(full) + '<span class="cursor-blink"></span>';
        }, { apiConfig });

        state.individualResults[i] = accumulated;
        bodyEl.innerHTML = renderMarkdown(accumulated);
        document.getElementById(`copy-${i}`).style.display = 'inline-block';

      } catch (error) {
        console.error(`分析失败 [${ch.name}]:`, error);
        state.individualResults[i] = `（分析失败：${error.message}）`;
        bodyEl.innerHTML = `<div style="color:var(--error);">❌ ${escapeHtml(t('analysis_fail'))}${escapeHtml(error.message)}</div>`;
      } finally {
        completedCount++;
        updateProgress(completedCount, total, `${completedCount}/${total} 位智囊已完成`);
      }
    })();
  });

  // 等待所有角色完成（不论成功失败）
  await Promise.allSettled(promises);
}

// ====== 进度更新 ======
function updateProgress(current, total, text) {
  const percent = Math.round((current / total) * 100);
  document.getElementById('progress-fill').style.width = percent + '%';
  document.getElementById('progress-text').textContent = `${text} (${current}/${total})`;
}

// ====== 复制功能 ======
function copyIndividual(index) {
  const text = state.individualResults[index];
  if (text) {
    copyToClipboard(text);
  }
}

function copySynthesis() {
  if (state.synthesisResult) {
    copyToClipboard(state.synthesisResult);
  }
}

function copyFullReport() {
  const parts = [];
  // 标题
  parts.push('# 圆桌智囊 · 多维思维推演报告\n');
  // 分析内容
  if (state.analysisContent) {
    parts.push('## 分析主题\n');
    parts.push(state.analysisContent + '\n');
  }
  // 各角色发言
  if (state.characterResults && state.characterResults.length > 0) {
    parts.push('## 各方观点\n');
    for (const r of state.characterResults) {
      if (r.result) {
        parts.push(`### ${charName(r)}\n`);
        parts.push(r.result + '\n');
      }
    }
  }
  // 综合报告
  if (state.synthesisResult) {
    parts.push('## 综合汇总\n');
    parts.push(state.synthesisResult + '\n');
  }
  if (parts.length > 2) {
    copyToClipboard(parts.join('\n---\n\n'));
  } else {
    showNotification(t('no_report'), 'error');
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification(t('copied'), 'success');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showNotification(t('copied'), 'success');
  } catch (e) {
    showNotification(t('copy_fail'), 'error');
  }
  document.body.removeChild(textarea);
}

// ====== 通知提示 ======
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = `notification ${type}`;
  notif.textContent = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.classList.add('fade-out');
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// ====== 事件绑定（立即执行，不等待 DOM） ======
// 事件委托绑定在 document 上，即使 DOM 未就绪也能正常工作
// 部署环境页面加载快，必须立即绑定，否则按钮点击无响应
function bindEvents() {
  // 统一事件委托（替代所有 onclick 内联事件，兼容 CSP 策略）
  document.addEventListener('click', function(e) {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    e.preventDefault();
    const action = el.dataset.action;

    switch (action) {
      case 'set-lang':
        applyLanguage(el.dataset.lang || 'zh');
        break;
      case 'toggle-panel':
        togglePanel(el.dataset.target);
        break;
      case 'toggle-api-key':
        toggleApiKeyVisibility();
        break;
      case 'api-test':
        testApiConnection();
        break;
      case 'research-character':
        researchCharacter();
        break;
      case 'switch-tab':
        switchInputTab(el.dataset.tab);
        break;
      case 'trigger-pdf-input':
        document.getElementById('pdf-file-input').click();
        break;
      case 'set-mode':
        setDiscussionMode(el.dataset.mode);
        break;
      case 'set-depth':
        setDepth(el.dataset.depth);
        break;
      case 'batch-fill-api':
        batchFillApiConfigs();
        break;
      case 'clear-char-api':
        clearCharApiConfigs();
        break;
      case 'start-deduction':
        startDeduction();
        break;
      case 'copy-synthesis':
        copySynthesis();
        break;
      case 'copy-full-report':
        copyFullReport();
        break;
      case 'close-custom-modal':
        closeCustomCharModal();
        break;
      case 'save-custom-char':
        saveCustomCharacter();
        break;
      case 'close-research-modal':
        closeResearchModal();
        break;
      case 'confirm-research':
        confirmResearchResult();
        break;
      case 'filter-category':
        filterCategory(el.dataset.category);
        break;
      case 'apply-preset':
        applyPreset(el.dataset.presetId);
        break;
      case 'toggle-character':
        toggleCharacter(el.dataset.charId);
        break;
      case 'open-custom-modal':
        openCustomCharModal();
        break;
      case 'copy-individual':
        copyIndividual(parseInt(el.dataset.index));
        break;
      case 'clear-pdf':
        clearPdf();
        break;
      case 'retry-research':
        document.getElementById('research-input').value = el.dataset.name;
        closeResearchModal();
        researchCharacter();
        break;
      case 'api-preset':
        selectApiPreset(parseInt(el.dataset.presetIndex));
        break;
      case 'remove-char-api':
        removeCharApiConfig(el.dataset.charId);
        break;
      case 'remove-char':
        toggleCharacter(el.dataset.charId);
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'close-disclaimer':
        document.getElementById('disclaimer-modal').classList.remove('active');
        break;
    }
  });

  // 模型下拉框切换
  const modelSelect = document.getElementById('api-model-select');
  if (modelSelect) {
    modelSelect.addEventListener('change', function() {
      const customInput = document.getElementById('api-model-custom');
      const hiddenInput = document.getElementById('api-model');
      if (this.value === '__custom__') {
        customInput.style.display = '';
        customInput.focus();
        hiddenInput.value = customInput.value || '';
      } else {
        customInput.style.display = 'none';
        hiddenInput.value = this.value;
      }
      state.model = hiddenInput.value;
    });
  }

  // 自定义模型输入
  const modelCustom = document.getElementById('api-model-custom');
  if (modelCustom) {
    modelCustom.addEventListener('input', function() {
      document.getElementById('api-model').value = this.value;
      state.model = this.value;
    });
  }

  // 隐藏模型字段同步
  const modelHidden = document.getElementById('api-model');
  if (modelHidden) {
    modelHidden.addEventListener('input', e => {
      state.model = e.target.value;
    });
  }

  // 分析内容输入
  const contentInput = document.getElementById('analysis-content');
  if (contentInput) {
    contentInput.addEventListener('input', e => {
      state.analysisContent = e.target.value;
    });
  }

  // 模态框背景关闭
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });
}

// 立即绑定事件（不等 DOM，确保部署环境按钮可点击）
bindEvents();

// ====== 数据初始化（DOM 就绪后执行） ======
let initialized = false;
function safeInit() {
  if (initialized) return;
  initialized = true;
  init();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  safeInit();
} else {
  document.addEventListener('DOMContentLoaded', safeInit);
  // 兜底：3秒后强制初始化
  setTimeout(safeInit, 3000);
}
