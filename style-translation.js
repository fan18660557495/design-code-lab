(function () {
  function escapeCode(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function setActive(group, selector, value, attr) {
    if (!group) return;
    Array.prototype.slice.call(group.querySelectorAll(selector)).forEach(function (el) {
      el.classList.toggle('active', el.getAttribute(attr) === value);
    });
  }

  function initRoadmap() {
    var modal = document.getElementById('rm-modal');
    if (!modal) return;
    var openBtns = Array.prototype.slice.call(document.querySelectorAll('[data-rm-open]'));
    var closeBtns = Array.prototype.slice.call(modal.querySelectorAll('[data-rm-close]'));

    function open() {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.preventDefault();
        open();
      });
    });
    closeBtns.forEach(function (btn) {
      btn.addEventListener('click', close);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !modal.hidden) close();
    });
  }

  function initShadowLab() {
    var card = document.getElementById('shadowCard');
    if (!card) return;

    var stage = document.getElementById('shadowStage');
    var elevation = document.getElementById('shadowElevation');
    var blur = document.getElementById('shadowBlur');
    var opacity = document.getElementById('shadowOpacity');
    var lightSeg = document.getElementById('shadowLightSeg');
    var surfaceSeg = document.getElementById('shadowSurfaceSeg');
    var code = document.getElementById('shadowCode');
    var observe = document.getElementById('shadowObserve');
    var combo = document.getElementById('shadowCombo');
    var note = document.getElementById('shadowNote');
    var levelOut = document.getElementById('shadowElevationOut');
    var blurOut = document.getElementById('shadowBlurOut');
    var opacityOut = document.getElementById('shadowOpacityOut');
    var lightOut = document.getElementById('shadowLightOut');
    var surfaceOut = document.getElementById('shadowSurfaceOut');
    var layerRows = Array.prototype.slice.call(document.querySelectorAll('[data-layer-row]'));

    var state = {
      elevation: 3,
      blur: 28,
      opacity: 18,
      light: 'left',
      surface: 'raised'
    };

    var surfaceBg = {
      flat: '#faf7f0',
      raised: '#fffaf1',
      overlay: '#f6efe3'
    };

    var notes = {
      flat: 'Flat 表面不应该靠重阴影撑层级。通常只保留 1px border 或极轻的 ambient shadow。',
      raised: 'Raised 表面需要一层贴边阴影和一层扩散阴影，让卡片像被抬起来。',
      overlay: 'Overlay 层要比普通卡片更明确，但不要只把黑色透明度拉高；扩大 blur 更自然。'
    };

    function yOffset() {
      return Math.max(1, Math.round(state.blur * 0.42 + state.elevation * 2));
    }

    function shadowValue() {
      if (state.elevation === 0 || state.surface === 'flat') {
        return '0 1px 2px rgba(22,22,29,.08)';
      }
      var alpha = (state.opacity / 100).toFixed(2).replace('0.', '.');
      var ambientAlpha = Math.max(0.06, state.opacity / 180).toFixed(2).replace('0.', '.');
      var y = yOffset();
      var x = state.light === 'left' ? Math.round(y * 0.28) : Math.round(y * -0.28);
      return '0 1px 2px rgba(22,22,29,' + ambientAlpha + '), ' + x + 'px ' + y + 'px ' + state.blur + 'px rgba(22,22,29,' + alpha + ')';
    }

    function render() {
      var shadow = shadowValue();
      var y = state.surface === 'flat' ? 0 : -state.elevation * 2;
      var scale = state.surface === 'overlay' ? 1.03 : 1;
      card.style.setProperty('--demo-shadow', shadow);
      card.style.setProperty('--demo-y', y + 'px');
      card.style.setProperty('--demo-scale', scale);
      card.style.background = surfaceBg[state.surface];
      stage.dataset.light = state.light;

      levelOut.textContent = 'level ' + state.elevation;
      blurOut.textContent = state.blur + 'px';
      opacityOut.textContent = state.opacity + '%';
      lightOut.textContent = state.light;
      surfaceOut.textContent = state.surface;

      layerRows.forEach(function (row) {
        var min = Number(row.getAttribute('data-layer-row'));
        row.classList.toggle('active', state.elevation >= min);
      });

      observe.textContent = state.surface === 'flat'
        ? '当前是 flat 表面：层级主要靠边框和背景差，不靠大阴影。'
        : '当前阴影由 ambient 和 directional 两层组成：一层贴边，一层表达高度。';
      combo.textContent = 'level ' + state.elevation + '，blur ' + state.blur + 'px，opacity ' + state.opacity + '%，光源在 ' + (state.light === 'left' ? '左上' : '右上') + '。';
      note.textContent = notes[state.surface];
      code.innerHTML = escapeCode([
        '.surface {',
        '  background: ' + surfaceBg[state.surface] + ';',
        '  border: 1px solid rgba(22,22,29,.12);',
        '  box-shadow: ' + shadow + ';',
        '  transform: translateY(' + y + 'px);',
        '}',
        '',
        ':root {',
        '  --shadow-' + state.surface + '-' + state.elevation + ': ' + shadow + ';',
        '}'
      ].join('\n'));
    }

    elevation.addEventListener('input', function () {
      state.elevation = Number(elevation.value);
      render();
    });
    blur.addEventListener('input', function () {
      state.blur = Number(blur.value);
      render();
    });
    opacity.addEventListener('input', function () {
      state.opacity = Number(opacity.value);
      render();
    });
    lightSeg.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-light]');
      if (!btn) return;
      state.light = btn.dataset.light;
      setActive(lightSeg, 'button', state.light, 'data-light');
      render();
    });
    surfaceSeg.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-surface]');
      if (!btn) return;
      state.surface = btn.dataset.surface;
      setActive(surfaceSeg, 'button', state.surface, 'data-surface');
      render();
    });

    render();
  }

  function initGlassLab() {
    var card = document.getElementById('glassCard');
    if (!card) return;

    var blur = document.getElementById('glassBlur');
    var alpha = document.getElementById('glassAlpha');
    var sat = document.getElementById('glassSat');
    var borderSeg = document.getElementById('glassBorderSeg');
    var code = document.getElementById('glassCode');
    var observe = document.getElementById('glassObserve');
    var combo = document.getElementById('glassCombo');
    var note = document.getElementById('glassNote');
    var blurOut = document.getElementById('glassBlurOut');
    var alphaOut = document.getElementById('glassAlphaOut');
    var satOut = document.getElementById('glassSatOut');
    var borderOut = document.getElementById('glassBorderOut');
    var metricBlur = document.getElementById('metricBlur');
    var metricAlpha = document.getElementById('metricAlpha');
    var metricSat = document.getElementById('metricSat');

    var state = { blur: 16, alpha: 46, sat: 135, border: 'on' };

    function alphaDecimal() {
      return (state.alpha / 100).toFixed(2).replace('0.', '.');
    }

    function render() {
      var a = alphaDecimal();
      var s = (state.sat / 100).toFixed(2).replace(/\.00$/, '');
      card.style.setProperty('--glass-blur', state.blur + 'px');
      card.style.setProperty('--glass-alpha', a);
      card.style.setProperty('--glass-sat', s);
      card.style.borderColor = state.border === 'on' ? 'rgba(255,255,255,.58)' : 'rgba(255,255,255,0)';

      blurOut.textContent = state.blur + 'px';
      alphaOut.textContent = state.alpha + '%';
      satOut.textContent = state.sat + '%';
      borderOut.textContent = state.border;
      metricBlur.textContent = state.blur + 'px';
      metricAlpha.textContent = state.alpha + '%';
      metricSat.textContent = state.sat + '%';

      observe.textContent = state.alpha < 34
        ? '透明度太低时，字会被背景干扰。毛玻璃不是越透越高级。'
        : '先保证半透明底色，再叠 backdrop-filter；模糊本身不会自动提高可读性。';
      combo.textContent = 'blur ' + state.blur + 'px，背景 alpha ' + state.alpha + '%，saturate ' + state.sat + '%，边缘线 ' + state.border + '。';
      note.textContent = state.border === 'on'
        ? '白色内边线和 inset highlight 能让玻璃边缘从复杂背景里分出来。'
        : '关闭边缘线后，玻璃边界会更软，但在浅色背景上也更容易丢失。';
      code.innerHTML = escapeCode([
        '.glass-panel {',
        '  background: rgba(250, 247, 240, ' + a + ');',
        '  backdrop-filter: blur(' + state.blur + 'px) saturate(' + s + ');',
        '  -webkit-backdrop-filter: blur(' + state.blur + 'px) saturate(' + s + ');',
        '  border: 1px solid ' + (state.border === 'on' ? 'rgba(255,255,255,.58)' : 'transparent') + ';',
        '  box-shadow: 0 18px 48px rgba(22,22,29,.18);',
        '}',
        '',
        '@supports not (backdrop-filter: blur(1px)) {',
        '  .glass-panel { background: rgba(250,247,240,.88); }',
        '}'
      ].join('\n'));
    }

    blur.addEventListener('input', function () {
      state.blur = Number(blur.value);
      render();
    });
    alpha.addEventListener('input', function () {
      state.alpha = Number(alpha.value);
      render();
    });
    sat.addEventListener('input', function () {
      state.sat = Number(sat.value);
      render();
    });
    borderSeg.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-border]');
      if (!btn) return;
      state.border = btn.dataset.border;
      setActive(borderSeg, 'button', state.border, 'data-border');
      render();
    });

    render();
  }

  function initMaskLab() {
    var subject = document.getElementById('maskSubject');
    if (!subject) return;

    var radius = document.getElementById('maskRadius');
    var reveal = document.getElementById('maskReveal');
    var shapeSeg = document.getElementById('maskShapeSeg');
    var fitSeg = document.getElementById('maskFitSeg');
    var code = document.getElementById('maskCode');
    var observe = document.getElementById('maskObserve');
    var combo = document.getElementById('maskCombo');
    var note = document.getElementById('maskNote');
    var radiusOut = document.getElementById('maskRadiusOut');
    var revealOut = document.getElementById('maskRevealOut');
    var shapeOut = document.getElementById('maskShapeOut');
    var fitOut = document.getElementById('maskFitOut');

    var state = { radius: 28, reveal: 62, shape: 'rounded', fit: 'cover' };
    var clipMap = {
      rounded: 'inset(0 round ' + state.radius + 'px)',
      circle: 'circle(42% at 50% 50%)',
      diagonal: 'polygon(0 0, 100% 0, 82% 100%, 0 100%)',
      ticket: 'mask radial notches'
    };

    function codeLines() {
      if (state.shape === 'ticket') {
        return [
          '.ticket-media {',
          '  object-fit: ' + state.fit + ';',
          '  -webkit-mask:',
          '    radial-gradient(circle 28px at 0 50%, transparent 98%, #000 101%),',
          '    radial-gradient(circle 28px at 100% 50%, transparent 98%, #000 101%),',
          '    linear-gradient(#000 0 0);',
          '  -webkit-mask-composite: source-out;',
          '}'
        ];
      }
      var clip = state.shape === 'rounded'
        ? 'inset(0 round ' + state.radius + 'px)'
        : clipMap[state.shape];
      return [
        '.media {',
        '  object-fit: ' + state.fit + ';',
        '  clip-path: ' + clip + ';',
        '}',
        '',
        '.media::after {',
        '  background: linear-gradient(115deg, transparent 0 ' + state.reveal + '%, rgba(250,247,240,.82) ' + state.reveal + '% 100%);',
        '}'
      ];
    }

    function render() {
      subject.dataset.shape = state.shape;
      subject.style.setProperty('--mask-radius', state.radius + 'px');
      subject.style.setProperty('--mask-reveal', state.reveal + '%');
      subject.style.backgroundSize = state.fit === 'contain' ? '72% 72%, 90% 90%, contain' : 'auto, auto, cover';

      radiusOut.textContent = state.radius + 'px';
      revealOut.textContent = state.reveal + '%';
      shapeOut.textContent = state.shape;
      fitOut.textContent = state.fit;
      observe.textContent = state.shape === 'ticket'
        ? '票券缺口用 mask 更直观：它控制的是透明度，不会改变元素本身的盒模型。'
        : 'clip-path 改的是元素可见轮廓；如果只是裁图片比例，先用 object-fit。';
      combo.textContent = 'shape ' + state.shape + '，radius ' + state.radius + 'px，reveal ' + state.reveal + '%，object-fit ' + state.fit + '。';
      note.textContent = state.fit === 'cover'
        ? 'cover 保证容器填满，适合封面图；重要内容要检查是否被裁掉。'
        : 'contain 保证内容完整，但可能留出空白，适合图标、产品图和需要完整展示的素材。';
      code.innerHTML = escapeCode(codeLines().join('\n'));
    }

    radius.addEventListener('input', function () {
      state.radius = Number(radius.value);
      render();
    });
    reveal.addEventListener('input', function () {
      state.reveal = Number(reveal.value);
      render();
    });
    shapeSeg.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-shape]');
      if (!btn) return;
      state.shape = btn.dataset.shape;
      setActive(shapeSeg, 'button', state.shape, 'data-shape');
      render();
    });
    fitSeg.addEventListener('click', function (event) {
      var btn = event.target.closest('button[data-fit]');
      if (!btn) return;
      state.fit = btn.dataset.fit;
      setActive(fitSeg, 'button', state.fit, 'data-fit');
      render();
    });

    render();
  }

  initRoadmap();
  initShadowLab();
  initGlassLab();
  initMaskLab();
})();
