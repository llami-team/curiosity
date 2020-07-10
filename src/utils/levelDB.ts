import level from 'level'
import { LevelUp } from 'levelup'
import fs from 'fs'
import path from 'path'

const dataPath = `${process.cwd()}/database`
const dbMap: {
    [key: string]: LevelUp
} = {}

export const load = async (dbName: string) => {
    if (typeof dbMap[dbName] != 'undefined')
        return dbMap[dbName]

    let dbPath = path.resolve(`${dataPath}/${dbName}`)
    if (!fs.existsSync(dbPath))
        fs.mkdirSync(dbPath, { recursive: true })

    let db: LevelUp = await level(dbPath)
    dbMap[dbName] = db
    if (!db) throw new Error('DB INIT FAILED')
    return db
}

export const closeAll = () => {
    for (let dbName in dbMap) {
        if (dbMap[dbName]) {
            dbMap[dbName].close()
            delete dbMap[dbName]
        }
    }
}