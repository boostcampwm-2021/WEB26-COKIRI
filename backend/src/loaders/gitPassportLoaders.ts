import { Application } from 'express';
import * as passport from 'passport';
import * as GitHubStrategy from 'passport-github';

import { UserService } from 'src/services';

export default function passportLoader(app: Application): void {
  const githubStrategyOptions = {
    clientID: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_SECRET_ID!,
    callbackURL: process.env.GITHUB_CALLBACK_URL!,
  };

  const verifyGithubUser = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    cb: any,
  ) => {
    try {
      /* eslint-disable-next-line no-underscore-dangle */
      const { id, login: username } = profile._json;
      const user = await UserService.findOrCreateUserForProvider({
        authProvider: 'github',
        authProviderID: id,
      });
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use('github', new GitHubStrategy(githubStrategyOptions, verifyGithubUser));
  app.use(passport.initialize());
}
