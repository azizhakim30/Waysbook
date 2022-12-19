import React, { useState } from "react"
import { Col, Container, Row, Image, Button } from "react-bootstrap"
import Email from "../../assest/icon/email.png"
import Gender from "../../assest/icon/gender.png"
import Phone from "../../assest/icon/phone.png"
import Address from "../../assest/icon/address.png"
import { API } from "../../config/api"
import { useQuery } from "react-query"
import Foto from "../../assest/img/images.jpg"
import ModalProfile from "./ModalProfile"

const MyProfile = () => {
  let { data: profile, refetch } = useQuery("profileCache", async () => {
    const response = await API.get("/user")

    return response.data.data
  })

  const [show, setShow] = useState(false)
  return (
    <>
      <Container>
        <h2 className="margin mb-4">Profile</h2>
        <div className="rounded-3 p-5" style={{ backgroundColor: "pink" }}>
          <Row className="bg-pink rounded-3 p-4">
            <Col>
              <Row className="mb-4">
                <Col md="1">
                  <Image src={Email} className="mt-2" />
                </Col>
                <Col>
                  <p className="mb-0 fw-bold">{profile?.email}</p>
                  <p className="text-secondary mb-0">Email</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md="1">
                  <Image src={Gender} className="mt-2" />
                </Col>
                <Col>
                  <p className="mb-0 fw-bold">{profile?.gender}</p>
                  <p className="text-secondary mb-0">Gender</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md="1">
                  <Image src={Phone} className="mt-2" />
                </Col>
                <Col>
                  <p className="mb-0 fw-bold">{profile?.phone}</p>
                  <p className="text-secondary mb-0">Mobile Phone</p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md="1" className="ps-3">
                  <Image src={Address} className="mt-2" />
                </Col>
                <Col>
                  <p className="mb-0 fw-bold">{profile?.address}</p>
                  <p className="text-secondary mb-0">Location</p>
                </Col>
              </Row>
            </Col>
            <Col md="3" className="align-content-center">
              <img
                src={profile?.image === "" ? Foto : profile?.image}
                alt="avatar"
                className="w-100 rounded-3"
              />
              <Button
                variant="danger"
                className="w-100 mt-3"
                onClick={() => {
                  setShow(true)
                }}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
      <ModalProfile
        show={show}
        hide={() => {
          setShow(false)
        }}
        setShow={setShow}
        refetch={refetch}
      />
    </>
  )
}

export default MyProfile
