import { useEffect, useState } from 'react'
import ua from 'ua-parser-js'
const useMobileDeviceDetection= () => {
  const deviceTypeHandler = () => {
    switch (ua.UAParser().device.type) {
      case ua.DEVICE.MOBILE:
        setIsMobile(true)
        break
      case ua.DEVICE.TABLET:
        setIsMobile(true)
        break
      default:
        setIsMobile(false)
    }
  }
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    deviceTypeHandler()
    window.addEventListener('resize', () => deviceTypeHandler())
    window.addEventListener('scroll', () => deviceTypeHandler())
  }, [])
  return isMobile
}
export default useMobileDeviceDetection