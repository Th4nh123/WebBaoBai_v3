import React from 'react'

import $ from "jquery";

import { useSelector } from 'react-redux';

import { getUrlByGoogle } from "../../component/AjaxGet";

import { UpdateCountKeyGoogle } from "../../component/AjaxPost/KeyGoogle";

const TestKeyGg = (props) => {

    const { handleGetAllKeyGg } = props

    const data_key_google = useSelector(state => state.base.data_key_google)

    const handleTestKeyGoogle = async () => {
        if (data_key_google.length > 0) {
            $('.start-test-gg').addClass('d-none')
            $('.stop-test-gg').removeClass('d-none')
            await data_key_google.map(async (item, index) => {
                await handleGetAllKeyGg();
                let response = getUrlByGoogle(1, 1, item.key_api, 'xây dựng là gì?',null)
                if (response.status === 200) {
                    $(`.google-item-${item._id}`).css("background-color", "green").css("color", "white");
                    await UpdateCountKeyGoogle(item._id).then(response => {
                        console.log(response.message);
                    })
                } else if (response.status === 429) {
                    $(`.google-item-${item._id}`).css("background-color", "orange").css("color", "white");
                } else {
                    $(`.google-item-${item._id}`).css("background-color", "red").css("color", "white");
                }
                if (data_key_google.length - 1 === index) {
                    await handleGetAllKeyGg();
                }
            })
        }
    }

    const handleStopTestKeyGoogle = () => {
        $(`.google-item`).css("background-color", "rgba(0, 0, 0, 0)").css("color", "black");
        $('.start-test-gg').removeClass('d-none')
        $('.stop-test-gg').addClass('d-none')
    }

    return (
        <>
            <button type="button" className="start-test-gg btn btn-primary fw-bolder" style={{ fontSize: '14px' }} onClick={() => handleTestKeyGoogle()}>
                Test Key
            </button>
            <button type="button" className="stop-test-gg btn btn-primary fw-bolder d-none" style={{ fontSize: '14px' }} onClick={() => handleStopTestKeyGoogle()}>
                Dừng test Key
            </button>
        </>
    )
}

export default TestKeyGg