import {IoMdCart} from 'react-icons/io'
import './index.css'

const Header = props => {
  const {restaurantName} = props
  return (
    <div className="header-container">
      <h1 className="website-name">{restaurantName}</h1>
      <div className="orders">
        <p className="order">My Orders</p>
        <IoMdCart className="cart-icon" />
      </div>
    </div>
  )
}
export default Header
