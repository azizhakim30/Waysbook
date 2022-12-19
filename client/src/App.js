import React, { useState, useEffect, useContext } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./views/Home"
import { Routes, Route, useNavigate } from "react-router-dom"
import { UserContext } from "./context/userContext"
import { API, setAuthToken } from "./config/api"
import Navbars from "./component/Navbars"
import AddBook from "./views/AddBook"
import DetailBook from "./views/DetailBook"
import Cart from "./views/Cart"
import Profile from "./views/Profile"
import ComplainAdmin from "./views/ComplainAdmin"
import ComplainUser from "./views/ComplainUser"
import Invoice from "./views/Invoice"
import ListBookAdmin from "./views/ListBookAdmin"
import EditBook from "./views/EditBook"
import Layout from "./component/Private/Layout"
import ListBookFav from "./views/ListBookFav"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  let navigate = useNavigate()

  const [state, dispatch] = useContext(UserContext)
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    if (state.isLogin === false && !isLoading) {
      navigate("/")
    } else {
      if (state.user.role === "admin") {
        navigate("/transaction")
      } else if (state.user.role === "user") {
        navigate("/")
      }
    }

    setAuthToken(localStorage.token)
  }, [localStorage.token])

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth")

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        })
      }

      let payload = response.data.data

      payload.token = localStorage.token

      dispatch({
        type: "USER_SUCCESS",
        payload,
      })

      setIsloading(false)
    } catch (error) {
      console.log(error)
      setIsloading(false)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <>
      {isLoading ? null : (
        <>
          <div className="bg">
            <Navbars />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/add-book"
                element={
                  <Layout>
                    <AddBook />
                  </Layout>
                }
              />
              <Route path="/detail-book/:id" element={<DetailBook />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/complain-admin"
                element={
                  <Layout>
                    <ComplainAdmin />
                  </Layout>
                }
              />
              <Route path="/complain-user" element={<ComplainUser />} />
              <Route
                path="/transaction"
                element={
                  <Layout>
                    <Invoice />
                  </Layout>
                }
              />
              <Route
                path="/list-book"
                element={
                  <Layout>
                    <ListBookAdmin />
                  </Layout>
                }
              />
              <Route
                path="/edit-book/:id"
                element={
                  <Layout>
                    <EditBook />
                  </Layout>
                }
              />
              <Route
                path="/fav-list"
                element={
                  <Layout>
                    <ListBookFav />
                  </Layout>
                }
              />
            </Routes>
          </div>
        </>
      )}
    </>
  )
}
export default App
