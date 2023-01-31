import $ from "jquery";

// export const URL_API = "http://localhost:8000/api/rd/xml/a/";
export const URL_API = 'http://localhost:800/WebClone_V2-thanh/api/rd/xml/a/';

export async function ajaxCallPost(url, dataJson) {
  let true_response
  console.log(dataJson);
  await $.ajax({
    headers: {
      // preflight response
      'content-type': 'application/json'
    },
    type: "POST",
    url: URL_API + url,
    async: true,
    cache: false,
    data: 
    JSON.stringify(
      {
        data_json: dataJson
      }
    ),
    success: function (response) {
      true_response = response
      console.log(true_response);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
  });
  return true_response;
}

export async function ajaxCallPostNoR(url) {
  let true_response
  await $.ajax({
    headers: {
      // preflight response
      'content-type': 'application/json'
    },
    type: "POST",
    url: URL_API + url,
    async: true,
    cache: false,
    success: function (response) {
      true_response = response
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
  });
  
  return true_response
}