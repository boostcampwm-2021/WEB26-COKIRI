import axios from 'axios';

class VelogService {
  async findUserEmail(url: string) {
    const velogHTML = (await axios.get(url)).data;
    console.log(velogHTML);
  }
}

export default new VelogService();
