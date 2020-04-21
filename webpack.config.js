const path=require("path")
const HtmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
module.exports={
    mode:'development',
    entry:'./src/index.jsx',
    output:{
        filename:'main.js',
        path:path.resolve(__dirname,'dist')
    },
    devtool:'inline-source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(js|jsx)$/,
                exclude:'/node_modules/',
                use:['babel-loader']
            },
            {
                test:/\.html$/,
                use:['html-loader']
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'react+webpack的配置',
            template:'./src/index.html',
            filename:'index.html'
        })
    ],
    devServer:{
        contentBase:path.join(__dirname,'dist'),
        compress:true,
        hot:true,
        publicPath:'/',
        port:3000
    }
}