import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList } from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this._films = []
    this.state = {films: []}
  }

  _loadFilms() {
      
     getFilmsFromApiWithSearchedText('star').then(data => {
       this.setState({films: data.results})
    })
    
    /*
    getFilmsFromApiWithSearchedText('star').then(data => {
      this._films = data.results
      this.forceUpdate()
    })
    */
  }

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du film'/>
        <Button style={{height: 50}} title='Rechercher' onPress={() => this._loadFilms()}/>
      
      <FlatList 
        // data={this._films}
        data = {this.state.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item} />}    
      />
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  main_container: {
    marginTop: 30,
    flex:1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5

  }
})

export default Search 