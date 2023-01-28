import $ from 'jquery'
import '../../css/style.css'
import { Const_Libs } from "../libs/Const_Libs";
import { useState } from "react";
import { downloadFile, URL_GET_API } from '../libs/base';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ModalGetDataKey = (props) => {
    const current_id_cam = useSelector(state => state.base.current_id_cam);
    const data_cam = useSelector(state => state.base.data_cam);
    const [checked, setChecked] = useState(0)

    const [index, setIndex] = useState({
        start: '',
        end: ''
    });

    function unique(arr) {
        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            if (newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
            }
        }
        return newArr
    }

    const getNameCam = () => {
        let arr = [];
        arr = data_cam.filter((item) => {
            return item.id === current_id_cam;
        })
        return arr[0] ? arr[0].campaign : 'Not valid'
    }


    useEffect(() => {
        // if (current_id_cam) {
        const downloadJsonFile = async () => {

            fetch(`${URL_GET_API}createTH_wiki_new/${index.start}/${index.end}/${current_id_cam}/${checked}`)
                .then(res => {
                    // console.log(res);
                    return res.json();
                })
                .then(async (rs) => {
                    // console.log(rs);
                    Const_Libs.TOAST.success("Dữ liệu đang được tải xuống")
                    const json = JSON.stringify(rs, null, 2);
                    const blob = new Blob([json], { type: "application/json" });
                    const href = URL.createObjectURL(blob);

                    const link = document.createElement("a");
                    link.href = href;
                    link.download = `${getNameCam()}_${index.start}_${index.end}.json`;
                    document.body.appendChild(link);
                    link.click();

                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                    resetData();
                    // console.log('tai xong json')
                    await downloadTextFile();
                })
                .catch(err => {
                    Const_Libs.TOAST.error('Có 1 vài lỗi khi tải file JSON,')
                    // console.log('Có 1 vài lỗi khi tải file JSON', err)
                })
        }
        // } else {
        //     Const_Libs.TOAST.error('Vui lòng chọn chiến dịch trước khi download file')
        // }


        const downloadTextFile = () => {
            fetch(`${URL_GET_API}export_txt_wiki/${index.start}/${index.end}/${current_id_cam}`)
                .then(res => res.json())
                .then(async (rs) => {
                    let arr = [];
                    await rs.map(item => {
                        if (item.URL) {
                            arr.push(item.URL)
                        } else if (item.post_name) {
                            arr.push(item.post_name)
                        }
                    })
                    // JSON.stringify(arr).replace(/"|",|,/gi, "\n")
                    // console.log('tai xong text')
                    arr = await unique(arr);
                    let str = JSON.stringify(arr).replace(/"|\[|\]/gi, "");
                    str = str.replace(/,/gi, "\n");
                    const url = window.URL.createObjectURL(new Blob([str], { type: 'application/json' }));
                    const link = document.createElement('a');

                    link.href = url;
                    link.setAttribute(
                        'download',
                        `${getNameCam()}_${index.start}_${index.end}.text`,
                    );

                    document.body.appendChild(link);
                    link.click();

                    link.remove();

                })
                .catch(err => {
                    Const_Libs.TOAST.error('Có 1 vài lỗi khi tải file TXT,')
                    console.log('Có 1 vài lỗi khi tải file TXT', err)
                })

        }


        let btn_submit = document.getElementsByClassName('btn-submit')[0];


        btn_submit.addEventListener('click', downloadJsonFile)
        // btn_submit.addEventListener('click', downloadTextFile)
        return () => {
            btn_submit.removeEventListener('click', downloadJsonFile)
            // btn_submit.removeEventListener('click', downloadTextFile)
        }
    }, [index])


    const resetData = () => {
        setIndex({
            start: '',
            end: ''
        })
    }

    const webData = [
        {
            id: 0,
            name: 'Thời trang wiki'
        },
        {
            id: 1,
            name: 'Xây dựng số'
        }
    ]

    return (
        <>
            {
                current_id_cam ? <button
                    className='fw-bolder'
                    style={{ padding: '8px 18px', background: '#28a722', color: '#fff', borderRadius: '5px' }}
                    data-bs-toggle="modal" data-bs-target="#myModalGetData"
                    type="button"
                >
                    Xuất Data
                </button> : ''
            }
            <div>
                <div className="modal fade" id="myModalGetData" style={{}}>
                    <div className="modal-dialog modal-dialog-centered" style={{ minWidth: '1000px' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Nhập vị trí bạn muốn Dowload dữ liệu</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" />
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="black-key" className="form-label fs-6 fw-bolder">Vị trí bắt đầu</label>
                                            <input type="text"
                                                className="form-control" id="black-key"
                                                placeholder="Nhập vị trí bắt đầu"
                                                value={index.start}
                                                onChange={(e) => setIndex({ ...index, start: e.target.value })}
                                            />
                                        </div>
                                        <div className="col">
                                            <label htmlFor="black-type" className="form-label fs-6 fw-bolder">Vị trí kết thúc</label>
                                            <input type="text"
                                                className="form-control" id="black-type"
                                                placeholder="Nhập vị trí kết thúc"
                                                value={index.end}
                                                onChange={(e) => setIndex({ ...index, end: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </form>
                                <div style={{ display: 'flex', padding: '8px 0' }}>
                                    {webData.map((item, index) => {
                                        let idInput = `flexRadioDefault-${item.id}`
                                        return (
                                            <div className="form-check" key={item.id} style={{ paddingRight: '16px', cursor: 'pointer' }}>
                                                <input
                                                    style={{ fontSize: '16px' }}
                                                    checked={checked === item.id}
                                                    onChange={() => setChecked(item.id)}
                                                    className="form-check-input" type="radio"
                                                    name={idInput}
                                                    id={idInput} />
                                                <label className="form-check-label" htmlFor={idInput} style={{ fontSize: '15px' }}>
                                                    {item.name}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success btn-submit" data-bs-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalGetDataKey;