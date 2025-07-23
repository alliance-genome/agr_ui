import { SimpleFeatureSerialized } from './services/types'

/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/prefer-nullish-coalescing */
const jb2ToJb1 = { refName: 'seq_id' }

const jb1ToJb2 = { seq_id: 'refName' }

/**
 * wrapper to adapt nclist features to act like jbrowse 2 features
 */
export default class NCListFeature {
  private parentHandle?: NCListFeature

  private uniqueId: string

  constructor(
    private ncFeature: any,
    parent?: NCListFeature,
    id?: string,
  ) {
    this.uniqueId = id || ncFeature.id()
    this.parentHandle = parent
  }

  jb2TagToJb1Tag(tag: string): string {
    // @ts-expect-error
    const mapped = jb2ToJb1[tag] || tag
    return mapped.toLowerCase()
  }

  jb1TagToJb2Tag(tag: string): string {
    const t = tag.toLowerCase()
    // @ts-expect-error
    const mapped = jb1ToJb2[t] || t
    return mapped
  }

  get(attrName: string): any {
    const attr = this.ncFeature.get(this.jb2TagToJb1Tag(attrName))
    if (attr && attrName === 'subfeatures') {
      return attr.map((subfeature: any) => new NCListFeature(subfeature, this))
    }
    return attr
  }

  /**
   * Get an array listing which data keys are present in this feature.
   */
  tags(): string[] {
    return this.ncFeature.tags().map((t: string) => this.jb1TagToJb2Tag(t))
  }

  /**
   * Get the unique ID of this feature.
   */
  id(): string {
    return this.uniqueId
  }

  /**
   * Get this feature's parent feature, or undefined if none.
   */
  parent() {
    return this.parentHandle
  }

  /**
   * Get an array of child features, or undefined if none.
   */
  children() {
    return this.get('subfeatures')
  }

  toJSON(): SimpleFeatureSerialized {
    const data = { uniqueId: this.id(), subfeatures: [] } as Record<
      string,
      unknown
    >
    this.ncFeature.tags().forEach((tag: string) => {
      const mappedTag = this.jb1TagToJb2Tag(tag)
      const value = this.ncFeature.get(tag)
      if (mappedTag === 'subfeatures') {
        data.children = (value || []).map((f: any) =>
          new NCListFeature(f, this).toJSON(),
        )
      } else {
        data[mappedTag] = value
      }
    })
    return {
      ...data,
      fmin: data.start,
      fmax: data.end,
      seqId: data.refName,
    } as SimpleFeatureSerialized
  }
}
