# Direct video upload preview (Phase 5I)

Apply the community video migration `20261119180000_gallaspy_community_video.sql` first, then `20261119190000_gallaspy_direct_video_upload.sql` in a staging database. Do not run against production until verified.

The legacy route still handles MP4 files up to 3.5 MB. For larger MP4 files (up to 20,000,000 bytes), the authenticated API reserves a user-specific object path, issues an upload-only signed URL without overwrite permission, then verifies the object before creating a post. No video bytes are sent through the Vercel upload endpoint in the direct flow. Playback continues to use the existing private, short-lived signed read URLs. Videos are not transcoded by this phase.

Preview verification:

- Verify the bucket remains private and direct authenticated storage reads/writes are denied outside the scoped signed upload URL.
- Verify an active official member with a clubhouse profile can publish an MP4 of 4 MB and 20 MB from browser and iPhone; verify audio and overlays remain intact. Test with the native API directed at the preview backend, not production.
- Verify expired/invalid tokens, nonmembers, cross-account finalize attempts, oversized files, and incorrect MP4 headers are rejected. Verify an upload URL cannot overwrite its object or upload elsewhere.
- Interrupt a transfer and retry the same selection; repeat finalize and verify just one post. Verify no post appears before finalize succeeds.
- Verify a smaller legacy upload, signed playback and blocked-user visibility continue working.
- Check storage object MIME/size metadata and reservation rows; verify the five-large-upload daily limit and ten-unfinished-reservation limit.

Pending reservations deliberately remain private and count toward a bounded per-account quota. Before production, implement a scheduled cleanup process using the Storage API (not direct SQL deletion of storage metadata). Only clean unpublished reservations older than the maximum upload-token lifetime plus margin (at least three hours), recheck that there is no video/post, and only release reservations after storage deletion is confirmed. Also implement account/post deletion media cleanup. Do not delete a published object, even if a client reports a timeout.
