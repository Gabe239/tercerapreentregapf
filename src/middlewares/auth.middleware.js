export const adminAuthorize = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};

export const userAuthorize = (req, res, next) => {
    const user = req.session.user;

    if (!user || user.role !== 'user') {
        return res.status(403).json({ message: 'Access denied' });
    }

    next();
};