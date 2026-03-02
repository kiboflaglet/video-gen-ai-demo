
# Tech
`express.js` - Backend Logic + Endpoints
`bullMQ`   - Job system
Docker - To use Redis for queued jobs (port: 6379, name: my-redis)

# Structure 
* API Layer
* Video Generation Engine
* Job & Queue System
* Status and progress
* Identity & Access (auth)
* Entitlements & Plans
* Credits & Billing
* Providers
* Storage
* Observability

## API Layer
* [X] Create video request
* [X] Get video status
* [ ] List user generations
* [ ] Cancel generation
* [ ] Versioned API
* [ ] Regenerate from existing request
* [X] Service Response (response shape)
* [X] Validation
* [X] Modeling Shapes
* [ ] Socket.io for real time connections (might apply)


## Video Generation Engine
* [X] Video generation request model
* [X] Provider abstraction (AIProvider, AIVideoProvider)
* [ ] Prompt normalization, validation
* [ ] Duration, resolution, aspect control, image,  mode (text-to-video, image-to-video etc.)
* [X] Provider switcher
* [ ] Provider capability, default options
* [ ] Retry, fallback logic
* [ ] Lifecycle (created --> queued --> processing --> completed or failed)
* [X] Job getting request information
* [ ] Prompt translation (GT)
* [ ] prompt sanitization (for inappropriate promps)


## Job and Queue system
* [X] Job enqueueing (bullMQ + Docker(Redis))
* [ ] Delayed jobs, rate limiting, cooldowns
* [ ] Job retries, backoff or fallback strategy
* [ ] Idempotent job execution
* [ ] Job cancellation
* [ ] Job prioritization (paid users move up)
* [ ] Scalable worker
* [ ] Job timeout handling
* [ ] Cleanup jobs

## Status and Progress
* [ ] Unified job status API
* [ ] Provider-specific status adapters
* [ ] Progress polling
* [ ] Webhook ingestion (if provider supports it)
* [ ] Status reconciliation (provider vs local)
* [ ] Stuck job detection
* [ ] Manual status override (admin)

## Status and Progress
* [ ] Temporary and permanent storage
* [ ] CDN ready URL
* [ ] File validation (size, mimetype)
* [ ] Signed URL, expiration

## Authentication 
* [ ] User registration (email / OAuth) (better-auth)
* [ ] Login / logout
* [ ] Token strategy (JWT / session)
* [ ] Refresh token rotation
* [ ] Device/session tracking
* [ ] Password reset flow
* [ ] Email verification
* [ ] Account lock / rate limit
* [ ] Internal service auth (API ↔ workers)

## Authorization & Access Control
* [ ] Role system (user / admin / system)
* [ ] Feature flags per role
* [ ] Provider access rules
* [ ] Endpoint-level permission checks
* [ ] Admin-only operations
* [ ] Soft bans / hard bans
* [ ] Read vs write separation

## Credit System
* [ ] Credit balance model
* [ ] Credit reservation (hold before job starts)
* [ ] Credit deduction on success
* [ ] Refund on failure
* [ ] Partial refunds
* [ ] Provider cost → credit mapping
* [ ] Promotional / bonus credits
* [ ] Expiry rules
* [ ] Atomic credit ops (no race conditions)

## Subscription System
* [ ] Plan definitions
* [ ] Monthly / yearly cycles
* [ ] Credit refill logic
* [ ] Plan upgrades / downgrades
* [ ] Proration handling
* [ ] Grace periods
* [ ] Cancelation behavior
* [ ] Plan feature gating
* [ ] One user → one active plan rule

## Payments & Billing Integration
* [ ] Checkout session creation
* [ ] Webhook processing
* [ ] Payment state machine
* [ ] Failed payment handling
* [ ] Retry rules
* [ ] Invoice history
* [ ] Tax / VAT readiness
* [ ] Provider-independent billing layer

## Entitlement System
in progress

## Providers 
in progress

## Storage 
in progress

## Observability
in progress

## Testing 
in progress