import jwt from 'jsonwebtoken';

const verifyUser = (req, res, next) => {
    const token = req.cookies.authToken;
    console.log(token);
    
    // Check if token exists
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: Missing token' });
    }

    // Verify the token
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        

        next();
    });
};

export default verifyUser;
