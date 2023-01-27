import $ from "jquery";

export const URL_API = "http://localhost:8000/api/rd/xml/a/";

export const URL_WEB = "http://localhost:8000";

export const LINK_SEARCH = "https://www.googleapis.com/customsearch/v1?";

export const LINK_SEARCH_YOUTUBE = "https://youtube-v31.p.rapidapi.com/search?"

export const CX_SEARCH = "622357283d8f7426e";

const TOKENHEADER_VALUE = getCookie("Authorization");

// get cookie
function getCookie(name) {
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

// Avoid Preflight request to reduce run time
export async function ajaxCallGet(url) {
    let true_response = null
    if (url.includes('?')) url = url.concat('&token=' + TOKENHEADER_VALUE)
    else url = url.concat('?token=' + TOKENHEADER_VALUE)
    await $.ajax({
        headers: {
          },
        type: 'GET',
        url: URL_API + url,
        success: function (response, status, jqXHR) {
            // status : success
            // jqXHR.status : 200
            true_response = response       
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // textStatus : error
            // jqXHR.status : 0
            $('.tab-content #main-error').html("Lỗi kết nối dữ liệu")
        }
    })
    return true_response
}