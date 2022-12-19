import React from "react"
import { Row, Container, Col, Card } from "react-bootstrap"
import profile1 from "../assest/img/profile.png"
import send from "../assest/icon/send.svg"

function ComplainUser() {
  return (
    <>
      <Container>
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header className="p-4">
                <Row>
                  <Col md={1}>
                    <img
                      src={profile1}
                      width="60"
                      height="60"
                      className="rounded-5"
                    />
                  </Col>
                  <Col>
                    <p className="mt-2 fw-bold fs-5">Admin</p>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-4" style={{ backgroundColor: "#DCDCDC" }}>
                <Row sm={3} className="justify-content-end">
                  <Card.Text className="bg-light rounded-2 p-2 mb-4">
                    Hallo Admin. Estimasi pengiriman buku berapa lama ya?
                  </Card.Text>
                </Row>
                <Row sm={3}>
                  <Card.Text className="bg-light rounded-2 p-2">
                    Hallo Kak Dicky. Estimasi pengiriman ke alamat kakak 3 hari
                    ya, mohon ditunggu
                  </Card.Text>
                </Row>
                <Row sm={3} className="justify-content-end">
                  <Card.Text className="bg-light rounded-2 p-2 mb-4">
                    Oke, Terimakasih
                  </Card.Text>
                </Row>
                <Row sm={3}>
                  <Card.Text className="bg-light rounded-2 p-2">
                    Sama-sama kakak.
                  </Card.Text>
                </Row>
              </Card.Body>
              <Card.Footer
                style={{
                  backgroundColor: "#DCDCDC",
                  border: "1px solid transparent",
                }}
              >
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Write your message here ..."
                    aria-label="Recipient's username"
                  />
                  <button
                    class="bg-info ms-3 rounded-2"
                    type="submit"
                    style={{ width: "70px", border: "1px solid transparent " }}
                  >
                    <img src={send} width="20" />
                  </button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default ComplainUser
