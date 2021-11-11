import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Alert, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './colors';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo'
import Fire from './Fire'

import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}

if (!global.atob) {
    global.atob = decode;
}

export default class App extends React.Component {

  state = {
    modalVisible : false,
    lists: [],
    user:{},
    loading:true
  }

  componentDidMount(){
    firebase = new Fire((error, user) => {

      if(error){
        return Alert("Something Went Wrong!!!");
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading:false});
        })
      console.log(lists);
      })

      this.setState({
        user
      })

    })
  }

  componentWillUnmount(){
    firebase.detach();
  }

  toggleModalVisible(){
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  renderList = (list) =>{
    return <TodoList list={list} updateList={this.updateList} />;
  }

  addList = list =>{
    firebase.addList({
      name:list.name,
      color:list.color,
      todos:[]
    })
  }

  updateList = list =>{
    firebase.updateList(list);
  }

  render(){

    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue} />
        </View>
      )
    }

    return (
      <View style={styles.container}>

        <Modal
          animationType="slide" 
          visible={this.state.modalVisible}
          onRequestClose={()=> this.toggleModalVisible()}>
            <View>
              <AddTodo closeModal={() => this.toggleModalVisible()} addList={this.addList}/>
            </View>
        </Modal>

        <Text style={styles.title}>
          TODO
          <Text style={{fontWeight: "300", color:colors.blue, fontSize:30}}> List</Text>
        </Text>
        <TouchableOpacity onPress={() => this.toggleModalVisible()}>
          <AntDesign name="pluscircleo" size={30} color={colors.blue} />
        </TouchableOpacity>
        <Text style={{color:colors.blue, paddingTop:5}}>Add Todo</Text>

        <View style={{height:300}}>
          <FlatList
                data={this.state.lists}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => this.renderList(item)}
                keyboardShouldPersistTaps="always"
                />
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize:34,
    color:colors.black,
    fontWeight:"bold",
    marginBottom:30
  },
});
