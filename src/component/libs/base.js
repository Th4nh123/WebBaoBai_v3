import $ from "jquery";
const TOKENHEADER_VALUE = getCookie("Authorization");

export const URL_API = "http://localhost:8000/api/rd/xml/a/";
export const URL_WEB = "http://localhost:8000";

export const URL_API_GET = "http://localhost:8000/api/rd/xml/a/";
export const URL_GET_API = "http://localhost:8000/api/rd/xml/a/";

export const URL_API_WEB = "http://localhost:8000";

export const KEY_API_SEARCH = "AIzaSyAgFsQKOcyb9s3MOvEWPf0005zXFgjXqKc";

export const LINK_SEARCH = "https://www.googleapis.com/customsearch/v1?";

export const CX_SEARCH = "622357283d8f7426e";

export const KEY_API_TRANS = "AIzaSyAtvWiWUms7XR_NkzhFXFkLa4BM-5jUTdE";
// export const KEY_API_TRANS = 'c0eb40b476msh231059c886fccc4p171a55jsn86d44ff993aa'

export const getHostname = (url) => {
  let host_name = new URL(url).hostname;
  let arr = host_name.split(".");
  let result = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (result.length < arr[i].length) {
      result = arr[i];
    }
  }
  return result;
};

export const getHostname2 = (url) => {
  let arr = url.split(".");
  let result = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (result.length < arr[i].length) {
      result = arr[i];
    }
  }
  return result;
};

export function downloadFile(file) {
  const element = document.createElement("a");
  element.setAttribute("href", file);
  element.setAttribute("download", "jdjdj");
  element.setAttribute("target", "_blank");
  // element.style.display = 'none'
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// get cookie
export function getCookie(name) {
  try {
    let match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) {
      return match[2];
    } else {
      return "";
    }
  } catch (e) {
    return "";
  }
}

export async function ajaxCallGet(url) {
  let rs = null
  if (url.includes('?')) url = url.concat('&token=' + TOKENHEADER_VALUE)
  else url = url.concat('?token=' + TOKENHEADER_VALUE)
  await $.ajax({
    headers: {
    },
    type: 'GET',
    dataType: 'json',
    url: URL_API_GET + url,
    success: function (result) {
      rs = result
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // console.log(errorThrown);
      // console.log(textStatus);
      // console.log(jqXHR);
    }
  })
  return rs
}

export async function ajaxCallPost(url, dataJson) {
  let messager
  await $.ajax({
    headers: {
    },
    type: "POST",
    url: URL_API + url,
    data: JSON.stringify(dataJson),
    contentType: 'application/json',
    success: function (response) {
      messager = response.message
    },
    error: function (jqXHR, textStatus, errorThrown) {
      // console.log(errorThrown);
      // console.log(textStatus);
      // console.log(jqXHR);
    },
  });
  return messager
}
