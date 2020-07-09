import * as Layer1 from './layer1'

// ! 사과의 본질 생성 시작
// * 사과 본질의 별칭을 색인합니다.
const appleAlias: Layer1.IAlias = {
    id: 0,
    names: [
        '사과',
    ]
}

// * 사과의 본질을 모델화합니다.
const appleEssence: Layer1.IEssence = {
    alias: appleAlias,
    relations: [],
    states: [],
    types: [],
}

// ! 논리 표현 목표대상 -> 사과는 과일이다
// * 과일 본질의 별칭을 색인합니다.
const fruitAlias: Layer1.IAlias = {
    id: 1,
    names: [
        '과일',
    ]
}

// * 과일의 본질을 모델화합니다.
const fruitEssence: Layer1.IEssence = {
    alias: fruitAlias,
    relations: [],
    states: [],
    types: [],
}

// * "사과는 과일이다"
const appleType: Layer1.IType = {
    alias: fruitAlias,
    essence: fruitEssence,
}
appleEssence.types.push(appleType)