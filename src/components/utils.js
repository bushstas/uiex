export const getNumber = (n) => {
	if (typeof n == 'string' && n == ~~n) {
		n = ~~n;
	}
	if (typeof n == 'number') {
		return n;
	}
	return 0;
}