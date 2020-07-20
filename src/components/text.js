 
// Doing some dark magic here to make sure we don't add our // synchronizer/tool until all canvases have rendered an image.
 let canvasesReady = false; 
 let numImagesLoaded = 0;
  const firstElement = document.getElementById('topgram_element');
   const secondElement = document.getElementById('chest_element'); 
   function addReferenceLinesTool(){ 
     const synchronizer = new cornerstoneTools.Synchronizer( 'cornerstonenewimage', cornerstoneTools.updateImageSynchronizer ); 
   // These have to be added to our synchronizer before we pass it to our tool 
     synchronizer.add(firstElement); synchronizer.add(secondElement);
    cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool); 
    cornerstoneTools.setToolEnabled('ReferenceLines', { synchronizationContext: synchronizer, });
   } 
    const handleImageRendered = (evt) => { evt.detail.element.removeEventListener('cornerstoneimagerendered', handleImageRendered) 
    numImagesLoaded++; 
    if(numImagesLoaded === 2){ addReferenceLinesTool(); } } 
    firstElement.addEventListener('cornerstoneimagerendered', handleImageRendered) 
    secondElement.addEventListener('cornerstoneimagerendered', handleImageRendered) 




    referenceViewport: ({ viewports }) => {
        let elements = [],
          numImagesLoaded = 0,
          viewportSpecificData = viewports.viewportSpecificData,
          _length = Object.keys(viewportSpecificData).length;
  
        if (!_length || _length < 2) {
          throw new Error('当前窗口不支持定位线功能.');
          return false;
        }
        cornerstone.getEnabledElements().forEach(enabledElement => {
          elements.push(enabledElement.element);
        });
        const addReferenceLinesTool = () => {
          const synchronizer = new cornerstoneTools.Synchronizer(
            'cornerstonenewimage',
            cornerstoneTools.updateImageSynchronizer
          );
          // These have to be added to our synchronizer before we pass it to our tool
          elements.forEach(element => {
            synchronizer.add(element);
          });
          cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool);
          cornerstoneTools.setToolEnabled('ReferenceLines', {
            synchronizationContext: synchronizer,
          });
        };
        const handleImageRendered = evt => {
          evt.detail.element.removeEventListener(
            'cornerstoneimagerendered',
            handleImageRendered
          );
          numImagesLoaded++;
          if (numImagesLoaded === elements.length) {
            addReferenceLinesTool();
          }
        };
        elements.forEach(element => {
          element.addEventListener(
            'cornerstoneimagerendered',
            handleImageRendered
          );
        });
      }

      const imageLoad =  cornerstone.loadAndCacheImage(imageId).then(res=>{
        //解决ct展示一片黑的情况
        res.maxPixelValue = 433
        res.minPixelValue = 6
        console.log(res)
      })



  // Init cornerstone tools
cornerstoneTools.init()

// ...
// Enable our elements

const scheme = 'wadouri'
const baseUrl = 'https://mypacs.com/dicoms/'

// Create our Stack data
const firstSeries = [
  'image_1.dcm'
]

const secondSeries = [
  'image_11.dcm',
  'image_22.dcm',
  'image_33.dcm',
  'image_44.dcm'
]

const firstStack = {
  currentImageIdIndex: 0,
  imageIds: firstSeries
    .map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`);,
};

const secondStack = {
  currentImageIdIndex: 0,
  imageIds: secondSeries
    .map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`);,
};

// Create the synchronizer
const synchronizer = new cornerstoneTools.Synchronizer(
  // Cornerstone event that should trigger synchronizer
  'cornerstonenewimage',
  // Logic that should run on target elements when event is observed on source elements
  cornerstoneTools.updateImageSynchronizer
)

// Add and activate tools
cornerstoneTools.addTool(cornerstoneTools.StackScrollTool);
cornerstoneTools.addTool(cornerstoneTools.StackScrollMouseWheelTool);
cornerstoneTools.setToolActive('StackScroll', { mouseButtonMask: 1 });
cornerstoneTools.setToolActive('StackScrollMouseWheel', { });

// load images and set the stack
const firstLoadImagePromise = cornerstone.loadImage(firstStack.imageIds[0])
  .then((image) => {
    cornerstone.displayImage(firstElement, image)

    // set the stack as tool state
    synchronizer.add(firstElement)
    cornerstoneTools.addStackStateManager(firstStack, ['stack', 'Crosshairs'])
    cornerstoneTools.addToolState(firstElement, 'stack', firstStack)
  })

const secondLoadImagePromise = cornerstone.loadImage(secondStack.imageIds[0])
  .then((image) => {
    cornerstone.displayImage(secondElement, image)

    // set the stack as tool state
    synchronizer.add(secondElement);
    cornerstoneTools.addStackStateManager(secondElement, ['stack', 'Crosshairs']);
    cornerstoneTools.addToolState(secondElement, 'stack', secondStack);
  })

// After images have loaded, and our sync context has added both elements
Promise.all([firstLoadImagePromise, secondLoadImagePromise])
  .then(() => {
    cornerstoneTools.addTool(cornerstoneTools.ReferenceLinesTool);
    cornerstoneTools.setToolEnabled('ReferenceLines', {
      synchronizationContext: synchronizer,
    });
  });

//滚轮滚动部分
  // Init cornerstone tools
cornerstoneTools.init()

const scheme = 'wadouri'
const baseUrl = 'https://mypacs.com/dicoms/'
const series = [
  'image_1.dcm',
  'image_2.dcm'
]

const imageIds = series.map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`)

// Add our tool, and set it's mode
const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool

//define the stack
const stack = {
  currentImageIdIndex: 0,
  imageIds
}

// load images and set the stack
cornerstone.loadImage(imageIds[0]).then((image) => {
  cornerstone.displayImage(element, image)
  cornerstoneTools.addStackStateManager(element, ['stack'])
  cornerstoneTools.addToolState(element, 'stack', stack)
})

cornerstoneTools.addTool(StackScrollMouseWheelTool)
cornerstoneTools.setToolActive('StackScrollMouseWheel', { })



 // Init cornerstone tools cornerstoneTools.init()

const scheme = 'wadouri' 
const baseUrl = 'https://mypacs.com/dicoms/'
 const series = [ 'image_1.dcm', 'image_2.dcm' ]

const imageIds = series.map(seriesImage => `${scheme}:${baseUrl}${seriesImage}`)

// Add our tool, and set it's mode 
const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool

//define the stack
 const stack = { currentImageIdIndex: 0, imageIds }

// load images and set the stack 
cornerstone.loadImage(imageIds[0]).then((image) => { cornerstone.displayImage(element, image) cornerstoneTools.addStackStateManager(element, ['stack']) cornerstoneTools.addToolState(element, 'stack', stack) })

cornerstoneTools.addTool(StackScrollMouseWheelTool) 
cornerstoneTools.setToolActive('StackScrollMouseWheel', { })

//2dmpr
mpr2d: async ({ viewports }) => {
  // TODO push a lot of this backdoor logic lower down to the library level.
  const displaySet =
    viewports.viewportSpecificData[viewports.activeViewportIndex];

  // Get current VOI if cornerstone viewport.
  const cornerstoneVOI = getVOIFromCornerstoneViewport();

  const viewportProps = [
    {
      //Axial
      orientation: {
        sliceNormal: [0, 0, 1],
        viewUp: [0, -1, 0],
      },
    },
    {
      // Sagittal
      orientation: {
        sliceNormal: [1, 0, 0],
        viewUp: [0, 0, 1],
      },
    },
    {
      // Coronal
      orientation: {
        sliceNormal: [0, 1, 0],
        viewUp: [0, 0, 1],
      },
    },
  ];

  try {
    apis = await setMPRLayout(displaySet, viewportProps, 1, 3);
  } catch (error) {
    throw new Error(error);
  }

  if (cornerstoneVOI) {
    setVOI(cornerstoneVOI);
  }

  // Add widgets and set default interactorStyle of each viewport.
  apis.forEach((api, apiIndex) => {
    api.addSVGWidget(
      vtkSVGCrosshairsWidget.newInstance(),
      'crosshairsWidget'
    );

    const istyle = vtkInteractorStyleMPRCrosshairs.newInstance();

    api.setInteractorStyle({
      istyle,
      configuration: { apis, apiIndex },
    });
  });
},