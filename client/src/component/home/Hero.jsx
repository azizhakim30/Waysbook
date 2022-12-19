import React from "react"
import { Container, Row } from "react-bootstrap"

const Hero = () => {
  return (
    <Container>
      <Row style={{ width: "70%", marginTop: "150px" }} className="mx-auto">
        <h1 className="text-center">
          With us, you can shop online & help save your high street at the same
          time
        </h1>
      </Row>
    </Container>
  )
}

export default Hero
