import { ref, watch } from 'vue'

interface SettingsMap {
  general: GeneralSettings
  privacy: PrivacySettings
  notifications: NotificationsSettings
}

type SettingsKey = keyof SettingsMap

interface GeneralSettings {
  username: string
  email: string
  about: string
  gender: string
  country: string
}

type Visibility = 'public' | 'private'

interface NotificationsSettings {
  email: boolean
  sms: boolean
}

interface PrivacySettings {
  visibility: Visibility
  searchEngineIndexing: boolean
}

const init = <T extends SettingsKey>(key: T, defaults: SettingsMap[T]) => {
  const stored = localStorage.getItem(key)
  return stored !== null ? JSON.parse(stored) : defaults
}

const watcher =
  <T extends SettingsKey>(key: T) =>
  (val: SettingsMap[T]) =>
    localStorage.setItem(key, JSON.stringify(val))

const general = ref(
  init('general', {
    about: '',
    country: 'USA',
    gender: 'male',
    email: '',
    username: ''
  })
)

watch(general, watcher('general'), { deep: true })

const notifications = ref(
  init('notifications', {
    email: false,
    sms: false
  })
)

watch(notifications, watcher('notifications'), { deep: true })

const privacy = ref(
  init('privacy', {
    visibility: 'public',
    searchEngineIndexing: false
  })
)

watch(privacy, watcher('notifications'), { deep: true })

export function useSettings() {
  return { general, notifications, privacy }
}
