import {
  StoreKeys,
  GetterNames
} from '@/store/keys/settingsKeys'

export const state = () => ({
  [StoreKeys.LeadtimeInDays]: 7,
  [StoreKeys.BlackoutDates]: [{
    start: '2021-12-18 00:00',
    end: '2021-12-31 00:00',
  }]
})

export const getters = {
  [GetterNames.LeadtimeInDays](state) {
    return state[StoreKeys.LeadtimeInDays]
  },
  [GetterNames.BlackoutDates](state) {
    return state[StoreKeys.BlackoutDates]
  }
}