// middleware/auth.js


exports.requireAuth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header) return res.status(401).json({ error: 'Missing Token' });

      const token = header.replace("Bearer ", "");
      const data = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(data.id);
      if (!user) return res.status(401).json({ error: "Invalid Token" });

      if (roles.length && !roles.includes(user.role))
        return res.status(403).json({ error: "No Permission" });

      req.user = user;
      next();
    } catch (e) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
};
