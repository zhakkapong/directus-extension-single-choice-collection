import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'single-choice-collection',
	name: 'Single choice (collection) ',
	description: 'Single choice from a collection',
	icon: 'radio_button_checked',
	group: 'selection',
	types: ['string'],
	component: InterfaceComponent,
	options: () => {
		return [
			{
				field: 'source',
				name: '$t:source',
				type: 'string',
				meta: {
					width: 'full',
					interface: 'system-collection',
					options: {
						placeholder: '$t:enter_a_placeholder',
					},
				},
			},
		];
	},
});
