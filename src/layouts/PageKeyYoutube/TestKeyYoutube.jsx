import React from 'react';

import $ from "jquery";

import { useSelector } from 'react-redux';

import { getUrlByYoutube } from '../../component/AjaxGet'

import { UpdateCountKeyYoutube } from '../../component/AjaxPost/KeyYoutube'

const TestKeyYoutube = (props) => {

    const { handleGetAllKeyYt } = props;

    const data_key_youtube = useSelector(state => state.base.data_key_youtube)

    const handleTestKeyYoutube = async () => {
        if (data_key_youtube.length > 0) {
            $('.start-test-yt').addClass('d-none')
            $('.stop-test-yt').removeClass('d-none')
            await data_key_youtube.map(async (item, index) => {
                await handleGetAllKeyYt();
                let response = getUrlByYoutube(10, item.key_api, 'xây dựng là gì?')
                if (response.status === 200) {
                    $(`.youtube-item-${item._id}`).css("background-color", "green").css("color", "white");
                    await UpdateCountKeyYoutube(item._id).then(response => {
                        console.log(response.message);
                    })
                } else if (response.status === 429) {
                    $(`.youtube-item-${item._id}`).css("background-color", "orange").css("color", "white");
                } else {
                    $(`.youtube-item-${item._id}`).css("background-color", "red").css("color", "white");
                }
                if (data_key_youtube.length - 1 === index) {
                    await handleGetAllKeyYt();
                }
            })
        }
    }

    const handleStopTestKeyYoutube = () => {
        $(`.youtube-item`).css("background-color", "rgba(0, 0, 0, 0)").css("color", "black");
        $('.start-test-yt').removeClass('d-none')
        $('.stop-test-yt').addClass('d-none')
    }


    return (
        <>
            <button type="button" className="start-test-yt btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyYoutube()}>
                Test Key
            </button>
            <button type="button" className="stop-test-yt btn btn-primary fw-bolder d-none" style={{ fontSize: '14px' }} onClick={() => handleStopTestKeyYoutube()}>
                Dừng Test Key
            </button>
        </>
    )
}

export default TestKeyYoutube