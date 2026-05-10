#!/usr/bin/env python3
"""
docs/_build.py — 把根目录的某篇 .html 处理成"独立发布版"复制到 docs/。
- 路线图弹窗里只有指定 PUBLISHED 列表的篇可点击，其他锁定
- next-post 卡片改成"更多陆续更新"
- 加锁定样式 CSS

用法:
    python3 docs/_build.py
修改下面 PUBLISHED 列表来控制哪些篇上线。
"""
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS = ROOT / 'docs'

# 当前已发布的 code → 源文件名
PUBLISHED = {
    'A1': 'box-figma.html',
}

LOCKED_CSS = '''
  /* === Locked cells (unpublished articles) === */
  .rm-cell.rm-cell-locked {
    opacity: 0.42;
    pointer-events: none;
    cursor: not-allowed;
    position: relative;
  }
  .rm-cell.rm-cell-locked::after {
    content: '🔒';
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 13px;
    opacity: 0.7;
  }
  .rm-cell.rm-cell-locked .rm-cell-tier {
    border-style: dashed;
    color: var(--ink-mute);
  }

  /* === Coming Soon next-post === */
  .next-post-soon {
    display: block;
    margin-top: 60px;
    padding: 32px 36px;
    background: var(--bg);
    border: 1.5px dashed var(--line);
    border-radius: 12px;
    text-align: center;
    color: var(--ink);
  }
  .next-post-soon .ns-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--accent);
    margin-bottom: 14px;
  }
  .next-post-soon h4 {
    font-family: 'Noto Serif SC', serif;
    font-size: 28px;
    font-weight: 900;
    margin: 0 0 10px;
    color: var(--ink);
    letter-spacing: -0.01em;
  }
  .next-post-soon p {
    font-size: 13.5px;
    color: var(--ink-soft);
    line-height: 1.65;
    margin: 0;
    max-width: 520px;
    margin-left: auto;
    margin-right: auto;
  }
  .next-post-soon .ns-em {
    color: var(--accent);
    font-weight: 700;
  }
'''

NEXT_POST_SOON_HTML = '''<div class="next-post-soon">
      <div class="ns-tag">更多 · COMING SOON</div>
      <h4>下一篇 <span class="ns-em">还在路上</span></h4>
      <p>
        Design × Code Lab 总共 <strong>28 篇</strong>，会陆续公开。<br>
        关注 <strong>范米花儿</strong>，每篇上线第一时间收到新链接。
      </p>
    </div>'''


def process_article(code: str, src_filename: str):
    src = ROOT / src_filename
    dst = DOCS / src_filename
    if not src.exists():
        print(f"  ✗ MISSING: {src_filename}")
        return

    text = src.read_text(encoding='utf-8')

    # 1. 锁定路线图弹窗里非已发布的 rm-cell
    def lock_cell(m):
        full = m.group(0)
        cm = re.search(r'rm-cell-code">([A-Z0-9]+)<', full)
        hm = re.search(r'href="([^"]+)"', full)
        if not cm or not hm:
            return full
        cell_code = cm.group(1)
        if cell_code in PUBLISHED:
            return full  # 已发布的保持原样
        # 锁定
        full = full.replace('class="rm-cell"', 'class="rm-cell rm-cell-locked"', 1)
        full = full.replace(f'href="{hm.group(1)}"', 'href="#"', 1)
        return full

    text = re.sub(
        r'<a[^>]*?class="rm-cell"[^>]*?>.*?</a>',
        lock_cell, text, flags=re.DOTALL
    )

    # 2. 替换 next-post <a> 整块为 next-post-soon 卡片
    next_post_re = re.compile(
        r'<a href="[^"]+"\s+class="next-post"[^>]*>.*?</a>',
        re.DOTALL
    )
    text = next_post_re.sub(NEXT_POST_SOON_HTML, text)

    # 3. 在 </style> 前插入锁定 + soon CSS
    text = text.replace('</style>', LOCKED_CSS + '</style>', 1)

    dst.write_text(text, encoding='utf-8')
    print(f"  ✓ {src_filename} → docs/{src_filename}")
    # 统计
    locked_count = text.count('rm-cell-locked')
    print(f"      锁定 {locked_count} 个未发布篇")


def main():
    DOCS.mkdir(exist_ok=True)
    print(f"Build docs/ — 已发布 {len(PUBLISHED)} 篇")
    for code, fname in PUBLISHED.items():
        process_article(code, fname)
    print("\n完成。push main 后 GitHub Pages 自动部署。")


if __name__ == '__main__':
    main()
