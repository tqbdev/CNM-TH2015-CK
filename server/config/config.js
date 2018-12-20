module.exports = {
  PORT: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'bank',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || '45.119.212.169'
    }
  },
  authencation: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: 60 * 60 * 1 // 1 minutes
  }
}
