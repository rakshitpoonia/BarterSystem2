import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal, KeyboardAvoidingView, ScrollView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignupLoginScreen extends Component {
constructor(){
  super()
  this.state={
    emailId:'',
    password:'',
    isModalVisible:false,
    firstName:'',
    lastName:'',
    address:'',
    contact:'',
    confirmPassword:'',
  }
}
  userLogin=(emailId,password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId,password)
    .then(()=>{
      this.props.navigation.navigate('HomeScreen')
      return Alert.alert("Successfully Login")
    })
    .catch((error)=>{
      var errorCode=error.code;
      var errorMessage=error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp=(emailId,password,confirmPassword)=>{
    if(password!=confirmPassword){
      Alert.alert("Password does not match\ncheck your password")
    }
    firebase.auth().createUserWithEmailAndPassword(emailId,password)
    .then(()=>{
      db.collection('users').add({
        first_name:this.state.firstName,
         last_name:this.state.lastName,
         contact:this.state.contact,
         email_id:this.state.emailId,
         address:this.state.address
      })
      return Alert.alert(
        "User Added Successfully",
        '',
        [
          {text: 'OK', onPress:()=>this.setState({isModalVisible:false})}
        ]
        )
    })
    .catch((error)=>{
      var errorCode=error.code;
      var errorMessage=error.message;
      return Alert.alert(errorMessage)
    })
  }

  showModal=()=>{
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:'#ff5722',margin:50}}>Register</Text>
              <TextInput
              style={styles.formTextInput}
              placeholder={"First Name"}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  firstName:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Last Name"}
              maxLength={8}
              onChangeText={(text)=>{
                this.setState({
                  lastName:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Contact"}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text)=>{
                this.setState({
                  contact:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text)=>{
                this.setState({
                  address:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Enter Email"}
              keyboardType ={'email-address'}
              onChangeText={(text)=>{
                this.setState({
                  emailId:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Enter Password"}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  password:text
                })
              }}
              />
              <TextInput
              style={styles.formTextInput}
              placeholder={"Confirm Password"}
              secureTextEntry={true}
              onChangeText={(text)=>{
                this.setState({
                  confirmPassword:text
                })
              }}
              />
          <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={()=>
              this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
            }
          >
          <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBackButton}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={{color:'#ff5722'}}>Cancel</Text>
          </TouchableOpacity>
        </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
        </View> 
      <ScrollView>
      <View style={styles.profileContainer}>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={{width:200, height: 200}}/>
        </View>
        <Text style={styles.title}>Barter</Text>
      </View>
      <View style={styles.buttonContainer}>
      <TextInput
      style={styles.loginBox}
      placeholder="example@emailID.com"
      placeholderTextColor = "#ffff"
      keyboardType ='email-address'
      onChangeText={(text)=>{
        this.setState({
          emailId: text
        })
      }}
    />
      <TextInput
      style={styles.loginBox}
      secureTextEntry = {true}
      placeholder="password"
      placeholderTextColor = "#ffff"
      onChangeText={(text)=>{
        this.setState({
          password: text
        })
      }}
    />
      <TouchableOpacity
      style={[styles.button,{marginBottom:20, marginTop:20}]}
      onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={[styles.button,{marginBottom:20, marginTop:20}]}
      onPress = {()=>{this.setState({isModalVisible:true})}}>
        <Text style={styles.buttonText}>SignUp</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffe0b2'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:60,
    fontWeight:'300',
    color : '#ff9800'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor : '#ff8a65',
    fontSize: 20,
    margin:10,
    paddingLeft:10
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ff9800",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalTitle:{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#ff5722',
    margin:50
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#ffab91',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color:'#ff5722',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
})