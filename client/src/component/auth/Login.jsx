import React, { useState, useContext } from "react"
import { Button, Form, Modal, Card, Alert } from "react-bootstrap"
// import { useNavigate } from "react-router-dom"
import { UserContext } from "../../context/userContext"
import { API } from "../../config/api"

const Login = ({ show, hide, setShowLogin, setShowRegister, refetch }) => {
  // let navigate = useNavigate()
  const [message, setMessage] = useState(null)
  const [state, dispatch] = useContext(UserContext)

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault()
      const response = await API.post("/login", form)

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      })
      refetch()
      hide()
    } catch (err) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Wrong Email or Password
        </Alert>
      )
      setMessage(alert)
      console.log(err)
    }
  }

  return (
    <Modal show={show} onHide={hide} centered>
      <Card
        className=" position-absolute top-50 start-50 translate-middle p-5"
        style={{
          width: "400px",
        }}
      >
        {message}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group>
            <Form.Label className="mb-4 fs-1">Login</Form.Label>
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
            </Form>
            <Button
              variant="dark"
              className="mb-2 text-center w-100"
              type="submit"
            >
              Login
            </Button>
            <p className="text-center">
              Already have an account ? Klik
              <span
                style={{ cursor: "pointer" }}
                className="ms-1 fw-bold"
                onClick={() => {
                  setShowLogin(false)
                  setShowRegister(true)
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

export default Login
