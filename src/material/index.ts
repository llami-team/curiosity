import * as Utils from '../utils'

export const loadDatabase = async () => {
    const alias = await Utils.LevelDB.load('alias')
    const essence = await Utils.LevelDB.load('essence')
    const type = await Utils.LevelDB.load('type')

    return {
        alias,
        essence,
        type,
    }
}

export const initialize = async () => {
    const db = await loadDatabase()

    return {
        db,
    }
}