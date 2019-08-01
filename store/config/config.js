const PORT = '3001'
let URL = ''

if (process.env.NODE_ENV == 'development') {
    URL = 'localhost'
} else if (process.env.NODE_ENV == 'production') {
    URL = '10.0.8.112'
}

const URL_API = `http://${URL}:${PORT}`

export default URL_API