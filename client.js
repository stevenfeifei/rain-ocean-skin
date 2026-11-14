/**
 * Browser half of the rain ocean skin.
 *
 * The looping clip runs in a pointer-transparent iframe behind the
 * application, and the shell surfaces become translucent glass through theme
 * token overrides. A wave button beside Settings at the sidebar foot opens the
 * popover.
 */
window.__ModuleLoader__.load({
  id: '@local/dsh-rain-ocean-skin',
  factory(require) {
    const React = require('react')

    const NS = 'rain-ocean'
    const ROUTE = '/rain-ocean'
    const FRAME_ID = '__rain-ocean-frame__'
    const GLASS_ID = '__rain-ocean-glass__'
    const UI_STYLE_ID = '__rain-ocean-ui__'
    const PANEL_ID = '__rain-ocean-panel__'

    const DEFAULTS = Object.freeze({
      enabled: true,
      glass: 64,
      speed: 100,
    })

    const KEYS = Object.freeze({
      enabled: 'roEnabled',
      glass: 'roGlass',
      speed: 'roSpeed',
    })

    const zh = {
      button: '雨海皮肤设置',
      brand: '雨海',
      speed: '播放速度',
      glass: '玻璃不透明度',
      enabled: '启用雨海皮肤',
      reset: '恢复默认',
      close: '关闭',
      note: '视频循环播放；播放速度与玻璃透明度即时生效并自动保存。',
      hd: '1080p · 24fps',
      off: '已关闭',
      saved: '已保存',
      storageDenied: '未能保存',
    }

    const en = {
      button: 'Rain ocean settings',
      brand: 'Rain ocean',
      speed: 'Playback speed',
      glass: 'Glass opacity',
      enabled: 'Enable rain ocean skin',
      reset: 'Reset to defaults',
      close: 'Close',
      note: 'The clip loops. Playback speed and glass opacity apply immediately and save automatically.',
      hd: '1080p · 24fps',
      off: 'Off',
      saved: 'Saved',
      storageDenied: 'Not saved',
    }

    function clamp(value, min, max, fallback) {
      const number = Number(value)
      return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback
    }

    function glassCss(glass) {
      const a = Math.round(clamp(glass, 55, 92, DEFAULTS.glass)) / 100
      const num = (value) => Math.min(0.98, Math.max(0.30, value)).toFixed(2)
      const plus = (delta) => num(a + delta)

      return `
/* Rain ocean: one translucent shell over the video. Nested fills must not
   compound, so the shell roots get the token and their children go clear. */
body {
  background: transparent !important;
  --dsw-alias-bg-base: rgba(5, 13, 19, ${num(a)}) !important;
  --dsw-alias-bg-layer-1: rgba(8, 17, 24, ${plus(0.02)}) !important;
  --dsw-alias-bg-layer-2: rgba(11, 21, 29, ${plus(0.04)}) !important;
  --dsw-alias-bg-layer-3: rgba(14, 25, 34, ${plus(0.06)}) !important;
  --dsw-alias-bg-module-platform: rgba(9, 18, 26, ${plus(0.03)}) !important;
  --dsw-alias-bg-multi-select: rgba(9, 18, 26, ${plus(0.03)}) !important;
  --dsw-alias-bg-overlay: rgba(7, 14, 21, 0.96) !important;
  --dsw-specific-sidebar-fill: rgba(6, 14, 20, ${num(Math.max(0.36, a - 0.03))}) !important;
  --dsw-specific-selector: rgba(10, 19, 27, ${plus(0.02)}) !important;
}
body:not([data-ds-dark-theme]) {
  --dsw-alias-bg-base: rgba(233, 246, 248, ${num(a + 0.05)}) !important;
  --dsw-alias-bg-layer-1: rgba(239, 249, 250, ${num(a + 0.07)}) !important;
  --dsw-alias-bg-layer-2: rgba(245, 251, 252, ${num(a + 0.09)}) !important;
  --dsw-alias-bg-layer-3: rgba(250, 253, 254, ${num(a + 0.10)}) !important;
  --dsw-alias-bg-module-platform: rgba(237, 248, 250, ${num(a + 0.08)}) !important;
  --dsw-alias-bg-multi-select: rgba(237, 248, 250, ${num(a + 0.08)}) !important;
  --dsw-alias-bg-overlay: rgba(247, 252, 253, 0.98) !important;
  --dsw-specific-sidebar-fill: rgba(228, 243, 245, ${num(Math.max(0.46, a - 0.01))}) !important;
  --dsw-specific-selector: rgba(240, 250, 251, ${num(a + 0.07)}) !important;
}
body:is([data-dsh-desktop-mode="advanced"], [data-dsh-desktop-mode="extended"]) .dshDesktopFrame {
  background: var(--dsw-alias-bg-base) !important;
}
body:is([data-dsh-desktop-mode="advanced"], [data-dsh-desktop-mode="extended"]) .dshDesktopSidebarSurface {
  --dsw-specific-sidebar-fill: transparent !important;
}
body:is([data-dsh-desktop-mode="advanced"], [data-dsh-desktop-mode="extended"]) :is(
  .dshDesktopSidebarSurface,
  .dshDesktopConversationSurface,
  .dshDesktopDetailsSurface,
  .dshDesktopMacCaptionRow,
  .dshDesktopWindowsCaptionRow,
  .dshDesktopConversationSurface > *,
  .dshDesktopConversationSurface [data-phase="hero"],
  .dshDesktopConversationSurface [data-phase="active"],
  .dshDesktopConversationSurface [data-phase="settling"],
  .dshDesktopDetailsSurface > *
) {
  background: transparent !important;
}
html:is([data-platform="darwin"], [data-windows-titlebar]) body #root div:has(> [data-shell-overlay]) {
  background: var(--dsw-alias-bg-base) !important;
}
html:is([data-platform="darwin"], [data-windows-titlebar]) body #root div:has(> [data-shell-overlay]) > :is(:first-child, :nth-child(2), [data-rightbar-col]),
html:is([data-platform="darwin"], [data-windows-titlebar]) body #root div:has(> [data-shell-overlay]) > :nth-child(2) [data-phase],
html:is([data-platform="darwin"], [data-windows-titlebar]) body #root [data-rightbar-col] [data-dockkit-host="dock"] > [data-dockkit-content] {
  background: transparent !important;
}
html[data-windows-titlebar] body #root div:has(> [data-shell-overlay])::before {
  background: transparent !important;
}
body :is([data-shortcut-modal="settings"], [role="dialog"], [role="alertdialog"]):not(#${PANEL_ID}) {
  background: rgba(10, 18, 26, 0.97) !important;
}
body:not([data-ds-dark-theme]) :is([data-shortcut-modal="settings"], [role="dialog"], [role="alertdialog"]):not(#${PANEL_ID}) {
  background: rgba(250, 252, 253, 0.98) !important;
}`
    }

    function uiCss() {
      return `
#${PANEL_ID} {
  position: fixed;
  z-index: 2147483000;
  width: 262px;
  display: none;
  padding: 14px 15px 12px;
  border: 1px solid rgba(143, 233, 228, .22);
  border-radius: 14px;
  background: rgba(7, 16, 22, .92);
  box-shadow: 0 18px 50px rgba(0, 0, 0, .5);
  color: rgba(230, 248, 250, .88);
  font: 12px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  backdrop-filter: blur(14px);
}
#${PANEL_ID}.open { display: block; }
#${PANEL_ID} .oc-head {
  display: flex; align-items: center; justify-content: space-between;
  letter-spacing: .12em; font-size: 10.5px; text-transform: uppercase;
  color: rgba(180, 226, 230, .72);
}
#${PANEL_ID} .oc-head b { color: #8fe9e4; font-weight: 600; letter-spacing: .14em; }
#${PANEL_ID} .oc-close {
  border: 0; background: transparent; color: rgba(230, 248, 250, .55);
  font-size: 18px; line-height: 1; cursor: pointer; padding: 2px 4px; border-radius: 6px;
}
#${PANEL_ID} .oc-close:hover { color: #fff; background: rgba(255, 255, 255, .08); }
#${PANEL_ID} .oc-row { margin-top: 11px; }
#${PANEL_ID} .oc-label { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
#${PANEL_ID} .oc-label label { font-size: 11px; letter-spacing: .05em; color: rgba(220, 242, 244, .8); }
#${PANEL_ID} .oc-value { color: #8fe9e4; font-variant-numeric: tabular-nums; }
#${PANEL_ID} input[type='range'] { width: 100%; margin: 0; accent-color: #8fe9e4; }
#${PANEL_ID} .oc-switch { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
#${PANEL_ID} .oc-switch label { font-size: 11px; letter-spacing: .06em; color: rgba(230, 248, 250, .72); }
#${PANEL_ID} .oc-switch input[type='checkbox'] { width: 15px; height: 15px; margin: 0; accent-color: #8fe9e4; cursor: pointer; }
#${PANEL_ID} .oc-reset {
  width: 100%; margin-top: 12px; padding: 7px 10px; cursor: pointer;
  border-radius: 8px; border: 1px solid rgba(143, 233, 228, .25);
  background: rgba(143, 233, 228, .06); color: rgba(220, 248, 250, .85);
  font: inherit; letter-spacing: .06em;
}
#${PANEL_ID} .oc-reset:hover { background: rgba(143, 233, 228, .12); border-color: rgba(143, 233, 228, .4); }
#${PANEL_ID} .oc-note { margin: 10px 0 0; font-size: 10.5px; line-height: 1.5; color: rgba(200, 226, 230, .5); }
#${PANEL_ID} .oc-foot {
  display: flex; justify-content: space-between; margin-top: 9px; padding-top: 8px;
  border-top: 1px solid rgba(143, 233, 228, .12);
  font-size: 10px; letter-spacing: .06em; color: rgba(160, 210, 214, .55);
}
#${PANEL_ID} .oc-foot .oc-mode { color: rgba(143, 233, 228, .6); }
body:not([data-ds-dark-theme]) #${PANEL_ID} {
  background: rgba(245, 252, 253, .96);
  border-color: rgba(18, 120, 130, .2);
  color: rgba(15, 44, 53, .82);
}
body:not([data-ds-dark-theme]) #${PANEL_ID} :is(.oc-head, .oc-label, .oc-switch label, .oc-note, .oc-foot) { color: rgba(20, 62, 72, .62); }
body:not([data-ds-dark-theme]) #${PANEL_ID} :is(.oc-value, .oc-head b, .oc-foot .oc-mode) { color: #0b7c88; }
#${PANEL_ID} .oc-trigger { display: none; }
`
    }

    function makeController(options) {
      let state = { ...DEFAULTS }
      let frame = null
      let glassEl = null
      let panel = null
      let open = false
      let anchor = null
      let translate = options.translate
      let previousFocus = null
      let savedTimer = 0
      const openListeners = new Set()
      const cleanups = []

      const on = (target, event, listener, settings) => {
        target.addEventListener(event, listener, settings)
        cleanups.push(() => target.removeEventListener(event, listener, settings))
      }

      function readBool(key, fallback) {
        try {
          const value = localStorage.getItem(key)
          return value === null ? fallback : value !== 'false'
        } catch {
          return fallback
        }
      }

      function readNumber(key, fallback, min, max) {
        try {
          const raw = localStorage.getItem(key)
          if (raw === null) return fallback
          return clamp(Number(raw), min, max, fallback)
        } catch {
          return fallback
        }
      }

      function load() {
        state = {
          enabled: readBool(KEYS.enabled, DEFAULTS.enabled),
          glass: readNumber(KEYS.glass, DEFAULTS.glass, 55, 92),
          speed: readNumber(KEYS.speed, DEFAULTS.speed, 50, 150),
        }
      }

      function persist(patch) {
        try {
          for (const [key, value] of Object.entries(patch)) {
            localStorage.setItem(KEYS[key], String(value))
          }
          return true
        } catch {
          return false
        }
      }

      function flashSaved(ok) {
        if (!panel) return
        const note = panel.querySelector('.oc-mode')
        if (!note) return
        note.textContent = ok ? translate('saved') : translate('storageDenied')
        clearTimeout(savedTimer)
        savedTimer = setTimeout(updateFoot, 1100)
      }

      function save(patch) {
        Object.assign(state, patch)
        flashSaved(persist(patch))
      }

      function applyGlass() {
        if (!state.enabled) return
        const style = document.getElementById(GLASS_ID)
        if (style) {
          style.textContent = glassCss(state.glass)
          glassEl = style
          return
        }
        const element = document.createElement('style')
        element.id = GLASS_ID
        element.textContent = glassCss(state.glass)
        ;(document.head || document.documentElement).appendChild(element)
        glassEl = element
      }

      function renderUrl() {
        const url = new URL(options.assetUrl('skin.html'), location.origin)
        url.searchParams.set('parentOrigin', location.origin)
        return url.href
      }

      function post() {
        if (!frame || !frame.contentWindow) return
        let target = '*'
        try {
          target = new URL(frame.src).origin
        } catch {
          /* local test documents may be relative */
        }
        frame.contentWindow.postMessage({
          type: 'oc-set',
          speed: state.speed,
          paused: false,
        }, target)
      }

      function mount() {
        if (!document.body || document.getElementById(FRAME_ID)) return
        const iframe = document.createElement('iframe')
        iframe.id = FRAME_ID
        iframe.src = renderUrl()
        iframe.setAttribute('aria-hidden', 'true')
        iframe.setAttribute('tabindex', '-1')
        iframe.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;z-index:0;pointer-events:none;background:transparent;'
        iframe.addEventListener('load', post)
        document.body.insertBefore(iframe, document.body.firstChild)
        frame = iframe
      }

      function unmountSurface() {
        if (frame) {
          frame.removeEventListener('load', post)
          frame.remove()
          frame = null
        }
        glassEl?.remove()
        glassEl = null
        document.getElementById(GLASS_ID)?.remove()
        document.getElementById(FRAME_ID)?.remove()
      }

      function applyEnabled() {
        if (!state.enabled) {
          unmountSurface()
          return
        }
        if (!frame) mount()
        applyGlass()
        post()
      }

      function onMessage(event) {
        if (!frame || event.source !== frame.contentWindow) return
        if (event.origin !== location.origin) return
        const data = event.data
        if (!data || typeof data !== 'object') return
        if (data.type === 'oc-stat') updateFoot()
      }

      function ensureUiStyles() {
        if (document.getElementById(UI_STYLE_ID)) return
        const style = document.createElement('style')
        style.id = UI_STYLE_ID
        style.textContent = uiCss()
        ;(document.head || document.documentElement).appendChild(style)
      }

      function escapeHtml(text) {
        return String(text).replace(/[&<>"']/g, (character) => ({
          '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        })[character])
      }

      function buildPanel() {
        if (panel) return
        const t = translate
        const element = document.createElement('div')
        element.id = PANEL_ID
        element.setAttribute('role', 'dialog')
        element.setAttribute('aria-modal', 'false')
        element.setAttribute('aria-label', escapeHtml(t('button')))
        element.innerHTML = `
          <div class="oc-head"><span>${escapeHtml(t('brand'))} <b>·</b> RAIN</span><button class="oc-close" type="button" aria-label="${escapeHtml(t('close'))}">×</button></div>
          <div class="oc-row"><div class="oc-label"><label for="${PANEL_ID}-speed">${escapeHtml(t('speed'))}</label><output class="oc-value" id="${PANEL_ID}-speed-out"></output></div><input type="range" id="${PANEL_ID}-speed" min="50" max="150" step="5"></div>
          <div class="oc-row"><div class="oc-label"><label for="${PANEL_ID}-glass">${escapeHtml(t('glass'))}</label><output class="oc-value" id="${PANEL_ID}-glass-out"></output></div><input type="range" id="${PANEL_ID}-glass" min="55" max="92" step="1"></div>
          <div class="oc-row oc-switch"><label for="${PANEL_ID}-enabled">${escapeHtml(t('enabled'))}</label><input type="checkbox" id="${PANEL_ID}-enabled"></div>
          <div class="oc-row"><button class="oc-reset" type="button">${escapeHtml(t('reset'))}</button></div>
          <p class="oc-note">${escapeHtml(t('note'))}</p>
          <div class="oc-foot"><span class="oc-mode"></span><span class="oc-fps"></span></div>`
        document.body.appendChild(element)
        panel = element

        const field = (name) => element.querySelector(`#${PANEL_ID}-${name}`)
        const speed = field('speed')
        const glass = field('glass')
        const enabledBox = field('enabled')

        on(speed, 'input', () => {
          state.speed = clamp(speed.value, 50, 150, DEFAULTS.speed)
          save({ speed: state.speed })
          syncPanel()
          post()
        })
        on(glass, 'input', () => {
          state.glass = clamp(glass.value, 55, 92, DEFAULTS.glass)
          save({ glass: state.glass })
          syncPanel()
          applyGlass()
        })
        on(enabledBox, 'change', () => {
          state.enabled = enabledBox.checked
          save({ enabled: state.enabled })
          applyEnabled()
          syncPanel()
        })
        on(element.querySelector('.oc-reset'), 'click', () => {
          state = { ...DEFAULTS }
          persist({ ...DEFAULTS })
          applyGlass()
          applyEnabled()
          syncPanel()
        })
        on(element.querySelector('.oc-close'), 'click', () => closePanel())
      }

      function syncPanel() {
        if (!panel) return
        const field = (name) => panel.querySelector(`#${PANEL_ID}-${name}`)
        const out = (name) => panel.querySelector(`#${PANEL_ID}-${name}-out`)
        const speed = field('speed')
        const glass = field('glass')
        const enabledBox = field('enabled')
        if (speed) speed.value = String(Math.round(state.speed))
        if (glass) glass.value = String(Math.round(state.glass))
        if (out('speed')) out('speed').textContent = `${Math.round(state.speed)}%`
        if (out('glass')) out('glass').textContent = `${Math.round(state.glass)}%`
        if (enabledBox) enabledBox.checked = state.enabled
        updateFoot()
      }

      function updateFoot() {
        if (!panel) return
        const modeEl = panel.querySelector('.oc-mode')
        const fpsEl = panel.querySelector('.oc-fps')
        if (!modeEl || !fpsEl) return
        if (!state.enabled) {
          modeEl.textContent = translate('off')
          fpsEl.textContent = ''
          return
        }
        modeEl.textContent = translate('hd')
        fpsEl.textContent = ''
      }

      function placePanel(rect) {
        if (!panel) return
        const width = panel.offsetWidth || 262
        const height = panel.offsetHeight || 260
        const left = Math.min(Math.max(12, rect.left), Math.max(12, window.innerWidth - width - 12))
        let top = rect.top - height - 10
        if (top < 12) top = rect.bottom + 10
        if (top + height > window.innerHeight - 12) top = Math.max(12, window.innerHeight - height - 12)
        panel.style.left = `${Math.round(left)}px`
        panel.style.top = `${Math.round(top)}px`
      }

      function openPanel(rect) {
        ensureUiStyles()
        buildPanel()
        syncPanel()
        panel.classList.add('open')
        open = true
        anchor = rect
        placePanel(rect)
        previousFocus = document.activeElement
        const first = panel.querySelector('input')
        if (first) first.focus({ preventScroll: true })
        openListeners.forEach((listener) => listener(true))
      }

      function closePanel() {
        if (!open) return
        open = false
        if (panel) {
          panel.classList.remove('open')
          if (previousFocus instanceof HTMLElement && panel.contains(document.activeElement)) {
            previousFocus.focus({ preventScroll: true })
          }
        }
        openListeners.forEach((listener) => listener(false))
      }

      function toggle(rect) {
        if (open) closePanel()
        else openPanel(rect)
      }

      function onPointerDown(event) {
        if (!open || !panel) return
        const target = event.target
        if (target instanceof Node && panel.contains(target)) return
        if (target instanceof Element && target.closest('.oc-trigger')) return
        closePanel()
      }

      function onKeyDown(event) {
        if (!open || !panel) return
        if (event.key === 'Escape') {
          event.preventDefault()
          closePanel()
        }
      }

      function whenBody() {
        return new Promise((resolve) => {
          if (document.body) {
            resolve()
            return
          }
          document.addEventListener('DOMContentLoaded', resolve, { once: true })
        })
      }

      async function start() {
        await whenBody()
        load()
        ensureUiStyles()
        on(window, 'message', onMessage)
        on(document, 'pointerdown', onPointerDown, true)
        on(document, 'keydown', onKeyDown)
        on(window, 'resize', () => {
          if (open && anchor) placePanel(anchor)
        })
        applyEnabled()
      }

      function stop() {
        closePanel()
        clearTimeout(savedTimer)
        unmountSurface()
        panel?.remove()
        panel = null
        document.getElementById(UI_STYLE_ID)?.remove()
        while (cleanups.length > 0) cleanups.pop()()
        openListeners.clear()
      }

      return {
        start,
        stop,
        toggle,
        isOpen: () => open,
        onOpenChange(listener) {
          openListeners.add(listener)
          return () => openListeners.delete(listener)
        },
        setTranslate(next) {
          translate = next
          if (panel) {
            const wasOpen = open
            const rect = anchor
            panel.remove()
            panel = null
            open = false
            if (wasOpen && rect) openPanel(rect)
          }
        },
        getState: () => ({ ...state }),
      }
    }

    function RainIcon() {
      return React.createElement('svg', {
        width: 16,
        height: 16,
        viewBox: '0 0 16 16',
        fill: 'none',
        'aria-hidden': 'true',
        focusable: 'false',
      },
      React.createElement('circle', {
        cx: 8, cy: 8, r: 6.2,
        stroke: 'currentColor', strokeWidth: 1.25,
      }),
      React.createElement('path', {
        d: 'M5.1 4.6c1.2-1.9 3.3-1.9 4.4-.2 1.2 1.9 2.6 3.3 2.6 4.9a3.8 3.8 0 0 1-7.6.2c0-1.6 1.3-2.8 2.6-2.8',
        stroke: 'currentColor',
        strokeWidth: 1.15,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
      }))
    }

    function makeAction(ctx, controller) {
      function RainOceanAction() {
        const openState = React.useState(controller.isOpen())
        const bump = React.useReducer((value) => value + 1, 0)[1]
        React.useEffect(() => ctx.locale.subscribe(bump), [])
        React.useEffect(() => controller.onOpenChange(openState[1]), [])
        const t = ctx.locale.bind(NS)
        return React.createElement('button', {
          type: 'button',
          className: `oc-trigger${openState[0] ? ' is-open' : ''}`,
          title: t('button'),
          'aria-label': t('button'),
          'aria-haspopup': 'dialog',
          'aria-expanded': openState[0] ? 'true' : 'false',
          onClick: (event) => controller.toggle(event.currentTarget.getBoundingClientRect()),
        }, React.createElement(RainIcon))
      }
      return RainOceanAction
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'rain-ocean: dictionaries')

        const controller = makeController({
          assetUrl: (name) => `${ROUTE}/${name}`,
          translate: ctx.locale.bind(NS),
        })

        ctx.effect(() => {
          controller.start()
          return () => controller.stop()
        }, 'rain-ocean: background surface')

        ctx.effect(
          () => ctx.locale.subscribe(() => controller.setTranslate(ctx.locale.bind(NS))),
          'rain-ocean: locale labels',
        )

        const Action = makeAction(ctx, controller)
        ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
          name: 'sidebar.footer.action',
          id: 'rain-ocean',
          order: 20,
          locale: NS,
          label: () => ctx.locale.bind(NS)('button'),
        }, Action))
      },
    }
  },
})
