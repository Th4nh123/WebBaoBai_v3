import React from 'react';
import $ from 'jquery'
import { useSelector } from 'react-redux';
import { ajaxCallGet, CX_SEARCH, LINK_SEARCH_YOUTUBE } from '../../component/AjaxGet'

const TestKeyYoutube = (props) => {
    const data_key_youtube = useSelector(state => state.base.data_key_youtube)
    const { handleGetAllKeyYt } = props;
    const UpdateCountKeyYoutube = (key_yt) => {
        ajaxCallGet(`update-count-key-youtube/${key_yt}`).then(response => {
            console.log(response.message);
        })
        // .catch(err => console.log(err))
    }

    function getUrlByYoutube(so_luong, KEY_API_SEARCH, id_key, key_search) {

        $.ajax({
            headers: {
                "X-RapidAPI-Key": KEY_API_SEARCH,
                "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com"
            },
            type: 'GET',
            contentType: 'application/json',
            url: `${LINK_SEARCH_YOUTUBE}q=${key_search}&part=snippet,id&maxResults=${so_luong}&order=relevance&regionCode=VN`,
            success: function (response, status, jqXHR) {
                console.log(status);
                // status : success
                // jqXHR.status : 200
                handleGetAllKeyYt()
                if (jqXHR.status === 200) {
                    UpdateCountKeyYoutube(id_key)
                    $(`.youtube-item-${id_key}`).css("background-color", "green");
                } else if (jqXHR.status === 403) {
                    $(`.youtube-item-${id_key}`).css("background-color", "red");
                } else if (jqXHR.status === 429) {
                    $(`.youtube-item-${id_key}`).css("background-color", "orange");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // textStatus : error
                // jqXHR.status : 0
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        })
    }

    const handleTestKeyYoutube = async () => {
        let arr = [];
        if (data_key_youtube.length > 0) {
            await data_key_youtube.map(item => {
                getUrlByYoutube(10, item.key_api, item._id, 'xây dựng là gì?')
            })
        }
    }

    return (
        <button type="button" className="btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyYoutube()}>
            Test Key
        </button>
    )
}

export default TestKeyYoutube