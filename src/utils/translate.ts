import axios, { AxiosResponse } from "axios";
import * as qs from "qs";

// Deepl API翻译响应类型定义
export interface DeeplResponse {
  translations: Array<{
    detected_source_language: string;
    text: string;
  }>;
}

// Deepl API翻译参数类型定义
export interface DeeplOptions {
  text: string;
  source_lang?: string;
  target_lang: string;
  preserve_formatting?: number;
  formality?: string;
}

// Deepl类定义
export default class Deepl {
  private auth_key: string; // 保存Deepl API认证密钥

  constructor(auth_key: string) {
    this.auth_key = auth_key; // 初始化Deepl实例时保存认证密钥
  }

  // Deepl API翻译方法
  public async translate(options: DeeplOptions): Promise<string> {
    // 格式化参数
    const data = qs.stringify({ ...options });
    try {
      // 使用axios发送POST请求到Deepl API翻译接口
      const response: DeeplResponse = await axios.post(
        "https://api-free.deepl.com/v2/translate", // Deepl API翻译接口URL
        data,
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${this.auth_key}`, // Deepl API认证密钥
            "Content-Type": "application/x-www-form-urlencoded", // 请求体格式为application/x-www-form-urlencoded
          },
        }
      );
      // 返回翻译结果的第一项
      return response.translations[0].text;
    } catch (error) {
      console.error(error);
      throw new Error("Unable to translate text."); // 抛出异常
    }
  }
}
