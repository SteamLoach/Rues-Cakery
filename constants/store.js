export const ModuleNames = {
  Navigation: "navigation",
  Settings: "settings",
  Window: "window"

}

/** Navigation **/

export const NavigationStoreKeys = {
  HandheldNavIsActive: "HANDHELD_NAV_IS_ACTIVE",
}

export const NavigationMutationNames = {
  ToggleHandheldNavIsActive: "TOGGLE_HANDHELD_NAV_IS_ACTIVE"
}

export const NavigationGetterNames = {
  HandheldNavIsActive: "HANDHELD_NAV_IS_ACTIVE"
}


/** Settings **/

export const SettingsStoreKeys = {
  LeadtimeInDays: 'LEADTIME_IN_DAYS',
  BlackoutDates: 'BLACKOUT_DATES',
  ServiceDisclaimer: 'SERVICE_DISCLAIMER'
}

export const SettingsMutationNames = {
  UpdateSettings: "UPDATE_SETTINGS"
}

export const SettingsGetterNames = {
  LeadtimeInDays: "LEADTIME_IN_DAYS",
  BlackoutDates: "BLACKOUT_DATES",
  ServiceDisclaimer: "SERVICE_DISCLAIMER"
}


/** Window **/

export const WindowStoreKeys = {
  WindowWidth: "WINDOW_WIDTH",
  WindowHeight: "WINDOW_HEIGHT"
}

export const WindowMutationNames = {
  UpdateWindowDimensions: "UPDATE_WINDOW_DIMENSIONS",
  UpdateWindowWidth: "UPDATE_WINDOW_WIDTH",
  UpdateWindowHeight: "UPDATE_WINDOW_HEIGHT"
}

export const WindowGetterNames = {
  Breakpoints: "BREAKPOINTS"
}