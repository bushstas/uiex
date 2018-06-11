export const getNumber = (n, d = 0) => {
	if (typeof n == 'string' && n == ~~n) {
		n = ~~n;
	}
	if (typeof n == 'number') {
		return n;
	}
	if (typeof d == 'number') {
		return d;
	}
	return 0;
}