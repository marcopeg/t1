import path from 'path'
import fs from 'fs'
import nodeEnvFile from 'node-env-file'

const file2root = fileName => path.join(__dirname, '..', '..', fileName)

const fileExists = fileName => new Promise((resolve, reject) => {
    fs.exists(file2root(fileName), exists => exists ? resolve(true) : resolve(false))
})

const loadEnv = async (fileName) => {
    const exists = await fileExists(fileName)
    if (exists) {
        nodeEnvFile(file2root(fileName))
    }
}

export const init = async () => {
    await loadEnv('.env')
    await loadEnv('.env.local')
    await loadEnv(`.env.${process.env.NODE_ENV}`)
    await loadEnv(`.env.${process.env.NODE_ENV}.local`)
}
