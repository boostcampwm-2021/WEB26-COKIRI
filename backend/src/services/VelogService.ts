import axios from 'axios';
import * as cheerio from 'cheerio';
import { nanoid } from 'nanoid';

import { ERROR, Mailer, RESPONSECODE, VELOG_URL } from 'src/utils';
import { BlogService, UserService } from 'src/services/index';

class VelogService {
  async sendAuthorizationEmail(userID: string, blogUsername: string) {
    const url = VELOG_URL(blogUsername);
    const velogHTML = (await axios.get(url)).data;
    const $ = cheerio.load(velogHTML);
    const emailAddress = $('a[href^="mailto:"]').attr('href');
    if (!emailAddress) {
      throw new Error(ERROR.IS_NOT_EXIST_VELOG_EMAIL);
    }

    const nanoID = nanoid();
    const query = { identity: blogUsername, user_id: userID, token: nanoID };
    await UserService.updateOneUserVelogAuthentication(nanoID, userID);
    Mailer.sendVelogEmailAuthentication(url, emailAddress, query);
  }

  async compassAuthorization(userID: string, blogUsername: string, token: string) {
    const authentication = await UserService.findOneUserVelogToken(userID);
    if (!authentication!.blogAuthentication) {
      return ERROR.INVALID_REQUEST;
    }
    const { velog } = authentication!.blogAuthentication;
    if (!velog || velog.token !== token) {
      return ERROR.INVALID_REQUEST;
    }
    const elapsedTime = +Date.now() - +velog!.createdAt;
    if (elapsedTime > Number(process.env.VELOG_TOKEN_TTL)) {
      return ERROR.EXPIRED_VELOG_TOKEN;
    }
    await BlogService.createBlog({
      url: VELOG_URL(blogUsername),
      type: 'velog',
      identity: blogUsername,
      userID,
    });
    return RESPONSECODE.COMPLETED_VELOG_AUTHORIZATION;
  }
}

export default new VelogService();
