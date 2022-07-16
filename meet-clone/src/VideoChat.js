import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppContext } from "./context/appContext";
import Video from "twilio-video";
import Room from "./components/Room/Room";
import { Home, Header } from "./components/index";

const VideoChat = () => {
  const [roomName, setRoomName] = useState(uuidv4());
  const [room, setRoom] = useState(null);
  const [username, setUsername] = useState("");

  const { currentUser, connecting, setConnecting } = useAppContext();

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = useCallback(async () => {
    setConnecting(true);
    const res = await fetch("/video/token", {
      method: "POST",
      body: JSON.stringify({
        identity: username,
        room: roomName,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    Video.connect(data.token, {
      name: roomName,
    })
      .then((room) => {
        setConnecting(false);
        setRoom(room);
      })
      .catch((err) => {
        console.error(err);
        setConnecting(false);
      });
  }, [roomName, username]);

  const handleLogout = useCallback(() => {
    setRoom((prevRoom) => {
      if (prevRoom) {
        prevRoom.localParticipant.tracks.forEach((trackPub) => {
          trackPub.track.stop();
        });
        prevRoom.disconnect();
      }
    });
  }, []);

  useEffect(() => {
    if (room) {
      const tidyUp = (event) => {
        if (event.persisted) {
          return;
        }
        if (room) {
          handleLogout();
        }
      };
      window.addEventListener("pagehide", tidyUp);
      window.addEventListener("beforeunload", tidyUp);

      return () => {
        window.removeEventListener("pagehide", tidyUp);
        window.removeEventListener("beforeunload", tidyUp);
      };
    }
  }, [room, handleLogout]);

  let render;

  if (room) {
    render = (
      <Room roomName={roomName} room={room} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <>
        <Header />
        {connecting ? (
          <h1>Loading...</h1>
        ) : (
          <Home handleSubmit={handleSubmit} setRoomName={setRoomName} />
        )}
      </>
    );
  }

  return render;
};

export default VideoChat;
