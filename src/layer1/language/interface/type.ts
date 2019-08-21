import { IAlias } from './alias'
import { IEssence } from './essence'

// A는 B이다. (유형)
// Essence는 Alias이다. (유형)
export interface IType {
    alias: IAlias
    essence: IEssence
}