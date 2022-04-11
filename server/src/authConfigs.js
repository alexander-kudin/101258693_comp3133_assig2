import jwt from 'jsonwebtoken' // JWT Module

export const authConfigs = (req) => {
    // Get Authorization Header Value
    const authHeader = req.get('Authorization');

    // Assign Authorization Header Value to Token variable
    const token = authHeader || ''

    // Check if Token exists
    if (!token || token === '') {
        return { isAuth: false, authData: null}
    }

    // Initialize empty Decoded Token variable
    let decodedToken;

    // Try to decode Token Value
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return { isAuth: false, authData: null}
    }
    
    // Check if Decoded Token Value exists
    if (!decodedToken) {
        return { isAuth: false, authData: null}
    }
    
    // Return Authentication User Info
    return { isAuth: true, userAuth: decodedToken}
};