import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"
import styled from "styled-components"

const StyledCardItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledLinkWrapper = styled.div`
  margin-top: auto;
`

const StyledCardImg = styled.img`
  max-width: 100%;
`

export const Card = (props) => {
  return (
    <StyledCardItem>
      <StyledCardImg src={props.img} alt="" />
      <h2>{props.title}</h2>
      <StyledLinkWrapper>
        <Link href={props.linkProps.href} as={props.linkProps.as}>
          <a>{props.linkProps.description}</a>
        </Link>
      </StyledLinkWrapper>
    </StyledCardItem>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  id: PropTypes.number,
  linkProps: PropTypes.shape({
    href: PropTypes.string,
    as: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
}
