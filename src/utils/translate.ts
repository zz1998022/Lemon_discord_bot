import * as crypto from "crypto";
import axios from "axios";
import * as qs from "querystring";

interface configInter {
  appKey: string;
  appSecret: string;
}

interface queryInter {
  q: string;
  from: string;
  to: string;
  appKey: string;
  salt: number;
  sign: string;
  curtime: number;
}

interface ResponseInter {
  translation: Array<string>;
}

const transRequest = axios.create();

transRequest.interceptors.response.use((response) => response.data);

class Youdao {
  private appKey: string = "";
  private appSecret: string = "";
  private TRANS_SERVER = "https://openapi.youdao.com/api";
  // 配置id和密钥
  public config(config: configInter) {
    this.appKey = config.appKey;
    this.appSecret = config.appSecret;
  }
  //生成签名
  private generateSign(
    content: string,
    salt: number,
    appKey: string,
    appSecret: string
  ): string {
    const md5 = crypto.createHash("md5");
    md5.update(appKey + content + salt + appSecret);
    const cipher = md5.digest("hex");
    return cipher.slice(0, 32).toUpperCase();
  }
  // 翻译功能
  public translate(
    content: string,
    from: string,
    to: string
  ): Promise<ResponseInter> {
    const appKey = this.appKey;
    const appSecret = this.appSecret;
    const utf8 = Buffer.from(content).toString("utf8");
    const salt = Date.now();
    const sign = this.generateSign(utf8, salt, appKey, appSecret);
    // 整合参数
    const query: queryInter = {
      appKey,
      salt,
      sign,
      q: utf8,
      from: from,
      to: to,
      curtime: Math.round(new Date().getTime() / 1000),
    };
    // 发送请求
    return transRequest.post(
      this.TRANS_SERVER + "?" + qs.stringify({ ...query })
    );
  }
}

export default Youdao;
