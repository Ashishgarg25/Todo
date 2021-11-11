import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAWlGxQUhF5TuONkVwu8MtpcWIr0GtINTA",
    authDomain: "todo-firebase-c9e7a.firebaseapp.com",
    databaseURL: "https://todo-firebase-c9e7a.firebaseio.com",
    projectId: "todo-firebase-c9e7a",
    storageBucket: "todo-firebase-c9e7a.appspot.com",
    messagingSenderId: "396611729275",
    appId: "1:396611729275:web:bf94afa3a5ef63aa5defde"
};

class Fire{

    constructor(callback){
        this.init(callback)
    }

    init(callback){
        if(!firebase.apps.length){
          firebase.initializeApp(firebaseConfig);  
        }
        
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                callback(null, user);
            }else{
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    getLists(callback){
        
        let ref = this.ref.orderBy('name');
        
        this.unsubscribe = ref.onSnapshot(snapshot => {
            lists = []
            
            snapshot.forEach(doc => {
                lists.push({id: doc.id, ...doc.data()} );
            })

            callback(lists)
        })
    }

    addList(list){
        let ref = this.ref;
        ref.add(list)
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    get UserId(){
        return firebase.auth().currentUser.uid;
    }

    get ref(){
        return firebase
            .firestore()
            .collection('users')
            .doc(this.UserId)
            .collection('lists');
    }

    detach(){
        this.unsubscribe();
    }
}

export default Fire;