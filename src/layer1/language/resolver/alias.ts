import { LevelUp } from 'levelup'
import { IAlias } from '../interface'

export const _DB_ALIAS_ID_NUMBER_ID = '_id_counts'

export interface ICreateAliasOption {
    db: LevelUp
    names: string[]
}
export interface IReadAliasById {
    db: LevelUp
    id: number
}
export interface IReadAliasByNames {
    db: LevelUp
    aliasNames: string[]
}
export interface IUpdateAlias {
    db: LevelUp
    alias: IAlias
}

/**
 * @description
 * 별칭을 최초 기록합니다.
 * 
 * @returns 별칭의 색인번호가 반환됩니다.
 */
export const createAlias = async (option: ICreateAliasOption) => {
    try {
        const aliasId = await _generateNewAliasId(option.db)
        const alias: IAlias = {
            id: aliasId,
            names: option.names,
        }
        await option.db.put(`${aliasId}`, JSON.stringify(alias))
        return aliasId
    } catch (e) {
        console.log(e)
        return undefined
    }
}


/**
 * @description
 * 별칭을 이용해서 별칭의 색인번호를 읽어옵니다.
 * 
 * @param option
 */
export const readAliasById = async (option: IReadAliasById) => {
    try {
        const _alias = await option.db.get(`${option.id}`)
        if (!_alias) throw new Error()

        const alias: IAlias = JSON.parse(_alias)
        if (!alias) throw new Error()

        return alias
    } catch (e) {
        console.log(e)
        return undefined
    }
}

/**
 * @description
 * 별칭의 색인번호를 이용해서 별칭정보를 읽어옵니다.
 * 
 * @param option 
 * @returns 별칭을 반환합니다.
 */
export const readAliasByNames = async (option: IReadAliasByNames) => {
    return new Promise<IAlias | undefined>((resolve, reject) => {
        let isFounded = false
        const stream = option.db.createReadStream({
            keys: true,
            values: true,
        }).on('data', ({ key, value }) => {
            if (Number.isNaN(Number(key))) return
            if (isFounded) return

            let alias: IAlias
            try {
                alias = JSON.parse(value)
            } catch (e) {
                return
            }
            if (!alias) return
            for (const aliasName of option.aliasNames)
                if (alias.names.indexOf(aliasName) == -1) return
            isFounded = true
            resolve(alias)
            stream.removeAllListeners()

        }).on('error', (error) => {
            reject(error)
        }).on('close', () => {
            reject()
        }).on('end', () => {
            if (!isFounded) resolve()
        })
    })
}

/**
 * @description
 * 조건에 일치하는 모든 별칭들을 찾습니다.
 * 
 * @param option 
 * @returns 일치하는 모든 별칭들이 반환됩니다.
 */
export const readAllMatchAliasById = async (option: IReadAliasByNames) => {
    return new Promise<IAlias[]>((resolve, reject) => {
        let allMatchAlias: IAlias[] = []
        option.db.createReadStream({
            keys: true,
            values: true,
        }).on('data', ({ key, value }) => {
            if (Number.isNaN(Number(key))) return

            let alias: IAlias
            try {
                alias = JSON.parse(value)
            } catch (e) {
                return
            }
            if (!alias) return
            for (const aliasName of option.aliasNames)
                if (alias.names.indexOf(aliasName) == -1) return
            allMatchAlias.push(alias)
        }).on('error', (error) => {
            reject(error)
        }).on('close', () => {
            reject()
        }).on('end', () => {
            resolve(allMatchAlias)
        })
    })
}

export const updateAlias = async (option: IUpdateAlias) => {
    try {
        await option.db.put(`${option.alias.id}`, JSON.stringify(option.alias))
        return true
    } catch (e) {
        return false
    }
}
/**
 * @description
 * 별칭의 색인번호를 새로 발급합니다.
 * 
 * @returns 사용가능한 고유한 색인번호가 반환됩니다.
 */
export const _generateNewAliasId = async (db: LevelUp) => {
    const _beforeId = await db.get(_DB_ALIAS_ID_NUMBER_ID)
    let beforeId: number = -1
    if (beforeId) beforeId = Number(_beforeId)

    const newId = beforeId + 1
    await db.put(_DB_ALIAS_ID_NUMBER_ID, String(newId))
    return newId
}

// ! delete 는 현 단계에선 구조상 만들지 않습니다.
// ! 사용 빈도에 따라 Long-Term Storage 로 옮기고,
// ! 일정 주기가 넘어가는 조건에 따라 삭제되는 형태로 수정관리 예정