# 儿童互动答题小游戏音效 Demo

这是一个可直接在手机浏览器运行的纯前端 Demo，用来展示儿童教学动画风格的「音画同步」与「交互反馈音效」。项目不需要后端，也不依赖外部音频文件。

## 功能亮点

- **完整流程**：开始页、答题页、正确反馈、错误反馈、结束页。
- **固定题目**：`1 + 1 等于几？`，正确答案是 `2`。
- **Web Audio API 生成音效**：
  - 点击按钮：轻快点击音。
  - 页面切换：上扬转场音。
  - 答对反馈：奖励铃铛 / 星星感音效，并同步星星动画。
  - 答错反馈：短促、柔和、不刺耳的提示音。
- **儿童教学动画风格**：明亮渐变背景、云朵、星星、圆角卡片和可爱图标。
- **手机端适配**：使用响应式尺寸、触控友好的按钮、安全区适配和 `100svh`。

## 如何预览

### 在线预览（推荐）

本仓库已包含 GitHub Pages 自动部署工作流：`.github/workflows/deploy-pages.yml`。把当前分支推送到 GitHub，并在仓库设置里把 Pages 来源切到 **GitHub Actions** 后，之后每次推送 `work` 分支都会自动发布这个纯静态网页。

发布完成后的手机 Safari 访问地址格式是：

```text
https://<你的 GitHub 用户名或组织名>.github.io/<仓库名>/
```

例如仓库地址如果是 `https://github.com/octocat/game-audio-demo`，最终网址就是：

```text
https://octocat.github.io/game-audio-demo/
```

### 如果需要手动开启 GitHub Pages

1. 打开 GitHub 仓库页面。
2. 点击仓库顶部的 **Settings**。
3. 在左侧菜单点击 **Pages**。
4. 在 **Build and deployment** 区域，把 **Source** 选择为 **GitHub Actions**。
5. 回到仓库顶部的 **Actions** 标签页。
6. 点击 **Deploy static demo to GitHub Pages** 工作流。
7. 如果工作流没有自动运行，点击 **Run workflow**，选择 `work` 分支后点击绿色的 **Run workflow**。
8. 等待运行状态变成绿色对勾后，进入该次运行详情，打开 **deploy** 作业里的 `github-pages` 地址；也可以直接访问上面的 `https://<用户名或组织名>.github.io/<仓库名>/`。

### 备用：直接打开文件

也可以用浏览器直接打开仓库里的 `index.html` 文件预览；不过手机 Safari 最推荐使用 GitHub Pages 的 HTTPS 地址。

## 文件结构

```text
.
├── index.html   # 页面结构与五个游戏状态页面
├── styles.css   # 儿童动画风格、响应式布局与反馈动画
├── script.js    # Web Audio API 音效与页面交互逻辑
└── README.md    # 预览说明与音效替换指南
```

## 如何替换成自己的 MP3 音效

当前 Demo 的音效在 `script.js` 中通过 Web Audio API 实时合成，不需要任何音频素材。如果之后要替换为自己的 MP3，可以按下面步骤操作。

### 1. 新建音频目录

在项目根目录创建：

```text
assets/audio/
```

放入你的 MP3 文件，例如：

```text
assets/audio/click.mp3
assets/audio/transition.mp3
assets/audio/success.mp3
assets/audio/wrong.mp3
```

### 2. 在 HTML 中预加载音频

可以在 `index.html` 的 `</body>` 前、`script.js` 前加入：

```html
<audio id="sound-click" src="assets/audio/click.mp3" preload="auto"></audio>
<audio id="sound-transition" src="assets/audio/transition.mp3" preload="auto"></audio>
<audio id="sound-success" src="assets/audio/success.mp3" preload="auto"></audio>
<audio id="sound-wrong" src="assets/audio/wrong.mp3" preload="auto"></audio>
```

### 3. 替换播放函数

把 `script.js` 中的 `playClick`、`playTransition`、`playSuccess`、`playWrong` 改成播放对应 `<audio>` 元素，例如：

```js
function playMp3(id) {
  const audio = document.querySelector(id);
  audio.currentTime = 0;
  audio.play();
}

function playClick() {
  playMp3("#sound-click");
}

function playTransition() {
  playMp3("#sound-transition");
}

function playSuccess() {
  playMp3("#sound-success");
}

function playWrong() {
  playMp3("#sound-wrong");
}
```

> 提示：手机浏览器通常要求音频必须由用户点击等手势触发后才能播放。当前 Demo 的声音都由按钮点击触发，符合这个限制。
<!-- pages rebuild -->
