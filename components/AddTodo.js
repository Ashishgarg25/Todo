import React from 'react';
import { Text, View, StyleSheet, Modal, KeyboardAvoidingView, TouchableOpacity, TextInput, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import tempData from '../TempData';

export default class AddTodo extends React.Component{

    backgroundColors = ["#24A6D9", "#E44945", "#515BCF", "#F27E46", "#FEB27A", "#7CE575", "#BE4EC8"];

    state = {
        name:"",
        color: this.backgroundColors[0],
    };

    createTodo = () => {
        const {name, color} = this.state

        const list = {name, color};

        this.props.addList(list);

        this.setState({ name: "" })
        this.props.closeModal();
    }

    renderColors(){
        return this.backgroundColors.map( color => {
            return(
                <TouchableOpacity 
                    key={color} 
                    style={[styles.colorSelect, {backgroundColor:color}]} 
                    onPress={() => this.setState({ color })} />
            )
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableOpacity style={{position:"absolute", top:64, right:32}} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>

                <View>
                    <Text style={styles.title}>Create Todo Task</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder="Enter Tasks"
                        onChangeText={text => this.setState({name:text})}
                        />

                    <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:20,marginBottom:30}}>
                        {this.renderColors()}
                    </View>

                    <TouchableOpacity 
                        style={[styles.create, {backgroundColor: this.state.color}]}
                        onPress={this.createTodo}>
                        <Text style={{color: colors.white, fontWeight:"600"}}>CREATE</Text>
                    </TouchableOpacity>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:colors.blue,
        marginTop:250,
        padding:30,
        marginHorizontal:40,
    },
    input:{
        height:50,
        borderWidth:1,
        borderRadius:6,
        padding:10,
        paddingLeft:15,
        width:350,
        borderColor:colors.blue,
        fontSize:18,
    },
    create:{
        marginTop:24,
        height:50,
        borderRadius:6,
        alignItems:"center",
        justifyContent:"center",
    },
    colorSelect:{
        width:30,
        height:30,
        borderRadius:4,
    }
});