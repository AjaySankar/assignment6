import React, { Component } from "react"
import { gql } from "apollo-boost"
import { Mutation } from "@apollo/react-components"

const RESET_VALUES = { name: "", price: "$", category: "Shirts", image: "" }

const addProductMutation = gql`
  mutation addProduct(
    $category: Category!
    $name: String!
    $price: Float!
    $image: String!
  ) {
    addProduct(
      product: {
        category: $category
        name: $name
        price: $price
        image: $image
      }
    ) {
      id
      category
      name
      price
      image
    }
  }
`

class ProductForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    const { formInput } = this.props
    this.state = {
      product: formInput || { ...RESET_VALUES },
    }
  }

  handleChange({ target }) {
    const { name, value } = target
    this.setState(({ product: prevProduct }) => {
      return { product: { ...prevProduct, ...{ [name]: value } } }
    })
  }

  render() {
    return (
      <Mutation mutation={addProductMutation}>
        {(addProduct) => {
          const {
            product: { category, price: inputPrice, name, image },
          } = this.state
          return (
            <div>
              <form
                onSubmit={(e) => {
                  const price = parseFloat(inputPrice.substring(1)) || 0
                  e.preventDefault()
                  addProduct({
                    variables: {
                      category,
                      name,
                      price,
                      image,
                    },
                  })
                  this.setState({
                    product: { ...RESET_VALUES },
                  })
                }}
              >
                <label>Category</label>
                <label>Price Per Unit </label>
                <select name="category" onBlur={this.handleChange}>
                  <option value="Shirts">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Jackets">Jackets</option>
                  <option value="Sweaters">Sweaters</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  name="price"
                  onChange={this.handleChange}
                  value={inputPrice}
                />
                <label>Product Name </label>
                <label>Image URL </label>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                />
                <input
                  type="text"
                  name="image"
                  onChange={this.handleChange}
                  value={image}
                />
                <input type="submit" value="Add Product" />
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}

export default ProductForm
