import React from 'react' // pour rendre nos components React Native Image
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation'
import {StyleSheet, Image} from 'react-native'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorites from '../components/Favorites'

const SearchStackNavigator = createStackNavigator({
  Search : {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      tabBarIcon: () => {
        return <Image
          source={require('../Images/ic_search.png')} 
          style= {styles.icon}
        />
      }
    }
  },

  Favorites: {
    screen: Favorites,
    navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_favorite.png')}
            style={styles.icon}/>
        }
    }
  }
},

{
  tabBarOptions: {
    activeBackgroundColor: '#DDDDDD', // couluer arriere-plan onglet selectionné
    inactiveBackgroundColor: '#FFFFFF', // couluer arriere-plan onglets non selectionnés
    showLabel: false, // on masque les titres
    showIcon: true // on informe TabNavigator qu'on souhaite afficher les icônes définis
  }
})

const styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30
  }
})

const AppContainer = createAppContainer(MoviesTabNavigator);

export default AppContainer;