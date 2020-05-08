import { TagCloud } from 'react-tagcloud';

import { ITagcloudComponent } from './tagcloud.interfaces';
 
export default ({ data }: ITagcloudComponent) => (
  <TagCloud
    minSize={12}
    maxSize={35}
    tags={data}
  />
)