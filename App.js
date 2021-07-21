import React from 'react';
import { Button, View, Text, TextInput,TouchableOpacity, Alert, StyleSheet,Image, SafeAreaView, Platform, StatusBar,} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 'Player 1',
      player2: 'Player 2'
    }
  }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#C8E5F3' }}>
        <Image style={{width: '80%', height:50, marginTop: 20, marginBottom: 30}} source={require('./assets/title.jpg')} />
        <TextInput
          style={styles.inputStyle}
          placeholder='Player 1'
          placeholderTextColor="black"
          onChangeText={player1=>this.setState({player1})}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Player 2"
          placeholderTextColor="black"
          onChangeText={player2=>this.setState({player2})}
        />
        <Button
          color="#03BBF9"
          title="Play →"
          onPress={() => {
            this.props.navigation.navigate('Play', {
              Player1 : this.state.player1,
              Player2 : this.state.player2
            });
          }}
        />
        <Image style={{width: 45, height: 30, marginTop: 50}} source={require('./assets/remote.jpg')} />
        <Text style={{textAlign: 'center', color: 'black', fontSize: 15, fontWeight: 'bold'}}>Gamer</Text>
      </View>
    );
  }
}


class Play extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        gameState: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ],
        currentPlayer: 1,
        click:0, 
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      currentPlayer:1,
      click:0,
    });
  };

  getWinner = () => {
    const NUM_Tiles = 3;
    var arr = this.state.gameState;
    var sum;

    //check rows
    for (var i = 0; i < NUM_Tiles; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    

    }

    //check column
    for (var j = 0; j < NUM_Tiles; j++) {
      sum = arr[0][j] + arr[1][j] + arr[2][j];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    //check digonal 
    
      sum = arr[0][0] + arr[1][1] + arr[2][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    
    sum = arr[2][0] + arr[1][1] + arr[0][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }

      // There are no winners
      return 0;

  };
  
 onNewGamePress = () => {
      this.initializeGame();
}

  onTilePress = (row, col, props) => {
    // Don't allow tiles to change
    var value = this.state.gameState[row][col];
    if(value==0){
      this.setState({click : this.state.click+1});
      console.log(this.state.click)
    }

    if (value !== 0) {
      
          return;
    }   

    //grab current player
    var currentPlayer = this.state.currentPlayer;

    // Set the correct tile..
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    //Switch to either player...
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    //Check for winner
    var winner = this.getWinner();
    const { navigation } = this.props;
    if(winner == 1){ 
      alert(JSON.stringify(navigation.getParam('Player1', 'Player1')) + " is the winner!");
      this.initializeGame();
    } else if (winner == -1){
      alert(JSON.stringify(navigation.getParam('Player2', 'Player2')) + " is the winner!");
      this.initializeGame();
    } else if (this.state.click === 8){
      alert("This game is tie!");
      this.initializeGame();
    }
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  
  render() {
    
    return (
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea} />
      <Image style={{width: '80%', height:50, marginTop: 5, marginBottom: 20}} source={require('./assets/title.jpg')} />
      <Text>{this.props.navigation.state.params.player1}</Text>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(0, 2)}
            style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 1)}
            style={[styles.tile, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 0)}
            style={[styles.tile, { borderBottomWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.onTilePress(2, 2)}
            style={[
              styles.tile,
              { borderBottomWidth: 0, borderRightWidth: 0 },
            ]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50 }}/>
        <TouchableOpacity style={{width: '100%', backgroundColor: '#03BBF9', bottom: 0}} onPress={this.onNewGamePress}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 30, fontWeight: 'bold', bottom: 0}}>New Game</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  inputStyle: {
      height: 40,
      borderColor: '#03BBF9',
      borderWidth: 4,
      borderRadius: 20,
      marginTop: 20,
      marginRight: 20,
      marginLeft: 20,
      textAlign: 'center',
      color: 'black',
      width: 200,
      fontSize: 20,
      marginBottom: 50
  },
  container: {
    flex: 1,
    backgroundColor: '#C8E5F3',
    alignItems: 'center',
  },
  tile: {
    borderWidth: 10,
    borderColor: 'black',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'green',
    fontSize: 60,
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
},
});

const RootStack = createStackNavigator({
  Welcome : Welcome,
  Play : Play,
},{
  defaultNavigationOptions: () => ({
    headerStyle:{backgroundColor:'#03BBF9'},
    headerTintColor:'white',
  }),
});

export default createAppContainer(RootStack); 