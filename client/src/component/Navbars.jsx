import React, { useState, useContext } from "react"
import {
  Navbar,
  Container,
  Nav,
  Button,
  Stack,
  Image,
  Badge,
  Dropdown,
} from "react-bootstrap"
import Register from "./auth/Register"
import { UserContext } from "../context/userContext"
import Login from "./auth/Login"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "react-query"
import { API } from "../config/api"
import Logo from "../assest/icon/waysbooks.png"
import ProfileIcons from "../assest/icon/profile.png"
import Complain from "../assest/icon/complain.svg"
import LogoutIcon from "../assest/icon/logout.png"
import BookIcons from "../assest/icon/booknav.png"
import BooksIcons from "../assest/icon/books.png"
import Foto from "../assest/img/images.jpg"
import Basket from "./Basket"
import FavBook from "../assest/icon/Favbook.png"

const Navbars = () => {
  const [state, dispatch] = useContext(UserContext)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const Navigate = useNavigate()

  let { data: profile, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/user")

    return response.data.data
  })

  const Logout = () => {
    dispatch({
      type: "LOGOUT",
    })
    refetch()
    Navigate("/")
  }
  return (
    <Navbar className="background-none shadow-none">
      <Container>
        <Link to={state.user.role === "admin" ? "/transaction" : "/"}>
          <img src={Logo} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {state.isLogin === false ? (
              <Stack gap={3} direction="horizontal">
                <Button
                  variant="outline-dark px-5 rounded-0"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </Button>
                <Button
                  variant="dark px-5 rounded-0"
                  onClick={() => setShowRegister(true)}
                >
                  Register
                </Button>
              </Stack>
            ) : (
              <>
                {state.user.role === "user" ? <Basket /> : <></>}

                <Dropdown align="end">
                  <Dropdown.Toggle className="border-0 bg-transparent shadow-none">
                    <img
                      src={profile?.image === "" ? Foto : profile?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "solid",
                        borderWidth: "2px",
                      }}
                    />
                  </Dropdown.Toggle>
                  {state.user.role === "user" ? (
                    <Dropdown.Menu>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/profile"
                          className="text-decoration-none text-dark"
                        >
                          <Image src={ProfileIcons} style={{ width: "30px" }} />
                          <span className="ms-2">Profile</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/complain-user"
                          className="text-decoration-none text-dark"
                        >
                          <Image src={Complain} style={{ width: "30px" }} />
                          <span className="ms-2">Complain</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider className="bg-secondary" />
                      <Dropdown.Item>
                        <Image src={LogoutIcon} style={{ width: "30px" }} />
                        <span className="ms-2" onClick={Logout}>
                          Logout
                        </span>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  ) : (
                    <Dropdown.Menu>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/add-book"
                          className="text-decoration-none"
                          style={{ color: "black" }}
                        >
                          <Image src={BookIcons} style={{ width: "30px" }} />
                          <span className="ms-2">Add Book</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/complain-admin"
                          className="text-decoration-none"
                          style={{ color: "black" }}
                        >
                          <Image src={Complain} style={{ width: "30px" }} />
                          <span className="ms-2">Complain</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/list-book"
                          className="text-decoration-none"
                          style={{ color: "black" }}
                        >
                          <Image src={BooksIcons} style={{ width: "30px" }} />
                          <span className="ms-2">List Book</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Item className="mb-2">
                        <Link
                          to="/fav-list"
                          className="text-decoration-none"
                          style={{ color: "black" }}
                        >
                          <Image src={FavBook} style={{ width: "30px" }} />
                          <span className="ms-2">Fav List</span>
                        </Link>
                      </Dropdown.Item>
                      <Dropdown.Divider className="bg-secondary" />
                      <Dropdown.Item>
                        <div onClick={Logout}>
                          <Image src={LogoutIcon} style={{ width: "30px" }} />
                          <span className="ms-2">Logout</span>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  )}
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Register
        show={showRegister}
        hide={() => setShowRegister(false)}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
      <Login
        show={showLogin}
        hide={() => {
          setShowLogin(false)
        }}
        refetch={refetch}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
    </Navbar>
  )
}

export default Navbars
