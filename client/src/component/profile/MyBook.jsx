import React from "react"
import { Container, Row, Col, Button } from "react-bootstrap"
import { useQuery } from "react-query"
import { API } from "../../config/api"

const MyBook = () => {
  let { data: transUser } = useQuery("transUserCache", async () => {
    const response = await API.get("/my-trans")

    return response.data.data
  })

  return (
    <>
      <Container className="mt-5">
        <h2 className="my-5">My Books</h2>
        <Row md={4}>
          {transUser?.map((e, index) => {
            return (
              <div key={index}>
                {e.cart.map((a, index) => {
                  return (
                    <>
                      <Col key={index}>
                        <img
                          src={a.book.image}
                          alt=""
                          style={{
                            width: "270px",
                            height: "300px",
                            objectFit: "cover",
                          }}
                        />
                        <h3
                          className="fw-bold text-truncate"
                          style={{ width: "260px" }}
                        >
                          {a.book.title}
                        </h3>
                        <p className="text-secondary mb-3">
                          By. {a.book.author}
                        </p>
                        <Button variant="dark px-5 rounded-0">
                          <a
                            className="text-decoration-none text-light"
                            href="https://drive.google.com/file/d/1FiSwJTkvi9v8oXMhBXxWVI4z4KI9F0S5/view"
                            target="_blank"
                          >
                            Download
                          </a>
                        </Button>
                      </Col>
                    </>
                  )
                })}
              </div>
            )
          })}
        </Row>
      </Container>
    </>
  )
}

export default MyBook
