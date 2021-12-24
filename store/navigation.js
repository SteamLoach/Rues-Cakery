import {
  NavigationStoreKeys as StoreKeys,
  NavigationMutationNames as MutationNames,
  NavigationGetterNames as GetterNames
} from '~/constants/store'

export const state = () => ({
  [StoreKeys.HandheldNavIsActive]: false,
})

export const mutations = {
  [MutationNames.ToggleHandheldNavIsActive](state) {
    state[StoreKeys.HandheldNavIsActive] = !state[StoreKeys.HandheldNavIsActive]
  }
}

export const getters = {
  [GetterNames.HandheldNavIsActive](state) {
    return state[StoreKeys.HandheldNavIsActive]
  }
}