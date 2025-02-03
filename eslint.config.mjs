import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",
    },

    rules: {
        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "linebreak-style": ["error", "unix"],

        "no-constant-condition": ["error", {
            checkLoops: false,
        }],

        quotes: ["error", "single", {
            allowTemplateLiterals: false,
            avoidEscape: true,
        }],

        semi: ["error", "always"],

        "no-console": ["error", {
            allow: ["warn", "error", "info", "debug"],
        }],

        "no-trailing-spaces": "error",
        "eol-last": "error",

        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-expect-error": "allow-with-description",
        }],

        "@typescript-eslint/ban-tslint-comment": "error",

        "@typescript-eslint/consistent-type-assertions": ["error", {
            assertionStyle: "as",
            objectLiteralTypeAssertions: "never",
        }],

        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-invalid-void-type": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-asserted-optional-chain": "error",

        "@typescript-eslint/no-unused-vars": ["error", {
            ignoreRestSiblings: true,
            args: "none",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_"
        }],

        "@typescript-eslint/prefer-for-of": ["error"],
        "@typescript-eslint/prefer-ts-expect-error": ["error"],

        'simple-import-sort/imports': [
            'error',
            {
            groups: [
                ['^react', '^@?\\w'],
                ['^(@|src)(/.*|$)'],
                ['^\\u0000'],
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                ['^.+\\.?(css)$'],
            ],
            },
        ],

        'simple-import-sort/exports': 'error',
        'consistent-return': 0,
        'import/no-cycle': 0,
        'no-redeclare': 'error',
    },
}];
