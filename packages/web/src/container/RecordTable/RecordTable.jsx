import React, { useEffect, useState } from 'react'
import './RecordTable.css'
import { useParams } from 'react-router-dom'
import RecordCard from '../../component/RecordCard/RecordCard'
import getValueSync from '../../firebase/firebaseInit'

function RecordTable() {
  const { userId } = useParams()
  const [data, setData] = useState([])
  useEffect(() => {
    async function getData() {
      const dataArr = await getValueSync(userId)
      setData(dataArr)
    }
    getData()
  }, [])
  return (
    <div className="data-div">
      <div className="data-table" border="0">
        <div className="row-1">
          <div className="col col-1">時間</div>
          <div className="col col-2">收縮壓</div>
          <div className="col col-3">舒張壓</div>
          <div className="col col-4">脈搏</div>
          {/* <div className="row row-5">血糖</div>
          <div className="row row-6">體重</div> */}
        </div>
        {data.length === 0 ? (
          <div>Loading</div>
        ) : (
          data.map((val) => <RecordCard val={val} />)
        )}
      </div>
    </div>
  )
}

export default RecordTable
