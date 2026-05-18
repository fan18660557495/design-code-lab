(function () {
  var modules = [
    ['01 · 界面怎么被代码拆开', [
      ['basics-figma.html', 'A0', '三件套 · HTML / CSS / JS', '入门'],
      ['box-figma.html', 'A1', '盒子 · Auto Layout', '基础'],
      ['components-figma.html', 'A2', '组件 · Variants & Props', '基础'],
      ['button-system-figma.html', 'A3', 'Button System · 组件演化', '进阶'],
      ['page-figma.html', 'B0', '拼页面 · 组件嵌套', '入门']
    ]],
    ['02 · 视觉规则怎么变成系统', [
      ['tokens-figma.html', 'C0', 'Variables / Tokens 入门', '入门'],
      ['colors-type-figma.html', 'C1', 'Colors / Type / Spacing', '基础'],
      ['theme-switch-figma.html', 'C2', 'Theme 切换实战', '进阶']
    ]],
    ['03 · 界面怎么有状态和动作', [
      ['states-figma.html', 'D0', '视觉态 · 看得见的状态', '入门'],
      ['interactive-figma.html', 'D1', 'Interactive Component', '基础'],
      ['transition-figma.html', 'D2', '动画 · Transition', '进阶']
    ]],
    ['04 · 设计样式怎么翻译成 CSS', [
      ['inverted-radius-figma.html', 'S1', '内翻圆角 · Inverted Border Radius', '样式'],
      ['shadow-layer-figma.html', 'S2', '阴影 / 层级 · Shadow & Elevation', '样式'],
      ['glass-blur-figma.html', 'S3', '毛玻璃 / 背景模糊 · Backdrop Blur', '样式'],
      ['mask-crop-figma.html', 'S4', '遮罩 / 裁切 · Mask & Clip', '样式']
    ]],
    ['05 · AI 怎么参与实现', [
      ['q1-mcp-figma.html', 'Q1', 'MCP · AI 的 USB 接口', '工具'],
      ['q2-skills-figma.html', 'Q2', 'Skills · SKILL.md 拆解', '工具'],
      ['q3-agent-figma.html', 'Q3', 'Agent · 团队式 AI', '工具'],
      ['k4-mcp-reads-figma.html', 'K4', 'MCP 读了啥 · AI 看到的设计稿', '基础']
    ], true],
    ['06 · 用什么材料搭界面', [
      ['k1-ui-library-figma.html', 'K1', 'UI 库 · shadcn vs Antd', '基础'],
      ['k2-shadcn-customize-figma.html', 'K2', 'shadcn 改造 · 变成你家的', '基础'],
      ['k3-granularity-figma.html', 'K3', '颗粒度的代价 · AI 拼不准的根因', '基础']
    ]],
    ['07 · 项目怎么跑起来', [
      ['f1-npm-figma.html', 'F1', 'npm 是什么', '工程'],
      ['f2-import-figma.html', 'F2', 'import 与路径', '工程'],
      ['f3-dev-build-figma.html', 'F3', 'dev vs build', '工程'],
      ['f4-hidden-files-figma.html', 'F4', '看不见的文件', '工程']
    ]],
    ['08 · 坏了怎么查', [
      ['h1-devtools-elements-figma.html', 'H1', 'DevTools Elements', '工程'],
      ['h2-console-error-figma.html', 'H2', 'Console 报错', '工程'],
      ['h3-network-figma.html', 'H3', 'Network 面板', '工程']
    ]],
    ['09 · 怎么协作', [
      ['g1-commit-branch-figma.html', 'G1', 'commit / branch', '工程'],
      ['g2-conflict-figma.html', 'G2', '冲突怎么解', '工程'],
      ['g3-pr-review-figma.html', 'G3', 'PR / Review', '工程']
    ]],
    ['10 · 怎么上线', [
      ['j1-dns-figma.html', 'J1', 'DNS / 域名', '工程'],
      ['j2-vercel-figma.html', 'J2', 'Vercel 部署', '工程'],
      ['j3-cache-cdn-figma.html', 'J3', '缓存 / CDN', '工程']
    ]],
    ['11 · 高阶 · 状态管理 / 组件通信 / 数据来源', [
      ['data-flow-figma.html', 'B1', '信息归属 · 组件之间怎么传话', '高阶'],
      ['data-flow-cases-figma.html', 'B2', '信息归属实战 · 5 个场景', '高阶'],
      ['state-placement-figma.html', 'B3', '状态放在哪里', '高阶'],
      ['component-communication-figma.html', 'B4', '组件怎么通信', '高阶'],
      ['data-source-figma.html', 'B5', '数据从哪里来', '高阶'],
      ['async-states-figma.html', 'B6', '数据没回来时怎么办', '高阶']
    ], true]
  ];

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function cell(item) {
    return '<a href="' + item[0] + '" class="rm-cell"><span class="rm-cell-code">' + esc(item[1]) + '</span><span class="rm-cell-name">' + esc(item[2]) + '</span><span class="rm-cell-tier">' + esc(item[3]) + '</span></a>';
  }

  function ensureRoadmap() {
    if (document.getElementById('rm-modal')) return;
    var modal = document.createElement('div');
    modal.className = 'rm-modal';
    modal.id = 'rm-modal';
    modal.hidden = true;
    modal.innerHTML =
      '<div class="rm-backdrop" data-rm-close></div>' +
      '<div class="rm-dialog" role="dialog" aria-label="完整路线图">' +
      '<button class="rm-close" data-rm-close aria-label="关闭">✕</button>' +
      '<div class="rm-header">' +
      '<div class="rm-tag">阅读顺序 · ROADMAP</div>' +
      '<h3 class="rm-title">START → 11 分类 <span class="rm-em">·</span> 41 篇</h3>' +
      '<p class="rm-sub">01 界面拆解 5 · 02 视觉系统 3 · 03 状态动作 3 · 04 样式翻译 4 · 05 AI 实现 4 · 06 组件材料 3 · 07 项目启动 4 · 08 调试 3 · 09 协作 3 · 10 上线 3 · 11 高阶 6</p>' +
      '</div>' +
      '<div class="rm-body">' +
      modules.map(function (m) {
        return '<div class="rm-mod"><div class="rm-mod-key"' + (m[2] ? ' style="color:var(--accent);"' : '') + '>' + esc(m[0]) + '</div><div class="rm-mod-list">' + m[1].map(cell).join('') + '</div></div>';
      }).join('') +
      '</div></div>';
    document.body.appendChild(modal);
  }

  function initRoadmap() {
    ensureRoadmap();
    var modal = document.getElementById('rm-modal');
    var openBtns = Array.prototype.slice.call(document.querySelectorAll('[data-rm-open]'));
    var closeBtns = Array.prototype.slice.call(modal.querySelectorAll('[data-rm-close]'));
    function open() { modal.hidden = false; document.body.style.overflow = 'hidden'; }
    function close() { modal.hidden = true; document.body.style.overflow = ''; }
    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        open();
      });
    });
    closeBtns.forEach(function (btn) { btn.addEventListener('click', close); });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) close();
    });
  }

  function initExamples() {
    var boards = Array.prototype.slice.call(document.querySelectorAll('[data-example-board]'));
    boards.forEach(function (board) {
      var buttons = Array.prototype.slice.call(board.querySelectorAll('[data-example-target]'));
      var panels = Array.prototype.slice.call(board.querySelectorAll('[data-example-panel]'));
      function activate(id) {
        buttons.forEach(function (btn) { btn.classList.toggle('active', btn.getAttribute('data-example-target') === id); });
        panels.forEach(function (panel) { panel.hidden = panel.getAttribute('data-example-panel') !== id; });
      }
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () { activate(btn.getAttribute('data-example-target')); });
      });
      if (buttons[0]) activate(buttons[0].getAttribute('data-example-target'));
    });
  }

  initRoadmap();
  initExamples();
})();
