const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const options = require('./webpack.config');
const { transformFromAst } = require('@babel/core');
const Parser = {
    getAst: path => {
        const content = fs.readFileSync(path, 'utf-8');
        return parser.parse(content, {
            sourceType: 'module'
        });
    },
    getDependencies: (ast, filename) => {
        const dependencies = {};
        traverse(ast, {
            ImportDeclaration({ node }) {
                const dirname = path.dirname(filename);
                const filepath = './' + path.join(dirname, node.source.value);
                dependencies[node.source.value] = filepath;
            }
        });
        return dependencies;
    },
    getCode: ast => {
        const { code } = transformFromAst(ast, null, {
            presets: ['@babel/preset-env']
        });
        return code;
    }
};
class Compiler {
    constructor(options) {
        // webpack配置
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    //构建启动
    run() {
        const info = this.build(this.entry);
        this.modules.push(info);
        this.modules.forEach(({ dependencies }) => {
            if (dependencies) {
                for (const dependency in dependencies) {
                    this.modules.push(this.build(dependencies[dependency]));
                }
            }
        });
        const dependencyGraph = this.modules.reduce(
            (graph, item) => ({
                ...graph,
                [item.filename]: {
                    dependencies: item.dependencies,
                    code: item.code
                }
            }), {}
        );
        this.generate(dependencyGraph);
    }
    build(filename) {
        const { getAst, getDependencies, getCode } = Parser;
        const ast = getAst(filename);
        const dependencies = getDependencies(ast, filename);
        const code = getCode(ast);
        return {
            filename,
            dependencies,
            code
        }
    }
    // 重写require函数，输出bundle
    generate(code) {
        const filePath = path.join(this.output.path, this.output.filename);
        const bundle = `(function(graph){
            function require(module){
              function localRequire(relativePath){
                return require(graph[module].dependencies[relativePath])
              }
              var exports = {};
              (function(require,exports,code){
                eval(code)
              })(localRequire,exports,graph[module].code);
              return exports;
            }
            require('${this.entry}')
          })(${JSON.stringify(code)})`;
        fs.writeFileSync(filePath, bundle, 'utf-8');
    }
}
new Compiler(options).run();