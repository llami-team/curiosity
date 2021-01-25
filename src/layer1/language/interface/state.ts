import { IAlias } from './alias'
import { IEssence } from './essence'
import { ICondition } from './condition'

/**
 * * A는 B라는 말은 거짓이다. (상태)
 * * Essence[] 는 Essence 라는 것은 Boolean 이다.
 * ? 상태는 참/거짓만 가능해야 맞는가...?
 * ! 상태의 유형을 알고 그 유형 내에 있는
 * ! 아이템이 n개가 적용가능해야 합니다.
 * ! (예를 들어 양자는 참이면서 거짓입니다.)
 * * range
 * * current:
 * ? [날씨 정보입니다.](상태의 본질)
 * ? [내일 80%의 확률로](조건)
 * ? [서울, 경기 지역에](작용받는 본질)
 * ? [눈 또는 비가 올 것으로 보입니다.](item)
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