import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInput,
  CButton,
} from "@coreui/react";
import { useHistory, useLocation } from "react-router-dom";

const JoinMeeting = ({ match }) => {
  const history = useHistory();
  const [meetingID, setMeetingID] = useState("");

  const onSubmitClicked = () => {
    if (history) {
      history.push(`/meeting/${meetingID}`);
    }
  };

  return (
    <div className="join-meeting-container">
      <CCardBody>
        <CCard className="join-meeting-card">
          <CCardHeader>Enter Meeting ID</CCardHeader>
          <CInput
            id="ccnumber"
            required
            onInput={(e) => setMeetingID(e.target.value)}
          />
          <CButton
            type="submit"
            size="sm"
            color="primary"
            onClick={() => onSubmitClicked()}
          >
            Submit
          </CButton>
        </CCard>
      </CCardBody>
    </div>
  );
};

export default JoinMeeting;
