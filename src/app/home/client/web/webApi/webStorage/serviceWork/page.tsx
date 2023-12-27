'use client';
import { useEffect } from 'react';
const ServiceWorkPage = () => {
	useEffect(() => {
		navigator.serviceWorker
			.register('/sw.js')
			.then(function (ServiceWorkerRegistration) {
				console.log(ServiceWorkerRegistration.scope);
			})
			.catch(function (reason) {
				console.log(reason);
			});
	}, []);
	return <div>serviceWorker</div>;
};
export default ServiceWorkPage;
