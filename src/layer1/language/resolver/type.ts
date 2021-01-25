import { LevelUp } from 'levelup'
import { IType } from '../interface'

// ! A는 B이다. (유형)
// ! Essence는 Alias이다. (유형)
// ! 별도의 함수를 통해서 Essence 에 입력시키고,
// ! 빠르게 유형관계를 확인 가능한 인덱스를 생성합니다.

export interface ICreateType {
    db: LevelUp
    type: IType
}

export const createType = async (option: ICreateType) => {
    try {
        // * 유형 DB 에 에센스 목록을 만듭니다.
        const derivedEssenceAlias = option.type.derived.alias.id
        
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

export const readType = async () => {
    //
}

// ? 특정 유형인 모든 Essence 얻어오는 함수가 필요한가?
// ? 아님 유형은 Query 과정으로 충분한가?

// ? A는 B다   
// ? 참조된 부모 계층에 대한 ref?

// ? Essence 는 Essence 이다.
// ? Parent Essence

export const updateType = async () => {
    //
}

export const deleteType = async () => {
    //
}