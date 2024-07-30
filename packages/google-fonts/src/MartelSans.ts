import {loadFonts} from './base';

export const getInfo = () => ({
	fontFamily: 'Martel Sans',
	importName: 'MartelSans',
	version: 'v12',
	url: 'https://fonts.googleapis.com/css2?family=Martel+Sans:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900',
	unicodeRanges: {
		devanagari:
			'U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09',
		'latin-ext':
			'U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
		latin:
			'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
	},
	fonts: {
		normal: {
			'200': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAX5vuBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAX5vuOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAX5vuAH0g.woff2',
			},
			'300': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBz5fuBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBz5fuOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBz5fuAH0g.woff2',
			},
			'400': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GsssGi7VdzDgKjM-4d8hjZx-6_Pg.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GsssGi7VdzDgKjM-4d8hjWx-6_Pg.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GsssGi7VdzDgKjM-4d8hjYx-4.woff2',
			},
			'600': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAH4_uBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAH4_uOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hAH4_uAH0g.woff2',
			},
			'700': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBj4vuBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBj4vuOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBj4vuAH0g.woff2',
			},
			'800': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hB_4fuBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hB_4fuOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hB_4fuAH0g.woff2',
			},
			'900': {
				devanagari:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBb4PuBH0gXqA.woff2',
				'latin-ext':
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBb4PuOH0gXqA.woff2',
				latin:
					'https://fonts.gstatic.com/s/martelsans/v13/h0GxssGi7VdzDgKjM-4d8hBb4PuAH0g.woff2',
			},
		},
	},
});

export const fontFamily = 'Martel Sans' as const;

type Variants = {
	normal: {
		weights: '200' | '300' | '400' | '600' | '700' | '800' | '900';
		subsets: 'devanagari' | 'latin' | 'latin-ext';
	};
};

export const loadFont = <T extends keyof Variants>(
	style?: T,
	options?: {
		weights?: Variants[T]['weights'][];
		subsets?: Variants[T]['subsets'][];
		document?: Document;
	},
) => {
	return loadFonts(getInfo(), style, options);
};
