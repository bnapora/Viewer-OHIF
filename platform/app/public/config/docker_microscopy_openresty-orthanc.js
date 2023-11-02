const gcpProject = "wsi-dicom-rnd"
const gcpLocation = "us-west2"
const gcpDataset = "DICOM-RND"
const gcpStore = "gs-dicomWSI-01"
const gcpClientID = "1024667694253-pj3qhg8k76r3llk1du5op1iu5in4me9f.apps.googleusercontent.com"

window.config = {
  routerBasename: '/',
  customizationService: {
    dicomUploadComponent:
      '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  enableGoogleCloudAdapter: false,
  showStudyList: true,
  oidc: [
    {
      // ~ REQUIRED
      // Authorization Server URL
      authority: 'https://accounts.google.com',
      client_id: gcpClientID,
      redirect_uri: '/callback',
      response_type: 'id_token token',
      scope:
        'email profile openid https://www.googleapis.com/auth/cloud-healthcare', // email profile openid
      // ~ OPTIONAL
      post_logout_redirect_uri: '/logout-redirect.html',
      revoke_uri: 'https://accounts.google.com/o/oauth2/revoke?token=',
      automaticSilentRenew: true,
      revokeAccessTokenOnSignout: true,
    },
  ],
  extensions: [],
  modes: [],
  // below flag is for performance reasons, but it might not work for all servers

  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  defaultDataSourceName: 'dicomweb',
  dataSources: [
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb',
      configuration: {
        friendlyName: 'Orthanc Server',
        name: 'Orthanc',
        wadoUriRoot: 'http://127.0.0.1/pacs/dicom-web',
        qidoRoot: 'http://127.0.0.1/pacs/dicom-web',
        wadoRoot: 'http://127.0.0.1/pacs/dicom-web',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        dicomUploadEnabled: true,
        bulkDataURI: {
          enabled: true,
        },
      },
    },
    // {
    //   namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
    //   sourceName: 'dicomjson',
    //   configuration: {
    //     friendlyName: 'dicom json',
    //     name: 'Orthanc-json',
    //     wadoUriRoot: 'http://127.0.0.1/pacs/dicom-web',
    //     qidoRoot: 'http://127.0.0.1/pacs/dicom-web',
    //     wadoRoot: 'http://127.0.0.1/pacs/dicom-web',
    //     qidoSupportsIncludeField: true,
    //     supportsReject: true,
    //     imageRendering: 'wadors',
    //     thumbnailRendering: 'wadors',
    //     enableStudyLazyLoad: true,
    //     supportsFuzzyMatching: true,
    //     supportsWildcard: true,
    //     dicomUploadEnabled: true,
    //     bulkDataURI: {
    //       enabled: true,
    //     },
    //   },
    // },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomlocal',
      sourceName: 'dicomlocal',
      configuration: {
        friendlyName: 'dicom local',
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb-gcp',
      configuration: {
        friendlyName: 'dcmjs DICOMWeb Server-GCP',
        name: 'GCP',
        wadoUriRoot:
          `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        qidoRoot:
          `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        wadoRoot:
          `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: false,
        dicomUploadEnabled: true,
        omitQuotationForMultipartRequest: true,
        configurationAPI: 'ohif.dataSourceConfigurationAPI.google',
      },
    },
  ],
};
