// createa a react component for div that includes a loading spinner
// Path: src\components\Loading.jsx
// Compare this snippet from src\components\ArticleComponents\Content.jsx:
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
	return (
		<div
			className="loading flex justify-center items-center h-screen"
		>
			<ReactLoading type="spin" color="#cfd8dc" width={50} />

		</div>
	);
}
