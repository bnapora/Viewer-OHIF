const gcpClientID = '1053568465268-t2coh1p3ke4lrhu6o042squicec9toed.apps.googleusercontent.com'; // PathPreview ClientID
const gcpProject = 'gcp-pathology-poc1';
const gcpLocation = 'us-west2';
const gcpDataset = 'dicom-pathology';
const gcpStore = 'slide-dicom-store';
// // const gcpBaseURL = 'https://healthcare.googleapis.com/v1';

// const gcpClientID = '1024667694253-pj3qhg8k76r3llk1du5op1iu5in4me9f.apps.googleusercontent.com'; // Insynthion ClientID
// const gcpProject = 'wsi-dicom-rnd';
// const gcpLocation = 'us-west2';
// const gcpDataset = 'DICOM-RND';
// const gcpStore = 'gs-dicomWSI-01';

window.config = {
  routerBasename: '/',
  extensions: [],
  modes: [],
  customizationService: {
    // Shows a custom route -access via http://localhost:3000/custom
    helloPage: '@ohif/extension-default.customizationModule.helloPage',
    dicomUploadComponent:
      '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  showStudyList: true,
  studyListFunctionsEnabled: true,
  maxNumberOfWebWorkers: 3,
  omitQuotationForMultipartRequest: true, // flag is for performance reasons, but it might not work for all servers
  // acceptHeader: 'multipart/related; type=image/jls; q=1',
  // requestTransferSyntaxUID: '1.2.840.10008.1.2.4.50',

  // New Flags
  enableGoogleCloudAdapter: true,
  enableGoogleCloudAdapterUI: true,

  showWarningMessageForCrossOrigin: true,
  showCPUFallbackMessage: true,
  showLoadingIndicator: true,
  strictZSpacingForVolumeViewport: true,
  maxNumRequests: {
    interaction: 100,
    thumbnail: 75,
    // Prefetch number is dependent on the http protocol. For http 2 or
    // above, the number of requests can be go a lot higher.
    prefetch: 25,
  },

  /* Dynamic config allows user to pass "configUrl" query string this allows to load config without recompiling application. The regex will ensure valid configuration source */
  // dangerouslyUseDynamicConfig: {
  //   enabled: true,
  //   // regex will ensure valid configuration source and default is /.*/ which matches any character. To use this, setup your own regex to choose a specific source of configuration only.
  //   // Example 1, to allow numbers and letters in an absolute or sub-path only.
  //   // regex: /(0-9A-Za-z.]+)(\/[0-9A-Za-z.]+)*/
  //   // Example 2, to restricts to either hosptial.com or othersite.com.
  //   // regex: /(https:\/\/hospital.com(\/[0-9A-Za-z.]+)*)|(https:\/\/othersite.com(\/[0-9A-Za-z.]+)*)/
  //   regex: /.*/,
  // },

  oidc: [
    {
      // ~ REQUIRED
      // Authorization Server URL
      authority: 'https://accounts.google.com',
      client_id: gcpClientID,
      redirect_uri: '/callback',
      response_type: 'id_token token',
      scope:
        'email profile openid https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/cloud-healthcare', // email profile openid
      // ~ OPTIONAL
      post_logout_redirect_uri: '/logout-redirect.html',
      revoke_uri: 'https://accounts.google.com/o/oauth2/revoke?token=',
      automaticSilentRenew: true,
      revokeAccessTokenOnSignout: true,
    },
  ],

  defaultDataSourceName: 'dicom-web-dcm4chee',
  dataSources: [
    {
      friendlyName: 'DCM4CHEE local',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicom-web-dcm4chee',
      configuration: {
        name: 'dcm4chee',
        wadoUriRoot: 'http://localhost/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoRoot: 'http://localhost/dcm4chee-arc/aets/DCM4CHEE/rs',
        wadoRoot: 'http://localhost/dcm4chee-arc/aets/DCM4CHEE/rs',
        qidoSupportsIncludeField: true,
        supportsReject: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata',
        dicomUploadEnabled: true,
        bulkDataURI: {
          enabled: true,
        },
      },
    },
    {
      friendlyName: 'Orthanc local',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicom-web-orthanc',
      configuration: {
        name: 'orthanc',
        requestTransferSyntaxUID: '1.2.840.10008.1.2.4.50',
        wadoUriRoot: 'http://localhost/pacs/dicom-web',
        qidoRoot: 'http://localhost/pacs/dicom-web',
        wadoRoot: 'http://localhost/pacs/dicom-web',
        qidoSupportsIncludeField: true,
        supportsReject: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata',
        dicomUploadEnabled: true,
        bulkDataURI: {
          enabled: true,
        },
      },
    },
    {
      friendlyName: 'GCP DICOMWeb Store',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb-gcp',
      configuration: {
        name: 'GCP',
        wadoUriRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        qidoRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        wadoRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        // wadoUriRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}`,
        // qidoRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}`,
        // wadoRoot: `https://healthcare.googleapis.com/v1/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}`,
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: false,
        dicomUploadEnabled: true,
        omitQuotationForMultipartRequest: true,
        configurationAPI: 'ohif.dataSourceConfigurationAPI.google',
        bulkDataURI: {
          enabled: false,
        },
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb-aws',
      configuration: {
        friendlyName: 'AWS S3 Static wado server',
        name: 'aws',
        wadoUriRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',
        qidoRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',
        wadoRoot: 'https://d33do7qe4w26qo.cloudfront.net/dicomweb',
        qidoSupportsIncludeField: false,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: false,
        supportsWildcard: true,
        staticWado: true,
        singlepart: 'bulkdata,video',
        // whether the data source should use retrieveBulkData to grab metadata,
        // and in case of relative path, what would it be relative to, options
        // are in the series level or study level (some servers like series some study)
        bulkDataURI: {
          enabled: true,
          relativeResolution: 'studies',
        },
        omitQuotationForMultipartRequest: true,
      },
    },
    {
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicom-json',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
  ],
  whiteLabeling: {
    createLogoComponentFn: function (React) {
      return React.createElement(
        'a',
        {
          target: '_self',
          rel: 'noopener noreferrer',
          className: 'text-purple-600 line-through',
          href: '/',
        },
        React.createElement('img', {
          // src: './customLogo.svg',
          src: './gestalt-logo-light.png',
          className: 'h-10',
        })
      );
    },
  },
  httpErrorHandler: error => {
    // This is 429 when rejected from the public idc sandbox too often.
    console.warn(error.status);
  },

  hotkeys: [
    {
      commandName: 'incrementActiveViewport',
      label: 'Next Viewport',
      keys: ['right'],
    },
    {
      commandName: 'decrementActiveViewport',
      label: 'Previous Viewport',
      keys: ['left'],
    },
    { commandName: 'rotateViewportCW', label: 'Rotate Right', keys: ['r'] },
    { commandName: 'rotateViewportCCW', label: 'Rotate Left', keys: ['l'] },
    { commandName: 'invertViewport', label: 'Invert', keys: ['i'] },
    {
      commandName: 'flipViewportHorizontal',
      label: 'Flip Horizontally',
      keys: ['h'],
    },
    {
      commandName: 'flipViewportVertical',
      label: 'Flip Vertically',
      keys: ['v'],
    },
    { commandName: 'scaleUpViewport', label: 'Zoom In', keys: ['+'] },
    { commandName: 'scaleDownViewport', label: 'Zoom Out', keys: ['-'] },
    { commandName: 'fitViewportToWindow', label: 'Zoom to Fit', keys: ['='] },
    { commandName: 'resetViewport', label: 'Reset', keys: ['space'] },
    { commandName: 'nextImage', label: 'Next Image', keys: ['down'] },
    { commandName: 'previousImage', label: 'Previous Image', keys: ['up'] },
    // {
    //   commandName: 'previousViewportDisplaySet',
    //   label: 'Previous Series',
    //   keys: ['pagedown'],
    // },
    // {
    //   commandName: 'nextViewportDisplaySet',
    //   label: 'Next Series',
    //   keys: ['pageup'],
    // },
    {
      commandName: 'setToolActive',
      commandOptions: { toolName: 'Zoom' },
      label: 'Zoom',
      keys: ['z'],
    },
    // ~ Window level presets
    {
      commandName: 'windowLevelPreset1',
      label: 'W/L Preset 1',
      keys: ['1'],
    },
    {
      commandName: 'windowLevelPreset2',
      label: 'W/L Preset 2',
      keys: ['2'],
    },
    {
      commandName: 'windowLevelPreset3',
      label: 'W/L Preset 3',
      keys: ['3'],
    },
    {
      commandName: 'windowLevelPreset4',
      label: 'W/L Preset 4',
      keys: ['4'],
    },
    {
      commandName: 'windowLevelPreset5',
      label: 'W/L Preset 5',
      keys: ['5'],
    },
    {
      commandName: 'windowLevelPreset6',
      label: 'W/L Preset 6',
      keys: ['6'],
    },
    {
      commandName: 'windowLevelPreset7',
      label: 'W/L Preset 7',
      keys: ['7'],
    },
    {
      commandName: 'windowLevelPreset8',
      label: 'W/L Preset 8',
      keys: ['8'],
    },
    {
      commandName: 'windowLevelPreset9',
      label: 'W/L Preset 9',
      keys: ['9'],
    },
  ],
};
