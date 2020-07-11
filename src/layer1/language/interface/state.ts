import { IAlias } from './alias'
import { IEssence } from './essence'
import { ICondition } from './condition'

/**
 * & A는 B라는 말은 거짓이다. (상태)
 * ? 상태는 참/거짓만 가능해야 맞는가...?
 */
export interface IState {
    /**
     * @description
     * * 상태의 본질
     */
    essence: IEssence
    /**
     * @description
     * * 작용받는 본질들
     */
    affected: IEssence[]
    /**
     * @description
     * * 상태의 긍정 또는 부정 여부
     */
    boolean: boolean
    /**
     * @description
     * * 상태가 작용되는 조건들
     */
    cond1itions: ICondition[]
}