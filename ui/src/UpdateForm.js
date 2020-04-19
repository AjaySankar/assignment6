import React, { Component } from "react"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"
import { Link } from "react-router-dom"
import TextInput from "./TextInput"
import NumInput from "./NumberInput"

const RESET_VALUES = { name: "", price: "$", category: "Shirts", image: "" }

const updateProductMutation = gql`
  mutation updateProduct(
    $id: Int!
    $category: Category!
    $name: String!
    $price: Float!
    $image: String!
  ) {
    updateProduct(
      product: {
        id: $id
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

class UpdateForm extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
    const {
      match: {
        params: { id },
      },
    } = this.props
    this.state = {
      product: { ...RESET_VALUES, ...{}, ...{ id: parseInt(id, 10) } },
    }
  }

  handleChange({ target }, naturalValue) {
    const { name, value: textValue } = target
    const value = naturalValue === undefined ? textValue : naturalValue
    this.setState(({ product: prevProduct }) => {
      return { product: { ...prevProduct, ...{ [name]: value } } }
    })
  }

  handleSave(e) {
    const { product } = this.state
    const { id, category, name, image, price } = product
    const { updateProduct } = this.props
    updateProduct({
      variables: {
        id,
        category,
        name,
        price,
        image,
      },
    })
      // eslint-disable-next-line no-unused-vars
      .then(({ data = {} }) => {
        // reset the form values to blank after submitting
        this.setState({
          product: { ...RESET_VALUES },
        })
      })
      .catch((error) => {
        window.console.error(
          `Error occured while update product: ${error || ""}`
        )
      })
      .finally(() => e.preventDefault()) // prevent the form submit event from triggering an HTTP Post
  }

  render() {
    const {
      product: { price, name, image },
    } = this.state
    return (
      <form>
        <label>Category</label>
        <label>Price Per Unit </label>
        <select name="category" onBlur={this.handleChange}>
          <option value="Shirts">Shirts</option>
          <option value="Jeans">Jeans</option>
          <option value="Jackets">Jackets</option>
          <option value="Sweaters">Sweaters</option>
          <option value="Accessories">Accessories</option>
        </select>
        <NumInput name="price" onChange={this.handleChange} value={price} />
        <label>Product Name </label>
        <label>Image URL </label>
        <TextInput name="name" onChange={this.handleChange} value={name} />
        <TextInput name="image" onChange={this.handleChange} value={image} />
        <input type="submit" value="Update Product" onClick={this.handleSave} />
        <Link to="/"> Go to Home </Link>
      </form>
    )
  }
}

export default graphql(updateProductMutation, { name: "updateProduct" })(
  UpdateForm
)
