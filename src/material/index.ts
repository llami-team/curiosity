import * as Utils from '../utils'

export const load = async () => {
    const alias = await Utils.LevelDB.load('alias')
}