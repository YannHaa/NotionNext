import Collapse from '@/components/Collapse'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'

const defaultProfileMenu = [
  {
    icon: 'fa-solid fa-house',
    name: '首页',
    href: '/',
    aliases: ['home', '首页'],
    alternateHrefs: ['/'],
    target: '_self',
    show: true
  },
  {
    icon: 'fa-regular fa-address-card',
    name: '关于',
    href: '/about',
    aliases: ['about', '关于'],
    alternateHrefs: ['/about'],
    target: '_self',
    show: true
  },
  {
    icon: 'fa-solid fa-code-branch',
    name: '项目',
    href: '/projects',
    aliases: ['project', 'projects', '项目', '作品'],
    alternateHrefs: ['/projects'],
    target: '_self',
    show: true
  },
  {
    icon: 'fa-regular fa-pen-to-square',
    name: '博客',
    href: '/#posts-wrapper',
    aliases: ['blog', '博客', '文章'],
    alternateHrefs: ['/blog', '/#posts-wrapper'],
    target: '_self',
    show: true
  }
]

const normalizeProfileLink = link => {
  const name = String(link?.name || link?.title || '').toLowerCase()
  const href =
    String(link?.href || '')
      .replace(/\/$/, '')
      .toLowerCase() || '/'

  if (['blog', '博客', '文章'].includes(name) || href === '/blog') {
    return {
      ...link,
      href: '/#posts-wrapper'
    }
  }

  return link
}

const mergeProfileMenu = links => {
  const normalizedLinks = Array.isArray(links)
    ? links.map(normalizeProfileLink)
    : []
  const linkKeys = new Set(
    normalizedLinks
      .map(link => link?.href)
      .filter(Boolean)
      .map(href => String(href).replace(/\/$/, '').toLowerCase() || '/')
  )
  const linkNames = new Set(
    normalizedLinks
      .map(link => link?.name || link?.title)
      .filter(Boolean)
      .map(name => name.toLowerCase())
  )

  const missingDefaultLinks = defaultProfileMenu.filter(link => {
    const hrefMatched = link.alternateHrefs.some(href =>
      linkKeys.has(String(href).replace(/\/$/, '').toLowerCase() || '/')
    )
    const nameMatched = link.aliases.some(alias =>
      linkNames.has(alias.toLowerCase())
    )
    return !hrefMatched && !nameMatched
  })

  return [...missingDefaultLinks, ...normalizedLinks]
}

/**
 * 菜单导航
 * @param {*} props
 * @returns
 */
export const MenuList = ({ customNav, customMenu }) => {
  const { locale } = useGlobal()
  const [isOpen, changeIsOpen] = useState(false)
  const toggleIsOpen = () => {
    changeIsOpen(!isOpen)
  }
  const closeMenu = e => {
    changeIsOpen(false)
  }
  const router = useRouter()
  const collapseRef = useRef(null)

  useEffect(() => {
    router.events.on('routeChangeStart', closeMenu)
  })

  let links = [
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('SIMPLE_MENU_SEARCH', null, CONFIG)
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('SIMPLE_MENU_ARCHIVE', null, CONFIG)
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('SIMPLE_MENU_CATEGORY', null, CONFIG)
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('SIMPLE_MENU_TAG', null, CONFIG)
    }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  links = mergeProfileMenu(links)

  if (!links || links.length === 0) {
    return null
  }

  return (
    <>
      {/* 大屏模式菜单 */}
      <div id='nav-menu-pc' className='hidden md:flex my-auto'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} />
        ))}
      </div>
      {/* 移动端小屏菜单 */}
      <div
        id='nav-menu-mobile'
        className='flex md:hidden my-auto justify-start'
      >
        <div
          onClick={toggleIsOpen}
          className='cursor-pointer hover:text-red-400 transition-all duration-200'
        >
          <i
            className={`${isOpen && 'rotate-90'} transition-all duration-200 fa fa-bars mr-3`}
          />
          <span>{!isOpen ? 'MENU' : 'CLOSE'}</span>
        </div>

        <Collapse
          collapseRef={collapseRef}
          className='absolute w-full top-12 left-0'
          isOpen={isOpen}
        >
          <div
            id='menu-wrap'
            className='bg-white dark:border-hexo-black-gray border'
          >
            {links?.map((link, index) => (
              <MenuItemCollapse
                key={index}
                link={link}
                onHeightChange={param =>
                  collapseRef.current?.updateCollapseHeight(param)
                }
              />
            ))}
          </div>
        </Collapse>
      </div>
    </>
  )
}
