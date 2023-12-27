import { NextResponse } from 'next/server';
import { getStaticUser } from '@/constant';
export const POST = async (request: Request) => {
	const { user_name, password } = await request.json();
	const { USER_NAME, PASSWORD } = getStaticUser();
	if (user_name !== USER_NAME || password !== PASSWORD) {
		return new Response(
			JSON.stringify({ message: '请输入用户名或者密码', success: false }),
			{
				status: 400,
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
	}
	return NextResponse.json({ success: true, message: 'success' });
};
