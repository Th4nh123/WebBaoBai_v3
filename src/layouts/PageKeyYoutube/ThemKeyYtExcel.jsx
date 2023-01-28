import React, { useState } from 'react'
import { ExcelRenderer } from 'react-excel-renderer'
import { Const_Libs } from '../../component/Toast'
import { SaveKeyYoutube } from '../../component/AjaxPost/KeyYoutube'


const ThemKeyYtExcel = (props) => {
    const { handleGetAllKeyYt } = props;
    const [isUploading, setUploading] = useState(false);

    const fileYtHandler = event => {
        let fileObj = event.target.files[0]
        setUploading(true);

        ExcelRenderer(fileObj, async (err, resp) => {
            // resp.rows.splice(0, 3)
            // let data_key = [...resp.rows.filter(item => item.length !== 0)]
            console.log(resp.rows)
            if (err) {
                setUploading(false);
                console.log(err)
            } else {
                let arr = []
                await resp.rows.map(item => {
                    arr.push({
                        key_api: item[0]?.trim(),
                        description: item[1] ? item[1].trim() : ''
                    })
                })
                await SaveKeyYoutube(arr).then(response => {
                    handleGetAllKeyYt()
                    if (response.success === true) {
                        Const_Libs.TOAST.success(response.message)
                    }
                    else {
                        Const_Libs.TOAST.error(response.message)
                    }
                })
                // .catch(err => Const_Libs.TOAST.console.error('Thêm thất bại'))
            }
        })
    }
    return (
        <label htmlFor='inputTagKeyYt' style={{ marginRight: '10px' }}>
            <span className='btn btn-primary fw-bolder' style={{ fontSize: '14px', width: '100px' }}>Nhập Excel</span>
            <input
                id='inputTagKeyYt'
                key={isUploading}
                type='file'
                onChange={e => fileYtHandler(e)}
                style={{ display: 'none' }}
            />
        </label>
    )
}

export default ThemKeyYtExcel