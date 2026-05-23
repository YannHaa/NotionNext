const CONFIG = {
  SIMPLE_LOGO_IMG: '/Logo.webp',
  SIMPLE_TOP_BAR: true, // 显示顶栏
  SIMPLE_TOP_BAR_CONTENT: process.env.NEXT_PUBLIC_THEME_SIMPLE_TOP_TIPS || '',
  SIMPLE_LOGO_DESCRIPTION:
    process.env.NEXT_PUBLIC_THEME_SIMPLE_LOGO_DESCRIPTION ||
    '<div>AI 学习者<br/>/技术记录者<br/>/长期主义练习中</div>',
  SIMPLE_HOME_INTRO_TITLE:
    process.env.NEXT_PUBLIC_SIMPLE_HOME_INTRO_TITLE || 'Hi，我是 Yann。',
  SIMPLE_HOME_INTRO_TEXT:
    process.env.NEXT_PUBLIC_SIMPLE_HOME_INTRO_TEXT ||
    '这里会放我对 AI、编程、学习方法和个人成长的记录。先把想法写下来，再慢慢把它们变成可以复用的经验。',
  SIMPLE_HOME_INTRO_TAGS:
    process.env.NEXT_PUBLIC_SIMPLE_HOME_INTRO_TAGS ||
    'AI,编程,学习笔记,项目实践',

  SIMPLE_AUTHOR_LINK: process.env.NEXT_PUBLIC_AUTHOR_LINK || '#',

  SIMPLE_POST_AD_ENABLE: process.env.NEXT_PUBLIC_SIMPLE_POST_AD_ENABLE || false, // 文章列表是否插入广告

  SIMPLE_POST_COVER_ENABLE:
    process.env.NEXT_PUBLIC_SIMPLE_POST_COVER_ENABLE || false, // 是否展示博客封面

  SIMPLE_ARTICLE_RECOMMEND_POSTS:
    process.env.NEXT_PUBLIC_SIMPLE_ARTICLE_RECOMMEND_POSTS || true, // 文章详情底部显示推荐

  // 菜单配置
  SIMPLE_MENU_CATEGORY: true, // 显示分类
  SIMPLE_MENU_TAG: true, // 显示标签
  SIMPLE_MENU_ARCHIVE: true, // 显示归档
  SIMPLE_MENU_SEARCH: true // 显示搜索
}
export default CONFIG
