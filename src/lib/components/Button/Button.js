import cn from "classnames";

import s from "./Button.module.css";

const Button = ({
	className,
	circular,
	onClick = () => false,
	contentType = "XLBody",
	children,
}) => {
	return (
		<button
			className={cn(s.container, contentType, className, {
				[s.circular]: circular,
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
