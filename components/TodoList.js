import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native'
import colors from '../colors';
import ViewTodo from './ViewTodo';

export default class TodoList extends React.Component {

    state = {
        modalVisible : false,
      }
    
      toggleModalVisible(){
        this.setState({
          modalVisible: !this.state.modalVisible
        });
      }

    render(){

    const list = this.props.list;

    const completed = list.todos.filter(todo => todo.completed).length;
    const rem = list.todos.length - completed;
    

    return(
        <View style={[styles.listContainer, {backgroundColor: list.color}]}>

            <Modal
                animationType="slide" 
                visible={this.state.modalVisible}
                onRequestClose={()=> this.toggleModalVisible()}
                updateList={this.props.updateList}>
                
                <ViewTodo list={list} closeModal={() => this.toggleModalVisible()} updateList={this.props.updateList}/>
                
            </Modal>

            <TouchableOpacity onPress={() => {this.toggleModalVisible()}}>

                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>

                <View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}> {rem} </Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}> {completed} </Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                    
                </View>

            </TouchableOpacity>

        </View>
    );

    }
};

const styles = StyleSheet.create({
    listContainer:{
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:"center",
        justifyContent:"center",
        width:200,
        marginTop:30
    },
    listTitle:{
        fontSize:24,
        fontWeight:"700",
        color:colors.white,
        marginBottom:18
    },
    count:{
        fontSize:48,
        fontWeight:"200",
        color:colors.white,
    },
    subtitle:{
        fontSize:12,
        fontWeight:"bold",
        color:colors.white,
        
    }
});