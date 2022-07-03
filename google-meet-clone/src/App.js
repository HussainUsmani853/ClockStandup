import firepadRef, { connectedRef, userName } from './server/firebase.js';
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux/es/exports.js';
import { addParticipant, removeParticipant, setUser } from './store/actioncreator.js';

function App(props) {
  const participantRef = firepadRef.child("participants");
  useEffect(() => {
    connectedRef.on('value', (snap) => {
      if(snap.val()){
        const defaultPrefrences = {
          audio: true,
          video: false,
          screen: false
        };
        const userRef = participantRef.push({
          userName,
          prefence: defaultPrefrences,
        });
        props.setUser({
          [userRef.key] : {
            userName,
            ...defaultPrefrences,
          }
        })
        userRef.onDisconnect().remove();
      }
    });
  }, []);
  useEffect(() => {
    if(props.user){
      participantRef.on("child_added", (snap) =>{
        const {userName, perferences} = snap.val();
        props.addParticipant({
          [snap.key] : {
            userName,
            ...perferences,
          }
        })
      })
      participantRef.on("child_removed", (snap) =>{
        props.removeParticipant(snap.key);
      })
    }
  }, [props.user])
  return (
    <div className="App">
      Current User : {JSON.stringify(props.user)} <br />
      Participants : {JSON.stringify(props.participants)}
    </div>
  );
}
const mapStateToProps = (state) =>{
  return{
    user: state.currentUser,
    participants: state.participants
  };
};

const mapDispatchToProps = (dispatch) =>{
  return{
    setUser: (user) => dispatch(setUser(user)),
    addParticipant: (participant) => dispatch(addParticipant(participant)),
    removeParticipant: (participantKey) => dispatch(addParticipant(participantKey)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
