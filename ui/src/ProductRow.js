import React, { Component } from "react"
import { graphql } from "react-apollo"
import { gql } from "apollo-boost"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

const deleteProductMutation = gql`
  mutation removeProduct($id: Int!) {
    removeProduct(id: $id)
  }
`

class ProductRow extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.state = {
      product: props.product,
    }
  }

  handleDelete() {
    const { deleteProduct, onSave } = this.props
    const {
      product: { id },
    } = this.state
    deleteProduct({
      variables: {
        id,
      },
    })
      .then(() => {
        onSave()
      })
      .catch((error) => {
        window.console.error(
          `Error occured while deleting product with id ${id}: ${error || ""}`
        )
      })
  }

  render() {
    const {
      product: { id = "", price = "", name = "", category = "" },
    } = this.state

    return (
      <tr>
        <td> {name} </td>
        <td> ${price} </td>
        <td> {category} </td>
        <td>
          <Link to={`/product/${id}`}> View </Link>
        </td>
        <td>
          <Link to={`/edit/product/${id}`}> Edit </Link>
        </td>
        <td>
          <Button variant="danger" onClick={this.handleDelete}>
            {" "}
            Delete{" "}
          </Button>
        </td>
      </tr>
    )
  }
}

export default graphql(deleteProductMutation, { name: "deleteProduct" })(
  ProductRow
)
