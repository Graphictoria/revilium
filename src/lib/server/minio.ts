import { building } from '$app/environment';
import { env } from '$env/dynamic/private';
import * as Minio from 'minio';

const minio = new Minio.Client({
	endPoint: building ? 'building.local' : env.MINIO_ENDPOINT,
	useSSL: true,
	accessKey: building ? 'building' : env.MINIO_ACCESS_KEY,
	secretKey: building ? 'building' : env.MINIO_SECRET_KEY
});

export default minio;

export async function getObject(name: string) {
	return await minio.getObject(env.MINIO_BUCKET, name);
}

export async function getObjectMetadata(name: string) {
	return await minio.statObject(env.MINIO_BUCKET, name);
}
