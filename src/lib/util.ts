export function dateToRelative(date: Date) {
	const currentDate = new Date();
	const diff = date.getTime() - currentDate.getTime();
	if (diff < 0) return dateToRelativeBackwards(date);

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 12);

	if (seconds > 60) {
		if (minutes > 60) {
			if (hours > 12) {
				return `in ${days} day${days === 1 ? '' : 's'}`;
			} else {
				return `in ${hours} hour${hours === 1 ? '' : 's'}`;
			}
		} else {
			return `in ${minutes} minute${minutes === 1 ? '' : 's'}`;
		}
	} else {
		return `in ${seconds} second${seconds === 1 ? '' : 's'}`;
	}
}

export function dateToRelativeBackwards(date: Date) {
	const currentDate = new Date();
	const diff = currentDate.getTime() - date.getTime();

	const seconds = Math.floor(diff / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 12);

	if (seconds > 60) {
		if (minutes > 60) {
			if (hours > 12) {
				return `${days} day${days === 1 ? '' : 's'} ago`;
			} else {
				return `${hours} hour${hours === 1 ? '' : 's'} ago`;
			}
		} else {
			return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		}
	} else {
		return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
	}
}

export function isUserOnline(lastSeen: Date) {
	return new Date().getTime() - lastSeen.getTime() < 1000 * 60 * 3;
}
