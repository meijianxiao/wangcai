const localStorageKeyName = 'recordList'
// @ts-ignore
const recordListModel = {
    clone(data: RecordItem[] | RecordItem) :string{
        return JSON.parse(JSON.stringify(data))
    },
    fetch() {
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
    },
    save(data: RecordItem[]){
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(data))
    }
}


// @ts-ignore
export default recordListModel