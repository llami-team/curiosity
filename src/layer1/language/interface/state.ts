import { IAlias } from './alias'
import { IEssence } from './essence'
import { ICondition } from './condition'

/**
 * A는 B라는 말은 거짓이다. (상태)
 */
export interface IState {
    alias: IAlias
    targets: IEssence[]
    boolean: boolean
    cond1itions: ICondition[]
}