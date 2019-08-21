import { IState } from './state'
import { IType } from './type'
import { IRelation } from './relation'

export interface ICondition {
    logic: IState | IType | IRelation
    boolean: boolean
}