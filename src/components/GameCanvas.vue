<template>
  <div class="game-canvas" 
       :style="canvasStyle"
       @touchstart="handleTouchStart"
       @touchmove="handleTouchMove"
       @touchend="handleTouchEnd">
    <!-- 游戏网格 -->
    <div class="game-container">
      <div class="game-grid" :style="gridStyle">
        <!-- 网格线 -->
        <div class="grid-lines">
          <div v-for="i in gridSize.rows" :key="'h-' + i" class="grid-line horizontal"
               :style="{ top: (i - 1) * GAME_CONFIG.TILE_SIZE + 'px' }">
          </div>
          <div v-for="i in gridSize.cols" :key="'v-' + i" class="grid-line vertical"
               :style="{ left: (i - 1) * GAME_CONFIG.TILE_SIZE + 'px' }">
          </div>
        </div>
        
        <!-- 墙壁 -->
        <div v-for="(wall, index) in walls" 
             :key="'wall-' + index"
             class="wall"
             :style="getPositionStyle(wall)">
        </div>
        
        <!-- 目标点 -->
        <div v-for="(target, index) in targets"
             :key="'target-' + index"
             class="target"
             :style="getPositionStyle(target)">
        </div>
        
        <!-- 箱子 -->
        <div v-for="(box, index) in boxes"
             :key="'box-' + index"
             :class="['box', isBoxOnTarget(box) ? 'on-target' : '']"
             :style="getPositionStyle(box)">
          <div class="box-front"></div>
          <div class="box-top"></div>
          <div class="box-side"></div>
        </div>
        
        <!-- 玩家 -->
        <div class="player"
             :style="getPositionStyle(player)">
        </div>
      </div>
    </div>

    <!-- 虚拟方向键 -->
    <div class="direction-buttons">
      <div class="direction-row">
        <button @click="handleDirectionClick('up')" class="direction-btn up">
          <svg viewBox="0 0 24 24" class="direction-icon">
            <path d="M12 4l-8 8h6v8h4v-8h6z" />
          </svg>
        </button>
      </div>
      <div class="direction-row">
        <button @click="handleDirectionClick('left')" class="direction-btn left">
          <svg viewBox="0 0 24 24" class="direction-icon">
            <path d="M4 12l8-8v6h8v4h-8v6z" />
          </svg>
        </button>
        <div class="direction-center"></div>
        <button @click="handleDirectionClick('right')" class="direction-btn right">
          <svg viewBox="0 0 24 24" class="direction-icon">
            <path d="M20 12l-8-8v6h-8v4h8v6z" />
          </svg>
        </button>
      </div>
      <div class="direction-row">
        <button @click="handleDirectionClick('down')" class="direction-btn down">
          <svg viewBox="0 0 24 24" class="direction-icon">
            <path d="M12 20l8-8h-6v-8h-4v8h-6z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { GAME_CONFIG } from '../core/config'

// 定义props
const props = defineProps({
  player: {
    type: Object,
    required: true
  },
  boxes: {
    type: Array,
    required: true
  },
  walls: {
    type: Array,
    required: true
  },
  targets: {
    type: Array,
    required: true
  }
})

// 定义emit
const emit = defineEmits(['move', 'undo', 'reset'])

const touchStart = ref({ x: 0, y: 0 })

// 计算网格大小
const gridSize = computed(() => ({
  rows: Math.max(
    ...props.walls.map(w => w.y + 1),
    ...props.boxes.map(b => b.y + 1)
  ),
  cols: Math.max(
    ...props.walls.map(w => w.x + 1),
    ...props.boxes.map(b => b.x + 1)
  )
}))

// 计算画布样式
const canvasStyle = computed(() => ({
  width: GAME_CONFIG.CANVAS_WIDTH + 'px',
  height: GAME_CONFIG.CANVAS_HEIGHT + 'px'
}))

// 计算网格样式
const gridStyle = computed(() => ({
  width: gridSize.value.cols * GAME_CONFIG.TILE_SIZE + 'px',
  height: gridSize.value.rows * GAME_CONFIG.TILE_SIZE + 'px'
}))

// 获取元素位置样式
const getPositionStyle = (item) => ({
  position: 'absolute',
  left: item.x * GAME_CONFIG.TILE_SIZE + 'px',
  top: item.y * GAME_CONFIG.TILE_SIZE + 'px',
  width: GAME_CONFIG.TILE_SIZE + 'px',
  height: GAME_CONFIG.TILE_SIZE + 'px'
})

// 检查箱子是否在目标点上
const isBoxOnTarget = (box) => {
  return props.targets.some(target => 
    target.x === box.x && target.y === box.y
  )
}

// 处理方向按钮点击
const handleDirectionClick = (direction) => {
  const directionMap = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  }
  emit('move', directionMap[direction])
}

// 处理触摸开始
const handleTouchStart = (event) => {
  const touch = event.touches[0]
  touchStart.value = {
    x: touch.clientX,
    y: touch.clientY
  }
}

// 处理触摸移动
const handleTouchMove = (event) => {
  event.preventDefault()
}

// 处理触摸结束
const handleTouchEnd = (event) => {
  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStart.value.x
  const deltaY = touch.clientY - touchStart.value.y
  
  // 判断滑动方向
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (Math.abs(deltaX) > GAME_CONFIG.SWIPE_THRESHOLD) {
      emit('move', {
        x: deltaX > 0 ? 1 : -1,
        y: 0
      })
    }
  } else {
    if (Math.abs(deltaY) > GAME_CONFIG.SWIPE_THRESHOLD) {
      emit('move', {
        x: 0,
        y: deltaY > 0 ? 1 : -1
      })
    }
  }
}

// 在 setup 函数开始处添加数据验证
const validateProps = () => {
  console.log('Validating GameCanvas props:', props)
  
  if (!props.player || typeof props.player.x !== 'number' || typeof props.player.y !== 'number') {
    console.error('Invalid player prop:', props.player)
    return false
  }

  if (!Array.isArray(props.boxes) || !props.boxes.every(box => 
    typeof box.x === 'number' && typeof box.y === 'number')) {
    console.error('Invalid boxes prop:', props.boxes)
    return false
  }

  if (!Array.isArray(props.walls) || !props.walls.every(wall => 
    typeof wall.x === 'number' && typeof wall.y === 'number')) {
    console.error('Invalid walls prop:', props.walls)
    return false
  }

  if (!Array.isArray(props.targets) || !props.targets.every(target => 
    typeof target.x === 'number' && typeof target.y === 'number')) {
    console.error('Invalid targets prop:', props.targets)
    return false
  }

  return true
}

// 使用 watchEffect 监控属性变化
watchEffect(() => {
  const isValid = validateProps()
  console.log('GameCanvas props validation result:', isValid)
})
</script>

<style scoped>
.game-canvas {
  position: relative;
  margin: 0 auto;
  background: #f8f9fa;
  overflow: hidden;
  touch-action: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.game-container {
  position: relative;
  width: 100%;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
}

.game-grid {
  position: relative;
  transform-origin: center;
  transform: scale(1);
  transition: transform 0.3s ease;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid-line {
  position: absolute;
  background: rgba(0,0,0,0.05);
}

.grid-line.horizontal {
  width: 100%;
  height: 1px;
  border-top: 1px dashed rgba(0,0,0,0.1);
}

.grid-line.vertical {
  height: 100%;
  width: 1px;
  border-left: 1px dashed rgba(0,0,0,0.1);
}

.wall {
  background: #6c757d;
  border-radius: 4px;
  box-shadow: inset -2px -2px 4px rgba(0,0,0,0.2);
  border: 2px solid #495057;
}

.target {
  background: #28a745;
  border-radius: 50%;
  transform: scale(0.4);
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
  animation: pulse 2s infinite;
}

.box {
  position: relative;
  transform-style: preserve-3d;
  transition: all 0.3s ease;
}

.box-front,
.box-top,
.box-side {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #d2691e;
  border: 2px solid #8b4513;
}

.box-front {
  transform: translateZ(5px);
  background: linear-gradient(45deg, #d2691e, #deb887);
  border-radius: 4px;
  background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z' fill='%238b4513' fill-opacity='0.1'/%3E%3C/svg%3E");
}

.box-top {
  transform: rotateX(90deg) translateZ(5px);
  background: linear-gradient(45deg, #deb887, #d2691e);
}

.box-side {
  transform: rotateY(90deg) translateZ(5px);
  background: linear-gradient(45deg, #d2691e, #8b4513);
}

.box.on-target .box-front {
  background: linear-gradient(45deg, #28a745, #34d058);
  border-color: #1e7e34;
  box-shadow: 0 0 10px rgba(40, 167, 69, 0.3);
}

.player {
  background: #4169e1;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.2s ease;
  z-index: 10;
  border: 2px solid #3a5cd0;
  animation: float 2s ease-in-out infinite;
}

.direction-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 40px 0;
  padding-bottom: 20px;
}

.direction-row {
  display: flex;
  gap: 10px;
  align-items: center;
}

.direction-center {
  width: 60px;
  height: 60px;
}

.direction-btn {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #4169e1;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}

.direction-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease-out;
  pointer-events: none;
}

.direction-btn:active {
  transform: scale(0.95);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.direction-btn:active::after {
  transform: translate(-50%, -50%) scale(2);
}

.direction-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
}

@keyframes pulse {
  0% { transform: scale(0.4); }
  50% { transform: scale(0.45); }
  100% { transform: scale(0.4); }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
}

/* 响应式设计 */
@media (max-width: 480px) {
  .game-container {
    height: 40vh;
  }

  .direction-btn {
    width: 50px;
    height: 50px;
  }

  .direction-center {
    width: 50px;
    height: 50px;
  }

  .direction-icon {
    width: 20px;
    height: 20px;
  }
}
</style> 