/** Number of project cards shown per page in the grid. */
export const ITEMS_PER_PAGE = 10;

/** Minimum horizontal swipe distance (px) to trigger a project change. */
export const SWIPE_THRESHOLD = 60;

/** Subdirectory under `public/` where project images are stored. */
export const ASSETS_BASE = 'assets/images';

/** Spring config for paginated grid page transitions. */
export const PAGE_SPRING = { type: 'spring', stiffness: 300, damping: 30 };

/** Opacity transition config for paginated grid page transitions. */
export const PAGE_OPACITY = { duration: 0.25 };

/** Cubic bezier for the project cross-fade inside the modal (Apple-like ease). */
export const CONTENT_EASING = [0.16, 1, 0.3, 1];

/** Cubic bezier for the modal open/close entrance. */
export const MODAL_OPEN_EASING = [0.22, 0.61, 0.36, 1];

export const CONTENT_DURATION = 0.4;
export const MODAL_DURATION = 0.35;
export const OVERLAY_DURATION = 0.25;

export const MODAL_MAX_HEIGHT_DESKTOP = 'min(85vh, 600px)';
export const MODAL_MAX_HEIGHT_MOBILE = '85vh';

/**
 * Resolves a bare image filename to a usable URL.
 * - In development: returns a root-absolute path (`/assets/images/...`)
 * - In production: prefixes with `PUBLIC_URL` for GitHub Pages compatibility
 */
export const resolveImg = (filename) => {
  return process.env.NODE_ENV === 'development'
    ? `/assets/images/${filename}`
    : `${(process.env.PUBLIC_URL || '.')}/assets/images/${filename}`;
};
