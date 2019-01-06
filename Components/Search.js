import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi'

class Search extends React.Component {
  constructor(props) {
    super(props)
    //this._films = []
    this.searchedText = ''
    this.page = 0 // Compteur pour connaitre la page courante
    this.totalPages = 0 // nb total de pages pour savoir si on a atteint fin de l'API TMDB
    this.state = {
      films: [],
      isLoading: false
      }
  }

  _loadFilms() {
    this.setState({isLoading: true})
    if(this.searchedText.length > 0) {
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
       this.page = data.page
       this.totalPages = data.total_Pages
       this.setState({
         //films: data.results,
         //films: this.state.films.concat(data.results)
         films: [...this.state.films, ...data.results],
         isLoading: false
         })
    })
    }
  }

  _displayLoading() {
    if(this.state.isLoading === true) {
      return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
    }
  }

  _searchTextInputChanged(text) {
    // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    this.searchedText = text
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: []
    }, () => {
      this._loadFilms()
    })
  }
    /*
    getFilmsFromApiWithSearchedText('star').then(data => {
      this._films = data.results
      this.forceUpdate()
    })
    */

  render() {
    return (
      <View style={styles.main_container}>
        <TextInput 
          style={styles.textinput} 
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button 
          style={{height: 50}} 
          title='Rechercher' 
          onPress={() => this._searchFilms()}
        />
      
      <FlatList 
        // data={this._films}
        data = {this.state.films}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <FilmItem film={item} />}
        onEndReachedThreshold = {0.5}
        onEndReached={() => {
          if(this.state.films.length > 0) {
            if(this.state.films.length > 0 && this.page < this.totalPages){
              this._loadFilms()
            }
          }

        }}    
      />
      {this._displayLoading()}
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
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search 