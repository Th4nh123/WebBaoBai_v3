import React, { useState } from 'react'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import { ajaxCallGet, URL_API_GET } from '../../component/libs/base'

import { 
    getKey, 
    getKeyByIdCam, 
    getUrlByIdKey, 
    getKeyWordHaveVideo, 
    getKeyWordHaveGoogle 
} from '../../component/AjaxGet'

import { 
    resetKey, 
    deleteUrlByIdKey
} from '../../component/AjaxPost/Key'

import { Const_Libs } from '../../component/Toast'

import { changeCheckKey, changeCurrentIdKey, changeDataKey, changeDataKeyHaveGoogle, changeDataKeyHaveVideo, changeDataUrl } from '../../component/reducer_action/BaseReducerAction'

const XoaData = () => {
    const dispatch = useDispatch()
    const current_id_key = useSelector(state => state.base.current_id_key)
    const data_current_id_cam = useSelector(state => state.base.current_id_cam)
    const dataKey = useSelector(state => state.base.data_key)
    const checkKey = useSelector(state => state.base.check_key)

    const handleSapXepViTri = async () => {
        if (data_current_id_cam) {
            if (checkKey.length > 0) {
                for (const checkbox of document.querySelectorAll('input[name="key"]')) {
                    if (checkbox.checked) {
                        let id_key = checkbox.getAttribute('data-id-key')
                        await ajaxCallGet(`update-vi-tri/${id_key}`).then(rs => {
                            // console.log("update vi tri thanh cong " + id_key);
                        })
                        // .catch(err => console.log(err))
                    }
                }
                document.querySelector('input[name="key-all"]').checked = false;
                setTimeout(() => {
                    dispatch(changeCheckKey([]))
                    Const_Libs.TOAST.success('Xóa data của Key thành công')
                }, 1000)
            } else {
                Const_Libs.TOAST.error('Vui lòng chọn key trước khi thực hiện thao tác này')
            }
        } else {
            Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi thực hiện thao tác này!!!')
        }

    }


    const handleGetKeyByIdCam = (id) => {
        getKeyByIdCam(id).then(rs => {
            $('.box-note-default').addClass('d-flex');
            $('.box-note-default').removeClass('d-none');
            $('.box-note-all').addClass('d-none');
            $('.box-note-all').removeClass('d-flex');
            dispatch(changeDataKey([...rs]));
        })
        // .catch(err => console.log(err))
    }

    const handleGetKey = () => {
        getKey().then(rs => {
            dispatch(changeDataKey([...rs]))
        })
        // .catch(err => console.log(err))
    }


    const handleResetKey = idKey => {
        if (data_current_id_cam) {
            resetKey(idKey).then(rs => {
                handleGetKeyByIdCam(data_current_id_cam)
            })
            // .catch(err => console.log(err))
        } else {
            resetKey(idKey).then(rs => {
                handleGetKey()
            })
            // .catch(err => console.log(err))
        }
    }

    const handleGetUrlByKey = async id_key => {
        let key = dataKey.filter(item => item.id === id_key)
        // set_current_key_ref(key[0])
        dispatch(changeCurrentIdKey(id_key))
        return await getUrlByIdKey(id_key).then(rs => {
            for (let i = 0; i < rs.length; i++) {
                rs[i].state = 'create'
            }
            dispatch(changeDataUrl([...rs]))
            return rs
        })
        // .catch(err => console.log(err))
    }
    const getDataIdHaveVideo = async (id_cam) => {
        let arr1 = [];
        await getKeyWordHaveVideo(id_cam).then(async rs => {
            await rs.map(item => {
                arr1.push(item.id);
            })
            let reducedArray = arr1.reduce((acc, curr, _, arr) => {
                if (acc.length == 0) acc.push({ idKey: curr, count: 1 })
                else if (acc.findIndex(f => f.idKey === curr) === -1) acc.push({ idKey: curr, count: 1 })
                else ++acc[acc.findIndex(f => f.idKey === curr)].count
                return acc
            }, []);

            dispatch(changeDataKeyHaveVideo([...reducedArray]))
        })
    }


    const getDataIdHaveUrlGoogle = async (id_cam) => {
        let arr1 = [];
        await getKeyWordHaveGoogle(id_cam).then(async rs => {
            await rs.map(item => {
                arr1.push(item.id);
            })
            let reducedArray = arr1.reduce((acc, curr, _, arr) => {
                if (acc.length == 0) acc.push({ idKey: curr, count: 1 })
                else if (acc.findIndex(f => f.idKey === curr) === -1) acc.push({ idKey: curr, count: 1 })
                else ++acc[acc.findIndex(f => f.idKey === curr)].count
                return acc
            }, []);

            dispatch(changeDataKeyHaveGoogle([...reducedArray]))
        })
    }

    const UpdateCountRequest = async (count_request_y, count_request_g, id_key) => {
        let options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        await fetch(URL_API_GET + `update-count-request/${count_request_y}/${count_request_g}/${id_key}`, options).then(rs => rs.json())
            .then(rs => {
                // console.log("update COUNT REQUEST thành công")
            })
            // .catch(err => console.log(err))
            .finally(() => {

            })
    }

    // const getTotalRequest = (id_cam) => {
    //     ajaxCallGet('get-total-request/' + id_cam).then(rs => {
    //         console.log(rs);
    //         dispatch(changeTotalRequest([...rs]))
    //     })
    // }


    const handleClearDataByCheckBox = async () => {
        if (data_current_id_cam) {
            if (checkKey.length > 0) {
                $('.spin-clear-data').removeClass('d-none')
                for (const checkbox of document.querySelectorAll('input[name="key"]')) {
                    if (checkbox.checked) {
                        let id_key = checkbox.getAttribute('data-id-key')

                        await deleteUrlByIdKey(id_key).then(rs => {
                            handleResetKey(id_key)
                            handleGetUrlByKey(id_key)
                        }).catch(err => console.log(err))
                    }
                }
                document.querySelector('input[name="key-all"]').checked = false;
                $('.spin-clear-data').addClass('d-none')
                setTimeout(() => {
                    getDataIdHaveVideo(data_current_id_cam)
                    getDataIdHaveUrlGoogle(data_current_id_cam)
                    dispatch(changeCheckKey([]))
                    Const_Libs.TOAST.success('Xóa data của Key thành công')
                }, 1000)
            } else {
                Const_Libs.TOAST.error('Vui lòng chọn key trước khi thực hiện thao tác này')
            }
        } else {
            Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi thực hiện thao tác này!!!')
        }
    }

    return (
        <div className='col-3 delete' style={{ marginLeft: '12px' }}>
            <button
                type='button'
                onClick={() => {
                    handleClearDataByCheckBox()
                }}
                className='fw-bolder btn btn-outline-danger'
                style={{ fontSize: '14px' }}
            >
                <span className="spinner-border spinner-border-sm d-none spin-clear-data" style={{ marginRight: '3px' }}></span>
                Clear Data
            </button>

        </div>
    )
}

export default XoaData