import { siteConfig } from '@/lib/config'

export const getProfileName = siteInfo => {
  return siteInfo?.title || siteConfig('AUTHOR')
}

export const getProfileDescription = siteInfo => {
  return siteInfo?.description || siteConfig('DESCRIPTION')
}
