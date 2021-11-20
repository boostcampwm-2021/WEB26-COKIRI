import * as passport from 'passport';
import * as GitHubStrategy from 'passport-github';
import { User } from 'src/models';

import { UserService } from 'src/services';

export default function passportGithubLoader(): void {
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
      const { id, login: username } = profile._json;
      const user = { _id: id, username };

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  };

  passport.use('github', new GitHubStrategy(githubStrategyOptions, verifyGithubUser));
}
