import React, { CSSProperties, useState } from "react";
import { MdOutlineCall } from "react-icons/md";
import "../RightColumn.css";

import MediaState from "../Common/RenderMedia/MediaState";
import EditInforOne from "./Edit/EditOne";
import { IoMdClose } from "react-icons/io";
import { RiPencilLine } from "react-icons/ri";

type UserType = {
  id: number;
  username: string;
  avatar_url: any;
  first_name: string;
  last_name: string;
  fullname: string;
};

type ChannelType = {
  id: number;
  member_count: number;
  last_message?: any;
  title: string;
  avatar_url?: string;
  create_at: string;
};

type UnifiedType = UserType | ChannelType;

type ChannelInboxProps = {
  channel: UnifiedType;
  userId: number;
  handleClose: (event: React.MouseEvent<Element>) => void;
};

const ChatWithOne: React.FC<ChannelInboxProps> = ({ channel, userId }) => {
  const [mediaClicked, setMediaClick] = useState<string>("");
  const [isSlidedEdit, setSlidedEdit] = useState<boolean>(true); //slide edit status

  const [EditTranslateX, EditSetTranslateX] = useState<CSSProperties>({
    visibility: "hidden",
    transform: "translateX(480px)",
  });
  const [pageStatus, setPageStatus] = useState<string>("info");
  const handleClickOnEditButton = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    event.preventDefault();
    setPageStatus(pageStatus === "info" ? "edit" : "info");
    setSlidedEdit(!isSlidedEdit);
    EditSetTranslateX((EditTranslateX) => ({
      ...EditTranslateX,
      visibility: isSlidedEdit ? "visible" : "hidden",
      transform: isSlidedEdit ? "translateX(0px)" : "translateX(600px)",
    }));
  };

  const channelInfo = channel as ChannelType;

  const handleOnWheel = () => {};
  const handleClickOnMedia = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    setMediaClick(event.currentTarget.innerHTML);
  };

  function handleClose(
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="RightColumn-container">
      <div className={`user-info`} style={EditTranslateX}>
        <EditInforOne
          channel={channel}
          userId={userId}
          handleEdit={handleClickOnEditButton}
        />
      </div>
      <div className="rightcolumn-header">
        <span className="btn-close" onClick={(event) => handleClose(event)}>
          <IoMdClose size={24} className="util-icon" />
        </span>
        <h3>Profile</h3>
        <span className="btn-edit" onClick={handleClickOnEditButton}>
          <RiPencilLine size={24} className={`util-icon`} />
        </span>
      </div>
      <div>
        <div className="wrapper" onWheel={handleOnWheel}>
          <div className="rightcolumn-body">
            <div className="status1-container">
              <div className="avatar-wrapper">
                <p className="name">Name</p>
                <div className="avatar-container">
                  <p className="avatar">Avatar</p>
                </div>
              </div>
              <div className="phone-container">
                <div className="layout-btn">
                  <MdOutlineCall size={24} className="util-icon" />
                  <p>Phone number</p>
                </div>
              </div>
            </div>
          </div>

          {/* <MediaState /> */}
        </div>
      </div>

      {/* {pageStatus !== "edit" && pageStatus !== "info" && (
        <div>
          <div className="rightcolumn-header">
            <span className="btn-edit" onClick={handleClickOnEditButton}>
              <IoMdArrowBack size={24} className="util-icon" />
            </span>
            <h3>Shared Media</h3>
          </div>
          <div className="info-body"></div>
          <MediaState userProp={userProp} stateMedia={mediaClicked} />
        </div>
      )} */}
    </div>
  );
};
export default ChatWithOne;