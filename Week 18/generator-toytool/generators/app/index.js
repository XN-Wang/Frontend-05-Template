var Genertor = require("yeoman-generator")

module.exports = class extends Genertor {
    constructor(args, opts) {
        super(args, opts)
    }

    async iniPackage() {
        let answer = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "you project name",
                default: this.name
            }
        ])
        const pkgJson = {
            "name": answer.name,
            "version": "1.0.0",
            "description": "",
            "main": "generators/app/index.js",
            "scripts": {
                "build": "webpack",
                "test": "mocha --require @babel/register",
                "coverage": "nyc mocha --require @babel/register"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {},
            "dependencies": {}
        }

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { "save-dev": false })
        this.npmInstall(["webpack", "webpack-cli", "vue-loader", "vue-template-compiler", "vue-style-loader", "css-loader",
            "copy-webpack-plugin", "babel-loader", "@babel/core", "@babel/preset-env", "@babel/register", "mocha", "nyc"], { "save-dev": true })

        this.fs.copyTpl(
            this.templatePath(".babelrc"),
            this.destinationPath(".babelrc"),
            {}
        )
        this.fs.copyTpl(
            this.templatePath("sample-test.js"),
            this.destinationPath("test/sample-test.js"),
            {}
        )
        this.fs.copyTpl(
            this.templatePath("HelloWorld.vue"),
            this.destinationPath("src/HelloWorld.vue"),
            {}
        )
        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js"),
            {}
        )
        this.fs.copyTpl(
            this.templatePath("main.js"),
            this.destinationPath("src/main.js"),
            {}
        )
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("src/index.html"),
            { title: answer.name }
        )
    }
}