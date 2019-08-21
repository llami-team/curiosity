import { IAlias } from './alias'
import { IEssence } from './essence'

// A는 B와 가족이다. (관계)
// Essence 는 Essence 와 가족이다.
export interface IRelation {
    alias: IAlias
    essences: IEssence[]
}