import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, TextInput, Keyboard, TouchableHighlight } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

console. disableYellowBox = true;

export default class ViewTodo extends React.Component{

    state = {
        newTodo: ""
     };
     
     toggleCompleted = index =>{
         let list = this.props.list;
         list.todos[index].completed = !list.todos[index].completed;
     
         this.props.updateList(list);
     }
 
     addTodo = () =>{
         let list = this.props.list;
 
         if(!list.todos.some(todo => todo.title === this.state.newTodo)){
             list.todos.push({title: this.state.newTodo, completed: false});
         
             this.props.updateList(list);
             Keyboard.dismiss();
         }
 
         
         this.setState({ newTodo:"" })
         
     }
 
     deleteTodo = index =>{
         let list = this.props.list;
 
         list.todos.splice(index, 1);
         this.props.updateList(list);
     }
 
     renderTodo = (todo, index) =>{
 
         return(
             
                 <View style={{flexDirection:"row", alignItems:"center"}}>
                     
                     <TouchableOpacity onPress={() => this.toggleCompleted(index)}>
                         <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color={colors.grey} style={{width: 16}} />
                     </TouchableOpacity>
                     
                    <Text style={[styles.title, {textDecorationLine: todo.completed ? "line-through" : "none", color:todo.completed ? colors.grey : colors.black}]}> 
                        {todo.title} 
                    </Text>

                    <TouchableOpacity onPress={(index) => this.deleteTodo(index)}>
                        <Ionicons name="ios-trash" size={24} color="#E44945" style={{width:16}} />
                    </TouchableOpacity>

                 </View>
            
         );
     };
 
     render(){
 
         const list = this.props.list;

        return(
            <View style={styles.container}>
               
               <TouchableOpacity style={{position:"absolute", top:64, right:32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <Text style={[styles.heading,{color: list.color}]}> {list.name} </Text>

                <View style={{height:300}}>
                    <FlatList style={styles.ListTodo}
                        contentInsetAdjustmentBehavior="automatic"
                        data={list.todos}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => this.renderTodo(item, index)}
                        keyExtractor={item => item.title}     
                    />
                </View>

                <View style={{ flex:1, flexDirection:"row", alignItems:"center"}}>
                    <TextInput 
                        style={[styles.input, {borderColor:list.color}]} 
                        placeholder="Enter Tasks"
                        onChangeText={text => this.setState({newTodo:text})}
                        value={this.state.newTodo}
                    />

                    <TouchableOpacity onPress={() => this.addTodo()}>
                        <AntDesign name="plussquare" size={50} color={list.color} style={{marginLeft:5}} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:"center",
    },
    heading:{
        fontSize:30,
        fontWeight:"bold",
        borderBottomWidth:3,
        alignSelf:"stretch",
        marginLeft:64,
        borderBottomColor:colors.black,
        marginTop:80
    },
    title:{
        fontSize:14,
        padding: 15,
        fontWeight:"bold",
        width:260,
    },
    ListTodo:{
        marginTop:32,
        paddingLeft:32,
    },
    input:{
        height:50,
        borderWidth:1,
        borderRadius:6,
        paddingLeft:15,
        width:300,
        fontSize:18,
    },
    deleteBtn:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width:80
    }
});