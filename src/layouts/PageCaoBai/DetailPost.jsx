import React from 'react'
import { useDispatch } from 'react-redux'
import { getDetailPost } from '../../component/AjaxGet';
import { changeDetailPost } from '../../component/reducer_action/BaseReducerAction'

const DetailPost = ({id}) => {
    const dispatch = useDispatch();

    /**
 * Lấy ra chi tiết bài post
 *

 * @param id_key
 * @author XHieu
 */
    const getDetailPost = async id_post => {
        await getDetailPost(id_post).then(rs => {
            dispatch(changeDetailPost({ ...rs[0] }))
        }).catch(err => console.log(err))
    }
    return (
        <i
            data-bs-toggle='modal'
            data-bs-target='#exampleModal'
            style={{
                fontSize: '21px',
                color: '#6c6c6c',
                cursor: 'pointer'
            }}
            onClick={() => {
                getDetailPost(id)
            }}
            className='fa-regular fa-paste'
        ></i>
    )
}

export default DetailPost