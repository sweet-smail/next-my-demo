'use client';
import { Form, Button } from 'antd';
import { useEffect, useState } from 'react';

const CacheAPiPage = () => {
	const [form] = Form.useForm();
	const [storageEstimate, setStorageEstimate] = useState<StorageEstimate>();
	useEffect(() => {
		navigator.storage.estimate().then(setStorageEstimate);

		caches.open('TEST').then((cache) => {
			cache.add(`/api/status`);
		});
	}, []);

	const handleRequest = async () => {
		fetch('/api/status')
			.then((response) => {
				caches.open('TEST').then((cache) => {
					cache.put('/api/status', response);
				});
				return response.json();
			})
			.catch((error) => {
				return caches.match(`/api/status`).then((response) => {
					return response?.json();
				});
			})
			.then((data) => {
				console.log('data', data);
			});
	};
	return (
		<div>
			quota:{storageEstimate?.quota}
			<br />
			usage:{storageEstimate?.usage}
			<br />
			<Button onClick={handleRequest}>点击发起一个不存在的请求</Button>
		</div>
	);
};
export default CacheAPiPage;
