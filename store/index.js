import {logger} from '@/utils/logger'
import { 
  ModuleNames,
  SettingsMutationNames
} from "@/constants/store"

export const state = () => ({

})

export const actions = {
  async nuxtServerInit({commit}, {$config, app}) {
    const log = logger({
      title: "Storyblok"
    })
    try {
      log.group('site-settings loading via nuxtServerInit')
      const reqConfig = {
        version: $config.STORYBLOK_CONTENT_VERSION,      
      }
      log.await(`${reqConfig.version} | cdn/stories/site-settings`);
      const res = await app.$storyapi.get(
        `cdn/stories/site-settings`,
        reqConfig
      )
      log.complete('request complete')
      log.task(`commit data to ${ModuleNames.Settings} module`)
      const siteSettings = res.data
      commit(
        `${ModuleNames.Settings}/${SettingsMutationNames.UpdateSettings}`, 
        siteSettings
      )
    } catch(err) {
      log.error(err)
    } finally {
      log.groupEnd();
    }
  }
}