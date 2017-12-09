module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jquery": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "error", 
            { allow: ["log", "warn", "error"] }
        ]
    }
};