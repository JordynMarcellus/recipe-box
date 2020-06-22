import React from "react"
import Link from "next/link"
import { Box, Text, Image, Button } from "grommet"
import PropTypes from "prop-types"

export const Card = (props) => {
  return (
    <Box>
      <Text>{props.title}</Text>
      {/* @TODO: Get the alt text for these images! */}
      <Image fit="cover" src={props.img} />
      {/* would be dope to get this to be a human-readable category name */}
      <Link href={`/recipes/${props.title.toLowerCase()}`}>
        <a>{`Get recipes for ${props.title}`}</a>
      </Link>
    </Box>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
}
