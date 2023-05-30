// createa a react component for div that includes a loading spinner
// Path: src\components\Loading.jsx
// Compare this snippet from src\components\Article_components\Content.jsx:
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export default function Loading() {
	return (
		<div
			className="loading"
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh',
			}}
		>
			<ReactLoading type="spin" color="#a1a1aa" width={50}/>

		</div>
	);
}
