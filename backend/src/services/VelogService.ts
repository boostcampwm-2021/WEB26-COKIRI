import axios from 'axios';
import * as cheerio from 'cheerio';

import { ERROR } from 'src/utils';

class VelogService {
  async findUserEmail(url: string) {
    const velogHTML = (await axios.get(url)).data;
    const $ = cheerio.load(velogHTML);
    const emailAddress = $('a[href^="mailto:"]').attr('href');
    if (!emailAddress) {
      throw new Error(ERROR.IS_NOT_EXIST_VELOG_EMAIL);
    }

    return velogHTML;
  }
}

export default new VelogService();
