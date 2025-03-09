<template>
  <div class="app">
    <!-- 加载状态指示器 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <template v-else>
      <!-- 游戏标题和控制区 -->
      <div class="game-header">
        <h1 class="game-title">推箱子</h1>
        <div class="game-controls">
          <button @click="handleUndo" class="control-btn secondary" :disabled="!isGameReady">
            <i class="fas fa-undo"></i> 撤销
          </button>
          <button @click="handleReset" class="control-btn secondary" :disabled="!isGameReady">
            <i class="fas fa-sync"></i> 重置
          </button>
        </div>
      </div>
      
      <!-- 关卡信息 -->
      <div class="level-info">
        <h2>第 {{ currentLevel?.id || '?' }} 关：{{ currentLevel?.name || '加载中' }}</h2>
        <p class="level-description">{{ currentLevel?.description || '' }}</p>
        <div class="level-stats">
          <span class="moves-count">步数: {{ gameEngine.moveCount }}</span>
          <select v-model="selectedLevel" class="level-select">
            <option v-for="level in levels" :key="level.id" :value="level.id">{{ level.id }}关</option>
          </select>
          <button @click="jumpToLevel" class="jump-btn">跳转</button>
        </div>
      </div>
      
      <!-- 游戏提示 -->
      <div class="game-hint">
        <i class="fas fa-info-circle"></i>
        将所有箱子推到指定地点获得胜利
      </div>
      
      <!-- 游戏画布 -->
      <GameCanvas
        v-if="isGameReady"
        :player="gameEngine.player"
        :boxes="gameEngine.boxes"
        :walls="gameEngine.walls"
        :targets="gameEngine.targets"
        @move="handleMove"
        @undo="handleUndo"
        @reset="handleReset"
      />
      
      <!-- 错误提示 -->
      <div v-if="error" class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {{ error }}
        <button @click="retryLevel" class="retry-btn">重试</button>
      </div>
      
      <!-- 关卡完成弹窗 -->
      <Transition name="modal">
        <div v-if="gameEngine.currentState === GAME_CONFIG.STATES.COMPLETED"
             class="level-complete">
          <div class="level-complete-content">
            <h2>恭喜通关！</h2>
            <div class="level-stats">
              <p>完成步数: {{ gameEngine.moveCount }}</p>
            </div>
            <p v-if="hasNextLevel">准备好挑战下一关了吗？</p>
            <p v-else>你已完成所有关卡！</p>
            <div class="level-complete-buttons">
              <button v-if="hasNextLevel"
                      @click="loadNextLevel"
                      class="next-level-btn">
                <i class="fas fa-arrow-right"></i> 下一关
              </button>
              <button @click="handleReset"
                      class="retry-btn">
                <i class="fas fa-redo"></i> 重玩本关
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import GameCanvas from './components/GameCanvas.vue'
import { GameEngine } from './core/GameEngine'
import { GAME_CONFIG } from './core/config'
import { getLevel, getNextLevelId, LEVELS } from './levels'

const gameEngine = ref(new GameEngine())
const currentLevelId = ref(1)
const selectedLevel = ref(1)
const isLoading = ref(true)
const error = ref(null)

// 获取所有关卡列表
const levels = computed(() => LEVELS)

// 检查游戏状态是否准备就绪
const isGameReady = computed(() => {
  const engine = gameEngine.value
  return engine && 
         engine.player && 
         Array.isArray(engine.boxes) && 
         Array.isArray(engine.walls) && 
         Array.isArray(engine.targets)
})

// 获取当前关卡数据
const currentLevel = computed(() => getLevel(currentLevelId.value))

// 检查是否有下一关
const hasNextLevel = computed(() => {
  return getNextLevelId(currentLevelId.value) !== null
})

// 加载关卡
const loadLevel = async (levelId) => {
  console.log('Loading level:', levelId)
  isLoading.value = true
  error.value = null
  
  try {
    const level = getLevel(levelId)
    if (!level) {
      throw new Error(`关卡 ${levelId} 不存在`)
    }

    currentLevelId.value = levelId
    const success = gameEngine.value.initLevel(level.map)
    
    if (!success) {
      throw new Error('关卡初始化失败')
    }
    
    console.log('Level loaded successfully:', {
      levelId,
      gameState: gameEngine.value
    })
  } catch (err) {
    console.error('Error loading level:', err)
    error.value = err.message
  } finally {
    selectedLevel.value = levelId
    isLoading.value = false
  }
}

// 重试当前关卡
const retryLevel = () => {
  loadLevel(currentLevelId.value)
}

// 加载下一关
const loadNextLevel = () => {
  const nextLevelId = getNextLevelId(currentLevelId.value)
  if (nextLevelId) {
    loadLevel(nextLevelId)
  }
}

// 处理移动
const handleMove = (direction) => {
  if (!isGameReady.value) {
    console.warn('Game not ready for movement')
    return
  }
  gameEngine.value.movePlayer(direction)
  
  // 如果完成关卡，延迟显示弹窗
  if (gameEngine.value.currentState === GAME_CONFIG.STATES.COMPLETED) {
    setTimeout(() => {
      // 状态已经在 GameEngine 中设置，这里不需要额外操作
    }, 300)
  }
}

// 处理撤销
const handleUndo = () => {
  if (!isGameReady.value) return
  gameEngine.value.undoMove()
}

// 处理重置
const handleReset = () => {
  if (!isGameReady.value) return
  gameEngine.value.resetLevel()
}

// 监控游戏状态变化
watchEffect(() => {
  const engine = gameEngine.value
  console.log('Game state updated:', {
    isReady: isGameReady.value,
    currentLevel: currentLevel.value,
    gameState: {
      player: engine.player,
      boxCount: engine.boxes.length,
      targetCount: engine.targets.length,
      wallCount: engine.walls.length,
      state: engine.currentState
    }
  })
})

// 跳转到指定关卡
const jumpToLevel = () => {
  if (selectedLevel.value) {
    loadLevel(selectedLevel.value)
  }
}

// 组件挂载时加载第一关
onMounted(() => {
  loadLevel(1)
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f8f9fa;
  color: #343a40;
}

.app {
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.game-header {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.game-title {
  font-size: 2rem;
  color: #343a40;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.game-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.control-btn.secondary {
  background: #6c757d;
  color: white;
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.level-info {
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.level-info h2 {
  font-size: 1.4rem;
  color: #343a40;
  margin-bottom: 10px;
}

.level-description {
  color: #6c757d;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.level-stats {
  font-size: 1rem;
  color: #495057;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.level-select {
  padding: 4px 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
  cursor: pointer;
}

.jump-btn {
  padding: 4px 12px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.jump-btn:hover {
  background-color: #5a6268;
}

.game-hint {
  width: 100%;
  max-width: 600px;
  text-align: center;
  padding: 10px;
  background: #e9ecef;
  border-radius: 8px;
  margin-bottom: 20px;
  color: #495057;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.error-message {
  width: 100%;
  max-width: 600px;
  background: #fff3f3;
  color: #dc3545;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.level-complete {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* 添加弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-enter-to,
.modal-leave-from {
  opacity: 1;
  transform: scale(1);
}

.level-complete-content {
  background: white;
  padding: 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  max-width: 90%;
  width: 400px;
  transform-origin: center;
  animation: modalPop 0.3s ease;
}

@keyframes modalPop {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.level-complete-content h2 {
  color: #28a745;
  margin-bottom: 15px;
  font-size: 1.8rem;
}

.level-complete-content p {
  color: #495057;
  margin-bottom: 20px;
}

.level-complete-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.next-level-btn,
.retry-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.next-level-btn {
  background: #28a745;
  color: white;
}

.retry-btn {
  background: #6c757d;
  color: white;
}

.next-level-btn:active,
.retry-btn:active {
  transform: scale(0.95);
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e9ecef;
  border-top: 4px solid #4169e1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 增强移动端适配 */
@media (max-width: 480px) {
  .app {
    padding: 10px;
  }

  .game-header {
    padding: 0 10px;
  }

  .level-info {
    padding: 10px;
    margin-bottom: 10px;
  }

  .level-info h2 {
    font-size: 1.2rem;
  }

  .game-hint {
    font-size: 0.8rem;
    padding: 8px;
    margin-bottom: 10px;
  }

  .level-complete-content {
    padding: 20px;
    width: 85%;
  }
}
</style>
