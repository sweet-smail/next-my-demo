import { Spinner } from '@/app/mui';
export default function Loading() {
	return (
		<div className='flex gap-8'>
			<Spinner color='amber' />
		</div>
	);
}
