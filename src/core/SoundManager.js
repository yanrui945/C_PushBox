import { GAME_CONFIG } from './config'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.audioPool = new Map()
    this.enabled = true
    this.loaded = false
    this.loadRetries = {}
    this.maxRetries = 3
    this.MAX_CONCURRENT_SOUNDS = 5
    this.loadSounds()
  }

  async loadSounds() {
    try {
      const loadPromises = Object.entries(GAME_CONFIG.SOUNDS).map(([key, path]) => this.loadSound(key, path))
      await Promise.all(loadPromises)
      
      // 初始化音效池
      Object.keys(GAME_CONFIG.SOUNDS).forEach(key => {
        this.audioPool.set(key, [])
      })
      
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

  play(soundName) {
    if (!this.enabled || !this.loaded) return

    if (!this.audioPool.has(soundName)) {
      this.audioPool.set(soundName, [])
    }
    const availableSounds = this.audioPool.get(soundName)
    const activeSounds = Array.from(this.audioPool.values()).flat().filter(s => !s.paused)

    if (activeSounds.length >= this.MAX_CONCURRENT_SOUNDS) {
      return
    }

    const sound = availableSounds.pop() || this.sounds[soundName].cloneNode()
    sound.currentTime = 0
    
    sound.addEventListener('ended', () => {
      if (!this.audioPool.has(soundName)) {
        this.audioPool.set(soundName, [])
      }
      this.audioPool.get(soundName).push(sound)
    }, { once: true })

    sound.play().catch(error => {
      console.warn('Sound play failed:', error)
    })
  }

  toggle() {
    this.enabled = !this.enabled
    return this.enabled
  }
}

export const soundManager = new SoundManager()