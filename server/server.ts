import express from 'express'
import multer from 'multer'
import * as ftp from 'basic-ftp'
import * as fs from 'fs'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

const upload = multer({
  dest: 'uploads/',
  storage: multer.diskStorage({
    filename: function (_req, file, cb) {
      // console.log(req)
      file.originalname = Buffer.from(file.originalname, 'latin1').toString(
        'utf8'
      )
      cb(null, file.originalname)
    },
  }),
})

async function uploadFileToFTP(
  localFilePath: string,
  ftpFileName: string
): Promise<void> {
  console.log('FTP 연결 성공')
  const client = new ftp.Client()
  client.ftp.verbose = true

  try {
    await client.access({
      host: process.env.FTP_HOST,
      port: Number(process.env.FTP_PORT),
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    })
    await client.cd('/ESMS')
    await client.uploadFrom(localFilePath, ftpFileName)
    console.log('파일 업로드 성공', ftpFileName)
  } catch (err) {
    console.error('파일 업로드 중 오류 발생: ', err)
    throw err
  } finally {
    client.close()
  }
}

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  const file = req.file
  if (!file) {
    return res.status(400).send({ msg: '업로드된 파일이 없습니다.' })
  }

  const localFilePath = file.path
  const fileName = file.originalname
  try {
    await uploadFileToFTP(localFilePath, fileName)
    fs.unlinkSync(localFilePath)
    res.send({ msg: '업로드 성공' })
  } catch (error) {
    console.error('업로드 처리 중 오류 발생:', error)
    res.status(500).send({ msg: '업로드 실패.' })
  }
})

app.listen(PORT, () => {
  console.log(`서버 실행 중 http://localhost:${PORT}`)
})
