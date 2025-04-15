const gcpClientID = '1053568465268-t2coh1p3ke4lrhu6o042squicec9toed.apps.googleusercontent.com'; // PathPreview ClientID
const gcpProject = 'gcp-pathology-poc1';
const gcpLocation = 'us-west2';
const gcpDataset = 'dicom-pathology';
const gcpStore = 'slide-dicom-store-public';
const gcpBaseURL = 'https://dicom.poc1.gestaltcloud.com/dicom-public01';

window.config = {
  routerBasename: '/viewer',
  extensions: [],
  modes: [],
  showStudyList: true,
  studyListFunctionsEnabled: true,
  maxNumberOfWebWorkers: 3,
  omitQuotationForMultipartRequest: true, // flag is for performance reasons, but it might not work for all servers
  // acceptHeader: 'multipart/related; type=image/jls; q=1',
  // requestTransferSyntaxUID: '1.2.840.10008.1.2.4.50',
  // Error Message Flag for ErrorBoundary.tsx file.
  enableVerboseErrorMessages: true,

  // New Flags
  enableGoogleCloudAdapter: false,
  enableGoogleCloudAdapterUI: false,
  investigationalUseDialog: 'never',
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

  // oidc: [
  //   {
  //     // ~ REQUIRED
  //     // Authorization Server URL
  //     authority: 'https://accounts.google.com',
  //     client_id: gcpClientID,
  //     client_secret: gcpClientSecret,
  //     redirect_uri: '/callback',
  //     response_type: 'code', // 'id_token token',
  //     scope:
  //       'email profile openid https://www.googleapis.com/auth/cloudplatformprojects.readonly https://www.googleapis.com/auth/cloud-healthcare', // email profile openid
  //     // ~ OPTIONAL
  //     post_logout_redirect_uri: '/logout-redirect.html',
  //     revoke_uri: 'https://accounts.google.com/o/oauth2/revoke?token=',
  //     automaticSilentRenew: true,
  //     revokeAccessTokenOnSignout: true,
  //     token_variant: 'iap',
  //   },
  // ],

  defaultDataSourceName: 'dicomweb-gcp',
  dataSources: [
    {
      friendlyName: 'GCP DICOMWeb Store',
      namespace: '@ohif/extension-default.dataSourcesModule.dicomweb',
      sourceName: 'dicomweb-gcp',
      configuration: {
        name: 'GCP',
        wadoUriRoot: `${gcpBaseURL}/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        qidoRoot: `${gcpBaseURL}/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        wadoRoot: `${gcpBaseURL}/projects/${gcpProject}/locations/${gcpLocation}/datasets/${gcpDataset}/dicomStores/${gcpStore}/dicomWeb`,
        qidoSupportsIncludeField: true,
        imageRendering: 'wadors',
        thumbnailRendering: 'wadors',
        enableStudyLazyLoad: true,
        supportsFuzzyMatching: true,
        supportsWildcard: false,
        dicomUploadEnabled: false,
        omitQuotationForMultipartRequest: true,
        // configurationAPI: 'ohif.dataSourceConfigurationAPI.google',
        bulkDataURI: {
          enabled: false,
        },
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
          src: '/gestalt-logo-light.png',
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
