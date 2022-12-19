import React, { useState, useContext } from "react"
import { Button, Card, Form, Modal, Alert } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../config/api"

const Register = ({ show, hide, setShowRegister, setShowLogin }) => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  })
  const [message, setMessage] = useState(null)

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post("/register", form)

      if (response.data.code === "success") {
        const alert = (
          <Alert variant="success" className="py-1">
            Registed Success
          </Alert>
        )
        setMessage(alert)
        setShowRegister(false)
        setShowLogin(true)
      }
    } catch (err) {
      console.log(err)
      const alert = (
        <Alert variant="danger" className="py-1">
          Registed Failed
        </Alert>
      )
      setMessage(alert)
    }
  })

  return (
    <Modal show={show} onHide={hide} centered>
      <Card
        className=" position-absolute top-50 start-50 translate-middle p-5"
        style={{
          width: "400px",
        }}
      >
        {message}
        <Form onSubmit={(e) => handleOnSubmit.mutate(e)}>
          <Form.Group>
            <Form.Label className="mb-4 fs-1">Register</Form.Label>
            <Form>
              <Form.Control
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mb-4"
                type="email"
                placeholder="Email"
                required
              />
              <Form.Control
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="mb-4"
                type="password"
                placeholder="Password"
                required
              />
              <Form.Control
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
                className="mb-4"
                type="text"
                placeholder="Full Name"
                required
              />
            </Form>
            <Button
              variant="dark"
              className="mb-2 text-center w-100"
              type="submit"
            >
              {handleOnSubmit.isLoading ? "Loading..." : "Register"}
            </Button>
            <p className="text-center">
              Already have an account ? Klik
              <span
                style={{ cursor: "pointer" }}
                className="ms-1 fw-bold"
                onClick={() => {
                  setShowRegister(false)
                  setShowLogin(true)
                }}
              >
                Here
              </span>
            </p>
          </Form.Group>
        </Form>
      </Card>
    </Modal>
  )
}

export default Register
