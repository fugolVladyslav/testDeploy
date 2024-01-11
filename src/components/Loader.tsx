import { StyledLoader } from '../styles/components/StyledLoader';
import { PropagateLoader } from 'react-spinners';

export interface ILoader {
  show: boolean;
}

export const Loader = ({ show }: ILoader) => {
  return show ? (
    <StyledLoader>
      <div>
        <PropagateLoader color="#fff" size={20} />
      </div>
    </StyledLoader>
  ) : null;
};
