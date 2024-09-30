import styled from '@emotion/styled'

const Aside = () => {
  return (
    <AsideContainer>
      <HeaderLogo>
        <img src={'/logo.jpeg'} alt='logo' />
      </HeaderLogo>
    </AsideContainer>
  )
}
export default Aside

const AsideContainer = styled.aside`
  display: flex;
  background-color: #30a20f;
  width: 12rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`

const HeaderLogo = styled.div`
  background-color: #fff;
  padding: 8px 16px;
  height: 6.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 8rem;
    height: 3rem;
  }
`
