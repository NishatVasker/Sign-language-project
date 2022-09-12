async function imageClassificationWithImage() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result);
}

async function imageClassificationWithWebcam() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Create an object from Tensorflow.js data API which could capture image
  // from the web camera as Tensor.
  const webcam = await tf.data.webcam(webcamElement);
  while (true) {
    const img = await webcam.capture();
    const result = await net.classify(img);

    document.getElementById('console').innerText = `
      prediction: ${result[0].className}\n
      probability: ${result[0].probability}
    `;
    // Dispose the tensor to release the memory.
    img.dispose();

    // Give some breathing room by waiting for the next animation frame to
    // fire.
    await tf.nextFrame();
  }
}

const start = async () => {

  const createKNNClassifier = async () => {
    console.log('Loading KNN Classifier');
    return await knnClassifier.create();
  };
  const createMobileNetModel = async () => {
    console.log('Loading Mobilenet Model');
    return await mobilenet.load();
  };
  const createWebcamInput = async () => {
    console.log('Loading Webcam Input');
    const webcamElement = await document.getElementById('webcam');
    return await tf.data.webcam(webcamElement);
  };

  const mobilenetModel = await createMobileNetModel();
  const knnClassifierModel = await createKNNClassifier();
  const webcamInput = await createWebcamInput();

  const initializeElements = () => {
    document.getElementById('load_button').addEventListener('change', (event) => uploadModel(knnClassifierModel,event));
    document.getElementById('save_button').addEventListener('click', async () => downloadModel(knnClassifierModel));

    document.getElementById('class-a').addEventListener('click', () => addDatasetClass(0));
    document.getElementById('class-b').addEventListener('click', () => addDatasetClass(1));
    document.getElementById('class-c').addEventListener('click', () => addDatasetClass(2));

    document.getElementById('class-c1').addEventListener('click', () => addDatasetClass(3));
    document.getElementById('class-c2').addEventListener('click', () => addDatasetClass(4));
    document.getElementById('class-c3').addEventListener('click', () => addDatasetClass(5));
    document.getElementById('class-c4').addEventListener('click', () => addDatasetClass(6));
    document.getElementById('class-c5').addEventListener('click', () => addDatasetClass(7));
    document.getElementById('class-c6').addEventListener('click', () => addDatasetClass(8));
    
    document.getElementById('class-c7').addEventListener('click', () => addDatasetClass(9));
    document.getElementById('class-c8').addEventListener('click', () => addDatasetClass(10));
    document.getElementById('class-c9').addEventListener('click', () => addDatasetClass(11));
    document.getElementById('class-c10').addEventListener('click', () => addDatasetClass(12));
    document.getElementById('class-c11').addEventListener('click', () => addDatasetClass(13));
    document.getElementById('class-c12').addEventListener('click', () => addDatasetClass(14));


    document.getElementById('class-c13').addEventListener('click', () => addDatasetClass(15));
    document.getElementById('class-c14').addEventListener('click', () => addDatasetClass(16));
    document.getElementById('class-c15').addEventListener('click', () => addDatasetClass(17));
    document.getElementById('class-c16').addEventListener('click', () => addDatasetClass(18));
    document.getElementById('class-c17').addEventListener('click', () => addDatasetClass(19));
    document.getElementById('class-c18').addEventListener('click', () => addDatasetClass(20));
    document.getElementById('class-c19').addEventListener('click', () => addDatasetClass(21));
    document.getElementById('class-c20').addEventListener('click', () => addDatasetClass(22));
    document.getElementById('class-c21').addEventListener('click', () => addDatasetClass(23));
    document.getElementById('class-c22').addEventListener('click', () => addDatasetClass(24));
    document.getElementById('class-c23').addEventListener('click', () => addDatasetClass(25));
    document.getElementById('class-c24').addEventListener('click', () => addDatasetClass(26));
    document.getElementById('class-c25').addEventListener('click', () => addDatasetClass(27));
    document.getElementById('class-c26').addEventListener('click', () => addDatasetClass(28));
    document.getElementById('class-c27').addEventListener('click', () => addDatasetClass(29));
    document.getElementById('class-c28').addEventListener('click', () => addDatasetClass(30));
    document.getElementById('class-c29').addEventListener('click', () => addDatasetClass(31));
    document.getElementById('class-c30').addEventListener('click', () => addDatasetClass(32));
    document.getElementById('class-c31').addEventListener('click', () => addDatasetClass(33));
    document.getElementById('class-c32').addEventListener('click', () => addDatasetClass(34));
    document.getElementById('class-c33').addEventListener('click', () => addDatasetClass(35));
    document.getElementById('class-c34').addEventListener('click', () => addDatasetClass(36));
    document.getElementById('class-c35').addEventListener('click', () => addDatasetClass(37));
    document.getElementById('class-c36').addEventListener('click', () => addDatasetClass(38));
    document.getElementById('class-c37').addEventListener('click', () => addDatasetClass(39));
    document.getElementById('class-c38').addEventListener('click', () => addDatasetClass(40));
    document.getElementById('class-c39').addEventListener('click', () => addDatasetClass(41));
    document.getElementById('class-c40').addEventListener('click', () => addDatasetClass(42));
    document.getElementById('class-c41').addEventListener('click', () => addDatasetClass(43));
    document.getElementById('class-c42').addEventListener('click', () => addDatasetClass(44));
    document.getElementById('class-c43').addEventListener('click', () => addDatasetClass(45));
    document.getElementById('class-c44').addEventListener('click', () => addDatasetClass(46));
    document.getElementById('class-c45').addEventListener('click', () => addDatasetClass(47));
    document.getElementById('class-c46').addEventListener('click', () => addDatasetClass(48));
    document.getElementById('class-c47').addEventListener('click', () => addDatasetClass(49));
    //document.getElementById('class-c48').addEventListener('click', () => addDatasetClass(50));
    


   // <button id="class-c1">Add উ</button>
  };

  const saveClassifier = async (classifierModel) => {
    let datasets = await classifierModel.getClassifierDataset();
    let datasetObject = {};
    Object.keys(datasets).forEach(async (key) => {
      let data = await datasets[key].dataSync();
      datasetObject[key] = Array.from(data);
    });
    let jsonModel = JSON.stringify(datasetObject);

    let downloader = document.createElement('a');
    downloader.download = "model.json";
    downloader.href = 'data:text/text;charset=utf-8,' + encodeURIComponent(jsonModel);
    document.body.appendChild(downloader);
    downloader.click();
    downloader.remove();
  };

  const uploadModel = async (classifierModel, event) => {
    let inputModel = event.target.files;
    console.log("Uploading");
    let fr = new FileReader();
    if (inputModel.length>0) {
      fr.onload = async () => {
        var dataset = fr.result;
        var tensorObj = JSON.parse(dataset);

        Object.keys(tensorObj).forEach((key) => {
          tensorObj[key] = tf.tensor(tensorObj[key], [tensorObj[key].length / 1024, 1024]);
        });
        classifierModel.setClassifierDataset(tensorObj);
        console.log("Classifier has been set up! Congrats! ");
      };
    }
    await fr.readAsText(inputModel[0]);
    console.log("Uploaded");
  };

  const downloadModel = async (classifierModel) => {
    await saveClassifier(classifierModel);
  };
  const putImageToPage = (event) => {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
    };
    reader.readAsDataURL(input.files[0]);
  };

  const addDatasetClass = async (classId) => {
    // Capture an image from the web camera.
    const img = await webcamInput.capture();

    // Get the intermediate activation of MobileNet 'conv_preds' and pass that
    // to the KNN classifier.
    const activation = mobilenetModel.infer(img, 'conv_preds');

    // Pass the intermediate activation to the classifier.
    knnClassifierModel.addExample(activation, classId);

    // Dispose the tensor to release the memory.
    img.dispose();
  };
  const imageClassificationWithTransferLearningOnWebcam = async () => {
    console.log("Machine Learning on the web is ready");
    while (true) {
      if (knnClassifierModel.getNumClasses() > 0) {
        const img = await webcamInput.capture();

        // Get the activation from mobilenet from the webcam.
        const activation = mobilenetModel.infer(img, 'conv_preds');
        // Get the most likely class and confidences from the classifier module.
        const result = await knnClassifierModel.predictClass(activation);

        const classes = ['A', 'B', 'C','অ','আ','ই','ঈ','উ','ঊ','ঋ','এ','ঐ','ও','ঔ','ক','খ','গ','ঘ','ঙ','চ','ছ','জ','ঝ','ঞ','ট','ঠ','ড','ঢ','ণ','ত','থ','দ','ধ','ন','প','ফ','ব','ভ','ম','য','র','ল','শ','ষ','স','হ','ক্ষ','ড়','ঢ়','য়' ];
        document.getElementById('console').innerText = `
        prediction: ${classes[result.label]}\n
        probability: ${result.confidences[result.label]}
      `;

        // Dispose the tensor to release the memory.
        img.dispose();
      }
      await tf.nextFrame();
    }
  };

  await initializeElements();
  await imageClassificationWithTransferLearningOnWebcam();
};

window.onload = () => {
  start();
};
