import { ref } from "vue";
import { hasSiteError, errorCode } from "./error";

const isPageLoading = ref(false);

const network = {
  url: `${import.meta.env.VITE_API_BASE_URL}`,
  headers() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": "*",
    };
  },
  async get(endpoint: string) {
    isPageLoading.value = true;
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${endpoint}`, {
        method: "GET",
        headers: this.headers(),
        credentials: "include",
      })
        .then((response) => this.handleStatus(response, reject))
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err))
        .finally(() => (isPageLoading.value = false));
    });
  },
  async post(endpoint: string, payload: object) {
    isPageLoading.value = true;
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${endpoint}`, {
        method: "POST",
        headers: this.headers(),
        body: JSON.stringify(payload),
        credentials: "include",
      })
        .then((response) => this.handleStatus(response, reject))
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch(() =>
          reject(
            "There was a problem communicating with the server. Please, try again later"
          )
        )
        .finally(() => (isPageLoading.value = false));
    });
  },
  async put(endpoint: string, payload: object) {
    isPageLoading.value = true;
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${endpoint}`, {
        method: "PUT",
        headers: this.headers(),
        body: JSON.stringify(payload),
        credentials: "include",
      })
        .then((response) => this.handleStatus(response, reject))
        .then(() => resolve(true))
        .catch((err) => reject(err))
        .finally(() => (isPageLoading.value = false));
    });
  },
  async delete(endpoint: string) {
    isPageLoading.value = true;
    return new Promise((resolve, reject) => {
      fetch(`${this.url}${endpoint}`, {
        method: "DELETE",
        headers: this.headers(),
        credentials: "include",
      })
        .then((response) => this.handleStatus(response, reject))
        .then(() => resolve(true))
        .catch((err) => reject(err))
        .finally(() => (isPageLoading.value = false));
    });
  },
  handleStatus(response: any, reject: any) {
    switch (response.status) {
      case 400:
        hasSiteError.value = true;
        errorCode.value = 400;
        reject("400 Bad Request");
        break;
      case 403:
        hasSiteError.value = true;
        errorCode.value = 403;
        reject("403 Forbidden");
        break;
      case 404:
        hasSiteError.value = true;
        errorCode.value = 404;
        reject("404 Not Found");
        break;
      case 409:
        reject(
          "The project has been modified by another user. Refresh page to make changes."
        );
        break;
      default:
        return response;
    }
  },
};

export { network, isPageLoading };
