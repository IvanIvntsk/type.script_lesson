export interface IPagination<DATA> {
    total_items:number
    total_page:number
    prev:string
    next:string
    items:DATA[]
}