'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import styles from './home.module.scss';
const { Header, Content, Sider } = Layout;

const naves = [
	{
		key: 'client',
		label: '前端',
		routes: [
			{ key: 'ecmscript', label: 'ecmscript' },
			{
				key: 'web',
				label: 'web',
				routes: [{ key: 'webApi', label: 'webApi' }],
			},
		],
	},
	{ key: 'server', label: '后端' },
	{ key: 'database', label: '数据库' },
];

interface HomeLayoutProps {
	children: React.ReactNode;
}
const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const { push } = useRouter();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const checkedNav = naves.find(({ key }) =>
		pathname?.startsWith(`/home/` + key)
	);

	const siders = checkedNav?.routes;

	return (
		<Layout className={styles.demo__layout}>
			<Header>
				<div className={styles.logo} />
				<Menu
					theme='dark'
					mode='horizontal'
					defaultSelectedKeys={checkedNav ? [checkedNav.key] : undefined}
					items={naves.map(({ key, label }) => ({
						key,
						label: <Link href={`/home/${key}`}>{label}</Link>,
					}))}
				/>
			</Header>
			<Layout>
				<Sider
					className={styles.sider}
					width={200}
					style={{ background: colorBgContainer }}>
					<Menu
						mode='inline'
						items={siders?.map(({ key: parentKey, label, routes }) => {
							const targetPath = `/home/${checkedNav?.key}/${parentKey}`;
							return {
								key: parentKey,
								label: <Link href={targetPath}>{label}</Link>,
								children: routes?.map(({ label, key }) => {
									return {
										key,
										label: (
											<Link href={`${targetPath}/${key}`} key={key}>
												{label}
											</Link>
										),
									};
								}),
							};
						})}
					/>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}></Breadcrumb>
					<Content
						style={{
							padding: 24,
							margin: 0,
							minHeight: 280,
							background: colorBgContainer,
						}}>
						{children}
					</Content>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default HomeLayout;
