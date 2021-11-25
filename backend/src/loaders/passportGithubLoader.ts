import * as passport from 'passport';
import * as GitHubStrategy from 'passport-github';

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
    done: any,
  ) => {
    try {
      const { id, username } = profile;
      const user = { id, username };
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  };

  passport.use('github', new GitHubStrategy(githubStrategyOptions, verifyGithubUser));
}
