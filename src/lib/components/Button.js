import cn from "classnames";

const Button = ({
	className,
	circular,
	onClick = () => false,
	contentType = "XLBody",
	children,
}) => {
	return (
		<button
			className={cn("button", contentType, className, {
				button_circular: circular,
			})}
			onClick={(e) => {
				onClick(e);
			}}
		>
			{children}
		</button>
	);
};

export default Button;
