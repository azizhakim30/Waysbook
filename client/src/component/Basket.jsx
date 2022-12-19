import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Badge, Image } from "react-bootstrap"
import Cart from "../assest/icon/cart.png"
import { API } from "../config/api"
import { useQuery } from "react-query"
import { UserContext } from "../context/userContext"

const Basket = () => {
  const [state] = useContext(UserContext)
  const { data: cart } = useQuery("cartsCache", async () => {
    if (state.isLogin === true) {
      const response = await API.get("/user-cart")
      return response.data.data
    }
  })
  return (
    <>
      <Link to="/cart" style={{ position: "relative", marginTop: "20px" }}>
        <Badge
          className="rounded-circle d-flex justify-content-center align-items-center bg-danger"
          style={{
            width: "18px",
            height: "18px",
            fontSize: "10pt",
            position: "absolute",
            right: 0,
          }}
        >
          {cart?.length}
        </Badge>
        <Image src={Cart} width="40px" />
      </Link>
    </>
  )
}

export default Basket
