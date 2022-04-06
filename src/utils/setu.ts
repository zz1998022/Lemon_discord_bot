import axios from "axios";

// 设置请求地址
axios.defaults.baseURL = "https://api.lolicon.app/setu/v2";
axios.interceptors.response.use((res) => res.data);

interface setuInter {
  r18?: number;
  num?: number;
  uid?: Array<number>;
  keyword?: string;
  tag?: Array<string> | Array<Array<string>>;
  size?: string[];
  proxy?: string;
  dataAfter?: number;
  dataBefore?: number;
  dsc?: boolean;
}

interface setuResInter {
  error: string;
  data: Array<{
    pid: number;
    p: number;
    uid: number;
    title: string;
    author: string;
    r18: boolean;
    width: number;
    height: number;
    tags: string[];
    ext: string;
    uploadDate: number;
    urls: {
      original: string;
    };
  }>;
}

export async function getSetu(params?: setuInter): Promise<setuResInter> {
  console.log(params);
  return axios.post("/", params);
}
