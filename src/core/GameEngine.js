import { GAME_CONFIG } from './config'
import { soundManager } from './SoundManager'

export class GameEngine {
  constructor() {
    // 初始化默认状态
    this.level = null
    this.player = { x: 0, y: 0 }
    this.boxes = []
    this.targets = []
    this.walls = []
    this.moveHistory = []
    this.currentState = GAME_CONFIG.STATES.MENU
    this.moveCount = 0
    
    console.log('GameEngine initialized:', {
      player: this.player,
      boxes: this.boxes,
      targets: this.targets,
      walls: this.walls,
      state: this.currentState,
      moves: this.moveCount
    })
  }

  // 初始化关卡
  initLevel(levelData) {
    if (!levelData || !Array.isArray(levelData)) {
      console.error('Invalid level data:', levelData)
      return false
    }

    console.log('Initializing level with data:', levelData)
    
    this.level = levelData
    this.moveHistory = []
    this.boxes = []
    this.targets = []
    this.walls = []
    this.moveCount = 0
    
    try {
      // 解析关卡数据
      for (let y = 0; y < levelData.length; y++) {
        for (let x = 0; x < levelData[y].length; x++) {
          const tile = levelData[y][x]
          switch (tile) {
            case GAME_CONFIG.TILE_TYPES.PLAYER:
              this.player = { x, y }
              break
            case GAME_CONFIG.TILE_TYPES.BOX:
              this.boxes.push({ x, y })
              break
            case GAME_CONFIG.TILE_TYPES.TARGET:
              this.targets.push({ x, y })
              break
            case GAME_CONFIG.TILE_TYPES.WALL:
              this.walls.push({ x, y })
              break
          }
        }
      }

      // 验证必要元素是否存在
      if (!this.player || this.boxes.length === 0 || this.targets.length === 0) {
        console.error('Missing required game elements:', {
          hasPlayer: !!this.player,
          boxCount: this.boxes.length,
          targetCount: this.targets.length
        })
        return false
      }

      this.currentState = GAME_CONFIG.STATES.PLAYING
      console.log('Level initialized successfully:', {
        player: this.player,
        boxes: this.boxes,
        targets: this.targets,
        walls: this.walls,
        state: this.currentState,
        moves: this.moveCount
      })
      
      return true
    } catch (error) {
      console.error('Error initializing level:', error)
      return false
    }
  }

  // 移动玩家
  movePlayer(direction) {
    if (!direction || typeof direction.x !== 'number' || typeof direction.y !== 'number') {
      console.error('Invalid movement direction:', direction)
      soundManager.play('ERROR')
      return false
    }

    const newX = this.player.x + direction.x
    const newY = this.player.y + direction.y
    
    // 检查是否可以移动
    if (this.isWall(newX, newY)) {
      console.log('Movement blocked by wall')
      soundManager.play('ERROR')
      return false
    }
    
    const box = this.getBoxAt(newX, newY)
    if (box) {
      const newBoxX = newX + direction.x
      const newBoxY = newY + direction.y
      
      if (!this.canMoveBox(box, newBoxX, newBoxY)) {
        console.log('Cannot move box to new position')
        soundManager.play('ERROR')
        return false
      }
      
      // 记录移动历史
      this.moveHistory.push({
        player: { ...this.player },
        boxes: this.boxes.map(b => ({ ...b })),
        moveCount: this.moveCount
      })
      
      // 移动箱子
      box.x = newBoxX
      box.y = newBoxY
      soundManager.play('PUSH')
    } else {
      // 记录移动历史
      this.moveHistory.push({
        player: { ...this.player },
        boxes: this.boxes.map(b => ({ ...b })),
        moveCount: this.moveCount
      })
      soundManager.play('MOVE')
    }
    
    // 移动玩家
    this.player.x = newX
    this.player.y = newY
    this.moveCount++
    
    console.log('Player moved:', {
      newPosition: { x: newX, y: newY },
      boxesMoved: box ? 1 : 0,
      totalMoves: this.moveCount
    })
    
    // 检查是否完成
    if (this.checkCompletion()) {
      soundManager.play('COMPLETE')
    }
    
    return true
  }

  // 撤销移动
  undoMove() {
    if (this.moveHistory.length === 0) return false
    
    const lastMove = this.moveHistory.pop()
    this.player = { ...lastMove.player }
    this.boxes = lastMove.boxes.map(b => ({ ...b }))
    this.moveCount = lastMove.moveCount
    
    soundManager.play('UNDO')
    return true
  }

  // 检查箱子是否可以移动
  canMoveBox(box, newX, newY) {
    if (this.isWall(newX, newY)) return false
    if (this.getBoxAt(newX, newY)) return false
    return true
  }

  // 获取指定位置的箱子
  getBoxAt(x, y) {
    return this.boxes.find(box => box.x === x && box.y === y)
  }

  // 检查是否是墙
  isWall(x, y) {
    return this.walls.some(wall => wall.x === x && wall.y === y)
  }

  // 检查是否完成
  checkCompletion() {
    const allBoxesOnTarget = this.targets.every(target => 
      this.boxes.some(box => box.x === target.x && box.y === target.y)
    )
    
    if (allBoxesOnTarget) {
      this.currentState = GAME_CONFIG.STATES.COMPLETED
      return true
    }
    
    return false
  }

  // 重置当前关卡
  resetLevel() {
    if (this.level) {
      this.initLevel(this.level)
      soundManager.play('UNDO')
    }
  }
} 