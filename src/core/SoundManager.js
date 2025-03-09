import { GAME_CONFIG } from './config'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.loaded = false
    this.loadRetries = {}
    this.maxRetries = 3
    this.loadSounds()
  }

  async loadSounds() {
    try {
      const loadPromises = Object.entries(GAME_CONFIG.SOUNDS).map(([key, pathTemplate]) => this.loadSound(key, pathTemplate))
      await Promise.all(loadPromises)
      this.loaded = true
      console.log('All sounds loaded successfully')
    } catch (error) {
      console.error('Error loading sounds:', error)
      this.loaded = false
    }
  }

  async loadSound(key, pathTemplate, retryCount = 0) {
    const formatPriority = ['mp3'];
    const errors = [];
    
    for (const format of formatPriority) {
      const path = pathTemplate.replace('{format}', format);
      
      try {
        console.log(`尝试加载音效: ${key} 格式: ${format} 路径: ${path}`);
        
        // 增强路径验证逻辑
        if (!path || (!path.startsWith('http') && !path.startsWith('/') && !path.startsWith('.'))) {
          throw new Error(`无效的音效路径格式: ${path}`);
        }
        
        
        
        const audio = new Audio(path);
        audio.preload = 'auto';
        
        await new Promise((resolve, reject) => {
          // 添加加载进度监控
          const progressHandler = () => {
            console.log(`音效加载进度: ${key} ${Math.round((audio.buffered.end(0)/audio.duration)*100)}%`);
          };
          
          audio.addEventListener('canplaythrough', resolve, { once: true });
          audio.addEventListener('error', e => reject(e.error), { once: true });
          audio.addEventListener('progress', progressHandler);
          
          const timeout = setTimeout(() => {
            audio.removeEventListener('progress', progressHandler);
            reject(new Error('加载超时'));
          }, 8000);
          
          audio.load();
        });
        
        console.log(`成功加载 ${format} 格式音效: ${key}`);
        this.sounds[key] = audio;
        return;
      } catch (error) {
        errors.push(`格式 ${format}: ${error.message}`);
        continue;
      }
    }
    
    console.error(`[音效加载失败] 名称:${key} 错误详情:\n${errors.join('\n')}`);
    
    if (retryCount < this.maxRetries) {
      console.log(`准备第 ${retryCount + 1} 次重试...`);
      await new Promise(resolve => setTimeout(resolve, 1500 * (retryCount + 1)));
      return this.loadSound(key, pathTemplate, retryCount + 1);
    }
    
    throw new Error(`所有格式加载失败: ${key}\n${errors.join('\n')}`);
  }

  createFallbackAudio() {
    const audio = new Audio()
    audio.volume = 0
    return audio
  }

  play(soundName) {
    if (!this.enabled || !this.loaded) return
    
    const sound = this.sounds[soundName]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(error => {
        console.warn('Sound play failed:', error)
      })
    }
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }
}

export const soundManager = new SoundManager()