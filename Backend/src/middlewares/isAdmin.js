export const isAdmin = (req, res, next) => {
    // Ye check req.user (jo token se aata hai) se hoga
    if (req.user && req.user.role === 'admin') {
        next(); // Admin hai, aage badhne do
    } else {
        res.status(403).json({ message: "Access Denied. You are not an Admin." });
    }
};