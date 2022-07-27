import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import * as Widgets from '@/components/Widgets/index';
import { EditContext } from '@/pages/Edit/utils/EditContext';
import StyleRender from '../StyleRender/StyleRender';
import ActiveElement from '../ActiveElement/ActiveElement';

class Render extends PureComponent {
  static contextType = EditContext;

  WidgetItem = item => {
    const { type } = item;
    const Widget = Widgets[type];
    const { mode } = this.context;
    if (mode === 'preview') {
      return <Widget key={item.id} data={item} />;
    }
    if (mode === 'edit') {
      return (
        <StyleRender key={item.id} data={item}>
          <ActiveElement data={item}>
            <Widget data={item} />
          </ActiveElement>
        </StyleRender>
      );
    }
    return null;
  };

  render() {
    const { layout } = this.props;
    return layout.map(this.WidgetItem);
  }
}
Render.propTypes = {
  layout: PropTypes.array.isRequired,
};
export default Render;
