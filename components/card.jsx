import React from "react"
import { Box, Text, Image, Button } from "grommet"
import PropTypes from "prop-types"

export const Card = (props) => {
  return (
    <Box>
      <Text>{props.title}</Text>
      <Image fit="cover" src={props.img} />
      {/* would be dope to get this to be a human-readable category name */}
      <Button onClick={() => console.log(`going to recipes/${props.id}`)}>
        Get recipes
      </Button>
    </Box>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
}
