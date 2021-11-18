import * as nodemailer from 'nodemailer';

import { ObjectType } from 'src/types';
import { Query } from 'src/utils';

class Mailer {
  transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_EMAIL_APP_PASSWORD,
      },
    });
  }

  async sendVelogEmailAuthentication(velogAddress: string, email: string, query: ObjectType<any>) {
    const queryString = Query.objectToQuery(query);
    const mailOptions = {
      from: process.env.GOOGLE_EMAIL,
      to: email,
      subject: '[COCOO] Velog 사용자 인증 메일입니다.',
      html: `<h1>COCOO 사이트를 이용해주셔서 감사합니다.</h1>
             <p>Velog 블로그 ${velogAddress}을 COCOO Application 과 연동을 원하시면 아래 바로가기를 눌러주세요</p>
             <a href="${process.env.VELOG_CALLBACK_URL}?${queryString}">바로가기</a>`,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

export default new Mailer();
