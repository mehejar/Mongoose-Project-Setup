import app from './app'
import config from './app/config'

import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.data_url as string)
    // PORT, "0.0.0.0",

    app.listen(config.port, "0.0.0.0", () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
main()