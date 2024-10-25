import PropTypes from 'prop-types';
import React from 'react';
import Area from '@components/common/Area';
import { get } from '@lib/util/get';
import { Field } from '@components/common/form/Field';
import GrapseEditor from '@components/common/form/fields/GrapseEditor';

export default function General({
  page,
  browserApi,
  deleteApi,
  uploadApi,
  folderCreateApi
}) {
  const fields = [
    {
      component: { default: Field },
      props: {
        type: 'text',
        id: 'name',
        name: 'name',
        label: 'Name',
        placeholder: 'Name',
        validationRules: ['notEmpty']
      },
      sortOrder: 20
    },
    {
      component: { default: Field },
      props: {
        id: 'cmsPageId',
        name: 'cms_page_id',
        type: 'hidden'
      },
      sortOrder: 30
    },
    {
      component: { default: GrapseEditor },
      props: {
        id: 'content',
        name: 'content',
        label: '',
        browserApi,
        deleteApi,
        uploadApi,
        folderCreateApi
      },
      sortOrder: 10
    }
  ].filter((f) => {
    // eslint-disable-next-line no-param-reassign
    if (get(page, `${f.props.id}`) !== undefined) {
      f.props.value = get(page, `${f.props.id}`);
    }
    return f;
  });

  return (
    <Area id="pageEditGeneral" coreComponents={fields} />
  );
}

General.propTypes = {
  page: PropTypes.shape({
    cmsPageId: PropTypes.number,
    name: PropTypes.string,
    content: PropTypes.string
  }),
  browserApi: PropTypes.string.isRequired,
  deleteApi: PropTypes.string.isRequired,
  folderCreateApi: PropTypes.string.isRequired,
  uploadApi: PropTypes.string.isRequired
};

General.defaultProps = {
  page: {
    cmsPageId: null,
    name: '',
    content: ''
  }
};

export const layout = {
  areaId: 'leftSide',
  sortOrder: 10
};

export const query = `
  query Query {
    page: cmsPage(id: getContextValue("cmsPageId", null)) {
      cmsPageId
      name
      content
    }
    browserApi: url(routeId: "fileBrowser", params: [{key: "0", value: ""}])
    deleteApi: url(routeId: "fileDelete", params: [{key: "0", value: ""}])
    uploadApi: url(routeId: "imageUpload", params: [{key: "0", value: ""}])
    folderCreateApi: url(routeId: "folderCreate")
  }
`;
