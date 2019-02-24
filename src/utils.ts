export const getTheme = (): string => {
  let theme = ''
  ;(location.href.split('?')[1] || '')
    .split('&')
    .filter(Boolean)
    .forEach(item => {
      if (item.split('=')[0] === 'theme') {
        theme = item.split('=')[1]
      }
    })

  return theme || localStorage.getItem('theme') || 'default'
}
