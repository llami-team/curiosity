import { LevelUp } from 'levelup'
import { IEssence, IAlias } from '../interface'

export interface ICreateEssence {
    db: LevelUp
    essence: IEssence
}
export interface IReadEssenceByNames {
    db: LevelUp
    alias: IAlias
}
export interface IUpdateEssence {
    db: LevelUp
    alias: IAlias
    callback: (
        essence: IEssence | undefined,
        _option: IUpdateEssence
    ) => Promise<IEssence | undefined>
}

/**
 * @description
 * 본질 모델링을 생성합니다.
 * 
 * @param option 
 * @returns 생성 작업 성공 여부가 반환됩니다.
 */
export const createEssence = async (option: ICreateEssence) => {
    try {
        const aliasId = option.essence.alias.id
        const beforeData = await option.db.get(`${aliasId}`)
        if (beforeData) throw new Error()
        await option.db.put(`${aliasId}`, JSON.stringify(option.essence))
        return true
    } catch (e) {
        return false
    }
}

/**
 * @description
 * 별칭 정보를 이용해서 본질 정보를 읽어옵니다.
 * 
 * @param option
 * @returns 별칭 정보 또는 `undefined` 가 반환됩니다.
 */
export const readEssence = async (option: IReadEssenceByNames) => {
    try {
        const aliasId = option.alias.id
        const essence: IEssence = JSON.parse(await option.db.get(`${aliasId}`))
        if (!essence) throw new Error()
        return essence
    } catch (e) {
        console.log(e)
        return undefined
    }
}

/**
 * @description
 * 본질 정보를 콜백을 통해서 갱신합니다.
 * 
 * @param option
 * @returns 갱신 작업 성공 여부가 반환됩니다.
 */
export const updateEssence = async (option: IUpdateEssence) => {
    let essence: IEssence | undefined = undefined
    try {
        essence = await option.db.get(`${option.alias.id}`)
    } catch (e) { }

    const updatedEssence = await option.callback(essence, option)
    if (updatedEssence) {
        try {
            await option.db.put(`${option.alias.id}`, updatedEssence)
            return true
        } catch (e) {
            console.log(e)
            return false
        }
    } else {
        return true
    }
}