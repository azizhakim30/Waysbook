import React, { useContext, useState } from "react"
import { Container, Row, Col, Card, CardImg } from "react-bootstrap"
import { useQuery } from "react-query"
import { UserContext } from "../../context/userContext"
import Login from "../auth/Login"
import Register from "../auth/Register"
import { API } from "../../config/api"
import { useNavigate } from "react-router-dom"

const ListBook = () => {
  const [state] = useContext(UserContext)
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  const formatIDR = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  })

  const { data: books } = useQuery("booksCache", async () => {
    const response = await API.get("/books-regular")

    return response.data.data
  })

  return (
    <>
      <div className="bg-grey">
        <br />
        <br />
        <br />
        <Container>
          <Card.Text className="fs-2 fw-bold">List Book</Card.Text>
          <Row>
            {books?.map((e, index) => {
              return (
                <Col
                  sm={3}
                  style={{ cursor: "pointer", marginBottom: "30px" }}
                  key={index}
                >
                  <Card style={{ background: "none", border: "0" }}>
                    <CardImg
                      variant="top"
                      className="image-fuild"
                      src={e.image}
                      style={{ height: "200px", objectFit: "cover" }}
                      onClick={() => {
                        state?.isLogin === false
                          ? setShowLogin(true)
                          : navigate(`/detail-book/${e.id}`)
                      }}
                    />
                    <div className="mt-2">
                      <Card.Title
                        className="mb-2 text-truncate"
                        style={{ width: "265px" }}
                      >
                        {e.title}
                      </Card.Title>
                      <Card.Subtitle
                        className="text-secondary mb-2 text-truncate"
                        style={{ width: "265px" }}
                      >
                        By. {e.author}
                      </Card.Subtitle>
                      <Card.Text className="text-success fw-bold">
                        {formatIDR.format(e.price)}
                      </Card.Text>
                    </div>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </div>
      <Login
        show={showLogin}
        hide={() => {
          setShowLogin(false)
        }}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        hide={() => setShowRegister(false)}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </>
  )
}

export default ListBook
