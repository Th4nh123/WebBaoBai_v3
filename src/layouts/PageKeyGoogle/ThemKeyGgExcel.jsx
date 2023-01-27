import React, { useState } from 'react'
import { OutTable, ExcelRenderer } from 'react-excel-renderer'
import { Const_Libs } from '../../component/Toast'
import { ajaxCallPost } from '../../component/AjaxPost'


const ThemKeyGgExcel = (props) => {
    const {handleGetAllKeyGg} = props;
    const [isUploading, setUploading] = useState(false);

    const fileGgHandler = event => {
        let fileObj = event.target.files[0]
        setUploading(true);

        ExcelRenderer(fileObj, async (err, resp) => {
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
                await ajaxCallPost(`save-key-google`, arr).then(response => {
                    handleGetAllKeyGg()
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
        <label htmlFor='inputTagKeyGg' style={{ marginRight: '10px' }}>
            <span className='btn btn-primary fw-bolder' style={{ fontSize: '14px', width: '100px' }}>Nhập Excel</span>
            <input
                id='inputTagKeyGg'
                key={isUploading}
                type='file'
                onChange={e => fileGgHandler(e)}
                style={{ display: 'none' }}
            />
        </label>
    )
}

export default ThemKeyGgExcel