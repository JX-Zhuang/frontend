(function(graph){
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
            require('./src/index.js')
          })({"./src/index.js":{"dependencies":{"./hello.js":"./src/hello.js"},"code":"\"use strict\";\n\nvar _hello = require(\"./hello.js\");\n\nconsole.log((0, _hello.say)(\"webpack\"));"},"./src/hello.js":{"dependencies":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.say = say;\n\nfunction say(name) {\n  return \"hello \".concat(name);\n}"}})