import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MenuCategory from '../MenuCategory'
import Item from '../Item'

import './index.css'

class Home extends Component {
  state = {
    menuCategories: [],
    categoryItem: [],
    isLoading: true,
    restaurantName: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const restoName = data[0].restaurant_name
      const menuGenre = data[0].table_menu_list.map(each => ({
        menuCategory: each.menu_category,
        menuCategoryId: each.menu_category_id,
        categoryList: each.category_dishes,
      }))
      const category = menuGenre.filter(each => each.menu_category_id === 11)
      console.log(category)
      this.setState({
        menuCategories: menuGenre,
        categoryItem: category,
        restaurantName: restoName,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: true})
    }
  }

  getMenuCategoryId = async id => {
    const menuCategories = this.state
    const category = menuCategories.menuCategories.filter(
      each => each.menuCategoryId === id,
    )

    const updatedData = await category[0].categoryList.map(each => ({
      addOnCat: each.addonCat,
      dishAvailability: each.dish_Availability,
      dishCalories: each.dish_calories,
      dishCurrency: each.dish_currency,
      dishDescription: each.dish_description,
      dishImage: each.dish_image,
      dishPrice: each.dish_price,
      nextUrl: each.nxturl,
      dishId: each.dish_id,
      dishName: each.dish_name,
    }))
    console.log(updatedData)

    this.setState({categoryItem: updatedData})
  }

  render() {
    const {menuCategories, categoryItem, isLoading, restaurantName} = this.state
    console.log(isLoading)
    console.log(restaurantName)

    return (
      <div className="main">
        {isLoading ? (
          <div>
            <Loader
              type="Oval"
              color="blue"
              height={50}
              width={50}
              className="loader"
            />
          </div>
        ) : (
          <div className="Home-container">
            <Header restaurantName={restaurantName} />
            <ul className="categories_list">
              {menuCategories.map(each => (
                <MenuCategory
                  menuCategories={each}
                  key={each.menuCategoryId}
                  getMenuCategoryId={this.getMenuCategoryId}
                />
              ))}
            </ul>
            <ul>
              {categoryItem.map(each => (
                <Item categoryList={each} key={each.dishId} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default Home
