import { GAME_CONFIG } from './config'

class SoundManager {
  constructor() {
    this.sounds = {}
    this.enabled = true
    this.loaded = false
    this.loadSounds()
  }

  loadSounds() {
    Object.entries(GAME_CONFIG.SOUNDS).forEach(([key, path]) => {
      const audio = new Audio(path)
      audio.preload = 'auto'
      this.sounds[key] = audio
    })
    this.loaded = true
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