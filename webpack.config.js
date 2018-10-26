var config = {
    entry: {
        app: "./demo/src/JSDemo.js"
    },
    output: {
        filename: "./demo/src/bundle.js"
    },
    devServer: {
        contentBase: './demo/src/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.css/,
                loader: 'css-loader',
                include: __dirname + '/src'
            }
        ]
    },
};

module.exports = config;
