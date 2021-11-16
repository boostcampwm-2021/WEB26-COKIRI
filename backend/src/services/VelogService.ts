import axios from 'axios';
import * as cheerio from 'cheerio';

import { ERROR, Mailer, VELOG_URL } from 'src/utils';
import { BlogService } from 'src/services/index';

class VelogService {
  async sendAuthorizationEmail(userID: string, blogUsername: string) {
    const url = VELOG_URL(blogUsername);

    const velogHTML = (await axios.get(url)).data;
    const $ = cheerio.load(velogHTML);
    const emailAddress = $('a[href^="mailto:"]').attr('href');
    if (!emailAddress) {
      throw new Error(ERROR.IS_NOT_EXIST_VELOG_EMAIL);
    }

    const result = await Mailer.sendVelogEmailAuthentication(url, emailAddress);
    return velogHTML;
  }
}

export default new VelogService();
