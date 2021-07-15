type RecordItem = {
    tags:string[]
    notes:string
    type:string
    amount:number
    createdAt?:Date
}

type tag = {
    id:string
    name:string
}

type TagListModel = {
    data: tag[]
    fetch: () => tag[]
    create: (name: string) => string // success 表示成功 duplicated 表示 name 名重复
    save: () => void
}