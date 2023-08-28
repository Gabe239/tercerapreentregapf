import passport from 'passport';

export const registerUser = (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return res.status(500).send({ status: 'error', error: 'An error occurred' });
    }
    if (!user) {
      return res.status(400).send({ status: 'error', error: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      res.send({ status: 'success', message: 'User registered' });
    });
  })(req, res, next);
};

export const loginUser = (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'An error occurred' });
    }
    if (!user) {
      return res.status(400).json({ error: info.message });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      user.role = user.email === 'adminCoder@coder.com' ? 'admin' : 'user';

      req.session.user = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
      };

      return res.json({ status: "success", payload: user, message: "First login successful! :)" });
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};

export const githubAuth = passport.authenticate('github', { scope: ['user:email'] });

export const githubAuthCallback = passport.authenticate('github', { failureRedirect: '/login' }, (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});