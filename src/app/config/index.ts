import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join((process.cwd(), '.env')) })

export default {
  port: process.env.PORT,
  data_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  reset_pass_ui_link: process.env.RESET_PASSWORD_LINK
}
