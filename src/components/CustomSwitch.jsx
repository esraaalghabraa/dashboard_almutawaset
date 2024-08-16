import React from 'react'
import { ConfigProvider, Switch, Tooltip } from "antd";
import { BiCheck } from 'react-icons/bi';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const CustomSwitch = ({active,onChange}) => {
  return (
    <div>
        <ConfigProvider
            theme={{
                inherit:false,
                token:{
                colorPrimary:(active === 2 || active === 4) ? 'red' :
                (active === 0 ? 'green':(active === 3 ? 'blue':(active === 1 ?'purple':'gray'))),
                colorTextQuaternary:'#dc2626',
                colorPrimaryHover:'22c55e',
                colorTextTertiary:'dc2626'
                }
            }}
            >
            <Tooltip title="تغيير الحالة">
              <Switch
              value={active === 2 || active === 4  ? 0 : 1}
              onChange={onChange}
              size='small'
              checkedChildren={<CheckOutlined/>}
              unCheckedChildren={<CloseOutlined/>}
              direction="vertical"
              />
            </Tooltip>
              
        </ConfigProvider>
    </div>
  )
}

export default CustomSwitch
