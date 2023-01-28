import React from 'react';
import $ from "jquery";
import { useSelector } from 'react-redux';
import { getUrlByYoutube } from '../../component/AjaxGet'
import { UpdateCountKeyYoutube } from '../../component/AjaxPost/KeyYoutube'

const TestKeyYoutube = (props) => {
    const data_key_youtube = useSelector(state => state.base.data_key_youtube)
    const { handleGetAllKeyYt } = props;

    const handleTestKeyYoutube = async () => {
        let arr = [];
        if (data_key_youtube.length > 0) {
            await data_key_youtube.map(async item => {
                await getUrlByYoutube(10, item.key_api, item._id, 'xây dựng là gì?').then((response) => {
                    if (response.status === 200) {
                        $(`.youtube-item-${item._id}`).css("background-color", "green");
                    } else if (response.status === 429) {
                        $(`.youtube-item-${item._id}`).css("background-color", "orange");
                    } else {
                        $(`.youtube-item-${item._id}`).css("background-color", "red");
                    }
                    handleGetAllKeyYt();
                    UpdateCountKeyYoutube(item._id)
                })
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