import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './RecordCard.css'

function RecordCard(props) {
  const { val } = props
  const statusColor = {
    normal: '#fff',
    warning: '#ffd400',
    danger: '#c72028',
  }
  const [status, setStatus] = useState('normal')

  // Convert firebase date to standard Date format
  const date = new Date(val.DATE.seconds * 1000)
  const dateStr = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}\n ${date.getHours()}:${date.getMinutes()}`

  useEffect(() => {
    if (val !== undefined) {
      if (val.SYS >= 140 || val.DIA >= 90 || val.SUGAR >= 180) {
        // Danger
        setStatus('danger')
      } else if (val.SYS >= 120 || val.DIA >= 80 || val.SUGAR >= 150) {
        // Warning
        setStatus('warning')
      }
    }
  }, [val])

  return (
    <div style={{ backgroundColor: statusColor[status] }} className="card">
      <div className="col col-1">{dateStr}</div>
      <div className="col col-2">{val.SYS}</div>
      <div className="col col-3">{val.DIA}</div>
      <div className="col col-4">{val.PULSE}</div>
      {/* <div className="col col-5">{val.SUGAR}</div>
      <div className="col col-6">{val.WEIGHT}</div> */}
    </div>
  )
}

RecordCard.propTypes = {
  val: PropTypes.shape().isRequired,
}

export default RecordCard
