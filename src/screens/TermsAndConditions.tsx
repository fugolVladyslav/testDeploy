import { FC, useLayoutEffect } from 'react';

import { StyledTermsAndConditionsScreens } from '../styles/screens/TermsAndConditions';

export const TermsAndConditions: FC = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <StyledTermsAndConditionsScreens>
      <h2 className="title">terms & conditions</h2>
      <p className="description">
        The following terms and conditions (“Terms”) govern the use of the NASO Company website and the services
        provided through the website (collectively, the “Services”). By accessing or using the Services, you agree to be
        bound by these Terms. If you do not agree to these Terms, you may not use the Services.
      </p>
      <p className="sub-title">Eligibility</p>
      <p className="description">
        The Services are intended for use by individuals who are at least 18 years old. By using the Services, you
        represent and warrant that you are at least 18 years old and have the right, authority and capacity to enter
        into these Terms.
      </p>
      <p className="sub-title">Use of the Services</p>
      <ul className="list">
        You may use the Services only for lawful purposes and in accordance with these Terms. You agree not to:
        <li>Use the Services for any fraudulent or unauthorized purpose</li>
        <li>Interfere with or disrupt the Services or the servers or networks that provide the Services</li>
        <li>Modify, adapt or hack the Services or otherwise attempt to gain unauthorized access to the Services</li>
        <li>Infringe the intellectual property rights of NASO Company or others</li>
        <li>Transmit any viruses, malware, or other harmful or malicious code</li>
      </ul>

      <p className="sub-title">Account</p>
      <p className="description">
        In order to access certain features of the Services, you may be required to create an account. You are
        responsible for maintaining the confidentiality of your account and password and for restricting access to your
        account. You agree to accept responsibility for all activities that occur under your account.
      </p>

      <p className="sub-title">User Content</p>
      <p className="description">
        The Services may allow you to upload, submit, store, send or receive content, including, but not limited to,
        text, photos, and videos (“User Content”). You retain all rights in and to your User Content and are solely
        responsible for the accuracy, quality, and legality of your User Content. By submitting User Content to the
        Services, you grant NASO Company a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license
        to use, copy, modify, and distribute your User Content in connection with the Services.
      </p>

      <p className="sub-title">Proprietary Rights</p>
      <p className="description">
        The Services and all the materials included in the Services, such as text, graphics, logos, images, software and
        other content (collectively, the “Materials”), are the property of NASO Company or its licensors and are
        protected by copyright, trademark and other laws. You may not use the Materials for any commercial purpose or in
        any way that is likely to cause confusion among customers, or that disparages or discredits NASO Company.
      </p>

      <p className="sub-title">Disclaimer of Warranties</p>
      <p className="description">
        The Services and the Materials are provided on an “as is” and “as available” basis. NASO Company makes no
        representations or warranties of any kind, express or implied, as to the operation of the Services or the
        information, content, materials or products included in the Services. You acknowledge that your use of the
        Services is at your sole risk.
      </p>

      <p className="sub-title">Limitation of Liability</p>
      <p className="description">
        To the fullest extent permitted by law, NASO Company will not be liable for any direct, indirect, incidental,
        special or consequential damages, or any loss of profits, data or other intangible losses, arising out of or in
        connection with your use of the Services or your inability to use the Services.
      </p>

      <p className="sub-title">Changes to these Terms</p>
      <p className="description">
        NASO Company may modify these Terms from time to time, and will post the revised Terms on the NASO Company
        website. By continuing to use the Services after the revised Terms become effective, you agree to be bound by
        the revised Terms.
      </p>

      <p className="sub-title">Dispute Resolution</p>
      <p className="description">In the event of any dispute arising.</p>
    </StyledTermsAndConditionsScreens>
  );
};

export default TermsAndConditions;
