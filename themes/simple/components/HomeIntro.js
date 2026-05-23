import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const profileLinks = [
  {
    href: '/about',
    icon: 'fa-regular fa-address-card',
    title: '关于我',
    description: '经历、兴趣、技能和联系方式'
  },
  {
    href: '/projects',
    icon: 'fa-solid fa-code-branch',
    title: '项目',
    description: '整理我做过和正在做的东西'
  },
  {
    href: '/#posts-wrapper',
    icon: 'fa-regular fa-pen-to-square',
    title: '博客',
    description: '文章、笔记和阶段性想法'
  }
]

export default function HomeIntro() {
  const tags = String(siteConfig('SIMPLE_HOME_INTRO_TAGS', '', CONFIG))
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)

  return (
    <section className='simple-home-intro md:mr-8 mb-10 px-5 py-6 border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-hexo-black-gray'>
      <div className='flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6'>
        <div className='max-w-3xl'>
          <p className='text-sm text-gray-500 dark:text-gray-400 mb-3'>
            Personal Homepage
          </p>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3'>
            {siteConfig('SIMPLE_HOME_INTRO_TITLE', '', CONFIG)}
          </h1>
          <p className='leading-8 text-gray-700 dark:text-gray-300'>
            {siteConfig('SIMPLE_HOME_INTRO_TEXT', '', CONFIG)}
          </p>
        </div>

        {tags.length > 0 && (
          <div className='flex flex-wrap gap-2 lg:justify-end'>
            {tags.map(tag => (
              <span
                key={tag}
                className='px-3 py-1 text-xs border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white dark:bg-black'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className='grid md:grid-cols-3 gap-3 mt-6'>
        {profileLinks.map(link => (
          <SmartLink
            key={link.href}
            href={link.href}
            className='simple-home-link group border border-gray-100 dark:border-gray-800 bg-white dark:bg-black px-4 py-4 no-underline transition-all duration-200 hover:border-red-300 dark:hover:border-red-500'
          >
            <div className='flex items-start gap-3'>
              <span className='mt-0.5 text-blue-600 dark:text-blue-300 group-hover:text-red-400 transition-colors duration-200'>
                <i className={link.icon} />
              </span>
              <span>
                <span className='block font-medium text-gray-900 dark:text-white mb-1'>
                  {link.title}
                </span>
                <span className='block text-sm leading-6 text-gray-500 dark:text-gray-400'>
                  {link.description}
                </span>
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </section>
  )
}
