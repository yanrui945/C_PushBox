import { GAME_CONFIG } from './config'

class SoundManager {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    this.sounds = {}
    this.enabled = true
    this.loaded = false
    this.loadRetries = {}
    this.maxRetries = 3
    this.bufferPool = new Map()
    this.initTouchHandler()
  }

  initTouchHandler() {
    const initAudio = async () => {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }
      // 首次交互后预加载所有音频
      if (!this.loaded) {
        this.loadSounds();
      }
      document.removeEventListener('touchstart', initAudio);
    };
    document.addEventListener('touchstart', initAudio, { once: true });
  }

  async loadSounds() {
    try {
      const loadPromises = Object.entries(GAME_CONFIG.SOUNDS).map(([key, path]) => this.loadSound(key, path))
      await Promise.all(loadPromises)
      this.loaded = true
      console.log('All sounds loaded successfully')
    } catch (error) {
      console.error('Error loading sounds:', error)
      this.loaded = false
    }
  }

  async loadSound(key, path, retryCount = 0) {
    try {
      const audio = new Audio(path)
      audio.preload = 'auto'
      
      await new Promise((resolve, reject) => {
        audio.addEventListener('canplaythrough', () => resolve(), { once: true })
        audio.addEventListener('error', (e) => {
          console.error(`Error loading sound ${key} from path ${path}:`, e)
          reject(e)
        }, { once: true })
        
        // 设置超时，避免无限等待
        const timeout = setTimeout(() => {
          console.warn(`Sound ${key} loading timed out`)
          reject(new Error('Loading timed out'))
        }, 5000)
        
        audio.addEventListener('canplaythrough', () => clearTimeout(timeout), { once: true })
        audio.load()
      })

      this.sounds[key] = audio
      console.log(`Sound ${key} loaded successfully from ${path}`)
    } catch (error) {
      console.warn(`Failed to load sound ${key} from ${path}:`, error)
      
      if (retryCount < this.maxRetries) {
        console.log(`Retrying to load sound ${key} (attempt ${retryCount + 1}/${this.maxRetries})`)
        await new Promise(resolve => setTimeout(resolve, 1000))
        return this.loadSound(key, path, retryCount + 1)
      } else {
        console.error(`Failed to load sound ${key} after ${this.maxRetries} attempts, using fallback`)
        this.sounds[key] = this.createFallbackAudio()
      }
    }
  }

  createFallbackAudio() {
    const audio = new Audio()
    audio.volume = 0
    return audio
  }

  async play(soundName) {
    if (!this.enabled || !this.loaded) return;

    try {
      const source = this.audioContext.createBufferSource();
      source.buffer = await this.getBuffer(soundName);
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.warn('AudioBuffer playback failed:', error);
    }
  }

  async getBuffer(soundName) {
    if (!this.bufferPool.has(soundName)) {
      await this.cacheBuffer(soundName);
    }
    return this.bufferPool.get(soundName);
  }

  async cacheBuffer(soundName) {
    const response = await fetch(GAME_CONFIG.SOUNDS[soundName]);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    this.bufferPool.set(soundName, audioBuffer);
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }
}

export const soundManager = new SoundManager()