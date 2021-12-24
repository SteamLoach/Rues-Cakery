import { Breakpoints } from '~/constants/breakpoints';

import {
  WindowStoreKeys as StoreKeys,
  WindowMutationNames as MutationNames,
  WindowGetterNames as GetterNames
} from '~/constants/store'

export const state = () => ({
  [StoreKeys.WindowWidth]: null,
  [StoreKeys.WindowHeight]: null,
})

export const mutations = {
  [MutationNames.UpdateWindowWidth](state, payload) {
    state[StoreKeys.WindowWidth] = payload;
  },
  [MutationNames.UpdateWindowHeight](state, payload) {
    state[StoreKeys.WindowHeight] = payload;
  },
}

export const getters = {
  [GetterNames.Breakpoints](state) {
    const breakpoints = {}
    Object.keys(Breakpoints).forEach(key => {
      breakpoints[`from${key}`] = (
        Breakpoints[key] <= state[StoreKeys.WindowWidth]
      )
      breakpoints[`below${key}`] = (
        Breakpoints[key] > state[StoreKeys.WindowWidth]
      )
    })
    return breakpoints
  }
}