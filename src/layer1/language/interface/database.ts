import { LevelUp } from 'levelup'

export interface IDatabase {
    alias: LevelUp
    essence: LevelUp
    type: LevelUp
}