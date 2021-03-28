import { Imagem } from "./imagem";

export interface Item {
    _id?:number
    titulo:string,
    linkResource: string
    imagem:Imagem 
    item:Item[]
    subitem?:boolean
    categoria?:boolean
}
