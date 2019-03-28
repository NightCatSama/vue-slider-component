interface Query {
  [key: string]: string
}

export const getQuery = (): Query => {
  const query: Query = {}
  ;(location.href.split('?')[1] || '')
    .split('&')
    .filter(Boolean)
    .forEach(item => {
      const [key, value] = item.split('=')
      query[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : ''
    })

  return query
}

export const setQuery = (query: Query) => {
  location.href =
    location.href.split('?')[0] +
    '?' +
    Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
}

export const getTheme = (): string => {
  return getQuery().theme || localStorage.getItem('theme') || 'default'
}
