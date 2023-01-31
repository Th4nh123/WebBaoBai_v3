import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import useStateRef from 'react-usestateref'

import { resetCam } from '../../component/AjaxPost/ChienDich';
import { Const_Libs } from '../../component/Toast'
import { changeTrangThaiCam, changeTrangThaiCaoBai } from '../../component/reducer_action/BaseReducerAction';

const DungCaoBai = (props) => {
    const dispatch = useDispatch();

    const { value_stop_ref, set_value_stop_ref, get_value_stop_ref } = props;

    const data_current_id_cam = useSelector(state => state.base.current_id_cam)
    const data_trang_thai_cam = useSelector(state => state.base.data_trang_thai_cam);

    const handleResetCam = (id_cam) => {
        resetCam(id_cam).then(async response => {
            dispatch(changeTrangThaiCam(false));
            Const_Libs.TOAST.success(response.message)
        })
        // .catch(err => console.log(err))
    }

    /**
     * Dừng cào bài
     *
     * @param No
     * @author XHieu
     */
    const handleDungCao = async () => {
        if(data_trang_thai_cam) {
            set_value_stop_ref('stop')
            // await dispatch(changeTrangThaiCaoBai('stop'))
            await handleResetCam(data_current_id_cam)
        } else {
            Const_Libs.TOAST.error("Chiến dịch đang không được chạy!!!")
        }

    }
    return (
        <button
            type='button'
            onClick={() => {
                handleDungCao()
            }}
            className='fw-bolder btn btn-outline-primarybtn btn-outline-danger'
            style={{ fontSize: '14px' }}
        >
            Dừng cào bài
        </button>
    )
}

export default DungCaoBai