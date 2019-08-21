import { IAlias } from './alias'
import { IState } from './state'

export interface IEssence {
    alias: IAlias

    /**
     * @description
     * A는 B라는 말은 거짓이다. (상태)
     */
    states: IState[]
    /**
     * @description
     * A는 B이다. (유형)
     */
    types: []
    /**
     * @description
     * A는 B와 가족이다. (관계)
     */
    relations: []
}