import React from 'react'

export type AlertProps = {
  message: string
}

export const Alert: React.FC<AlertProps> = ({ message }) => {
  return <div className="alert alert-danger w-100">{message}</div>
}

export default Alert
