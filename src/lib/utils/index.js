import { operations } from "../constants";

class Utils {
	extraInputsFilter = (input) => {
		const getTheNumberSign = (pattern = "") =>
			new RegExp(
				`((?<ope>[-+×÷])${pattern}|^${pattern})(?<num>\\d+(\\.\\d*)?(e[+-]\\d+)?)(=|%)?±$`,
				"g"
			);

		return input
			.join("")
			.replace(/\.+/g, ".")
			.replace(/((?<=[-+×÷])|-?\d+(\.?\d*)?(e[+-]\d+)?(=|%))\./g, "0.")
			.replace(/(?<=\d{16})\.$/g, "")
			.replace(/\d+(\.\d*)?$/g, (result) =>
				result.includes(".") ? result.slice(0, 17) : result.slice(0, 16)
			)
			.replace(
				/^-?0\.?%|(?<=[-+×÷])-?0\.?%$|^0±|(?<=\d+(\.?\d*)?(e[+-]\d+)?[-+×÷])0±|-0\.?0*(?=[-+×÷])|^0+|(?<=[-+×÷])0+|∞=/g,
				"0"
			)
			.replace(/(^0|(?<=[-+×÷%])0)(?<num>[1-9])/g, "$<num>")
			.replace(getTheNumberSign("-"), "$<ope>$<num>")
			.replace(getTheNumberSign(), "$<ope>-$<num>")
			.replace(
				/^-?\d+(\.?\d*)?(e[+-]\d+)?(=|%)(?<num>\d+(\.?\d*)?(e[+-]\d+)?)/g,
				"$<num>"
			)
			.replace(
				/(?<num>-?\d+(\.?\d*)?(e[+-]\d+)?)(?<ope>[-+×÷%])=/g,
				"$<num>$<ope>$<num>="
			)
			.replace(/(?<ope>[-+×÷=%](?!\d+(\.?\d*)?(e[+-]\d+)?))+/g, "$<ope>")
			.replace(/(^-?|(?<=[×÷]))\d+(\.?\d*)?(e[+-]\d+)?(?==?%)/g, (num) => {
				return this.roundingTheResult(num / 100);
			})
			.replace(
				/(?<firstValue>-?\d+(\.?\d*)?(e[+-]\d+)?)(?<ope>[+-])(?<secondValue>-?\d+(\.?\d*)?(e[+-]\d+)?)(?=%)/,
				(_, ...values) => {
					let { firstValue, ope, secondValue } = values[values.length - 1];
					secondValue = this.roundingTheResult(
						(firstValue * secondValue) / 100
					);
					return `${firstValue}${ope}${secondValue}`;
				}
			)
			.replace(
				/(?<=-?\d+(\.?\d*)?(e[+-]\d+)?[-+×÷]-?\d+(\.?\d*)?(e[+-]\d+)?)%|∞(?=.)|(?<=^-?\d+(\.?\d*)?(e[+-]\d+)?[-+×÷%]?)=$|(?<=[-+×÷%]|(-?\d+(\.?\d*)?(e[+-]\d+)?[-+×÷%]\d+(\.?\d*)?(e[+-]\d+)?))±|(?<=\d+\.\d+)\.|(\.0*|(?<=\d+\.(0*[1-9]+)*)0+)(?=[-+=×÷%])/g,
				""
			);
	};
	matchTheEquation = (input, pattern) => {
		const regex = new RegExp(
			`^-?\\d+(\\.?\\d*)?(e[+-]\\d+)?[-+×÷]-?\\d+(\\.?\\d*)?(e[+-]\\d+)?${pattern}$`,
			"g"
		);
		return input?.match(regex);
	};
	spacingBetweenOperations = (input) => {
		return input?.replace(/(?<=-?(\d+(\.?\d*)?(e[+-]\d+)?))[-+=×÷]/g, " $& ");
	};
	showFirstEntry = (input) => {
		return this.spacingBetweenOperations(
			input
				.join("")
				.match(/^-?\d+(\.?\d*)?(e[+-]\d+)?[-+×÷%]/g)
				?.join("")
		);
	};
	showLastEntry = (input) => {
		return input
			.join("")
			.match(/((?<=[-+×÷])|^)-?\d+(\.?\d*)?(e[+-]\d+)?[-+=×÷%]?$|∞/g)
			?.join("")
			.replace(/(?<=\d+(\.?\d*)?)[-+=×÷%]/g, "")
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			.replace(/(?<=\..+),+/g, "");
	};
	roundingTheResult = (input) => {
		if (!isFinite(input)) {
			return String(input).replace(/Infinity/g, "∞");
		}

		return String(input)
			.replace(/\d+\.?\d*e[+-]\d+|^-?(\d{17,}|\d{16,}\.\d+)$/g, (value) =>
				Number.parseFloat(value).toExponential(6)
			)
			.replace(/(?<=[1-9]+|\d+\.)0+(?=e)|e\+0/g, "")
			.replace(/-?\d+\.\d+/g, (value) =>
				Number(Math.round(value + "e6") + "e-6")
			);
	};
	repeatEqualOperations = (input, replace) => {
		return input.replace(
			/-?\d+(\.?\d*)?(e[+-]\d+)?(?=[-+×÷]-?\d+(\.?\d*)?(e[+-]\d+)?=)/g,
			replace
		);
	};
	isFinite = (input) => {
		return /∞/.test(input.join(""));
	};
	theSliceKeyShouldWork = (input) => {
		return !/(^0|-?\d+(\.?\d*)?([-+×÷=%]0?|e[+-]\d+([-+×÷=%]0?)?))$/.test(
			input.join("")
		);
	};
	sliceValue = (input) => {
		return input
			.join("")
			.replace(/\d+(\.?\d*)?$/g, (str) => str.slice(0, -1))
			.replace(/^-?\d+(\.?\d*)?(e[+-]\d+)?[-+×÷]$/g, "$&0")
			.replace(/^('')?$|^-$|((?<=-?\d+(\.?\d*)?[-+×÷])-|(?<=[-+×÷])-0)$/g, 0)
			.split("");
	};
	calculateTheResult = (input) => {
		const [firstValue, operation, secondValue] =
			this.spacingBetweenOperations(input).split(" ");
		return operations
			.find(({ character }) => character === operation)
			.onClick(Number(firstValue), Number(secondValue));
	};
}

const utils = new Utils();

export default utils;
