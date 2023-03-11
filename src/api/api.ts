import axios, { AxiosRequestConfig } from "axios";

abstract class Endpoint {
  static GENE = 'https://hcweludyx43jsvhmseysb5qjuy0yxnjw.lambda-url.eu-west-1.on.aws/?key=';
  static EXPERIMENT = ';'
  static AREA = 'https://adplenty-static.s3-eu-west-1.amazonaws.com/assets/area.json';
  static GOOGLE_AREA = 'https://adplenty-static.s3-eu-west-1.amazonaws.com/assets/google.json';
  static MAPPED_AREA = (path: string, key: string): string =>
    `https://api-1.advative.io/helena-post/${path}/${key}`;
  static MAPPED_AREA_STORAGE = (path: string, key: string): string => 
    `https://advative-static.s3.eu-west-1.amazonaws.com/helena/lister/${path}/${key}.json`;

  }


const DEFAULT_AXIOS_REQUEST_CONFIG: Partial<AxiosRequestConfig> = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
};

const GET_AXIOS_REQUEST_CONFIG: Partial<AxiosRequestConfig> = {
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
    "Content-Type": "application/json; charset=utf-8",
  },
};

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
export default class ApiError extends Error {
  constructor(public response: ApiResponse<any>) {
    super(response.message);
  }
}

function call(
  path: Endpoint,
  options: Partial<AxiosRequestConfig>
): Promise<ApiResponse<any>> {
  return axios({
    url: `${String(path)}`,
    ...options,
  })
    .then((response) => {

      return {
        success: true,
        message: undefined,
        data: response.data,
      };
    })
    .catch((error) => {
      if(error.response.statusText.includes("Not Found")) {
        return {
          success: false,
          message: "Not Found"
        }
      }
      return {
        success: false,
        message: error.response.statusText
      }
    });
}


function postToServer<T, R = any>(
  path: Endpoint,
  data?: T,
  options: Partial<AxiosRequestConfig> = DEFAULT_AXIOS_REQUEST_CONFIG,
): Promise<ApiResponse<any>> {
  return call(path, {
    method: "POST",
    data: data,
    ...options,
  });
}

function getFromServer<R = any>(
  path: Endpoint,
  options: Partial<AxiosRequestConfig> 
): Promise<ApiResponse<any>> {
  return call(path, {
    method: "GET",
    ...options,
  });
}

  export const postGene = (selectedGene : any) : Promise<ApiResponse<any>> => 
  getFromServer (
    Endpoint.GENE+selectedGene, {}
  )

  export const getExperimentData = (): Promise<ApiResponse<String>> => 
  getFromServer(
    Endpoint.EXPERIMENT,
    {}
  )
