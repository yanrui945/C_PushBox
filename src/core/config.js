export const GAME_CONFIG = {
  // 基础资源路径
  BASE_PATH: import.meta.env.BASE_URL,

  // 游戏画布大小
  CANVAS_WIDTH: 375,  // 适配大多数手机屏幕
  CANVAS_HEIGHT: 667,
  
  // 游戏元素大小
  TILE_SIZE: 40,     // 每个方格的大小
  PLAYER_SIZE: 36,   // 玩家大小
  BOX_SIZE: 36,      // 箱子大小
  
  // 游戏元素类型
  SOUNDS: {
    MOVE: `${import.meta.env.BASE_URL}sounds/move.mp3`,
    PUSH: `${import.meta.env.BASE_URL}sounds/push.mp3`,
    COMPLETE: `${import.meta.env.BASE_URL}sounds/complete.mp3`
  },
  TILE_TYPES: {
    EMPTY: 0,        // 空地
    WALL: 1,         // 墙
    TARGET: 2,       // 目标点
    BOX: 3,         // 箱子
    PLAYER: 4,       // 玩家
    BOX_ON_TARGET: 5 // 箱子在目标点上
  },
  
  // 控制配置
  SWIPE_THRESHOLD: 30,  // 滑动触发阈值（像素）
  
  // 游戏状态
  STATES: {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    COMPLETED: 'completed'
  },
  
  // 本地存储键名
  STORAGE_KEYS: {
    CURRENT_LEVEL: 'pushbox_current_level',
    COMPLETED_LEVELS: 'pushbox_completed_levels',
    GAME_PROGRESS: 'pushbox_game_progress'
  },

  // 音效配置
  // 删除重复的SOUNDS配置块
  // 颜色主题
  COLORS: {
    PRIMARY: '#4169e1',    // 主色调
    SECONDARY: '#ffd700',  // 次要色调
    WALL: '#8b4513',      // 墙壁颜色
    BOX: '#d2691e',       // 箱子颜色
    TARGET: '#32cd32',    // 目标点颜色
    PLAYER: '#4169e1',    // 玩家颜色
    CONTROL: '#6c757d',   // 控制按钮颜色
    SUCCESS: '#28a745',   // 成功色
    ERROR: '#dc3545'      // 错误色
  }
}