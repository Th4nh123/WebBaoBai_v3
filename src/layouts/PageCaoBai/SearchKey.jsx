import React from 'react'
import $ from 'jquery'
import { useSelector, useDispatch } from 'react-redux';
import { findKey, getKeyByIdCam } from '../../component/AjaxGet';
import { changeDataKey } from '../../component/reducer_action/BaseReducerAction';

const SearchKey = () => {
    const dispatch = useDispatch();
    const data_current_id_cam = useSelector(state => state.base.current_id_cam)

    const handleGetKeyByIdCam = (id) => {
        getKeyByIdCam(id).then(rs => {
            $('.box-note-default').addClass('d-flex');
            $('.box-note-default').removeClass('d-none');
            $('.box-note-all').addClass('d-none');
            $('.box-note-all').removeClass('d-flex');
            dispatch(changeDataKey([...rs]));
        }).catch(err => console.log(err))
    }

    /**
     *  Tìm kiếm key theo tên
     *
     * @param name_key: tên của key
     * @author XHieu
     */

    const findLikeKey = name_key => {
        if (name_key === '') {
            if (data_current_id_cam) {
                handleGetKeyByIdCam(data_current_id_cam)
            }
        } else {
            if (data_current_id_cam) {
                findKey(name_key).then(async rs => {
                    let arr = await rs.filter((item) => {
                        return item.id_cam === data_current_id_cam;
                    })
                    dispatch(changeDataKey([...arr]))
                }).catch(err => console.log(err))
            } else {
                findKey(name_key).then(async rs => {
                    dispatch(changeDataKey([...rs]))
                }).catch(err => console.log(err))
            }

        }
    }

    return (
        <div
            className='search-key d-flex align-items-center'
            style={{ width: '100%' }}
        >
            <i
                className='fa-solid fa-magnifying-glass'
                style={{ width: '10%' }}
            />
            <input
                type='text'
                onChange={function (event) {
                    findLikeKey(event.target.value)
                }}
                placeholder='Tìm kiếm Key'
                style={{ width: '90%', outline: 'none' }}
            />
        </div>
    )
}

export default SearchKey