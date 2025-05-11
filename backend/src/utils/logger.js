import fs from "fs";

const logger = (req) => {
  const logs = {
    method: req.method,
    route: req.url,
    ip: req.ip,
    date: new Date().toISOString()
  }

  const fileExist = fs.existsSync('./logs/auth.log')
  if (fileExist) {
    fs.appendFile('./logs/auth.log', `${req.method} ${req.url} ${req.ip} ${logs.date} \n`, (err) => {
      if (err) {
        console.log(err)
      }
    })
  } else {
    fs.writeFile('./logs/auth.log', `${req.method} ${req.url} ${req.ip} ${logs.date} \n`, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }
}

export default logger;