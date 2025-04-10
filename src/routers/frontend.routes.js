import express from "express"
import path from "path"
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const staticPath = path.join(__dirname, '../../../frontend')

router.use(express.static(staticPath))

router.get('/signup', (req, res, next) => {
    res.sendFile(path.join(staticPath, 'pages', 'signup.html'), err => {
        if (err) next(err)
    })
})

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(staticPath, 'pages', 'login.html'), err => {
        if (err) next(err)
    })
})

// Handle 404 for frontend routes
router.use((req, res) => {
    res.status(404).sendFile(path.join(staticPath, 'pages', '404.html'))
})

export default router;