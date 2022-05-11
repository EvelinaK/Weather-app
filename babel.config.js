// module.exports = {
//     env: {
//         test: {
//             presets: [
//                 [
//                     "@babel/preset-env",
//                     {
//                         modules: "commonjs",
//                         debug: false,
//                     },
//                 ],
//                 "@babel/preset-flow",
//                 "@babel/preset-react",
//             ],
//             plugins: [
//                 "@babel/plugin-syntax-dynamic-import",
//                 "@babel/plugin-proposal-class-properties",
//             ],
//         },
//         production: {
//             presets: [
//                 ["@babel/preset-env", { modules: false }],
//                 "@babel/preset-flow",
//                 "@babel/preset-react",
//             ],
//             plugins: [
//                 "@babel/plugin-syntax-jsx",
//                 "@babel/plugin-syntax-dynamic-import",
//                 "@babel/plugin-proposal-class-properties",
//                 "@babel/helper-plugin-utils"
//             ],
//         },
//         development: {
//             presets: [
//                 ["@babel/preset-env", { modules: true }],
//                 "@babel/preset-flow", ["@babel/preset-react", { "development": true }],
//                 ['@babel/preset-env', { targets: { node: 'current' } }],
//                 ['@babel/preset-react', { targets: { node: 'current' } }] // add this
//             ],
//             plugins: [
//                 "@babel/plugin-syntax-dynamic-import",
//                 "@babel/plugin-proposal-class-properties",
//                 "@babel/plugin-syntax-jsx",
//                 "@babel/helper-plugin-utils"
//             ],
//         },
//     },
// };

module.exports = {
    env: {
        test: {
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: "commonjs",
                        debug: false,
                    },
                ],
                "@babel/preset-flow",
                "@babel/preset-react",
            ],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-react-jsx-self"
            ],
        },
        production: {
            presets: [
                ["@babel/preset-env", { modules: false }],
                "@babel/preset-flow",
                "@babel/preset-react",
            ],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-react-jsx-self"
            ],
        },
        development: {
            presets: [
                ["@babel/preset-env", { modules: false }],
                "@babel/preset-flow",
                "@babel/preset-react",
            ],
            plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-jsx",
                "@babel/plugin-transform-react-jsx-self"
            ],
        },
    },
};