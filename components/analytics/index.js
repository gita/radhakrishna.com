import Plausible from './Plausible'
import siteMetadata from '@/data/siteMetadata'

const isProduction = process.env.NODE_ENV === 'production'

const Analytics = () => {
  return <>{isProduction && siteMetadata.analytics.plausible && <Plausible />}</>
}

export default Analytics
