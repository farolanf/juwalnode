export const contentRange = header => {
  const match = header.match(/(\d+)-(\d+)\/(\d+)$/)
  return {
    from: +match[1],
    to: +match[2],
    count: +match[3],
  }
}
