const merge=require('webpack-merge')
const common=require('./webpack.common')

module.exports=merge(common,{
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        compress:true,
        // 模块热替换和splitChunks不能同时使用
        hot:false,
        publicPath:'/',
        port:3000
    },
})