import React, { useState } from 'react'
import { useSelector } from 'react-redux';

import { SaveBlackListByIdCam } from '../AjaxPost/BlackList';
import { Const_Libs } from '../Toast';

const ModalAddBlackList = (props) => {

    const { handleGetBlackListByIdCam } = props;
    const current_id_cam = useSelector(state => state.base.current_id_cam)

    const [blackKey, setBlackKey] = useState({
        domain: '',
        loai: ''
    });

    const handleSubmit = () => {
        let arr = [{
            domain: blackKey.domain,
            loai: blackKey.loai
        }]
        SaveBlackListByIdCam(current_id_cam, arr).then(response => {
            if (response.success === true) {
                Const_Libs.TOAST.success(response.message)
            }
            else {
                Const_Libs.TOAST.error(response.message)
            }
            handleGetBlackListByIdCam(current_id_cam)
            resetData()
        })
    }

    const resetData = () => {
        setBlackKey({
            domain: '',
            loai: ''
        })
    }
    return (
        <>
            <button type="button" className="btn btn-primary fw-bolder" data-bs-toggle="modal" data-bs-target="#myModalBlackList" style={{ fontSize: '14px' }}>
                Thêm
            </button>
            <div>
                <div className="modal fade" id="myModalBlackList">
                    <div className="modal-dialog modal-dialog-centered" style={{ minWidth: '1000px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Thêm Blacklist</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="black-key" className="form-label fs-6 fw-bolder">Black Key</label>
                                            <input type="text"
                                                className="form-control" id="black-key"
                                                placeholder="Nhập domain (vd: facebook.com)"
                                                value={blackKey.domain}
                                                onChange={(e) => setBlackKey({ ...blackKey, domain: e.target.value })}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="black-type" className="form-label fs-6 fw-bolder">Black type</label>
                                            <input type="text"
                                                className="form-control" id="black-type"
                                                placeholder="Nhập loại"
                                                value={blackKey.loai}
                                                onChange={(e) => setBlackKey({ ...blackKey, loai: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAddBlackList