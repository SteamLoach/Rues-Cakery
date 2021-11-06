import {logger} from '@/utils/logger'

export default (app, inject) => {
  inject('logger', logger);
}