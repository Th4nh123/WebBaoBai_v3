import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import { useDispatch, useSelector } from 'react-redux'
import useStateRef from 'react-usestateref'

import { getUrlByIdKey, getKeyWordHaveGoogle, getKeyWordHaveVideo, getOneKey } from '../../component/AjaxGet'
import { changeCheckKey, changeCurrentIdKey, changeDataKeyHaveGoogle, changeDataKeyHaveVideo, changeDataUrl } from '../../component/reducer_action/BaseReducerAction'
import SearchKey from './SearchKey'


const DanhSachKey = () => {
    const dispatch = useDispatch();
    const current_id_cam = useSelector(state => state.base.current_id_cam)

    const [
        current_key_ref,
        set_current_key_ref,
        get_current_key_ref
    ] = useStateRef(null)

    const current_id_key = useSelector(state => state.base.current_id_key)
    const dataKey = useSelector(state => state.base.data_key)
    const checkKey = useSelector(state => state.base.check_key)
    const data_key_have_video = useSelector(state => state.base.data_key_have_video);
    const data_key_have_url_google = useSelector(state => state.base.data_key_have_google);

    /**
       * Thay đổi nút bắt đầu cào và cào lại, 
       *
       * @param checkKey
       * @author THieu
       */
    useEffect(() => {
        if (checkKey.length !== 0) {
            $('.start-cao-lai').removeClass('d-none')
        } else {
            $('.start-cao-lai').addClass('d-none')
        }
    }, [checkKey.length])

    useEffect(() => {
        if (current_id_cam) {
            getDataIdHaveVideo(current_id_cam)
            getDataIdHaveUrlGoogle(current_id_cam)   
        }
    }, [current_id_cam])


    const getDataIdHaveVideo = async (id_cam) => {
        let arr1 = [];
        await getKeyWordHaveVideo(id_cam).then(async rs => {
            await rs.map(item => {
                arr1.push(item._id);
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
                arr1.push(item._id);
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

    const isEnoughtYoutube = (id_key, ky_hieu, dataArr) => {
        let arrKyHieu = ky_hieu.split('.');
        let aYoutube = arrKyHieu.filter(item => {
            return item.includes('y');
        })
        let so_luong;
        if (Boolean(aYoutube) === true) {
            if (aYoutube[0]) {
                if (aYoutube[0].slice(1) === '') {
                    so_luong = 1;
                } else {
                    so_luong = Number(aYoutube[0].slice(1))
                }
            }
        }
        let result;
        if (Boolean(dataArr) === true) {
            if (id_key) {
                if (Boolean(aYoutube) === true) {
                    result = dataArr.some(item => {
                        return item.idKey === id_key && item.count === so_luong;
                    })
                }
            }
        }
        return result;
    }

    const isEnoughtGoogle = (id_key, ky_hieu, dataArr) => {
        let arrKyHieu = ky_hieu.split('.');
        let aGoogle = arrKyHieu.filter(item => {
            return item.includes('w');
        })
        let result;
        if (Boolean(dataArr) === true) {
            if (id_key) {
                if (Boolean(aGoogle) === true) {
                    result = dataArr.some(item => {
                        return item.idKey === id_key && item.count > 0;
                    })
                }
            }
            return result;
        }
    }

    const handleGetUrlByKey = async id_key => {
        let key = dataKey.filter(item => item.id == id_key)
        set_current_key_ref(key[0])
        // set_current_id_key(id_key)
        dispatch(changeCurrentIdKey(id_key))
        return await getUrlByIdKey(id_key).then(rs => {
            console.log(rs);
            for (let i = 0; i < rs.length; i++) {
                rs[i].state = 'create'
            }
            dispatch(changeDataUrl([...rs]))
            return rs
        }).catch(err => console.log(err))
    }

    const addRemoveCheck = (id) => {
        console.log(checkKey);
        const isChecked = checkKey.includes(id);
        if (isChecked) {
            return checkKey.filter(item => item !== id)
        } else {
            return [...checkKey, id]
        }
    }

    const handleChangeCheckBoxKey = (id) => {
        // console.log(id);
        dispatch(changeCheckKey(addRemoveCheck(id)))
    }

    const getIdKey = async () => {
        let arr = [];
        await getOneKey(current_id_cam).then(async rs => {
            await rs.map(item => {
                arr.push(item._id)
            })
        })
        dispatch(changeCheckKey([...arr]));
    }


    const handleCheckKeyAll = () => {
        if ($('#check-key-cao-all').prop('checked')) {
            getIdKey();
            $('.start-cao-lai').removeClass('d-none')
            $('input[name="key"]').prop('checked', true)
        } else {
            dispatch(changeCheckKey([]));
            $('.start-cao-lai').addClass('d-none')
            $('input[name="key"]').prop('checked', false)
        }
    }

    return (
        <>
            <div className='d-flex align-items-cente position-sticky  align-items-center'
                style={{ zIndex: '10000', background: '#fff', top: '56px' }}
            >
                <div className=''>
                    <input
                        style={{ width: '18px', height: '18px' }}
                        id='check-key-cao-all'
                        type='checkbox'
                        name='key-all'
                        onClick={() => handleCheckKeyAll()}
                        className='me-2 input-key-all'
                    />
                </div>
                <SearchKey />
            </div>
            <div className='list-key' style={{ position: 'relative' }}>
                {dataKey.length == 0 ? <span>Không tồn tại key</span> : ''}
                {dataKey.map((item, index) => {
                    let label_key = `label-key-${item._id}`
                    let input_key = `input-key-${item._id}`
                    return (

                        <div
                            className='item d-flex align-items-center mt-1 mb- fw-bolder'
                            style={{ fontSize: '14px', padding: '3px 0' }}
                            key={label_key}
                        >
                            <input
                                type='checkbox'
                                name='key'
                                data-id-key={item._id}
                                data-index-key={index}
                                className={`me-2 input-key ${input_key}`}
                                data-name-key={item.ten}
                                checked={checkKey.includes(item._id)}
                                onChange={() => handleChangeCheckBoxKey(item._id)}
                            />
                            <label
                                style={{ marginLeft: '8px', cursor: 'pointer' }}

                                className={
                                    item.check == true
                                        ? `h-100 mt-2 text-primary label-key ${label_key}`
                                        : `h-100 mt-2 label-key ${label_key}`
                                }
                                data-id-key={item.id}
                                id={
                                    current_id_key === item._id
                                        ? 'text-green'
                                        : ''
                                }
                                onClick={() => {
                                    handleGetUrlByKey(item._id)
                                }}
                            >

                                {index + 1}. {item.ten}
                            </label>
                            <span
                                // className={get_current_id_key.current === item.id ? 'fa-regular fa-circle-play color-primary' : ''}
                                style={{ fontSize: '13px', position: 'absolute', right: '16px', color: '#605c5c' }}
                            >
                                {!isEnoughtYoutube(item._id, item.ky_hieu, data_key_have_video) && <i className="fa-brands fa-youtube" style={{ color: 'red' }}></i>}
                                {!isEnoughtGoogle(item._id, item.ky_hieu, data_key_have_url_google) && <i className="fa-brands fa-google" style={{ color: 'orange', marginLeft: '8px' }}></i>}
                            </span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default DanhSachKey