import { H2 } from '../../common-elements';
import styled, { extensionsHook } from '../../styled-components';


export const ContentItemHeader = styled(H2)`
  margin-top: 0;
  margin-bottom: 0.5em;

  ${extensionsHook('ContentItemHeader')};
`;
