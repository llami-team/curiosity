import * as Layer1 from '../../layer1'

// * 식별 번호를 관리합니다.
let testIds = 0

// ! 사과의 본질 생성 시작
// * 사과 본질의 별칭을 색인합니다.
const appleAlias: Layer1.IAlias = {
    id: testIds++,
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
    id: testIds++,
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
    original: fruitEssence,
    derived: appleEssence,
}
appleEssence.types.push(appleType)


// ! 논리 표현 목표대상 - 사과는 맛있다
// * 맛의 본질의 별칭을 색인합니다.
const tastyAlias: Layer1.IAlias = {
    id: testIds++,
    names: [
        '맛'
    ],
}

// ! 논리 표현 목표 대상 -> 사과는 맛있다.
// ! -> "맛있는 것 목록에 사과를 정의"

// ? -> 이러면 남에게 맛있는 것과 나에게
// ?    맛있는 것의 차이가 무엇인지 알 수 없다.

// TODO -> 따라서 "사과는 나에게 맛있는 상태이다."
// TODO -> 라는 논리가 함축된 표현으로 모델링 해야합니다.

// * 나에 대한 별칭을 색인합니다.
const myAlias: Layer1.IAlias = {
    id: testIds++,
    names: [
        '나',
    ],
}

// * 나의 본질을 모델화합니다.
const myEssence: Layer1.IEssence = {
    alias: myAlias,
    relations: [],
    states: [],
    types: [],
}

// * 사과는 (나에게) 맛있는 상태이다.
const tastyState: Layer1.IState = {
    alias: tastyAlias,
    boolean: true,
    cond1itions: [],
    targets: [appleEssence],
}
myEssence.states.push(tastyState)

// ? 나중엔 resolver 에서 동일 상태가 입력 안되게 검증이 필요합니다.

// ! 논리 표현 목표 대상 -> 사과는 빨갛다.
// * 색상에 대한 개념을 모델링 합니다.

// * 색상에 대한 별칭을 색인합니다.
const colorAlias: Layer1.IAlias = {
    id: testIds++,
    names: [
        '색상',
    ]
}

// ? 색상의 순서가 여러 조건에 따라 정의되는 방법?
// ? 예: 일반적 색상순인 빨주노초파남보 부터,
// ? 예: 검갈빨주노초파보회흰으로 시작되는 저항값
// ? Enum 같은 개념의 인덱싱이 필요합니다.

// * 색상의 본질을 모델화합니다.
const colorEssence: Layer1.IEssence = {
    alias: colorAlias,
    relations: [],
    states: [],
    types: [],
}


// ? Alias 를 통해서 원하는 Type 이나 무언가를 가져오는 resolver 필요,
// ? Alias 가 맞는지를 확인하기 위해서 간단한 검증도 필요할 것으로 보입니다.

// * 붉은 색상에 대한 별칭을 색인합니다.
const colorRedAlias: Layer1.IAlias = {
    id: testIds++,
    names: [
        '빨강',
        '빨간',
        '붉은',
    ]
}
// * 붉은색의 본질을 모델화합니다.
const colorRedEssence: Layer1.IEssence = {
    alias: colorRedAlias,
    relations: [],
    states: [],
    types: [],
}

// * 색상을 타입화합니다.
const colorType: Layer1.IType = {
    original: colorEssence,
    derived: colorRedEssence,
}
colorRedEssence.types.push(colorType)


// ? types 가 현재는 자식 essence 에만 남지만
// ? 부모 essence 에도 역참조 ref가 남아야할 것으로 보입니다.


// ! 사과는 빨갛다.
// ! 사과의 (색상은) 빨갛다.
// * A는 B다 와 같이
// * 사과는 빨갛다 로 표현된다면
// * 사과의 색상은 빨갛다 로 자동 명시되어야맞는가?

// * 사과는 빨갛다.
const redColorType: Layer1.IType = {
    alias: colorRedAlias,
    essence: colorRedEssence,
}
appleEssence.types.push(redColorType)
// ? 각 types 를 참조하고 있는 객체들에 대한 역 인덱싱도 필요할 것으로 보입니다.
// ? 어떤 내부의 빠른 처리를 위한 별도 인덱스를 구현해야합니다.


/**
 * TODO 사과의 겉은 빨갛지만 속은 다른 색상이고,
 * TODO 초록색인 풋사과도 있고 시간에 따라 변하기도 합니다.
 * TODO 이러한 것들도 모델링으로 표현할 수 있어야 합니다.
 */

// ? 사과라는 이름의 별칭이 너무 많아졌을때
// ? 가장 많이 참조된 별칭을 참조하는 로직 ??
// ? ( 또한 type 이나 relation 에 기반한
// ?   유추를 통해 가장 알맞는 별칭을 찾아내는 로직 )