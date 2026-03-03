<template>
  <div class="dino-404-container">
    <!-- 顶部提示信息 -->
    <div class="dino-header">
      <h1 class="dino-title">404 - Page Not Found</h1>
      <p class="dino-subtitle">{{ gameStarted ? '按空格跳跃' : '按空格或点击屏幕开始游戏' }}</p>
      <div class="dino-score">
        <span class="score-label">HI</span>
        <span class="score-value">{{ highScore.toString().padStart(5, '0') }}</span>
        <span class="score-current">{{ score.toString().padStart(5, '0') }}</span>
      </div>
    </div>

    <!-- 游戏画布 -->
    <canvas ref="gameCanvas" :class="['dino-canvas', { 'shake': gameOver }]"></canvas>

    <!-- 游戏结束提示 -->
    <div v-if="gameOver" class="dino-game-over">
      <p class="game-over-text">GAME OVER</p>
      <p class="game-over-hint">按空格或点击屏幕重新开始</p>
    </div>

    <!-- 返回首页按钮 -->
    <div class="dino-actions">
      <button @click="goHome" class="dino-home-btn">返回首页</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const gameCanvas = ref(null);

// 游戏状态
const gameStarted = ref(false);
const gameOver = ref(false);
const score = ref(0);
const highScore = ref(0);

// 游戏变量
let ctx = null;
let animationId = null;
let gameSpeed = 4;  // 降低起始速度
let gravity = 0.6;

// 恐龙对象
const dino = {
  x: 50,
  y: 0,
  width: 40,
  height: 44,
  dy: 0,
  jumpPower: -12,
  grounded: false,
  jumping: false
};

// 障碍物数组
let obstacles = [];
let obstacleTimer = 0;
let obstacleInterval = 100;

// 翼龙数组（新增）
let pteros = [];
let pteroTimer = 0;

// 云朵数组（视差背景）
let clouds = [];
let cloudTimer = 0;

// 地面
let groundX = 0;
let groundSpeed = 4;  // 降低起始速度

onMounted(() => {
  if (typeof window === 'undefined') return;

  // 从 localStorage 读取最高分
  const savedHighScore = localStorage.getItem('dino-high-score');
  if (savedHighScore) {
    highScore.value = parseInt(savedHighScore);
  }

  // 初始化 Canvas
  const canvas = gameCanvas.value;
  if (!canvas) return;

  ctx = canvas.getContext('2d');

  // 设置 Canvas 尺寸
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 初始化恐龙位置
  dino.y = canvas.height - 150 - dino.height;

  // 初始化云朵
  initClouds();

  // 绑定事件
  window.addEventListener('keydown', handleKeyDown);
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('touchstart', handleTouch);

  // 启动游戏循环
  gameLoop();
});

onUnmounted(() => {
  if (typeof window === 'undefined') return;

  // 清理事件监听
  window.removeEventListener('resize', resizeCanvas);
  window.removeEventListener('keydown', handleKeyDown);

  if (gameCanvas.value) {
    gameCanvas.value.removeEventListener('click', handleClick);
    gameCanvas.value.removeEventListener('touchstart', handleTouch);
  }

  // 取消动画帧
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
});

// 调整 Canvas 尺寸
function resizeCanvas() {
  const canvas = gameCanvas.value;
  if (!canvas) return;

  const container = canvas.parentElement;
  canvas.width = Math.min(container.clientWidth - 40, 800);
  canvas.height = 300;

  // 重新设置恐龙地面位置
  dino.y = canvas.height - 150 - dino.height;
}

// 初始化云朵
function initClouds() {
  if (!gameCanvas.value) return;

  clouds = [];
  for (let i = 0; i < 3; i++) {
    clouds.push({
      x: Math.random() * gameCanvas.value.width,
      y: 30 + Math.random() * 60,
      speed: 1 + Math.random() * 1.5
    });
  }
}

// 游戏主循环
function gameLoop() {
  if (!ctx || !gameCanvas.value) return;

  // 清空画布
  ctx.clearRect(0, 0, gameCanvas.value.width, gameCanvas.value.height);

  // 绘制云朵（视差背景）
  drawClouds();

  // 绘制地面
  drawGround();

  if (gameStarted.value && !gameOver.value) {
    // 更新游戏逻辑
    updateDino();
    updateObstacles();
    updatePteros();  // 更新翼龙
    updateClouds();
    checkCollision();

    // 更新分数
    score.value++;

    // 逐渐加速：还原谷歌小恐龙的平滑加速曲线，并增加最高限速
    const MAX_SPEED = 12; // 设定最高速度，防止后期物理引擎崩坏
    if (score.value % 100 === 0 && gameSpeed < MAX_SPEED) {
      gameSpeed += 0.08; // 从 0.5 大幅下调至 0.08，实现"温水煮青蛙"式的平稳加速
      groundSpeed += 0.08;
    }
  }

  // 绘制恐龙
  drawDino();

  // 绘制障碍物
  drawObstacles();

  // 绘制翼龙
  drawPteros();

  // 继续循环
  animationId = requestAnimationFrame(gameLoop);
}

// 绘制云朵（视差背景）
function drawClouds() {
  if (!ctx) return;

  ctx.font = '30px Arial';
  clouds.forEach(cloud => {
    ctx.fillText('☁️', cloud.x, cloud.y);
  });
}

// 更新云朵位置
function updateClouds() {
  if (!gameCanvas.value) return;

  clouds.forEach(cloud => {
    cloud.x -= cloud.speed;

    // 云朵移出屏幕后重新生成
    if (cloud.x < -50) {
      cloud.x = gameCanvas.value.width + 50;
      cloud.y = 30 + Math.random() * 60;
      cloud.speed = 1 + Math.random() * 1.5;
    }
  });

  // 随机生成新云朵
  cloudTimer++;
  if (cloudTimer > 200 && clouds.length < 5) {
    clouds.push({
      x: gameCanvas.value.width + 50,
      y: 30 + Math.random() * 60,
      speed: 1 + Math.random() * 1.5
    });
    cloudTimer = 0;
  }
}

// 绘制地面
function drawGround() {
  if (!ctx || !gameCanvas.value) return;

  const canvas = gameCanvas.value;
  const groundY = canvas.height - 150;

  // 获取当前主题颜色（更柔和）
  const isDark = document.documentElement.classList.contains('dark') ||
    document.documentElement.getAttribute('data-theme') === 'dark';
  const lineColor = isDark ? '#64748b' : '#94a3b8';  // 更柔和的颜色

  // 主地面线
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(canvas.width, groundY);
  ctx.stroke();

  // 绘制移动的地面纹理（点状，减少频闪）
  if (gameStarted.value && !gameOver.value) {
    groundX -= groundSpeed;
    if (groundX <= -10) groundX = 0;
  }

  ctx.fillStyle = lineColor;
  // 使用点状纹理代替线条，更护眼
  for (let i = groundX; i < canvas.width; i += 10) {
    ctx.beginPath();
    ctx.arc(i, groundY + 5, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 绘制恐龙（使用 Emoji，镜像翻转面向右侧）
function drawDino() {
  if (!ctx) return;

  // 保存画布状态
  ctx.save();

  // 设置字体（柔和一些，不加粗）
  ctx.font = '40px Arial';

  // 镜像翻转：让恐龙面向右侧
  ctx.translate(dino.x + 20, 0);  // 移动到恐龙中心
  ctx.scale(-1, 1);  // 水平翻转
  ctx.fillText('🦖', -20, dino.y + 36);  // 绘制恐龙

  // 恢复画布状态
  ctx.restore();
}

// 更新恐龙状态
function updateDino() {
  if (!gameCanvas.value) return;

  const canvas = gameCanvas.value;
  const groundY = canvas.height - 150 - dino.height;

  // 应用重力
  dino.dy += gravity;
  dino.y += dino.dy;

  // 地面碰撞检测
  if (dino.y >= groundY) {
    dino.y = groundY;
    dino.dy = 0;
    dino.grounded = true;
    dino.jumping = false;
  } else {
    dino.grounded = false;
  }
}

// 恐龙跳跃
function jump() {
  if (dino.grounded && !dino.jumping) {
    dino.dy = dino.jumpPower;
    dino.jumping = true;
    dino.grounded = false;
  }
}

// 绘制障碍物（使用 Emoji）
function drawObstacles() {
  if (!ctx) return;

  obstacles.forEach(obstacle => {
    // 根据障碍物高度调整仙人掌大小
    const fontSize = obstacle.height > 40 ? 45 : 35;
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText('🌵', obstacle.x, obstacle.y + fontSize - 5);
  });
}

// 更新障碍物
function updateObstacles() {
  if (!gameCanvas.value) return;

  const canvas = gameCanvas.value;

  // 移动障碍物
  obstacles.forEach(obstacle => {
    obstacle.x -= gameSpeed;
  });

  // 移除屏幕外的障碍物
  obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);

  // 生成新障碍物（300分后有30%概率生成翼龙）
  obstacleTimer++;
  if (obstacleTimer > obstacleInterval) {
    const groundY = canvas.height - 150;

    // 300分后有30%概率生成翼龙而不是仙人掌
    if (score.value > 300 && Math.random() < 0.3) {
      // 生成翼龙（不在这里生成，在 updatePteros 中处理）
      pteroTimer = obstacleInterval;  // 触发翼龙生成
    } else {
      // 生成仙人掌
      const height = 35 + Math.random() * 15;
      obstacles.push({
        x: canvas.width,
        y: groundY - height,
        width: 30,
        height: height
      });
    }

    obstacleTimer = 0;
    obstacleInterval = 60 + Math.random() * 80;
  }
}

// 更新翼龙
function updatePteros() {
  if (!gameCanvas.value) return;

  const canvas = gameCanvas.value;
  const groundY = canvas.height - 150;

  // 移动翼龙（速度更快）
  pteros.forEach(ptero => {
    ptero.x -= gameSpeed * 1.1;
  });

  // 移除屏幕外的翼龙
  pteros = pteros.filter(ptero => ptero.x + ptero.width > 0);

  // 生成新翼龙（仅在300分后）
  if (score.value > 300 && pteroTimer >= obstacleInterval) {
    // 两种高度：低空（需要跳）或中空（可以跑过）
    const isLowFlying = Math.random() < 0.6;  // 60%概率低空
    const height = isLowFlying ? 40 : 80;  // 低空或中空

    pteros.push({
      x: canvas.width,
      y: groundY - height,
      width: 35,
      height: 35
    });

    pteroTimer = 0;
  }
}

// 绘制翼龙
function drawPteros() {
  if (!ctx) return;

  const isDark = document.documentElement.classList.contains('dark') ||
    document.documentElement.getAttribute('data-theme') === 'dark';

  pteros.forEach(ptero => {
    // 翼龙使用不同颜色以示区别
    ctx.font = '35px Arial';

    // 保存状态
    ctx.save();

    // 镜像翻转让翼龙面向左侧（飞向恐龙）
    ctx.translate(ptero.x + 17.5, 0);
    ctx.scale(-1, 1);
    ctx.fillText('🦅', -17.5, ptero.y + 30);

    ctx.restore();
  });
}

// AABB 碰撞检测（优化容错空间）
function checkCollision() {
  // 恐龙碰撞箱（进一步缩小，给玩家更多容错空间）
  const dinoBox = {
    x: dino.x + 8,
    y: dino.y + 8,
    width: dino.width - 16,
    height: dino.height - 10
  };

  // 检测仙人掌碰撞
  for (let obstacle of obstacles) {
    const obstacleBox = {
      x: obstacle.x + 5,
      y: obstacle.y + 5,
      width: obstacle.width - 10,
      height: obstacle.height - 5
    };

    if (
      dinoBox.x < obstacleBox.x + obstacleBox.width &&
      dinoBox.x + dinoBox.width > obstacleBox.x &&
      dinoBox.y < obstacleBox.y + obstacleBox.height &&
      dinoBox.y + dinoBox.height > obstacleBox.y
    ) {
      endGame();
      return;
    }
  }

  // 检测翼龙碰撞
  for (let ptero of pteros) {
    const pteroBox = {
      x: ptero.x + 5,
      y: ptero.y + 5,
      width: ptero.width - 10,
      height: ptero.height - 10
    };

    if (
      dinoBox.x < pteroBox.x + pteroBox.width &&
      dinoBox.x + dinoBox.width > pteroBox.x &&
      dinoBox.y < pteroBox.y + pteroBox.height &&
      dinoBox.y + dinoBox.height > pteroBox.y
    ) {
      endGame();
      return;
    }
  }
}

// 游戏结束
function endGame() {
  gameOver.value = true;
  gameStarted.value = false;

  // 更新最高分
  if (score.value > highScore.value) {
    highScore.value = score.value;
    localStorage.setItem('dino-high-score', highScore.value.toString());
  }

  // 震屏效果会通过 CSS 自动触发
}

// 重置游戏
function resetGame() {
  if (!gameCanvas.value) return;

  gameOver.value = false;
  gameStarted.value = true;
  score.value = 0;
  gameSpeed = 4;  // 重置为起始速度
  groundSpeed = 4;  // 重置为起始速度
  obstacles = [];
  obstacleTimer = 0;
  pteros = [];  // 重置翼龙
  pteroTimer = 0;

  // 重置恐龙
  dino.y = gameCanvas.value.height - 150 - dino.height;
  dino.dy = 0;
  dino.grounded = true;
  dino.jumping = false;

  // 重新初始化云朵
  initClouds();
}

// 键盘事件处理
function handleKeyDown(e) {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();

    if (!gameStarted.value || gameOver.value) {
      resetGame();
    } else {
      jump();
    }
  }
}

// 点击事件处理
function handleClick(e) {
  e.preventDefault();

  if (!gameStarted.value || gameOver.value) {
    resetGame();
  } else {
    jump();
  }
}

// 触摸事件处理
function handleTouch(e) {
  e.preventDefault();

  if (!gameStarted.value || gameOver.value) {
    resetGame();
  } else {
    jump();
  }
}

// 返回首页
function goHome() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
.dino-404-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: var(--c-bg, #ffffff);
  transition: background-color 0.3s ease;
}

.dino-header {
  text-align: center;
  margin-bottom: 2rem;
}

.dino-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--c-text, #1e293b);
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.dino-subtitle {
  font-size: 1.1rem;
  color: var(--c-text-light, #64748b);
  margin: 0 0 1.5rem 0;
}

.dino-score {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-family: 'Courier New', monospace;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--c-text, #1e293b);
}

.score-label {
  color: var(--c-text-light, #64748b);
}

.score-value {
  color: var(--c-text-light, #64748b);
}

.score-current {
  color: var(--c-text, #1e293b);
}

.dino-canvas {
  border: 2px solid var(--c-border, #e2e8f0);
  border-radius: 12px;
  background: #fafbfc;
  /* 更柔和的浅灰色背景，护眼 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  /* 减轻阴影 */
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 100%;
}

.dino-canvas:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.10);
  /* 减轻悬停阴影 */
  transform: translateY(-2px);
}

/* 震屏动画 */
@keyframes shake {

  0%,
  100% {
    transform: translateX(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.dino-canvas.shake {
  animation: shake 0.3s ease-in-out;
}

.dino-game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.game-over-text {
  font-size: 2rem;
  font-weight: 800;
  color: #ef4444;
  margin: 0 0 0.5rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.game-over-hint {
  font-size: 1rem;
  color: var(--c-text-light, #64748b);
  margin: 0;
}

.dino-actions {
  margin-top: 2rem;
}

.dino-home-btn {
  padding: 12px 32px;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: #3eaf7c;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(62, 175, 124, 0.3);
}

.dino-home-btn:hover {
  background: #2d8f63;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(62, 175, 124, 0.4);
}

.dino-home-btn:active {
  transform: translateY(0);
}

/* 暗黑模式适配 */
:global(html.dark) .dino-404-container,
:global(html[data-theme='dark']) .dino-404-container {
  background: var(--c-bg, #121828);
}

:global(html.dark) .dino-title,
:global(html[data-theme='dark']) .dino-title {
  color: #f8fafc;
}

:global(html.dark) .dino-canvas,
:global(html[data-theme='dark']) .dino-canvas {
  background: rgba(255, 255, 255, 0.02);
  /* 更柔和的暗色背景 */
  border-color: rgba(255, 255, 255, 0.08);
  /* 更柔和的边框 */
}

:global(html.dark) .score-current,
:global(html[data-theme='dark']) .score-current {
  color: #f8fafc;
}

:global(html.dark) .dino-home-btn,
:global(html[data-theme='dark']) .dino-home-btn {
  background: #4ade80;
}

:global(html.dark) .dino-home-btn:hover,
:global(html[data-theme='dark']) .dino-home-btn:hover {
  background: #22c55e;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .dino-404-container {
    padding: 1rem;
  }

  .dino-title {
    font-size: 1.8rem;
  }

  .dino-subtitle {
    font-size: 0.95rem;
  }

  .dino-score {
    font-size: 1rem;
  }

  .dino-canvas {
    max-width: 100%;
  }

  .game-over-text {
    font-size: 1.5rem;
  }

  .dino-home-btn {
    padding: 10px 24px;
    font-size: 0.9rem;
  }
}
</style>
