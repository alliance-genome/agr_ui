export async function fetchApolloAPIData({
  region,
  baseUrl,
  genome,
  track,
  extra = '.json?ignoreCache=true&flatten=false',
}: {
  region: { chromosome: string; start: number; end: number }
  genome: string
  baseUrl: string
  track: string
  extra?: string
}) {
  const externalLocationString = `${region.chromosome}:${region.start}..${region.end}`
  const url = `${baseUrl}/${encodeURI(genome)}/${encodeURI(track)}/${encodeURIComponent(externalLocationString)}${extra}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`)
  }
  return response.json()
}
