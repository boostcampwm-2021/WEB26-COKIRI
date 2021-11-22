import { Strategy as KakaoStrategy } from 'passport-kakao';
import * as passport from 'passport';
import { UserService } from 'src/services';

export default function passportKakaoLoader() {
  const kakaoStrategyOptions = {
    clientID: process.env.KAKAO_CLIENT_ID!,
    clientSecret: process.env.KAKAO_SECRET_ID!,
    callbackURL: process.env.KAKAO_CALLBACK_URL!,
  };

  const verifyKakaoUser = async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (error: any, user?: any, info?: any) => void,
  ) => {
    const user = await UserService.findOrCreateUserForProvider({
      authProvider: 'kakao',
      authProviderID: profile.id,
    });
    done(null, user);
  };

  passport.use('kakao', new KakaoStrategy(kakaoStrategyOptions, verifyKakaoUser));
}
