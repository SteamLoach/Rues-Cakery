/* eslint-disable */

// Logging
export const ENABLE_LOGGER = process.env.NUXT_ENV_ENABLE_LOGGER

// Storyblok content version
export const STORYBLOK_CONTENT_VERSION = process.env.NUXT_ENV_STORKYBLOK_CONTENT_VERSION

export const STORYBLOK_CONTENT_VERSION_IS_DRAFT = STORYBLOK_CONTENT_VERSION === 'draft'