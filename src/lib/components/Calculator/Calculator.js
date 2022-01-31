import { useState } from "react";
import cn from "classnames";

import s from "./Calculator.module.css";
import { operations, keys } from "../../constants";
import Button from "../Button/Button";
import utils from "../../utils";

const Calculator = ({ className = null }) => {
	const [inputValues, setInputValues] = useState({
		inputs: [0],
		result: "",
	});
	const [equation, setTheEquation] = useState(null);
	let { inputs, result } = inputValues;
	const {
		extraInputsFilter,
		matchTheEquation,
		spacingBetweenOperations,
		showFirstEntry,
		showLastEntry,
		roundingTheResult,
		repeatEqualOperations,
		isFinite,
		theSliceKeyShouldWork,
		sliceValue,
		calculateTheResult,
	} = utils;
	const resultLength = showLastEntry(inputs)?.length;
	const equationLength = spacingBetweenOperations(equation)?.length;

	const handleClick = (value) => {
		inputs.push(value);
		inputs = extraInputsFilter(inputs);

		if (Number(inputs) === Number(result) && equation) {
			inputs = [...repeatEqualOperations(equation, result)].join("");
		} else {
			setTheEquation(null);
		}

		const isEquation = matchTheEquation(inputs, "[-+×÷=]")?.join("");

		if (isEquation) {
			result = calculateTheResult(inputs.slice(0, -1));
			result = roundingTheResult(result);
			inputs = [result, inputs.slice(-1)].join("");
		}

		if (matchTheEquation(isEquation, "=")) {
			setTheEquation(isEquation);
		}

		setInputValues({
			inputs: inputs.split(""),
			result,
		});
	};

	const handleSliceClick = () => {
		if (theSliceKeyShouldWork(inputs)) {
			setInputValues(({ inputs, ...state }) => ({
				inputs: sliceValue(inputs),
				...state,
			}));
		}
	};

	const handleDeleteClick = () => {
		setInputValues({ inputs: [0], result: "" });
		setTheEquation(null);
	};

	return (
		<section className={cn(s.container, className, s.flexColumn)}>
			<div className={s.topRow}>
				<div
					className={cn(s.input, s.equation, {
						[s.SBody]: equationLength >= 31,
					})}
				>
					{spacingBetweenOperations(equation) || showFirstEntry(inputs)}
				</div>
				<div className={s.resultWrapper}>
					<div
						className={cn(s.input, s.result, {
							[s.XLBody]: resultLength < 13,
							[s.LBody]: resultLength >= 13 && resultLength < 17,
							[s.MBody]: resultLength >= 17,
						})}
					>
						{showLastEntry(inputs)}
					</div>
					<Button
						contentType={s.MBody}
						className={s.slice}
						onClick={handleSliceClick}
					>
						<svg viewBox="0 0 32 32">
							<path d="M12.633 8.816c-0.543 0-1.059 0.234-1.417 0.643l-5.132 5.865c-0.621 0.71-0.621 1.769 0 2.479l5.132 5.865c0.357 0.408 0.874 0.643 1.417 0.643h11.937c1.039 0 1.882-0.843 1.882-1.882v-11.73c0-1.040-0.843-1.882-1.882-1.882h-11.937zM8.383 6.98c1.072-1.226 2.621-1.928 4.25-1.928h11.937c3.119 0 5.647 2.528 5.647 5.647v11.73c0 3.119-2.528 5.647-5.647 5.647h-11.937c-1.628 0-3.178-0.703-4.25-1.928l-5.132-5.865c-1.863-2.129-1.863-5.308 0-7.437l5.132-5.865zM21.103 12.366l-2.698 2.698-2.698-2.698c-0.497-0.497-1.302-0.497-1.799 0s-0.497 1.302 0 1.799l2.698 2.698-2.698 2.698c-0.497 0.497-0.497 1.302 0 1.799s1.302 0.497 1.799 0l2.698-2.698 2.698 2.698c0.497 0.497 1.302 0.497 1.799 0s0.497-1.302 0-1.799l-2.698-2.698 2.698-2.698c0.497-0.497 0.497-1.302 0-1.799s-1.302-0.497-1.799 0z" />
						</svg>
					</Button>
				</div>
			</div>
			<div className={cn(s.bottomRow, s.flexRow)}>
				<div className={s.wrapper}>
					<Button
						children="c"
						className={s.delete}
						onClick={handleDeleteClick}
					/>
					<Button
						children="%"
						contentType={s.LBody}
						className={cn(s.percentage, {
							[s.disable]: isFinite(inputs),
						})}
						onClick={() => handleClick("%")}
					/>
					<div className={s.keyboard}>
						{keys
							.map((character, index) => (
								<Button
									key={index}
									children={character}
									className={cn(s.keys, {
										[s.disable]: isFinite(inputs) && /[^0-9]/.test(character),
									})}
									onClick={() => handleClick(character)}
								/>
							))
							.reverse()}
					</div>
				</div>
				<div className={cn(s.operations, s.flexColumn)}>
					{operations.map(({ key, character }) => (
						<Button
							key={key}
							children={character}
							circular={key === "equal"}
							className={cn(s.operationButtons, {
								[s.disable]: isFinite(inputs) && key !== "equal",
							})}
							onClick={() => handleClick(character)}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Calculator;
