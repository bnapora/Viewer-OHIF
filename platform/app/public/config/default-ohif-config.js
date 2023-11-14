// SPDX-FileCopyrightText: 2022 - 2023 Orthanc Team SRL <info@orthanc.team>
//
// SPDX-License-Identifier: CC0-1.0


window.config = {
  routerBasename: '/',
  extensions: [
  ],
  modes: [],
  customizationService: {
    // Shows a custom route -access via http://localhost:3000/custom
    helloPage: '@ohif/extension-default.customizationModule.helloPage',
    dicomUploadComponent: '@ohif/extension-cornerstone.customizationModule.cornerstoneDicomUploadComponent',
  },
  showStudyList: true,
  studyListFunctionsEnabled: true,
  // some windows systems have issues with more than 3 web workers
  maxNumberOfWebWorkers: 3,
  // below flag is for performance reasons, but it might not work for all servers
  omitQuotationForMultipartRequest: true,
  // acceptHeader: 'multipart/related; type=image/jls; q=1',
  // requestTransferSyntaxUID: '1.2.840.10008.1.2.4.50',
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
  // filterQueryParam: false,
  defaultDataSourceName: 'dicom-web-dcm4chee',
    /* Dynamic config allows user to pass "configUrl" query string this allows to load config without recompiling application. The regex will ensure valid configuration source */
  dangerouslyUseDynamicConfig: {
    enabled: true,
    // regex will ensure valid configuration source and default is /.*/ which matches any character. To use this, setup your own regex to choose a specific source of configuration only.
    // Example 1, to allow numbers and letters in an absolute or sub-path only.
    // regex: /(0-9A-Za-z.]+)(\/[0-9A-Za-z.]+)*/
    // Example 2, to restricts to either hosptial.com or othersite.com.
    // regex: /(https:\/\/hospital.com(\/[0-9A-Za-z.]+)*)|(https:\/\/othersite.com(\/[0-9A-Za-z.]+)*)/
    regex: /.*/,
  },
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
      sourceName: 'dicom-web',
      configuration: {
        name: 'orthanc',
        requestTransferSyntaxUID: '1.2.840.10008.1.2.1',
        wadoUriRoot: '/pacs/dicom-web',
        qidoRoot: '/pacs/dicom-web',
        wadoRoot: '/pacs/dicom-web',
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
      namespace: '@ohif/extension-default.dataSourcesModule.dicomjson',
      sourceName: 'dicom-json',
      configuration: {
        friendlyName: 'dicom json',
        name: 'json',
      },
    },
  ],
  whiteLabeling: {
    createLogoComponentFn: function(React) {
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

// module.exports = {
//   prefix: '',
//   important: false,
//   separator: ':',
//   theme: {
//     screens: {
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//     },
//     colors: {
//       overlay: 'rgba(0, 0, 0, 0.8)',
//       transparent: 'transparent',
//       black: '#000',
//       white: '#fff',
//       initial: 'initial',
//       inherit: 'inherit',

//       indigo: {
//         dark: '#0b1a42',
//       },
//       aqua: {
//         pale: '#7bb2ce',
//       },

//       primary: {
//         light: '#5acce6',
//         main: '#0944b3',
//         dark: '#090c29',
//         active: '#348cfd',
//       },

//       secondary: {
//         light: '#3a3f99',
//         main: '#2b166b',
//         dark: '#041c4a',
//         active: '#1f1f27',
//       },

//       common: {
//         bright: '#e1e1e1',
//         light: '#a19fad',
//         main: '#fff',
//         dark: '#726f7e',
//         active: '#2c3074',
//       },

//       customgreen: {
//         100: '#05D97C',
//       },

//       customblue: {
//         100: '#c4fdff',
//         200: '#38daff',
//       },
//     },
//   },
// };
