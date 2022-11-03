import React from "react";

const FormatPrice = ({ price }) => {
	return Intl.NumberFormat("fil-PH", {
		style: "currency",
		currency: "PHP",
	}).format(price);
};

export default FormatPrice;
