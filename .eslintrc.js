// https://docs.expo.dev/guides/using-eslint/
module.exports = {
	extends: ['expo', 'prettier'],
	plugins: ['prettier'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				semi: false,
				singleQuote: true,
				jsxSingleQuote: true,
				tabWidth: 2,
				endOfLine: 'auto',
				trailingComma: 'es5',
				printWidth: 80,
			},
		],
	},
}
