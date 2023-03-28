import React, {useCallback, useMemo, useState} from 'react';
import {z} from 'remotion';
import {
	FAIL_COLOR,
	INPUT_BORDER_COLOR_UNHOVERED,
} from '../../../helpers/colors';
import {Spacing} from '../../layout';
import {ValidationMessage} from '../../NewComposition/ValidationMessage';
import {InlineRemoveButton} from '../InlineRemoveButton';
import {fieldsetLabel, optionRow} from '../layout';
import {getSchemaLabel} from './get-schema-label';
import type {JSONPath} from './zod-types';
import {ZodArrayItemEditor} from './ZodArrayItemEditor';

const container: React.CSSProperties = {
	width: '100%',
};

const fullWidth: React.CSSProperties = {
	width: '100%',
};

type LocalState = {
	value: unknown[];
	zodValidation: z.SafeParseReturnType<unknown, unknown>;
	revision: number;
};

// TODO: Ability to add another item
export const ZodArrayEditor: React.FC<{
	schema: z.ZodTypeAny;
	jsonPath: JSONPath;
	value: unknown[];
	defaultValue: unknown[];
	setValue: React.Dispatch<React.SetStateAction<unknown[]>>;
	onSave: (updater: (oldState: unknown[]) => unknown[]) => void;
	compact: boolean;
	showSaveButton: boolean;
	onRemove: null | (() => void);
}> = ({
	schema,
	jsonPath,
	compact,
	setValue: updateValue,
	defaultValue,
	value,
	onSave,
	showSaveButton,
	onRemove,
}) => {
	const [localValue, setLocalValue] = useState<LocalState>(() => {
		return {
			value,
			zodValidation: schema.safeParse(value),
			revision: 0,
		};
	});

	const def = schema._def;

	const typeName = def.typeName as z.ZodFirstPartyTypeKind;
	if (typeName !== z.ZodFirstPartyTypeKind.ZodArray) {
		throw new Error('expected object');
	}

	const isRoot = jsonPath.length === 0;
	const Element = isRoot ? 'div' : 'fieldset';

	const {paddingTop} = optionRow;

	const fieldset: React.CSSProperties = useMemo(() => {
		return {
			borderRadius: 4,
			borderColor: localValue.zodValidation.success
				? INPUT_BORDER_COLOR_UNHOVERED
				: FAIL_COLOR,
		};
	}, [localValue.zodValidation.success]);

	const onChange = useCallback(
		(updater: (oldV: unknown[]) => unknown[], incrementRevision: boolean) => {
			setLocalValue((oldLocalState) => {
				const newValue = updater(oldLocalState.value);
				const safeParse = schema.safeParse(newValue);
				if (safeParse.success) {
					updateValue(updater);
				}

				return {
					revision: oldLocalState.revision + (incrementRevision ? 1 : 0),
					value: newValue,
					zodValidation: safeParse,
				};
			});
		},
		[schema, updateValue]
	);

	const style = useMemo((): React.CSSProperties | undefined => {
		if (isRoot) {
			return undefined;
		}

		return {paddingTop};
	}, [isRoot, paddingTop]);

	return (
		<div style={style}>
			<div style={fullWidth}>
				<Element style={fieldset}>
					{isRoot ? null : (
						<legend style={fieldsetLabel}>
							{getSchemaLabel(jsonPath)}
							{onRemove ? (
								<>
									<Spacing x={1} /> <InlineRemoveButton onClick={onRemove} />
								</>
							) : null}

							{!localValue.zodValidation.success && (
								<>
									<Spacing x={1} />
									<ValidationMessage
										align="flex-end"
										message={localValue.zodValidation.error.format()._errors[0]}
										type="error"
									/>
								</>
							)}
						</legend>
					)}
					<div style={isRoot ? undefined : container}>
						{localValue.value.map((child, i) => {
							return (
								<ZodArrayItemEditor
									// eslint-disable-next-line react/no-array-index-key
									key={`${i}${localValue.revision}`}
									onChange={onChange}
									value={child}
									def={def}
									index={i}
									jsonPath={jsonPath}
									compact={compact}
									defaultValue={defaultValue[i]}
									onSave={onSave}
									showSaveButton={showSaveButton}
								/>
							);
						})}
					</div>
				</Element>
			</div>
		</div>
	);
};
