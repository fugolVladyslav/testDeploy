import Modal from 'styled-react-modal';

export const StyledStripePayment = Modal.styled`
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    border: 1px solid #FFF;
    background: #19191B;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 60px;
    // width: 30vw;
    z-index: 100000!important;
    position: absolute;


    .submit-button-modal {
        margin-top: 20px !important;
      }

      .stripe-form {
        margin-bottom: 20px !important;

        label {
            color: #fff!important;
        }
      }

      h1 {
        color: #FFF;
        text-align: center;
        font-size: 26px;
        font-style: normal;
        font-weight: 800;
        line-height: 150%;
        letter-spacing: 0.26px;
        text-transform: uppercase;
        margin-bottom: 30px;
      }

      .stripe-links {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
        margin-top: 20px;
        position: relative;

        &:before {
          content: '';
          position: absolute;
          display: block;
          height: 15px;
          width: 1px;
          background-color: #FFF;
          left: 50%;

        }
      }
       
      a {
        color: #FFF;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 18px */
        letter-spacing: 0.12px;
        text-decoration-line: underline;
        text-transform: capitalize;
        text-decoration: none;
        margin-left: 10px;
      }
`;
