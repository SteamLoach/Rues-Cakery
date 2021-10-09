import { HANDHELD_WINDOW_WIDTH_BELOW } from '@/constants/dimensions';

import {
  StoreKeys,
  MutationNames,
  GetterNames,
} from '@/store/keys'

export const state = () => ({

  [StoreKeys.WindowWidth]: null,
  [StoreKeys.WindowHeight]: null,

  [StoreKeys.HandheldNavIsActive]: false,

})

export const mutations = {

  [MutationNames.UpdateWindowWidth](state, payload) {
    state[StoreKeys.WindowWidth] = payload;
  },

  [MutationNames.UpdateWindowHeight](state, payload) {
    state[StoreKeys.WindowHeight] = payload;
  },

  [MutationNames.ToggleHandheldNavIsActive](state) {
    state[StoreKeys.HandheldNavIsActive] = !state[StoreKeys.HandheldNavIsActive]
  }

}

export const getters = {

  [GetterNames.IsHandheldWindowWidth](state) {
    return state[StoreKeys.WindowWidth] < HANDHELD_WINDOW_WIDTH_BELOW
  },

  [GetterNames.HandheldNavIsActive](state) {
    return state[StoreKeys.HandheldNavIsActive]
  }
}