import { HANDHELD_WINDOW_WIDTH_BELOW } from '@/constants/dimensions';

import {
  StoreKeys,
  MutationNames,
  GetterNames 
} from '~/store/keys/windowKeys'

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
  [GetterNames.IsHandheldWindowWidth](state) {
    return state[StoreKeys.WindowWidth] < HANDHELD_WINDOW_WIDTH_BELOW
  },
}