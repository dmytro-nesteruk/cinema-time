import propertyGroups from 'stylelint-config-recess-order/groups'

export default {
	$schema: 'https://json.schemastore.org/stylelintrc.json',
	extends: [
		'stylelint-config-recess-order'
	],
	rules: {
		'at-rule-no-unknown': null,
		'no-empty-source': true,
		'block-no-empty': true,
		'rule-empty-line-before': [
			'always',
			{
				except: ['first-nested']
			}
		],
		'selector-class-pattern': null,
		'keyframes-name-pattern': null,
		'declaration-block-no-duplicate-properties': true,
		'order/properties-order': propertyGroups.map((group) => ({
			...group,
			emptyLineBefore: 'always',
			noEmptyLineBetween: true
		})),
		'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: 'global' }]
	}
};
