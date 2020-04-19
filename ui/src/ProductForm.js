import React, { Component } from "react"
import { gql } from "apollo-boost"
import { Mutation } from "@apollo/react-components"
import { Button, Form, Col } from 'react-bootstrap'

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
            <Form onSubmit={(e) => {
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
              }}>
              <Form.Row>
                <Form.Group as={Col} controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" name="category" 
                    value={category} onChange={this.handleChange}>
                    <option value="Shirts">Shirts</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jackets">Jackets</option>
                    <option value="Sweaters">Sweaters</option>
                    <option value="Accessories">Accessories</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="text" 
                    name="price"
                    onChange={this.handleChange} 
                    value={inputPrice}
                    placeholder="Enter product price"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" 
                    name="name"
                    onChange={this.handleChange} 
                    value={name}
                    placeholder="Enter product name"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="image">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control type="text" 
                    name="image"
                    onChange={this.handleChange} 
                    value={image}
                    placeholder="Enter image URL"
                  />
                </Form.Group>
              </Form.Row>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )
        }}
      </Mutation>
    )
  }
}

export default ProductForm
