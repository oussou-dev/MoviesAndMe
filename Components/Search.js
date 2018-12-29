// import * as React from 'react';
// Components/Search.js

import React from 'react'
import { View, TextInput, Button } from 'react-native'

class Search extends React.Component {
  render() {
    return (
      <View>
        <TextInput placeholder='Titre du film'/>
        <Button style={{height: 50}}title='Rechercher' onPress={() => {}}/>
      </View>
    )
  }
}

const styles = {
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5

  }

}


export default Search 

