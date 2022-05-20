import styled from "styled-components";
import Navbar from "../../../components/Navbar";
import Button from '../../../components/Button/CTA/Filled'
import Image from 'next/image';

const RootContainer = styled.div`
  min-width: 100%;
  background: #0c0c0c;
`;

const NavContainer = styled.div`
  max-width: 100%;
`;

const Container = styled.div`
  max-width: 100%;
  display:flex;
  justify-content:center;
  div{
    width:70%;
  }
`;

const BodyContainer = styled.div`
    min-height:120vh;
`

const Heading = styled.h2`
    color:#fff;
`

const FormContainer = styled.div`
    max-width:100%;
`

const Form = styled.form`
  margin-top:3rem;
`

const FormGroup = styled.div`
  display:flex;
  flex-direction:column;
  row-gap:1rem;
  max-width:auto;
  margin: 1.5rem 0;
`

const Label = styled.label`
  font-size:16px;
  color:#fff;
  font-weight:bold;
  sup{
      color:#5C95FF;
  }
`

const InputText = styled.input`
    border: 1.5px solid #5C95FF;
    border-radius: 4px;
    background-color:transparent;
    height:2.2rem;
    width:100%;
    color:#fff;
    padding:5px;
`

const ExploreNFT = styled.div`
  position: absolute;
  top:7rem;
  margin-left: 1rem;
  @media screen and (max-width: 760px) {
    display: none;
  }
`;

const UpdateProfile = () => {
    return (
        <>
            <RootContainer>
                <NavContainer>
                    <Navbar />
                </NavContainer>
                <BodyContainer>
                    <ExploreNFT>
                        <Image width="97px" height="585px" src="/icons/exploreNFT.png" />
                    </ExploreNFT>
                    <Container>
                        <div>
                            <Heading>Update Profile</Heading>
                            <FormContainer>
                                <Form>
                                    <FormGroup>
                                        <Label htmlFor="name">Name<sup>*</sup></Label>
                                        <InputText id="name" type="text" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="email">Email Address<sup>*</sup></Label>
                                        <InputText id="email" type="email" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="profile_image">Profile Image URL<sup>*</sup></Label>
                                        <InputText id="profile_image" type="text" required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="banner_image">Banner Image URL<sup>*</sup></Label>
                                        <InputText id="banner_image" type="text" required  />
                                    </FormGroup>
                                  <Button type="submit">Update</Button>
                                </Form>
                            </FormContainer>
                        </div>
                    </Container>
                </BodyContainer>
            </RootContainer>
        </>
    )
}

export default UpdateProfile;