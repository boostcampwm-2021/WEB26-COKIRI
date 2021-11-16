import axios from 'axios';
import * as cheerio from 'cheerio';
import { nanoid } from 'nanoid';

import { ERROR, Mailer, VELOG_URL } from 'src/utils';
import { UserService } from 'src/services/index';

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
    const query = { identity: blogUsername, userID, token: nanoID };
    await UserService.updateOneUserVelogAuthentication(nanoID, userID);
    Mailer.sendVelogEmailAuthentication(url, emailAddress, query);
  }
}

export default new VelogService();
