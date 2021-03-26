import styled from 'styled-components'
import Icon from "../BaseSVG/BaseSVG";

const Svg = styled(Icon)` 
  width: 24px; 
  height: 24px;
`

const RemixLogoSimple = ({ className }) => (
    <Svg viewBox="0 0 24 24" className={className}>
    <path
    fill="currentColor"
    d="M11 0L10.995 9.585L1.409 0H11ZM22.574 13L11.579 24H1.409L12.404 13H22.574ZM13 11V0H24V11H13ZM24 14.398V24H14.4L24 14.398ZM0 22.574V1.409L10.582 11.992L0 22.574Z"
    />
    </Svg>
);

export default RemixLogoSimple