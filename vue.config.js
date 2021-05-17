module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',

  'transpileDependencies': [
    'vuetify'
  ],
  lintOnSave: false,  
  devServer: {
    proxy: 'https://localhost:8081'
} 
}
