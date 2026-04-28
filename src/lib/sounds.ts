const SOUNDS = {
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  WARNING: 'https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3',
  SUCCESS: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  TERMINATED: 'https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3'
};

export const playSound = (type: keyof typeof SOUNDS) => {
  try {
    const audio = new Audio(SOUNDS[type]);
    audio.volume = 0.5;
    audio.play().catch(e => console.warn('Audio playback failed', e));
  } catch (e) {
    console.error('Sound error', e);
  }
};
