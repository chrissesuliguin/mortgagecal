import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  background: #F0F0F0;
  padding: 10px;
  margin-bottom: 40px;
`;
const Section = styled.section`
  width: 960px;
  margin: 0px auto;
  text-align: left;
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 30px;
`;

const Header = ({data}) => {
  return(
    <Container>
      <Section>
        <Logo src={require('./logo.png')} alt="Logo" />
        <div>
          <h2>Monthly Payment Calculator</h2>
          <p>Increasing prosperity in our lives can be 
            accomplished by having the right frame of mind.
            The truth is, our thoughts are very powerful.</p>
        </div>
      </Section>
    </Container>
  )
}

export default Header;