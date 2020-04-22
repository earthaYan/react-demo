const path=require("path")
const HtmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')


module.exports={
    // entry:'./src/index.jsx',
    entry:'./src/Game.jsx',
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            // template:'./src/index.html',
            template:'./src/Game.html',
            filename:'index.html'
        })
    ],
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
    }
}