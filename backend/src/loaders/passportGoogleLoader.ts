import { OAuth2Strategy as GoogleStrategy, VerifyFunction } from 'passport-google-oauth';
import { UserService } from 'src/services';
import * as passport from 'passport';

export default function passportGoogleLoader() {
  const googleStrategyOptions = {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_SECRET_ID!,
    callbackURL: process.env.GOOGLE_CALLBACK_URL!,
  };

  const verifyGoogleUser = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyFunction,
  ) => {
    const user = await UserService.findOrCreateUserForProvider({
      authProvider: 'google',
      authProviderID: profile.id,
    });
    done(null, user);
  };

  passport.use('google', new GoogleStrategy(googleStrategyOptions, verifyGoogleUser));
}
