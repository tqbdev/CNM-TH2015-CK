module.exports = {
  PORT: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'bank',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
  },
  authencation: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: 60 * 60 * 1 // 1 minutes
  },
  gmailSmtp: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      clientId:
        '958743994048-ood2f831nv3kk10kmvgv4m05ljfj4viv.apps.googleusercontent.com',
      clientSecret: '9Fq1bCiQOjUMXnGXV964uBQq'
    }
  },
  gmailAccount: {
    user: 'internet.banking.th2015@gmail.com',
    refreshToken: '1/e02m-8i5JRCV4TuXJDuIVLoZzUn3mBGZ0T0XpX0pDLs',
    accessToken:
      'ya29.Glt7Bk2xBWCfg3uEuEpQb-JHAcWStUyFO19xlhKQUNoCBmKkbQL3ZO4elqoIlTmh5YuLzihuXHSItE4kt3sktluDsSZnpz4xoMHi_GaVeZDbvqbnQnLmPPzq1BW6'
  },
  googleRecaptcha: {
    secretKey: '6LffVIQUAAAAAG2g8UpK_mD7Nu7X1lZaOV5jPQa9'
  }
};
