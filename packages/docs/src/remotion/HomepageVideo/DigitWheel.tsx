import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const DURATION = 25;

const items = 10;

export const Wheel: React.FC<{
	delay: number;
	digits: number[];
	renderDigit: (i: number) => React.ReactNode;
	isLeadingDigit: boolean;
}> = ({delay, digits, renderDigit, isLeadingDigit}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const singleDur = DURATION;

	const progresses = new Array(digits.length - 1).fill(true).map((_, i) => {
		const current = digits[i];
		const next = digits[i + 1];
		if (current === next) {
			return 1;
		}

		return spring({
			fps,
			frame,
			config: {
				mass: 0.7,
				damping: 12,
			},
			durationInFrames: singleDur,
			delay: i * 50 + delay,
		});
	});

	const rotations = digits.map((d) => 1 / items + d / 10);

	const offsets = rotations.map((r, i) => {
		const next = rotations[i + 1];
		if (next === undefined) {
			return 0;
		}

		return next - r;
	});

	const opacity = isLeadingDigit
		? interpolate(
				progresses.reduce((a, b) => a + b, 0),
				new Array(digits.length).fill(true).map((_, i) => i),
				digits.map((digit) => (digit === 0 ? -0.5 : 1)),
			)
		: 1;

	console.log(
		new Array(digits.length).fill(true).map((_, i) => i),
		new Array(digits.length).fill(true).map((digit) => (digit === 0 ? 0 : 1)),
		digits,
		isLeadingDigit,
	);

	const rotation =
		progresses
			.map((p, i) => {
				return p * offsets[i];
			})
			.reduce((a, b) => a + b, 0) + rotations[0];

	return (
		<div
			style={{
				position: 'relative',
				width: 40,
				display: 'inline-block',
				height: 90,
			}}
		>
			<AbsoluteFill
				style={{
					perspective: 5000,
					maskImage: `linear-gradient(to bottom, transparent 0%, #000 28%, #000 72%, transparent 100%)`,
				}}
			>
				{new Array(items).fill(true).map((_, i) => {
					const index = i / items + rotation;

					const z = Math.cos(index * -Math.PI * 2) * 120;
					const y = Math.sin(index * Math.PI * 2) * -120;
					const r = interpolate(index, [0, 1], [0, Math.PI * 2]);

					return (
						<AbsoluteFill
							// eslint-disable-next-line react/jsx-key, react/no-array-index-key
							key={i}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								fontSize: 60,
								fontVariationSettings: `"wght" 400`,
								transform: `translateZ(${z}px) translateY(${y}px) rotateX(${r}deg)`,
								backfaceVisibility: 'hidden',
								perspective: 1000,
							}}
						>
							<div
								style={{
									transform: `rotateX(-${r}rad)`,
									backfaceVisibility: 'hidden',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'center',
									opacity,
								}}
							>
								<div
									style={{
										lineHeight: 1,
									}}
								>
									{renderDigit(i)}
								</div>
							</div>
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</div>
	);
};
