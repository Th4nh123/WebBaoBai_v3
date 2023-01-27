import React from 'react'
import { useState } from 'react';
import { ajaxCallPost } from '../AjaxPost';
import { Const_Libs } from '../Toast';

const ModalAddKeyGoogle = (props) => {

    const [keyGoogle, setKeyGoogle] = useState('')
    
    const [description, setDescription] = useState('')
    
    const { handleGetAllKeyGg } = props;

    const handleSubmit = () => {
        let data = [{
            key_api: keyGoogle,
            description: description,
        }]
        ajaxCallPost(`save-key-google`, data).then(response => {
            console.log(response);
            handleGetAllKeyGg();
            setKeyGoogle('');
            setDescription('');
            if (response.success === true) {
                Const_Libs.TOAST.success(response.message)
            }
            else {
                Const_Libs.TOAST.error(response.message)
            }
        })
        // .catch(err => { Const_Libs.TOAST.error("Thêm thất bại"); })

    }


    return (
        <>
            <button type="button" className="btn btn-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#myModalAddKeyGoogle" style={{ fontSize: '14px' }}>
                Thêm
            </button>
            <div>
                <div className="modal fade" id="myModalAddKeyGoogle">
                    <div className="modal-dialog modal-dialog-centered" style={{ minWidth: '700px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm Key google</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col-7">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Key google</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập ở đây"
                                                value={keyGoogle}
                                                onChange={e => setKeyGoogle(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-5">
                                            <label htmlFor="name-campaign" className="form-label fs-6 fw-bolder">Mô tả</label>
                                            <input type="text"
                                                className="form-control" id="name-campaign"
                                                placeholder="Nhập mô tả"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleSubmit()}>Submit</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddKeyGoogle