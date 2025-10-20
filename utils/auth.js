// JWT Token validation utility
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const getStoredUser = () => {
    if (typeof window === 'undefined') return null;

    try {
        const stored = localStorage.getItem('user');
        if (!stored) return null;

        const userData = JSON.parse(stored);

        // Check if token exists and is valid
        if (userData.data?.token && !isTokenValid(userData.data.token)) {
            localStorage.removeItem('user');
            return null;
        }

        return userData;
    } catch (error) {
        localStorage.removeItem('user');
        return null;
    }
};

export const clearUserSession = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
};
