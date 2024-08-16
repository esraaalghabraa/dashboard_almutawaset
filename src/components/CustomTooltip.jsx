import { Tooltip } from 'antd'
import React from 'react'
import { useStateContext } from '../context/ContextProvider';

const CustomTooltip = ({ children, text }) => {
    const { showTooltip } = useStateContext();

  return (
    <div >
    <Tooltip fresh color='#666666' open={showTooltip} title={text} placement='left'>
        {children}
    </Tooltip>
    </div>
  )
}
export default CustomTooltip