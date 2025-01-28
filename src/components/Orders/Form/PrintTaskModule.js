import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { Input } from '../../shared/Inputs';
import CreatableSelect from 'react-select/creatable';
import useCalculateFields from '../../../utilities/customHooks/forms/orderFields';
import { changeValue } from '../../../utilities/functions/forms/fields';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepEqual } from '../../../utilities/functions/deepEqual';
import { selectStyles } from '../../../utilities/selectStyles/selectStyles';

function PrintTaskModule({
	fields,
	setFields,
	module,
	info,
	index,
	deleteModule,
}) {
	const [selectedOptions, setSelectedOptions] = useState(
		[]
	);
	const [manualChanges, setManualChanges] = useState({
		totalCost: false,
	});

	useEffect(() => {
		setFields((prev) => {
			const updatedPrintTasks = [...prev.printTasks];
			updatedPrintTasks[index].selectedOptions =
				selectedOptions;

			return { ...prev, printTasks: updatedPrintTasks };
		});
	}, [selectedOptions]);

	const handleManualChange = (e) => {
		setManualChanges((prev) => ({
			...prev,
			[e.target.name]: true,
		}));
	};

	const genericOptions = [
		{
			value: 'Uno',
			label: 'Uno',
		},
		{
			value: 'Dos',
			label: 'Dos',
		},
		{
			value: 'Tres',
			label: 'Tres',
		},
	];

	const changeValue = (e) => {
		const name = e.target.name;
		setFields((prev) => {
			const updatedPrintTasks = [...prev.printTasks];
			updatedPrintTasks[index][name] = e.target.value;

			return { ...prev, printTasks: updatedPrintTasks };
		});
	};

	useCalculateFields(
		fields,
		index,
		setFields,
		manualChanges
	);

	return (
		<div
			className={`${styles.block} ${styles.blockPrintTask}`}
		>
			<div className={styles.closePrintTask}>
				<Button
					variant="outlined"
					color="error"
					size="small"
					startIcon={<DeleteIcon />}
					onClick={() => deleteModule(index)}
				>
					Borrar
				</Button>
			</div>

			<div className={styles.contain}>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<h2 className={styles.printTitle}>
						Módulo de impresión
					</h2>
					<Input
						name="sheetDescription"
						onChange={(e) => changeValue(e)}
						value={info.sheetDescription || ''}
						size="bigSize"
					>
						Descripción del modulo:
					</Input>
				</div>
				{/* <div className={styles.printFirstRow}> */}
				<Input
					name="quantity"
					onChange={(e) => changeValue(e)}
					value={info.quantity || ''}
					size="mediumSize"
				>
					Unidades:{' '}
				</Input>
				<Input
					name="finalSize"
					onChange={(e) => changeValue(e)}
					value={info.finalSize || ''}
					size="mediumSize"
				>
					Medida Final{' '}
				</Input>
				<Input
					name="sizeWithMargins"
					onChange={(e) => changeValue(e)}
					value={info.sizeWithMargins || ''}
					size="mediumSize"
				>
					Medida con márgenes
				</Input>

				<div
					className={`${styles.selectContainer} ${styles.selectMaterialContainer}`}
				>
					<label className={styles.label}>Material:</label>
					<CreatableSelect
						styles={selectStyles}
						name="material"
						value={info.selectedOptions?.material || ''}
						onChange={(option) => {
							setFields((prev) => {
								const updatedPrintTasks = [
									...prev.printTasks,
								];
								updatedPrintTasks[index]['material'] =
									option.value;
								return {
									...prev,
									printTasks: updatedPrintTasks,
								};
							});
							setSelectedOptions((prev) => ({
								...prev,
								material: {
									label: option.label,
									value: option.value,
								},
							}));
						}}
						options={info.materialOptions}
						placeholder={''}
					/>
				</div>
				<div
					className={`${styles.selectContainer} ${styles.smallNumberSelectContainer}`}
				>
					<label className={styles.label}>Gramaje:</label>
					<CreatableSelect
						styles={selectStyles}
						name="grammage"
						value={info.selectedOptions?.grammage || ''}
						onChange={(option) => {
							setFields((prev) => {
								const updatedPrintTasks = [
									...prev.printTasks,
								];
								updatedPrintTasks[index]['grammage'] =
									option.value;
								return {
									...prev,
									printTasks: updatedPrintTasks,
								};
							});
							setSelectedOptions((prev) => ({
								...prev,
								grammage: {
									label: option.label,
									value: option.label,
								},
							}));
						}}
						options={info.grammageOptions}
						placeholder={''}
					/>
				</div>
				{/* </div> */}
				{/* <div className={styles.printRow}> */}
				<div className={styles.selectContainer}>
					<label className={styles.label}>Tam. hoja:</label>
					<CreatableSelect
						styles={selectStyles}
						name="bulkPaperSize"
						value={
							info.selectedOptions?.bulkPaperSize || ''
						}
						onChange={(option) => {
							setFields((prev) => {
								const updatedPrintTasks = [
									...prev.printTasks,
								];
								updatedPrintTasks[index]['bulkPaperSize'] =
									option.value;
								return {
									...prev,
									printTasks: updatedPrintTasks,
								};
							});
							setSelectedOptions((prev) => ({
								...prev,
								bulkPaperSize: {
									label: option.label,
									value: option.label,
								},
							}));
						}}
						options={info.sizeMaterialOptions}
						placeholder={''}
					/>
				</div>
				<div className={styles.selectContainer}>
					<label className={styles.label}>
						Pliego de impresión:
					</label>
					<CreatableSelect
						styles={selectStyles}
						name="sheetSize"
						value={info.selectedOptions?.sheetSize || ''}
						onChange={(option) => {
							setFields((prev) => {
								const updatedPrintTasks = [
									...prev.printTasks,
								];
								updatedPrintTasks[index]['sheetSize'] =
									option.value;
								return {
									...prev,
									printTasks: updatedPrintTasks,
								};
							});
							setSelectedOptions((prev) => ({
								...prev,
								sheetSize: {
									label: option.label,
									value: option.label,
								},
							}));
						}}
						options={genericOptions}
						placeholder={''}
					/>
				</div>
				<Input
					name="sheetPerBulkPaper"
					onChange={(e) => changeValue(e)}
					value={info.sheetPerBulkPaper || ''}
					size="numberSize"
					isDisabled
				>
					Pli. x Hoja:
				</Input>
				<Input
					name="unitsPerSheet"
					onChange={(e) => changeValue(e)}
					value={info.unitsPerSheet || ''}
					size="numberSize"
					isDisabled
				>
					Unid. x Pli.:
				</Input>
				<Input
					name="sheetQuantity"
					size="mediumSize"
					onChange={(e) => changeValue(e)}
					value={info.sheetQuantity || ''}
					isDisabled
				>
					Cant. Pli. de impresión:
				</Input>
				<Input
					name="excess"
					onChange={(e) => changeValue(e)}
					value={info.excess || ''}
					size="numberSize"
				>
					Demasía:
				</Input>
				{/* </div> */}
				{/* <div className={styles.printLastRow}> */}
				<Input
					name="bulkPaperQuantity"
					onChange={(e) => changeValue(e)}
					value={info.bulkPaperQuantity || ''}
					size="numberSize"
					isDisabled
				>
					Hojas:
				</Input>
				<Input
					name="costPerBulkPaper"
					onChange={(e) => changeValue(e)}
					value={`$ ${info.costPerBulkPaper || ''}`}
					size="mediumSize"
					isDisabled
				>
					Costo x hoja:
				</Input>
				<div className={styles.lastItem}>
					<Input
						name="paperCost"
						onChange={(e) => changeValue(e)}
						value={`$ ${info.paperCost || ''}`}
						size="priceSize"
						isDisabled
					>
						Costo papel:
					</Input>
				</div>
				{/* </div> */}
				{/* <div className={styles.printRow}> */}
				<div
					className={`${styles.selectContainer} ${styles.selectMaterialContainer}`}
				>
					<label className={styles.label}>Maquina:</label>
					<CreatableSelect
						styles={selectStyles}
						name="operation"
						value={info.selectedOptions?.operation || ''}
						onChange={(option) => {
							setFields((prev) => {
								const updatedPrintTasks = [
									...prev.printTasks,
								];
								updatedPrintTasks[index]['operation'] =
									option.value;
								return {
									...prev,
									printTasks: updatedPrintTasks,
								};
							});
							setSelectedOptions((prev) => ({
								...prev,
								operation: {
									label: option.label,
									value: option.value,
								},
							}));
						}}
						options={info.operationOptions}
						placeholder={''}
					/>
				</div>
				<Input
					name="plates"
					onChange={(e) => changeValue(e)}
					value={info.plates || ''}
					size="numberSize"
				>
					Chapas:
				</Input>
				<div className={styles.lastItem}>
					<Input
						name="plateCost"
						onChange={(e) => changeValue(e)}
						value={`$ ${info.plateCost || ''}`}
						isDisabled
						size="priceSize"
					>
						Costo chapas:
					</Input>
				</div>
				{/* </div> */}
				<div
					className={styles.printFirstRow}
					style={{ alignItems: 'flex-end' }}
				>
					<div className={styles.tintasDiv}>
						<h3>TINTAS</h3>
						<div>
							<label className={styles.label}>
								Frente:
							</label>
							<textarea
								className={styles.textArea}
								name="front"
								onChange={(e) => changeValue(e)}
								value={info.front || ''}
							></textarea>
						</div>
						<div>
							<label className={styles.label}>Dorso:</label>
							<textarea
								className={styles.textArea}
								name="back"
								onChange={(e) => changeValue(e)}
								value={info.back || ''}
							></textarea>
						</div>
					</div>
					<div className={styles.rightRow}>
						<div className={styles.rightRowContainer}>
							<Input
								name="postures"
								onChange={(e) => changeValue(e)}
								value={info.postures || ''}
								size="numberSize"
							>
								Posturas:
							</Input>
							<Input
								name="printRun"
								onChange={(e) => changeValue(e)}
								value={info.printRun || ''}
								size="mediumSize"
								isDisabled
							>
								Tiraje:
							</Input>

							<Input
								name="postureCost"
								onChange={(e) => changeValue(e)}
								value={`$ ${info.postureCost || ''}`}
								size="priceSize"
								isDisabled
							>
								Costo Postura:
							</Input>
						</div>
						<div className={styles.rightRowContainer}>
							<Input
								name="moduleRepeat"
								onChange={(e) => changeValue(e)}
								value={info.moduleRepeat}
								size="numberSize"
							>
								Repetir modulo:
							</Input>
							<Input
								name="estimatedCost"
								onChange={(e) => changeValue(e)}
								value={`$ ${info.estimatedCost || ''}`}
								size="priceSize"
								isDisabled
							>
								Costo (estimado):
							</Input>
							<Input
								name="totalCost"
								onChange={(e) => {
									changeValue(e);
									handleManualChange(e);
								}}
								value={`$ ${info.totalCost || ''}`}
								size="priceSize"
							>
								Costo modulo:
							</Input>
						</div>
					</div>
				</div>
				{/* <div className={styles.printLastRow}>
					<Input
						name="moduleRepeat"
						onChange={(e) => changeValue(e)}
						value={info.moduleRepeat}
						size="numberSize"
					>
						Repetir modulo:
					</Input>
					<Input
						name="estimatedCost"
						onChange={(e) => changeValue(e)}
						value={`$ ${info.estimatedCost || ''}`}
						size="priceSize"
						isDisabled
					>
						Costo (estimado):
					</Input>
					<Input
						name="totalCost"
						onChange={(e) => {
							changeValue(e);
							handleManualChange(e);
						}}
						value={`$ ${info.totalCost || ''}`}
						size="priceSize"
					>
						Costo modulo:
					</Input>
				</div>

				<div className={styles.tintasDiv2}>
					<label>Frente:</label>
					<textarea></textarea>
					<label>Dorso:</label>
					<textarea></textarea>
				</div>
				<div></div> */}
			</div>
		</div>
	);
}

export default PrintTaskModule;
