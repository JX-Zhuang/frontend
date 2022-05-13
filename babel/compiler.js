const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const { transform } = require('@babel/core');
const traverse = require('@babel/traverse').default;
const entry = path.join('./sourceCode.js');
const myPlugin = ({ types: t }) => {
    return {
        visitor: {
            // Identifier(path, state) { },
            // ASTNodeTypeHere(path, state) { },
            VariableDeclaration(path) {
                const node = path.node;
                ['let', 'const'].includes(node.kind) && (node.kind = 'var');
            },
            ArrowFunctionExpression(path) {
                //该路径对应的节点信息  
                let { id, params, body, generator, async } = path.node;
                //进行节点替换 (arrowFunctionExpression->functionExpression)
                if (!t.isBlockStatement(body)) {
                    const node = t.returnStatement(body);
                    body = t.blockStatement([node]);
                }
                path.replaceWith(t.functionExpression(id, params, body, generator, async));
            }
            // BinaryExpression(path) {
            //     if (path.node.operator !== "===") {
            //         return;
            //     }
            //     path.node.left = t.identifier("sebmck");
            //     path.node.right = t.identifier("dork");
            // }
        }
    }
}
const run = () => {
    const code = fs.readFileSync(entry, 'utf-8');
    const res = transform(code, {
        plugins: [myPlugin]
    });
    fs.writeFileSync('./after.js', res.code, 'utf-8');
};
run();