import React from 'react'

const iconMock = (size, className, name) => {
  return (
    <svg className={`${className} ${name}`} width={size} height={size}>
      <rect width={size} height={size} />
    </svg>
  )
}

export const IconClose = ({ size, className }) =>
  iconMock(size, className, 'IconClose')

export const IconMinus = ({ size, className }) =>
  iconMock(size, className, 'IconMinus')

export const IconPlus = ({ size, className }) =>
  iconMock(size, className, 'IconPlus')
