import { IAlias } from './alias'
import { IEssence } from './essence'


// * A는 B이다. (유형)
// * Essence 는 Essence 이다. (유형)
// * Original 는 Derived 이다. (유형)
// ! 사과는 과일이다.
export interface IType {
    /**
     * @description
     * * 본래의 본질
     */
    original: IEssence
    /**
     * * 파생된 본질
     */
    derived: IEssence
}