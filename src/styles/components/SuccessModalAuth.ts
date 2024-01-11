import Modal from 'styled-react-modal';

export const SuccessModalAuth = Modal.styled`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid #FFF;
    background: #19191B;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 60px;
    width: 30vw;
    z-index: 100001!important;
    animation: fadeIn 1.5s;
  
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
  
      100% {
        opacity: 1;
      }
    }

    h2 {
        color: #FFF;
        text-align: center;
        font-size: 26px;
        font-style: normal;
        font-weight: 800;
        line-height: 150%; 
        letter-spacing: 0.26px;
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    p {
        color: #FFF;
        text-align: center;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; 
        letter-spacing: 0.12px;
        margin-bottom: 40px;
    }

     @media (max-width: 965px) {
         width: 60vw;

        h2 {
            font-size: 20px;
        }

        p {
            font-size: 12px;
        }

    }


`;
