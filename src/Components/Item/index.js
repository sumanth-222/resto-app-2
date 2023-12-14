import {Component} from 'react'
import './index.css'

class Item extends Component {
  state = {count: 0}

  increase = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  decrease = () => {
    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  render() {
    const {categoryList} = this.props
    const {
      addOnCat,
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishName,
      dishImage,
      dishPrice,
    } = categoryList
    const {count} = this.state
    let isAddOn
    if (addOnCat.length > 0) {
      isAddOn = true
    }

    console.log(categoryList)
    return (
      <li className="item-container">
        <div className="item-details">
          <h1 className="dish-name">{dishName}</h1>
          <p className="currency-type">
            {dishCurrency} {dishPrice}
          </p>
          <p className="description">{dishDescription}</p>
          {dishAvailability ? (
            <div className="button-card">
              <button className="btn" type="button" onClick={this.decrease}>
                -
              </button>
              <p className="count">{count}</p>
              <button className="btn" type="button" onClick={this.increase}>
                +
              </button>
            </div>
          ) : null}
          {dishAvailability ? null : (
            <p className="not-available">Not Available</p>
          )}
          {isAddOn ? (
            <p className="customize">Customizations available</p>
          ) : null}
        </div>
        <div className="image-card">
          <p className="calories">{dishCalories} Calories</p>
          <img src={dishImage} className="image" alt="Dish" />
        </div>
      </li>
    )
  }
}

export default Item
