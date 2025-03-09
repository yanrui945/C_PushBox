import { GAME_CONFIG } from '../core/config'

const { EMPTY, WALL, TARGET, BOX, PLAYER } = GAME_CONFIG.TILE_TYPES

export const LEVELS = [
  // 第1关 - 初次尝试
  {
    id: 1,
    name: "初次尝试",
    description: "推动箱子到目标点，开启你的推箱子之旅",
    map: [
      [WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, TARGET, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第2关 - 转角处
  {
    id: 2,
    name: "转角处",
    description: "学习如何在转角处移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, TARGET, EMPTY, WALL],
      [WALL, EMPTY, WALL, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第3关 - 双箱同心
  {
    id: 3,
    name: "双箱同心",
    description: "首次尝试推动两个箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第4关 - 迷你迷宫
  {
    id: 4,
    name: "迷你迷宫",
    description: "在小型迷宫中推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第5关 - 绕道而行
  {
    id: 5,
    name: "绕道而行",
    description: "寻找正确的路径推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, PLAYER, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第6关 - 双箱分离
  {
    id: 6,
    name: "双箱分离",
    description: "将两个箱子分别推到不同位置",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, TARGET, WALL],
      [WALL, EMPTY, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第7关 - 三箱排队
  {
    id: 7,
    name: "三箱排队",
    description: "将三个箱子依次推到目标位置",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第8关 - 回字路
  {
    id: 8,
    name: "回字路",
    description: "在回形通道中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, WALL, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第9关 - 双向选择
  {
    id: 9,
    name: "双向选择",
    description: "选择正确的方向推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, TARGET, WALL],
      [WALL, EMPTY, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第10关 - 迷宫探险
  {
    id: 10,
    name: "迷宫探险",
    description: "在复杂的迷宫中寻找出路",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, TARGET, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, TARGET, BOX, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第11关 - 四箱归位
  {
    id: 11,
    name: "四箱归位",
    description: "将四个箱子推到指定位置",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, TARGET, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第12关 - 环形通道
  {
    id: 12,
    name: "环形通道",
    description: "在环形通道中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, WALL, EMPTY, WALL, EMPTY, WALL],
      [WALL, BOX, BOX, PLAYER, EMPTY, BOX, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第13关 - 交叉路口
  {
    id: 13,
    name: "交叉路口",
    description: "在交叉路口合理调度箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, WALL, BOX, WALL, EMPTY, WALL],
      [WALL, EMPTY, BOX, PLAYER, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第14关 - 蛇形通道
  {
    id: 14,
    name: "蛇形通道",
    description: "在蜿蜒的通道中运送箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, BOX, TARGET, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第15关 - 双层迷宫
  {
    id: 15,
    name: "双层迷宫",
    description: "在双层空间中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, TARGET, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, WALL, WALL],
      [WALL, BOX, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第16关 - 目标围城
  {
    id: 16,
    name: "目标围城",
    description: "突破重重包围到达目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, WALL, EMPTY, WALL, BOX, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第17关 - 箱阵突围
  {
    id: 17,
    name: "箱阵突围",
    description: "在箱子阵列中寻找突破口",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, TARGET, EMPTY, WALL],
      [WALL, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第18关 - 迷宫探索
  {
    id: 18,
    name: "迷宫探索",
    description: "探索迷宫寻找最佳路线",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, WALL, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, BOX, TARGET, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, WALL, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第19关 - 通道交错
  {
    id: 19,
    name: "通道交错",
    description: "在交错的通道中运送箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, EMPTY, TARGET, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, BOX, WALL, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第20关 - 多重选择
  {
    id: 20,
    name: "多重选择",
    description: "在多个路径中选择最佳方案",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, WALL, TARGET, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, WALL, PLAYER, WALL, BOX, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第21关 - 箱阵布局
  {
    id: 21,
    name: "箱阵布局",
    description: "合理调度箱子阵列",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, PLAYER, TARGET, TARGET, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第22关 - 迷宫穿梭
  {
    id: 22,
    name: "迷宫穿梭",
    description: "在复杂迷宫中穿梭前进",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, BOX, TARGET, BOX, EMPTY, WALL],
      [WALL, EMPTY, BOX, PLAYER, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第23关 - 环形迷局
  {
    id: 23,
    name: "环形迷局",
    description: "在环形空间中调度箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, WALL, WALL, BOX, EMPTY, WALL],
      [WALL, BOX, EMPTY, PLAYER, EMPTY, BOX, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第24关 - 双层通道
  {
    id: 24,
    name: "双层通道",
    description: "在双层空间中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, BOX, WALL, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第25关 - 终极挑战
  {
    id: 25,
    name: "终极挑战",
    description: "结合多种技巧完成挑战",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, EMPTY, TARGET, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, BOX, WALL, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第26关 - 双向迷宫
  {
    id: 26,
    name: "双向迷宫",
    description: "需要在两个方向上同时思考",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, TARGET, PLAYER, TARGET, EMPTY, WALL, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, EMPTY, TARGET, WALL],
      [WALL, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第27关 - 箱子迷阵
  {
    id: 27,
    name: "箱子迷阵",
    description: "在复杂的箱子阵列中找到突破口",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, TARGET, EMPTY, WALL],
      [WALL, EMPTY, WALL, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第28关 - 环形迷宫
  {
    id: 28,
    name: "环形迷宫",
    description: "在环形迷宫中推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, BOX, WALL, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, BOX, EMPTY, BOX, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第29关 - 目标围城
  {
    id: 29,
    name: "目标围城",
    description: "突破重重包围到达目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, BOX, EMPTY, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, TARGET, WALL],
      [WALL, EMPTY, WALL, BOX, BOX, WALL, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第30关 - 交错通道
  {
    id: 30,
    name: "交错通道",
    description: "在交错的通道中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, BOX, WALL, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第31关 - 箱子迷宫
  {
    id: 31,
    name: "箱子迷宫",
    description: "在迷宫中推动多个箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, TARGET, EMPTY, WALL],
      [WALL, WALL, BOX, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, BOX, WALL, WALL],
      [WALL, EMPTY, TARGET, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第32关 - 双层结构
  {
    id: 32,
    name: "双层结构",
    description: "在两层空间中移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, TARGET, WALL, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, BOX, EMPTY, WALL],
      [WALL, BOX, WALL, PLAYER, EMPTY, WALL, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第33关 - 目标迷阵
  {
    id: 33,
    name: "目标迷阵",
    description: "找到通向目标的最佳路径",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, WALL, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, BOX, WALL, EMPTY, WALL],
      [WALL, TARGET, EMPTY, PLAYER, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第34关 - 箱子交换
  {
    id: 34,
    name: "箱子交换",
    description: "通过交换箱子位置达到目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, WALL, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, TARGET, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第35关 - 多重障碍
  {
    id: 35,
    name: "多重障碍",
    description: "克服多个障碍到达目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, EMPTY, WALL, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, WALL, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, TARGET, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第36关 - 路径选择
  {
    id: 36,
    name: "路径选择",
    description: "选择正确的路径推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, TARGET, EMPTY, EMPTY, WALL],
      [WALL, WALL, BOX, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, BOX, TARGET, WALL],
      [WALL, PLAYER, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第37关 - 箱子排列
  {
    id: 37,
    name: "箱子排列",
    description: "将箱子按特定顺序排列",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, TARGET, EMPTY, WALL],
      [WALL, TARGET, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, TARGET, PLAYER, TARGET, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第38关 - 空间利用
  {
    id: 38,
    name: "空间利用",
    description: "合理利用有限的空间",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, WALL, EMPTY, WALL, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, WALL, PLAYER, WALL, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第39关 - 迷宫探索
  {
    id: 39,
    name: "迷宫探索",
    description: "在迷宫中寻找正确路径",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, EMPTY, TARGET, EMPTY, WALL],
      [WALL, WALL, BOX, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, WALL, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第40关 - 箱子阵型
  {
    id: 40,
    name: "箱子阵型",
    description: "将箱子排列成特定阵型",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, EMPTY, EMPTY, WALL],
      [WALL, TARGET, BOX, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, PLAYER, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第41关 - 通道穿梭
  {
    id: 41,
    name: "通道穿梭",
    description: "在多个通道间穿梭移动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, BOX, EMPTY, BOX, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, BOX, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, WALL, TARGET, TARGET, TARGET, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  }
,

  // 第42关 - 十字路口
  {
    id: 42,
    name: "十字路口",
    description: "在十字交叉的通道中合理安排箱子顺序",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, EMPTY, EMPTY, WALL, WALL, EMPTY, EMPTY, WALL],
      [WALL, TARGET, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, WALL, PLAYER, EMPTY, WALL, EMPTY, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, TARGET, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第43关 - 环形通道
  {
    id: 43,
    name: "环形通道",
    description: "在环形通道中推动箱子到达目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, WALL, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第44关 - 双向选择
  {
    id: 44,
    name: "双向选择",
    description: "选择正确的方向推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, TARGET, EMPTY, TARGET, WALL],
      [WALL, EMPTY, EMPTY, WALL, EMPTY, BOX, EMPTY, WALL],
      [WALL, EMPTY, BOX, PLAYER, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第45关 - 迷宫交错
  {
    id: 45,
    name: "迷宫交错",
    description: "在交错的迷宫中找到正确路径",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, TARGET, TARGET, WALL],
      [WALL, WALL, BOX, WALL, BOX, WALL, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, PLAYER, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, WALL, EMPTY, BOX, EMPTY, WALL, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第46关 - 箱子阵列
  {
    id: 46,
    name: "箱子阵列",
    description: "将箱子排列成特定的阵列",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, TARGET, TARGET, TARGET, TARGET, EMPTY, WALL],
      [WALL, EMPTY, BOX, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, BOX, BOX, BOX, BOX, EMPTY, WALL],
      [WALL, EMPTY, WALL, PLAYER, WALL, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第47关 - 多重迷宫
  {
    id: 47,
    name: "多重迷宫",
    description: "穿越多层迷宫到达目标",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, TARGET, TARGET, WALL, TARGET, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, BOX, EMPTY, WALL],
      [WALL, BOX, WALL, PLAYER, EMPTY, WALL, BOX, WALL],
      [WALL, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第48关 - 复杂路径
  {
    id: 48,
    name: "复杂路径",
    description: "在复杂的路径中推动箱子",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, BOX, EMPTY, BOX, BOX, EMPTY, WALL],
      [WALL, TARGET, EMPTY, PLAYER, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, EMPTY, WALL, EMPTY, WALL, EMPTY, EMPTY, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第49关 - 终极挑战
  {
    id: 49,
    name: "终极挑战",
    description: "终极关卡，考验你的全部技巧",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, WALL, EMPTY, TARGET, WALL, TARGET, WALL],
      [WALL, EMPTY, BOX, EMPTY, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, BOX, WALL, PLAYER, EMPTY, BOX, BOX, WALL],
      [WALL, EMPTY, EMPTY, TARGET, EMPTY, EMPTY, EMPTY, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  },

  // 第50关 - 大师级
  {
    id: 50,
    name: "大师级",
    description: "最终关卡，展现你的推箱子大师风范",
    map: [
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL],
      [WALL, TARGET, EMPTY, TARGET, TARGET, EMPTY, TARGET, WALL],
      [WALL, WALL, BOX, EMPTY, EMPTY, BOX, WALL, WALL],
      [WALL, EMPTY, EMPTY, BOX, BOX, EMPTY, EMPTY, WALL],
      [WALL, WALL, BOX, PLAYER, BOX, WALL, EMPTY, WALL],
      [WALL, TARGET, EMPTY, EMPTY, EMPTY, EMPTY, TARGET, WALL],
      [WALL, WALL, WALL, WALL, WALL, WALL, WALL, WALL]
    ]
  }
]

// 获取指定ID的关卡数据
export function getLevel(levelId) {
  return LEVELS.find(level => level.id === levelId)
}

// 获取下一关的ID
export function getNextLevelId(currentLevelId) {
  const nextLevel = LEVELS.find(level => level.id === currentLevelId + 1)
  return nextLevel ? nextLevel.id : null
}