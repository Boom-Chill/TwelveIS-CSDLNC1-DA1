const sql = require('mssql/msnodesqlv8')
const express = require('express')
const app = express()
const cors = require('cors')

//config db
const mssql = new sql.ConnectionPool({
  database: 'DA1',
  server: 'localhost',
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
})

const PORT = 5000

mssql.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`server run at ${PORT}`)
  })
 })

//middleware
app.use(express.urlencoded({ extended: true, limit: '50000mb' }))
app.use(express.json({limit: '50000mb' }))
app.use(cors())

const callInvoiceDetail = async (MaHD) => {
  const inVoiceID = `N\'${MaHD}\'`
  try {
    const result = await mssql.request().query(
      `
        select SP.TenSP, CTHD.SoLuong, CTHD.GiaBan, CTHD.GiaGiam, CTHD.ThanhTien
        from CT_HoaDon CTHD
        join SanPham SP on SP.MaSP = CTHD.MaSP
        where CTHD.MaHD = ${inVoiceID}
      `
    )
    
    const res = result.recordsets[0] 
    return res
  } catch (error) {
    console.log(error)
    return error
  }
}

app.get('/api/invoices', async (req, res) => {
  try {
    const result = await mssql.request().query(
      `
        select HD.MaHD, HD.NgayLap, HD.TongTien

        from HoaDon HD
        join CT_HoaDon CTHD on HD.MaHD = CTHD.MaHD
        join SanPham SP on SP.MaSP = CTHD.MaSP
        group by HD.MaHD, HD.NgayLap, HD.TongTien
      `
    )

    let productsRes = []

    for (const item of result.recordsets[0]) {
      const product = {
        ...item,
        SanPham: await callInvoiceDetail(item.MaHD),
      }
      
      productsRes = [ ...productsRes, product]
    }

    res.send(productsRes)
  } catch (error) {
    console.log(error)
  }
})

app.get('/api/invoice/summary', async (req, res) => {
  const {month, year} = req.query
  try {
    const result = await mssql.request().query(
      `
      select HD.TongTien, HD.NgayLap, CTHD.ThanhTien from HoaDon HD 
      join CT_HoaDon CTHD on HD.MaHD = CTHD.MaHD
      where YEAR(HD.NgayLap) = ${year} and MONTH(HD.NgayLap) = ${month}
        
      `
    )
    
    res.send(result.recordsets[0])
  } catch (error) {
    console.log(error)
  }
})


