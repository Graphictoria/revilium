export const RCCMap: Map<
	string,
	{
		lastSeen: number;
		type: 'render' | 'game';
		jobs: number;
		host: string;
		secret: string;
	}
> = new Map();
