type RecordItem = {
    tags: string[]
    notes: string
    type: string
    amount: number
    createdAt?: Date
}

type Tag = {
    id: string
    name: string
}

type TagListModel = {
    data: tag[]
    fetch: () => Tag[]
    create: (name: string) => string // success 表示成功 duplicated 表示 name 名重复
    save: () => void
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
}

interface Window {
    tagList: Tag[]
    createTag: (name: string) => void
    removeTag: (id: string) => boolean
    updateTag: (id: string, name: string) => 'success' | 'not found' | 'duplicated' // 简写 TagListModel['update']
    findTag: (id: string) => Tag | undefined
    recordList: RecordItem[]
    createRecord: (record: RecordItem) => void
}