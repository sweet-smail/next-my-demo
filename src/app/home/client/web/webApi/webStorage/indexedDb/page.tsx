'use client';

import { useEffect, useRef } from 'react';
import { Button, Space } from 'antd';
class MyIndexDb {
	private db: IDBDatabase | null;
	constructor(db_name: string) {
		this.db = null;
		const request = window.indexedDB.open(db_name, 2);
		request.onerror = (event) => {
			console.log('error', (event.target as any).errorCode);
		};
		// 如果现在的数据库存在，则执行这个函数
		request.onsuccess = (event) => {
			const request = event.target as IDBOpenDBRequest;
			if (!this.db) this.db = request.result;
		};
		// 此函数只会在创建数据库或者数据库版本变化时才会执行，注意一定要在这里完成表，和索引等的简历
		request.onupgradeneeded = (event) => {
			console.log('upgradeneeded');
			if (!request.result.objectStoreNames.contains('person')) {
				const objectStore = request.result.createObjectStore('person', {
					keyPath: 'id',
					// autoIncrement: true,//如果没有主键属性，可以使用自动生成的主键
				});
				// 创建索引 索引名 索引所在的属性 约束
				objectStore.createIndex('name', 'name', { unique: false });
				objectStore.createIndex('email', 'email', { unique: true });
			}
		};
	}
	async addRecord(table_name: string, value: Record<string, any>) {
		// 创建一个事物。
		const request = this.db
			?.transaction([table_name], 'readwrite')
			.objectStore(table_name)
			.add(value);

		if (request) {
			request.onsuccess = function () {
				console.log('添加数据成功');
			};
			request.onerror = function () {
				// request.error 获取错误
				console.log('添加数据失败', request.error);
			};
		}
	}
	// 遍历数据
	async readSingleAll(table_name: string, user_id: number) {
		return new Promise((resolve, reject) => {
			const tables = this.db?.transaction([table_name], 'readwrite');
			const personsDataCenter = tables?.objectStore('person');
			const request = personsDataCenter?.get(user_id);
			if (request) {
				request.onsuccess = function () {
					resolve(request.result);
				};
				request.onerror = function () {};
			}
		});
	}
	// 更新数据
	putData(table_name: string, value: any) {
		return new Promise((resolve, reject) => {
			const tables = this.db?.transaction([table_name], 'readwrite');
			const personsDataCenter = tables?.objectStore('person');
			const request = personsDataCenter?.put(value);
			if (request) {
				request.onsuccess = function () {
					resolve(request.result);
				};
				request.onerror = function () {};
			}
		});
	}
	// 更新数据
	delete(table_name: string, id: any) {
		return new Promise((resolve, reject) => {
			const tables = this.db?.transaction([table_name], 'readwrite');
			const personsDataCenter = tables?.objectStore('person');
			const request = personsDataCenter?.delete(id);
			if (request) {
				request.onsuccess = function () {
					resolve(request.result);
				};
				request.onerror = function () {};
			}
		});
	}
}

const IndexedDbPage = () => {
	const instanceRef = useRef<MyIndexDb | null>(null);

	useEffect(() => {
		const cacheInstance = new MyIndexDb('DbTest');
		setTimeout(() => {
			instanceRef.current = cacheInstance;
		}, 1000);
	}, []);
	return (
		<Space>
			<Button
				onClick={() => {
					//点击添加重复数据
					instanceRef.current!.addRecord('person', {
						id: Math.random() * 100,
						name: '张三',
						age: 24,
						random: Math.random(),
						email: 'zhang1san@example.com',
					});
				}}>
				添加重复数据
			</Button>
			<Button
				onClick={() => {
					instanceRef.current!.readSingleAll('person', 1).then((value) => {
						console.log(value);
					});
				}}>
				显示全部数据
			</Button>
		</Space>
	);
};

export default IndexedDbPage;
