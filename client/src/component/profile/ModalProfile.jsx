import React, { useState, useEffect } from "react"
import { Form, Modal, Button } from "react-bootstrap"
import { useMutation } from "react-query"
import { API } from "../../config/api"
import { useQuery } from "react-query"

const ModalProfile = ({ show, setShow, hide, refetch }) => {
  const { data: user } = useQuery("profileCache", async () => {
    const response = await API.get("/user")

    return response.data.data
  })

  const [preview, setPreview] = useState()

  const [form, setForm] = useState({
    fullname: "",
    password: "",
    image: "",
    address: "",
    phone: "",
    gender: "",
  })

  useEffect(() => {
    setPreview(user?.image)
    setForm({
      fullname: user?.fullname,
      address: user?.address,
      phone: user?.phone,
      gender: user?.gender,
    })
  }, [user])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      }

      const formData = new FormData()
      formData.set("fullname", form.fullname)
      formData.set("password", form.password)
      if (form?.image !== undefined) {
        formData.set("image", form.image[0])
      }
      formData.set("address", form.address)
      formData.set("phone", form.phone)
      formData.set("gender", form.gender)

      await API.patch("/user-update", formData, config)
      refetch()

      setShow(false)
    } catch (error) {
      console.log(error)
    }
  })
  return (
    <>
      <Modal show={show} onHide={hide} centered>
        <Modal.Body>
          <div className="px-4">
            <h1 style={{ color: "black" }}>Edit Profile</h1>
            <Form className="py-3" onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    name="fullname"
                    type="text"
                    placeholder="Fullname"
                    value={form.fullname}
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className=" rounded border-opacity-25">
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                      marginBottom: "15px",
                      borderRadius: "10px",
                    }}
                    alt={preview}
                  />
                  <Form.Control
                    type="file"
                    name="image"
                    id="addProductImage"
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-dark rounded border-opacity-25">
                  <Form.Control
                    type="text"
                    placeholder="Gender"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                    }}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="border border-danger rounded border-opacity-25">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Address"
                    value={form.address}
                    name="address"
                    onChange={handleChange}
                    style={{
                      borderColor: "black",
                      borderWidth: "3px",
                      backgroundColor: "#FFF3F7",
                      resize: "none",
                    }}
                  />
                </div>
              </Form.Group>

              <div className="d-grid gap-2 my-4">
                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ModalProfile
