import { logger } from '@/utils/logger'
import { ModuleNames, WindowMutationNames } from '~/constants/store';

const log = logger({
  title: "Plugin",
  time: false,
})

/** **/

const commitPath = `${ModuleNames.Window}/${WindowMutationNames.UpdateWindowDimensions}`

export default ({store}, inject) => {
  const setDimensions = () => {
    store.commit(commitPath, {
      width: window.innerWidth,
      height: window.innerHeight
    })
  }
  log.group('screenSize')
  setDimensions()
  log.task('set event listener')
  window.addEventListener('resize', setDimensions)
  
  log.groupEnd()
}