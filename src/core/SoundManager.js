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
        audio.addEventListener('error', (e) => reject(e), { once: true })
        audio.load()
      })

      this.sounds[key] = audio
      console.log(`Sound ${key} loaded successfully`)
    } catch (error) {
      console.warn(`Failed to load sound ${key}:`, error)
      
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
    if (!this.enabled) return
    
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