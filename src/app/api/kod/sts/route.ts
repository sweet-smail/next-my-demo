import { NextResponse } from 'next/server';
import * as Qiniu from 'qiniu';
import { getKodConfig } from '@/constant';

/**
 * @description 创建七牛临时上传凭证
 * @returns
 */
const getKodSts = ({ keyToOverwrite } = { keyToOverwrite: '' }) => {
	const { KOD_AK, KOD_SK, KOD_BUCKET, DEFAULT_EXPIRE } = getKodConfig();
	const mac = new Qiniu.auth.digest.Mac(KOD_AK, KOD_SK);
	const putPolicy = new Qiniu.rs.PutPolicy({
		expires: DEFAULT_EXPIRE,
		scope: keyToOverwrite ? KOD_BUCKET + ':' + keyToOverwrite : KOD_BUCKET,
	});
	return putPolicy.uploadToken(mac);
};

export async function POST(request: Request) {
	const reqBody = await request.json();
	return NextResponse.json({
		data: { token: getKodSts({ keyToOverwrite: reqBody.keyToOverwrite }) },
	});
}
