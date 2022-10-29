import { FC } from 'react';

import { svgs } from '@app/common/svgs';
import { SVGProps } from '@app/common/types';

export interface IconProps extends SVGProps {
  kind: keyof typeof svgs;
}

export const Icon: FC<IconProps> = ({ kind, ...svgProps }) => {
  const Component = svgs[kind];

  return <Component {...svgProps} />;
};
