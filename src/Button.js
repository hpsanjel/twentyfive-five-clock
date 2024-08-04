import React from "react";

const Button = ({ id, label, onClick }) => {
	return (
		<button id={id} onClick={onClick} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 m-2">
			{label}
		</button>
	);
};

export default Button;
