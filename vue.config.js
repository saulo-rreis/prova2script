// vue.config.js
module.exports = {
    // Personalize a configuração do Webpack
    chainWebpack: config => {
        // Aqui você pode modificar configurações específicas do Webpack
        config.plugin('html').tap(args => {
            // Ajuste o template HTML
            args[0].template = './public/index.html'; // Caminho correto para o seu template HTML
            return args;
        });
    }
};
