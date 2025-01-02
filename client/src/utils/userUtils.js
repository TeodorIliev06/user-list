export const formatAddress = (address) => {
	if (!address ||
		Object.keys(address).length === 0) {
		return 'Address not provided.';
	}

	const formattedAddress = Object.values(address)
		.filter(Boolean) // remove falsy values
		.join(', ');

	return formattedAddress || 'Address not provided.';
}

export const getUserProperty = (user, propertyName, fallback = 'Not provided') => {
	return user && user[propertyName]
		? user[propertyName]
		: fallback;
}
