type ButtonPropsType = {
	title: string
	onClickHandler?:()=>void
	activeButtonClass?:string
}

export const Button = ({title, onClickHandler, activeButtonClass}: ButtonPropsType) => {
	return (
		<button className={activeButtonClass} onClick={onClickHandler}>{title}</button>
	)
}
