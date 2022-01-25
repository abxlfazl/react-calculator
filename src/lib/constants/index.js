const operations = [
	{
		key: "division",
		character: "÷",
		onClick: (a, b) => a / b,
	},
	{
		key: "multiplication",
		character: "×",
		onClick: (a, b) => a * b,
	},
	{
		key: "minus",
		character: "-",
		onClick: (a, b) => a - b,
	},
	{
		key: "plus",
		character: "+",
		onClick: (a, b) => a + b,
	},
	{
		key: "equal",
		character: "=",
	},
];
const keys = [
	"±",
	"0",
	".",
	...Array(9)
		.fill("-")
		.map((_, index) => index + 1),
];

export { operations, keys };
