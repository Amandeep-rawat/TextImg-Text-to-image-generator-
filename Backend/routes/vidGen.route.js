import Router from "express"
import { GetVideoScript } from "../controller/getvideoscriptController.js";
import { convertTextToSpeech } from "../controller/textToSpeechController.js";
// import { convertTextToSpeech } from "../controller/textToSpeechController.js";
const router=Router();

router.post('/get-video-script',GetVideoScript);
router.post("/text-to-speech", convertTextToSpeech);
export default  router;