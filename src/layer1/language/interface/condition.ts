import { IState } from './state'
import { IType } from './type'
import { IRelation } from './relation'

export interface ICondition {
    logics: Array<IState | IType | IRelation>
    boolean: boolean
}