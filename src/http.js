export const fetchAvailablePlaces = async () => {
    const response = await fetch('http://localhost:3000/places')
    const data = await response.json()
    if (!response.ok) {
        throw new Error('Failed to fetch places');
    }
    return data
}

export const updateUserPlaces = async (places) => {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places}),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error('Falied to update user places')
    }
    return data.message;
}