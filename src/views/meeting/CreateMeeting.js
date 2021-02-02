import React, { useEffect } from "react";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { onRoomEntered } from "../../api/socket";

const CreateMeeting = ({ match }) => {
  useEffect(() => {
    onRoomEntered(match.params.id, 10, document.getElementById("video-grid"));
  }, []);

  return (
    <div className="video-grid-container">
      <div id="video-grid"></div>
    </div>
  );
};

export default CreateMeeting;
