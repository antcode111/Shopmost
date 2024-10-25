import PropTypes from 'prop-types';
import React from 'react';
import { Field } from '@components/common/form/Field';
import { Card } from '@components/admin/cms/Card';

export default function StatusAndLayout({ cmsPage }) {
  return (
    <Card>
      <Card.Session title="Status">
        <Field
          type="radio"
          name="status"
          options={[
            { value: 0, text: 'Disabled' },
            { value: 1, text: 'Enabled' }
          ]}
          value={cmsPage?.status}
        />
      </Card.Session>
    </Card>
  );
}

StatusAndLayout.propTypes = {
  cmsPage: PropTypes.shape({
    status: PropTypes.number,
    includeInNave: PropTypes.number,
  })
};

StatusAndLayout.defaultProps = {
  cmsPage: null
};

export const layout = {
  areaId: 'rightSide',
  sortOrder: 15
};

export const query = `
  query Query {
    cmsPage(id: getContextValue("cmsPageId", null)) {
      status
    }
  }
`;
