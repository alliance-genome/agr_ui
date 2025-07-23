// subfeatures do not have to have uniqueId
export interface SimpleFeatureSerialized {
  id: string
  parentId?: string
  fmin: number
  fmax: number
  seqId: string
  type: string
  name: string
  children?: SimpleFeatureSerialized[]
  alleles?: string[]
  selected?: string
  strand: number
  source: string
}
