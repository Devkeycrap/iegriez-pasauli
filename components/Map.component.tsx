import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import axios from "axios";
import "../styles/map.module.scss";

export default function Map({ gameObj }) {
  const [inBrowser, setInBrowser] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [activeIcon, setActiveIcon] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    setInBrowser(true);
    axios.get(`http://localhost:8000/map/Hamburger/questions`).then((res) => {
      setQuestions(res.data);
      console.log(res.data);
    });
  }, []);

  if (!inBrowser) {
    return null;
  }

  return (
    <div className="map">
      <MapContainer
        className="map"
        center={[51.505, -0.09]}
        zoom={1}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: 400, width: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {questions &&
          questions["questions"].map((item, i) => (
            <Marker
              position={[Math.random() * 50 + 10, Math.random() * 50 + 10]}
              key={i}
            >
              <Popup>{item.questions[questionIndex]}</Popup>
            </Marker>
          ))}
        <Marker position={[51.505, -0.09]}>
          <Popup></Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
