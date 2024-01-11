import Modal from 'styled-react-modal';

export const StyledMobileStoresModal = Modal.styled`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #FFF;
    background: #19191B;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 20px;
    width: calc(100vw - 60px);
    z-index: 100000;
    box-sizing: border-box;
    position: relative;

    p {
        color: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 21px */
        margin-bottom: 30px;
    }

    .stores-btn {
        margin-bottom: 16px;
        margin-bottom: 16px;
        justify-content: center;
        align-items: center;

        span{
            color: #FFF;
            text-align: right;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 21px */
            margin-left: 5px;
        }
    }

    .text-button{
        margin-bottom: 16px;

        span{
            color: #FFF;
            text-align: right;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 150%; /* 21px */
            margin-left: 5px;
        }
    }

    .close-button {
        border: 0px;
        background: none;
        position: absolute;
        top; 40px;
        right: 13px;
        cursor: pointer;
        top: 15px;
    
        svg {
          stroke: #FFFFFF;
    
          &:hover {
              stroke: #AFAFB6;
          }
        }
      }


  .text-copied span {
    color: #0ec78f !important;
  }
`;
