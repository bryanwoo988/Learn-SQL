/* Release history, newest first (APP-STANDARDS §1).
   Every change that ships adds an entry at the top: version, date, and what
   changed in plain words, in English and Chinese. sw.js's VERSION must equal
   RELEASES[0].v (tools/check-release.mjs checks it). */
window.SQL_RELEASES = [
  { v: '1.1.0', date: '2026-10-18', notes: {
    en: [
      'New Settings page (gear icon, top right): language, appearance, sharing, install and app info in one place.',
      'Choose between System, Light and Dark mode, with four light themes (Classic, Paper, Mint, Lavender) and four dark themes (Midnight, OLED Black, Slate, Grape).',
      'Share the app with a QR code, the system share sheet or a copied link.',
      'The version and update history are shown in Settings, and you are told what changed after each update.',
      'When a new version is available you are asked before it reloads — nothing interrupts you.',
      'Redesigned interface: new icons for navigation, topics and buttons, and a cleaner header.'
    ],
    zh: [
      '新增设置页（右上角齿轮）：语言、外观、分享、安装和应用信息集中在一起。',
      '可选择跟随系统、浅色或深色模式，并提供 4 种浅色主题（经典、纸张、薄荷、薰衣草）和 4 种深色主题（午夜、纯黑 OLED、石板、葡萄）。',
      '可用二维码、系统分享或复制链接分享本应用。',
      '设置页显示版本号和更新记录，每次更新后会告诉你改了什么。',
      '有新版本时会先询问再更新，不会突然重新载入打断你。',
      '界面重新设计：导航、主题和按钮换上新图标，顶栏更简洁。'
    ] } },
  { v: '1.0.1', date: '2026-10-18', notes: {
    en: ['Fixed: the Install button no longer appears where it cannot work; on iPhone it now explains how to add the app to the home screen.'],
    zh: ['修复：安装按钮不再在无法使用的地方出现；在 iPhone 上会说明如何添加到主屏幕。'] } },
  { v: '1.0.0', date: '2026-10-18', notes: {
    en: ['First release: 7 interactive lessons and 50 practice problems following the Top SQL 50 study plan, in English and Chinese, usable offline.'],
    zh: ['第一版：按照「高频 SQL 50 题」学习计划编排的 7 个互动课程和 50 道练习题，中英双语，可离线使用。'] } }
];
