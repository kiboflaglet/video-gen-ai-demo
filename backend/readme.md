## Possible features

* veo3 prompting (free)
* Prompt endpoints
* Smart prompting
* Worker service (for picking up calls)
* job Queue (for instant returns
* webhook listener *bullMq + redis
* presigned URL (for direct uploads to S3 thru backend)
* automatic cleanup for s3 (failed video)
* credit system
* prompt translation (GT)
* prompt sanitization (for inappropriate promps)
* function testing (credit, job persistance, mocking api)
* auth system (better-auth, jwt, payload limit)
* socket channels for instant
* validation with zod

# Features Detailed

## Smart prompting

* veo3, google-auth-library (@google/genai)
* User prompt -> gemini expansion -> veo 3.1
* expansion of prompt (gemini)
* handling failed response from veo
* limitation on duration (4,6,8 sec)

## Queue for calls

* user click generate -> bullMQ starts job -> express return jobId -> workerService (bullMQ) start processing -> video saved to S3 -> socket or Polling system returns video
* Veo takes 2-5 mins to respond, so the endpoint should give instant status response and asking every 10 sec or making socket channel
* using asyncronous queing system (BullMQ, Redis )
* socket io or polling for real time checking
