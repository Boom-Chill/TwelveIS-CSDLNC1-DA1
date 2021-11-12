import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Grid from '@mui/material/Grid'
import './Invoice.scss'

function Invoice(props) {
    const [invoices, setInvoices] = useState([])

    function sqlToJsDate(sqlDate) {
        if (!sqlDate) return

        const dateStr = sqlDate.split('T');
        const b = dateStr[1].split('Z')
        const a = b[0] + ' ' + dateStr[0];
        return a
    }

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/invoices')
                setInvoices(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getProduct()
    }, [])



    return (
        <div className="invoice">
            <h1>
                Hoá đơn
            </h1>
            <Grid container spacing={2}>
                {
                    invoices.map((item, idx) => (
                        <Grid item xs={12} md={6} key={idx}>
                            <div
                                className='invoice__item'
                            >
                                <div className="invoice__info">
                                    <p>Mã Hoá Đơn:</p>
                                    {item.MaHD}
                                </div>

                                <div className="invoice__info-table">
                                    <p>Chi tiết sản phẩm</p>
                                    <table>
                                        <tr>
                                            <th>Tên Sản Phẩm</th>
                                            <th>Giá</th>
                                            <th>Giá giảm</th>
                                            <th>Số lượng</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                        {
                                            item.SanPham.map((subItem) => (
                                                <tr>
                                                    <td>
                                                        {
                                                            subItem.TenSP
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(subItem.GiaBan)
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(subItem.GiaGiam)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            subItem.SoLuong
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(subItem.ThanhTien)

                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <th>Tổng tiền</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(item.TongTien)}</th>
                                        </tr>
                                    </table>
                                </div>


                                <div className="invoice__info">
                                    <p>Thời gian:</p>
                                    {sqlToJsDate(item.NgayLap)}
                                </div>
                            </div>

                        </Grid>
                    ))
                }
            </Grid>

        </div>
    );
}

export default Invoice;