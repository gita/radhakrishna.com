const siteMetadata = {
  title: 'Radha Krishna | All About the Eternal Couple Radhe Krishna',
  author: 'Radha Krishna',
  headerTitle: 'Radha Krishna',
  description:
    'Dedicated to the eternal couple Shri Radha Krishna! Radha Krishna stories, bhajans, wallpapers, prayers, aarti, audio, video, photos.',
  language: 'en-us',
  siteUrl: 'https://radhakrishna.com',
  siteRepo: 'https://github.com/gita/radhakrishna.net',
  siteLogo: '/static/images/krishna.png',
  image: '/static/images/radhakrishna.jpg',
  socialBanner: '/static/images/twitter-card.jpg',
  email: 'contact@bhagavadgita.io',
  github: 'https://github.com/gita',
  twitter: 'https://twitter.com/ShriKrishna',
  facebook: 'https://facebook.com/iiradhakrishnaii',
  linkedin: 'https://www.linkedin.com/company/bhagavadgita',
  locale: 'en-US',
  analytics: {
    plausible: true,
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo
    // Please add your .env file and modify it according to your selection
    provider: '',
  },
  comment: {
    // Select a provider and use the environment variables associated to it
    // https://vercel.com/docs/environment-variables
    provider: 'disqus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
      mapping: 'pathname', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      // Send discussion metadata periodically to the parent window: 1 = enable / 0 = disable
      metadata: '0',
      // theme example: light, dark, dark_dimmed, dark_high_contrast
      // transparent_dark, preferred_color_scheme, custom
      theme: 'light',
      // theme when dark mode
      darkTheme: 'transparent_dark',
      // If the theme option above is set to 'custom`
      // please provide a link below to your custom theme css file.
      // example: https://giscus.app/themes/custom_example.css
      themeURL: '',
    },
    utterancesConfig: {
      // Visit the link below, and follow the steps in the 'configuration' section
      // https://utteranc.es/
      repo: process.env.NEXT_PUBLIC_UTTERANCES_REPO,
      issueTerm: '', // supported options: pathname, url, title
      label: '', // label (optional): Comment 💬
      // theme example: github-light, github-dark, preferred-color-scheme
      // github-dark-orange, icy-dark, dark-blue, photon-dark, boxy-light
      theme: '',
      // theme when dark mode
      darkTheme: '',
    },
    disqusConfig: {
      // https://help.disqus.com/en/articles/1717111-what-s-a-shortname
      shortname: 'radha-krishna',
    },
  },
}

module.exports = siteMetadata
