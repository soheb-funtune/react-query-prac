// import { stringify } from "qs";
// import SecureLS from "secure-ls";
import axios from "axios";

const defaultOptions = {
  headers: {},
  queryParams: null,
};

export const restClient = axios.create();

restClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const err = error.response;
    // const ls = new SecureLS();
    if (err.status === 401) {
      //   ls.remove("token");
      window.history.go("/");
    }
    return Promise.reject(error);
  }
);

const HttpClient = async (
  url = "",
  options = defaultOptions,
  noBaseUrl,
  allowRaw
) => {
  const baseUrl = "https://jsonplaceholder.typicode.com";
  let fullPath = noBaseUrl ? `${url}` : `${baseUrl}${url}`;

  if (options.queryParams) {
    const queryString = stringify(options.queryParams);
    fullPath = `${fullPath}?${queryString}`;
  }

  return await restClient({
    url: fullPath,
    method: options.method || "GET",
    data: options.data,
  })
    .then((response) => {
      return {
        data: response?.data || {},
        error: response?.data.error || response?.data.message,
        message: response?.data.message,
        success:
          (response?.status === 200 || response?.status === 201) &&
          response?.data?.status,
        ...(allowRaw && { raw_response: response }),
      };
    })
    .catch((err) => {
      return {
        data: err,
        errors: err?.response?.data.errors,
        success: false, // mock status
        errorData: err?.response?.data,
        message: err?.response?.message || err?.response?.data?.message,
        ...(allowRaw && { raw_error: err }),
      };
    });
};

export default HttpClient;
