import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDatabase } from './database/database.js'

import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const options = [
    cors({
        origin: '*',
    }),
    express.json({ limit: '30mb' }),
    morgan('tiny'),
    helmet(),
    bodyParser.urlencoded({ extended: true }),
    cookieParser(),
]
app.use(options)

//Dotenv config
if (process.env.NODE_ENV !== 'PRODUCTION') {
    dotenv.config({ path: 'backend/config/config.env' })
}

// Connect Database
connectDatabase()

app.use(express.static(path.join(__dirname, '../frontend/dist')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist/index.html'))
})

app.listen(process.env.PORT, () => {
    console.log(`Port running on ${process.env.PORT}`)
})
