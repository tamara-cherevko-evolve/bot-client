import { cn } from 'utils/cn'

const CoinIcon = ({ coin, className }: { coin: string; className?: string }) => {
  let img
  try {
    img = require(`assets/images/coins/${coin}.png`)
  } catch (e) {
    return null
  }

  return <img src={img} alt={coin} className={cn('inline-block rounded-full w-8', className)} />
}

export default CoinIcon
